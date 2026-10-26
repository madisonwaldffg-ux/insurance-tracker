/* ===========================================================================
   hub-payouts.js -- when each carrier's commission should hit your account.

   You're paid directly by each carrier. Each carrier has a payout rule:
     kind "bd"     -> N business days after the first draft / issue
     kind "weekly" -> CICA's cycle: drafts settled Wed through Tue 6pm are
                      paid the Friday of the following week (Tue + 10 days)
   The "start" is the deal's Effective date (the first draft); deals without
   one fall back to the submitted date. Rules are editable per account
   (state.payRules[key] = { days }).

   The amount expected is the advance (commission x advance months / 12, from
   chargeback-rules.js), or one month of commission for as-earned carriers.
   =========================================================================== */
(function (global) {
  "use strict";

  var RULES = [
    { key: "CICA Life", kind: "weekly", days: 10, basis: "draft", src: "guide",
      note: "Weekly: first drafts that settle Wed–Tue (6 p.m.) are paid the Friday of the following week." },
    { key: "United Home Life", kind: "bd", days: 1, basis: "draft", src: "guide",
      note: "Annualized first-year commission paid daily once the first draft clears." },
    { key: "Corebridge Financial", kind: "bd", days: 2, basis: "draft", src: "web", note: "Pays on first draft." },
    { key: "Liberty Bankers", kind: "bd", days: 2, basis: "draft", src: "web", note: "Pays on first draft." },
    { key: "Foresters", kind: "bd", days: 2, basis: "draft", src: "web", note: "Pays on first draft." },
    { key: "Transamerica", kind: "bd", days: 2, basis: "draft", src: "web", note: "Pays on first draft." },
    { key: "Mutual of Omaha", kind: "bd", days: 2, basis: "issue", src: "web", note: "Pays on issue — often before the first draft." },
    { key: "American-Amicable", kind: "bd", days: 2, basis: "issue", src: "web", note: "Pays on issue — often before the first draft. Occidental follows the same schedule." },
    { key: "Royal Neighbors", kind: "bd", days: 2, basis: "issue", src: "web", note: "Paid on issue, 1–2 days after the voice authorization." },
    { key: "American Home Life (AHL)", kind: "bd", days: 3, basis: "draft", src: "default", note: "Not published — set this from your statements." },
    { key: "Kansas City Life", kind: "bd", days: 5, basis: "draft", src: "default", note: "Not published — set this from your statements." },
    { key: "SBLI", kind: "bd", days: 5, basis: "draft", src: "default", note: "Not published — set this from your statements." },
    { key: "F&G", kind: "bd", days: 5, basis: "draft", src: "default", note: "Not published — set this from your statements." }
  ];
  var DEFAULT = { key: "", kind: "bd", days: 3, basis: "draft", src: "default", note: "Carrier not recognized — 3 business days assumed." };

  function parse(s) { var p = String(s || "").split("-"); return p.length < 3 ? null : new Date(+p[0], +p[1] - 1, +p[2]); }
  function fmt(dt) { return dt.getFullYear() + "-" + String(dt.getMonth() + 1).padStart(2, "0") + "-" + String(dt.getDate()).padStart(2, "0"); }
  function today() { return fmt(new Date()); }
  function addBusinessDays(dt, n) {
    var d = new Date(dt);
    while (n > 0) { d.setDate(d.getDate() + 1); var w = d.getDay(); if (w !== 0 && w !== 6) n--; }
    return d;
  }
  function daysFrom(a, b) { return Math.round((parse(b) - parse(a)) / 86400000); }

  function ruleFor(carrier, overrides) {
    var base = null;
    if (global.HubCB) {
      var r = global.HubCB.findRule(carrier);
      if (r) base = RULES.filter(function (x) { return x.key === r.key; })[0] || null;
    }
    base = base || DEFAULT;
    var o = overrides && base.key && overrides[base.key];
    var out = { key: base.key, kind: base.kind, days: base.days, basis: base.basis, src: base.src, note: base.note, edited: false };
    if (o && o.days != null && o.days !== "") { out.days = +o.days; out.edited = true; }
    return out;
  }
  function describe(r) {
    if (r.kind === "weekly") return "Friday after the Wed–Tue settlement week";
    return r.days + " business day" + (r.days === 1 ? "" : "s") + " after " + (r.basis === "issue" ? "issue" : "the first draft");
  }

  // Expected deposit date for a deal (YYYY-MM-DD) or null.
  function expectedDate(d, overrides) {
    var start = parse(d.issuedDate || d.date);
    if (!start) return null;
    var r = ruleFor(d.carrier, overrides);
    if (r.kind === "weekly") {
      var toTue = (2 - start.getDay() + 7) % 7;        // the Tuesday that closes this settlement week
      var tue = new Date(start); tue.setDate(tue.getDate() + toTue);
      tue.setDate(tue.getDate() + (r.days || 10));     // Friday of the following week
      return fmt(tue);
    }
    return fmt(addBusinessDays(start, r.days));
  }

  function amountOf(d, state) {
    var com = +d.com || 0;
    if (!com) return { amount: 0, label: "" };
    if (global.HubCB) {
      var cr = global.HubCB.ruleFor(d.carrier, d.policy, state && state.cbRules);
      if (cr.adv > 0) return { amount: Math.round(com * Math.min(cr.adv, 12) / 12 * 100) / 100, label: cr.adv + "-month advance" };
      return { amount: Math.round(com / 12 * 100) / 100, label: "first month (as earned)" };
    }
    return { amount: com, label: "" };
  }

  var LIVE = { Issued: 1, Pending: 1, Submitted: 1 };
  // Unpaid commissions with an expected date, soonest first.
  function incoming(state) {
    var ov = (state && state.payRules) || {}, t = today();
    return ((state && state.deals) || []).filter(function (d) {
      if (d.paid || !LIVE[d.status] || !(+d.com > 0)) return false;
      return d.status === "Issued" || !!d.issuedDate;            // not-yet-issued apps only once a draft date is set
    }).map(function (d) {
      var exp = expectedDate(d, ov), a = amountOf(d, state);
      return { d: d, exp: exp, days: exp ? daysFrom(t, exp) : null, amount: a.amount, amountLabel: a.label,
               rule: ruleFor(d.carrier, ov), issued: d.status === "Issued" };
    }).filter(function (x) { return x.exp; })
      .sort(function (a, b) { return a.exp < b.exp ? -1 : a.exp > b.exp ? 1 : 0; });
  }
  function summary(state) {
    var rows = incoming(state), s = { late: 0, lateN: 0, week: 0, weekN: 0 };
    rows.forEach(function (x) {
      if (!x.issued) return;
      if (x.days < 0) { s.late += x.amount; s.lateN++; }
      else if (x.days <= 7) { s.week += x.amount; s.weekN++; }
    });
    return s;
  }

  global.HubPay = { RULES: RULES, DEFAULT: DEFAULT, ruleFor: ruleFor, describe: describe, expectedDate: expectedDate,
                    amountOf: amountOf, incoming: incoming, summary: summary, today: today };
})(window);
