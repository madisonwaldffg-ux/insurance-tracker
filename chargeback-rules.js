/* ===========================================================================
   chargeback-rules.js -- carrier advance & chargeback rules, plus the math the
   Chargebacks view (pnl.html#chargebacks) and the Dashboard share.

   Commission on a deal (d.com) is the full first-year commission. Carriers that
   advance pay `adv` months of it up front (9 months = 75%). If the policy lapses
   inside the chargeback window, the unearned part of that advance comes back:
     lapse: [[fromMonth, toMonth, pct | "pro"], ...]  by months paid
       "pro" = pro-rata: advance x (adv - monthsPaid) / adv
   death: same shape, by months in force (informational unless entered).

   src: "guide"   -- from the carrier guide in your project / uploads
        "web"     -- from published agent material (may be out of date)
        "default" -- typical industry terms; the carrier didn't publish them
   Every carrier's terms ultimately come from YOUR contract / IMO agreement,
   so each row is editable in the Chargebacks view (saved per account).
   =========================================================================== */
(function (global) {
  "use strict";

  var PRO = "pro";
  var RULES = [
    { key: "CICA Life", aliases: ["cica", "citizens"], adv: 6,
      lapse: [[0, 3, 100], [3, 6, PRO]], death: [[0, 3, 100], [3, 6, PRO]],
      deathNote: "Death in the first 2 years with premium refunded (Guaranteed Issue): 100% chargeback.",
      gi: { death: [[0, 24, 100]] },
      note: "Advance = 6 months of premium on EFT/ACH policies. Months 1–3: 100% of the advance; months 4–6: pro-rata. Charged against your next advance, or added to your debit balance.",
      src: "guide", srcName: "CICA Life Agent Guide (May 2026)" },
    { key: "United Home Life", aliases: ["uhl", "united home"], adv: 12,
      lapse: [[0, 12, PRO]], death: [],
      gi: { death: [[0, 12, 100], [12, 24, 50]] }, graded: { death: [[0, 12, 100]] },
      deathNote: "Guaranteed Issue: 100% if death in year 1, 50% in year 2. Graded (Whole Life Series): 100% in year 1. No chargeback for accidental death.",
      note: "Annualized first-year commission paid daily. Unearned annualized commission comes back pro-rata if the policy lapses in year 1.",
      src: "guide", srcName: "UHL Agent Guide" },
    { key: "Corebridge Financial", aliases: ["corebridge", "aig", "american general", "simplinow", "agl"], adv: 6,
      lapse: [[0, 6, 100], [6, 12, 0]], death: [],
      graded: { lapse: [[0, 6, 100], [6, 12, 25]], death: [[0, 12, 100], [12, 24, 50]] },
      deathNote: "SimpliNow Legacy (graded) and GIWL: 100% if death in year 1, 50% in year 2. Level (Legacy Max): none.",
      note: "SimpliNow Legacy: level plan 100% if it lapses in months 1–6, nothing after; graded plan 100% months 1–6, then 25% through month 12. ~50% advance.",
      src: "guide", srcName: "SimpliNow Legacy agent guide (AGLC201192)" },
    { key: "American-Amicable", aliases: ["american amicable", "amam", "amicable", "occidental", "dignity", "senior choice"], adv: 9,
      lapse: [[0, 9, PRO]], death: [[0, 9, PRO]],
      note: "9-month advance for qualifying agents. Lapse or death: keep what's earned, unearned months come back pro-rata. Occidental Life (same company) follows the same terms.",
      src: "web", srcName: "The DIG Agency carrier review" },
    { key: "Mutual of Omaha", aliases: ["moo", "omaha", "living promise", "united of omaha"], adv: 9,
      lapse: [[0, 9, PRO]], death: [[0, 9, PRO]],
      note: "9-month advance for qualifying agents. Lapse or death: unearned months charged back pro-rata.",
      src: "web", srcName: "The DIG Agency carrier review" },
    { key: "Transamerica", aliases: ["trans america", "immediate solution", "easy solution", "trendsetter"], adv: 9,
      lapse: [[0, 9, PRO]], death: [[0, 9, PRO]],
      note: "9-month advance for qualifying agents (Direct Express is paid as earned). Lapse or death: unearned months charged back pro-rata.",
      src: "web", srcName: "The DIG Agency carrier review" },
    { key: "Royal Neighbors", aliases: ["royal neighbors", "rna", "ensured legacy", "jet term"], adv: 9,
      lapse: [[0, 9, PRO]], death: [],
      note: "Advance = monthly premium × commission rate × advance months (per your Annualized Financial Agreement), monthly EFT only. Unrecovered advance is charged back on lapse; a returned first draft voids the certificate after 21 days.",
      src: "web", srcName: "RNA Field Agent Commission Guide" },
    { key: "American Home Life (AHL)", aliases: ["american home life", "ahl", "patriot"], adv: 9,
      lapse: [[0, 1, 100], [1, 9, PRO]], death: [],
      deathNote: "Rescinded for misrepresentation inside the 2-year contestable period: full chargeback.",
      note: "Cancelled / not taken in the first 30 days: 100% chargeback. After 30 days: pro-rata. Two rejected EFT drafts turn the advance into a chargeback and the policy into paid-as-earned. A negative balance holds all commission until new business clears it.",
      src: "web", srcName: "AHL Final Expense Administrative & Sales Handbook" },
    { key: "F&G", aliases: ["f&g", "fidelity", "fg ", "pathsetter", "everlast"], adv: 9,
      lapse: [[0, 12, PRO]], death: [[0, 12, 100]],
      note: "Death in policy year 1: 100% chargeback (F&G bulletin). Lapse terms come from your contract — typical is pro-rata through year 1.",
      src: "web", srcName: "F&G death-chargeback bulletin (via agent forum)" },
    { key: "Liberty Bankers", aliases: ["liberty bankers", "lbl", "simpl"], adv: 9,
      lapse: [[0, 9, PRO]], death: [],
      note: "Pays on first draft; the commission reserve hold-back was eliminated. Advance length is set by your contract — typical shown.",
      src: "default", srcName: "Typical final expense terms" },
    { key: "Foresters", aliases: ["foresters", "planright", "strong foundation", "smart ul"], adv: 9,
      lapse: [[0, 12, PRO]], death: [],
      note: "Pays on first draft. Advance caps are set by your FMO contract — typical shown.",
      src: "default", srcName: "Typical terms" },
    { key: "Kansas City Life", aliases: ["kansas city", "kcl"], adv: 9,
      lapse: [[0, 12, PRO]], death: [],
      note: "Not published — typical term-life terms shown. Check your contract.", src: "default", srcName: "Typical terms" },
    { key: "SBLI", aliases: ["sbli", "savings bank"], adv: 9,
      lapse: [[0, 12, PRO]], death: [],
      note: "Not published — typical term-life terms shown. Check your contract.", src: "default", srcName: "Typical terms" }
  ];
  var DEFAULT = { key: "", adv: 9, lapse: [[0, 9, PRO]], death: [], note: "Carrier not recognized — typical 9-month advance with pro-rata chargeback.", src: "default", srcName: "Typical terms" };

  function norm(s) { return String(s || "").toLowerCase().replace(/[^a-z0-9&]+/g, " ").trim(); }
  function findRule(carrier) {
    var n = " " + norm(carrier) + " ";
    if (!n.trim()) return null;
    for (var i = 0; i < RULES.length; i++) {
      var r = RULES[i];
      if (n.indexOf(" " + norm(r.key) + " ") !== -1) return r;
      for (var j = 0; j < r.aliases.length; j++) if (n.indexOf(norm(r.aliases[j])) !== -1) return r;
    }
    return null;
  }

  // Effective rule for a deal: carrier base + product variant + the account's overrides.
  function ruleFor(carrier, product, overrides) {
    var base = findRule(carrier) || DEFAULT;
    var r = { key: base.key, adv: base.adv, lapse: base.lapse, death: base.death || [], note: base.note, deathNote: base.deathNote || "",
              src: base.src, srcName: base.srcName, variant: "" };
    var p = norm(product);
    var isGI = /guarant|\bgi\b|giwl/.test(p);
    var isLevel = /\bmax\b|level|immediate|preferred|standard/.test(p) && !/graded/.test(p);
    var isGraded = /graded|modified|\bmwl\b|easy solution|legacy|whole life series/.test(p) && !isLevel;
    var v = isGI && base.gi ? base.gi : (isGI || isGraded) && base.graded ? base.graded : null;
    if (v) { r.lapse = v.lapse || r.lapse; r.death = v.death || r.death; r.variant = isGI ? "Guaranteed issue" : "Graded"; }
    if (isGI && base.gi && !base.gi.lapse && base.graded && base.graded.lapse) r.lapse = base.graded.lapse;
    var o = overrides && base.key && overrides[base.key];
    if (o) {
      if (o.adv != null && o.adv !== "") r.adv = +o.adv;
      if (o.full != null && o.full !== "" || o.win != null && o.win !== "") {
        var full = o.full != null && o.full !== "" ? +o.full : fullMonths(r.lapse);
        var win = o.win != null && o.win !== "" ? +o.win : windowMonths(r);
        r.lapse = (full > 0 ? [[0, full, 100]] : []).concat(win > full ? [[full, win, PRO]] : []);
      }
      r.edited = true;
    }
    return r;
  }
  function fullMonths(lapse) { var f = 0; (lapse || []).forEach(function (t) { if (t[2] === 100 && t[0] === f) f = t[1]; }); return f; }
  function windowMonths(r) {
    var w = 0; (r.lapse || []).forEach(function (t) { if (t[2] !== 0 && t[1] > w) w = t[1]; }); return w;
  }

  // Whole months between two YYYY-MM-DD dates (how many monthly drafts have cleared).
  function monthsBetween(a, b) {
    var p = String(a || "").split("-"), q = String(b || "").split("-");
    if (p.length < 3 || q.length < 3) return null;
    var m = (+q[0] - +p[0]) * 12 + (+q[1] - +p[1]);
    if (+q[2] < +p[2]) m--;
    return Math.max(0, m);
  }
  function addMonths(s, n) {
    var p = String(s || "").split("-");
    if (p.length < 3) return null;
    var dt = new Date(+p[0], +p[1] - 1 + n, +p[2]);
    return dt.getFullYear() + "-" + String(dt.getMonth() + 1).padStart(2, "0") + "-" + String(dt.getDate()).padStart(2, "0");
  }
  function today() {
    var d = new Date();
    return d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0") + "-" + String(d.getDate()).padStart(2, "0");
  }

  function advanceOf(d, r) { var com = +d.com || 0; return r.adv > 0 ? com * Math.min(r.adv, 12) / 12 : 0; }
  // % of the advance a schedule takes back at month m (null = outside the window)
  function pctAt(sched, m, adv) {
    for (var i = 0; i < (sched || []).length; i++) {
      var t = sched[i];
      if (m >= t[0] && m < t[1]) return t[2] === PRO ? (adv > 0 ? Math.max(0, (adv - m) / adv * 100) : 0) : t[2];
    }
    return null;
  }

  // What a lapse on `onDate` would cost on this deal.
  function exposure(d, overrides, onDate) {
    var r = ruleFor(d.carrier, d.policy, overrides);
    var start = d.issuedDate || d.date;
    var m = monthsBetween(start, onDate || today());
    var adv = advanceOf(d, r);
    var pct = m == null ? null : pctAt(r.lapse, m, r.adv);
    var win = windowMonths(r);
    return {
      rule: r, months: m, advance: adv, pct: pct || 0,
      amount: pct ? Math.round(adv * pct) / 100 : 0,
      safeOn: start ? addMonths(start, win) : null, windowMonths: win
    };
  }

  // Issued policies still inside their chargeback window, most pressing first.
  function atRisk(state) {
    var ov = (state && state.cbRules) || {}, t = today();
    var logged = {};
    ((state && state.chargebacks) || []).forEach(function (c) { if (c.dealId) logged[c.dealId] = true; });
    return ((state && state.deals) || []).filter(function (d) {
      return d.status === "Issued" && (+d.com || 0) > 0 && !logged[d.id];
    }).map(function (d) {
      var e = exposure(d, ov, t);
      e.d = d;
      e.daysLeft = e.safeOn ? Math.round((new Date(e.safeOn) - new Date(t)) / 86400000) : null;
      return e;
    }).filter(function (e) { return e.amount > 0 && e.daysLeft != null && e.daysLeft > 0; })
      .sort(function (a, b) { return b.amount - a.amount || a.daysLeft - b.daysLeft; });
  }

  // Balances per carrier from the chargeback log.
  function balances(state) {
    var by = {};
    ((state && state.chargebacks) || []).forEach(function (c) {
      var k = c.carrier || "Other";
      var b = by[k] = by[k] || { carrier: k, charged: 0, repaid: 0, n: 0 };
      b.charged += +c.amount || 0; b.n++;
      (c.payments || []).forEach(function (p) { b.repaid += +p.amount || 0; });
    });
    return Object.keys(by).map(function (k) { var b = by[k]; b.owed = Math.max(0, Math.round((b.charged - b.repaid) * 100) / 100); return b; })
      .sort(function (a, b) { return b.owed - a.owed; });
  }
  function totalOwed(state) { return balances(state).reduce(function (t, b) { return t + b.owed; }, 0); }
  function repaidOf(c) { return (c.payments || []).reduce(function (t, p) { return t + (+p.amount || 0); }, 0); }

  // Commission kept on a charged-back deal (advance received minus what came back).
  function keptCom(d, state) {
    if (d.status !== "Chargeback") return 0;
    var c = ((state && state.chargebacks) || []).filter(function (x) { return x.dealId === d.id; })[0];
    if (!c) return 0;
    if (c.kept != null && c.kept !== "") return Math.max(0, +c.kept || 0);
    var r = ruleFor(d.carrier, d.policy, state.cbRules);
    return Math.max(0, Math.round((advanceOf(d, r) - (+c.amount || 0)) * 100) / 100);
  }

  global.HubCB = {
    RULES: RULES, DEFAULT: DEFAULT, PRO: PRO,
    findRule: findRule, ruleFor: ruleFor, fullMonths: fullMonths, windowMonths: windowMonths,
    monthsBetween: monthsBetween, addMonths: addMonths, today: today,
    advanceOf: advanceOf, exposure: exposure, atRisk: atRisk, balances: balances, totalOwed: totalOwed,
    repaidOf: repaidOf, keptCom: keptCom
  };
})(window);
