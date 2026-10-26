/* ===========================================================================
   hub-chargebacks-ui.js -- the Chargebacks view (pnl.html#chargebacks).

   Data lives in the same synced Deals & PNL state:
     state.chargebacks = [{ id, dealId, carrier, client, product, date, reason,
                            amount, notes, est, payments: [{ id, date, amount, note }] }]
     state.cbRules     = { "<carrier key>": { adv, full, win } }   // your contract terms
   Rules and math: chargeback-rules.js (window.HubCB).
   =========================================================================== */
(function (global) {
  "use strict";
  var CB = global.HubCB;
  var api = null;              // set by pnl.html: { state(), save(), render(), gotoDeal(id) }
  var showAllRisk = false, editingId = null, payFor = null, rulesOpen = false;

  function $(id) { return document.getElementById(id); }
  function esc(s) { return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]; }); }
  function money(n) { return "$" + (Math.round((+n || 0) * 100) / 100).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 }); }
  function uid() { return Date.now().toString(36) + Math.random().toString(36).slice(2, 7); }
  function fmtDay(s) {
    var p = String(s || "").split("-");
    if (p.length < 3) return "—";
    return ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"][+p[1] - 1] + " " + (+p[2]) + ", " + p[0];
  }
  function S() { var s = api.state(); s.chargebacks = s.chargebacks || []; s.cbRules = s.cbRules || {}; return s; }
  function dealById(id) { return S().deals.filter(function (d) { return d.id === id; })[0]; }
  var REASONS = ["Lapsed — missed payment", "Not taken / cancelled", "Death", "Rescinded", "Replaced", "Other"];
  var SRC = { guide: ["Your carrier guide", "good"], web: ["Published agent material", "warn"], default: ["Typical — check your contract", "muted"] };

  function toast(msg) {
    var t = $("cbToast");
    if (!t) { t = document.createElement("div"); t.id = "cbToast"; t.className = "cb-toast"; document.body.appendChild(t); }
    t.innerHTML = msg; t.classList.add("show");
    clearTimeout(t._h); t._h = setTimeout(function () { t.classList.remove("show"); }, 5200);
  }

  /* ---------------- render ---------------- */
  function render() {
    var root = $("cbRoot"); if (!root || !api) return;
    var s = S();
    var bal = CB.balances(s), owed = bal.reduce(function (t, b) { return t + b.owed; }, 0);
    var repaid = bal.reduce(function (t, b) { return t + b.repaid; }, 0);
    var risk = CB.atRisk(s), riskAmt = risk.reduce(function (t, e) { return t + e.amount; }, 0);
    var soon = risk.filter(function (e) { return e.daysLeft <= 30; }).length;

    var html = '<div class="cb-head"><h2>Chargebacks &amp; carrier debt</h2>' +
      '<span class="hint">what you owe carriers, and which policies could still charge back</span></div>';

    html += '<div class="tiles cb-tiles">' +
      tile("Owed to carriers", money(owed), bal.filter(function (b) { return b.owed > 0; }).length + " carrier" + (bal.filter(function (b) { return b.owed > 0; }).length === 1 ? "" : "s") + " with a balance", owed > 0 ? "profit-neg" : "") +
      tile("At risk if they lapsed today", money(riskAmt), risk.length + " polic" + (risk.length === 1 ? "y" : "ies") + " still in a chargeback window", "") +
      tile("Leaving the window in 30 days", String(soon), soon ? "keep these drafting" : "none this month", "") +
      tile("Repaid so far", money(repaid), s.chargebacks.length + " chargeback" + (s.chargebacks.length === 1 ? "" : "s") + " logged", "") +
      "</div>";

    // ---- what you owe
    html += '<section class="cb-sec"><h3>What you owe, by carrier</h3>';
    if (!bal.length) html += '<p class="empty-inline">No chargebacks logged. When a policy charges back, set the deal\'s status to <b>Chargeback</b> or log it below.</p>';
    else {
      html += '<div class="table-scroll"><table class="cb-table"><thead><tr><th>Carrier</th><th class="num">Charged back</th><th class="num">Repaid</th><th class="num">Owed</th><th></th></tr></thead><tbody>' +
        bal.map(function (b) {
          return "<tr><td>" + esc(b.carrier) + ' <span class="muted">(' + b.n + ")</span></td>" +
            '<td class="num">' + money(b.charged) + '</td><td class="num">' + money(b.repaid) + '</td><td class="num ' + (b.owed > 0 ? "neg" : "") + '"><b>' + money(b.owed) + "</b></td>" +
            '<td class="cb-act">' + (b.owed > 0 ? '<button type="button" class="btn secondary small" data-pay-carrier="' + esc(b.carrier) + '">Record repayment</button>' : '<span class="muted">Paid off</span>') + "</td></tr>" +
            (payFor === "c:" + b.carrier ? '<tr class="cb-pay-row"><td colspan="5">' + payForm("c:" + b.carrier, b.owed) + "</td></tr>" : "");
        }).join("") +
        '</tbody><tfoot><tr><td>Total</td><td class="num">' + money(bal.reduce(function (t, b) { return t + b.charged; }, 0)) + '</td><td class="num">' + money(repaid) + '</td><td class="num"><b>' + money(owed) + "</b></td><td></td></tr></tfoot></table></div>" +
        '<p class="cb-fine">Repayments come out of later commissions or a direct payment. A carrier-level repayment is applied to that carrier\'s oldest chargebacks first.</p>';
    }
    html += "</section>";

    // ---- at risk
    html += '<section class="cb-sec"><div class="cb-sec-h"><h3>Policies that could still charge back</h3>' +
      '<span class="hint">issued policies inside their carrier\'s window — biggest exposure first</span></div>';
    if (!risk.length) html += '<p class="empty-inline">Nothing at risk right now. Issued policies show here until they\'re past their carrier\'s chargeback window.</p>';
    else {
      var list = showAllRisk ? risk : risk.slice(0, 12);
      html += '<div class="table-scroll"><table class="cb-table cb-risk"><thead><tr><th>Client</th><th>Carrier / product</th><th>Effective</th><th class="num">Months paid</th><th class="num">If it lapsed today</th><th>Out of the window</th><th></th></tr></thead><tbody>' +
        list.map(function (e) {
          var d = e.d, urgent = e.months != null && e.months < 3;
          var hasTask = (d.tasks || []).some(function (x) { return !x.done && /chargeback/i.test(x.text); });
          return "<tr" + (urgent ? ' class="cb-hot"' : "") + '><td><a href="#" data-goto-deal="' + d.id + '">' + esc(d.client || "—") + "</a></td>" +
            "<td>" + esc(d.carrier || "") + (d.policy ? ' <span class="muted">· ' + esc(d.policy) + "</span>" : "") + "</td>" +
            "<td>" + fmtDay(d.issuedDate || d.date) + '</td><td class="num">' + e.months + '</td>' +
            '<td class="num"><b>' + money(e.amount) + '</b><span class="cb-sub">' + Math.round(e.pct) + "% of " + money(e.advance) + " advance</span></td>" +
            "<td>" + fmtDay(e.safeOn) + '<span class="cb-sub">in ' + e.daysLeft + " day" + (e.daysLeft === 1 ? "" : "s") + "</span></td>" +
            '<td class="cb-act">' + (hasTask ? '<span class="muted">Save call on to-dos</span>' : '<button type="button" class="btn secondary small" data-save-call="' + d.id + '" data-amt="' + e.amount + '">Save call</button>') +
            ' <button type="button" class="btn secondary small" data-cb-deal="' + d.id + '">Charged back</button></td></tr>';
        }).join("") + "</tbody></table></div>" +
        (risk.length > 12 ? '<button type="button" class="btn secondary small" id="cbRiskMore">' + (showAllRisk ? "Show fewer" : "Show all " + risk.length) + "</button>" : "") +
        '<p class="cb-fine">"If it lapsed today" is the unearned part of the advance, based on the deal\'s commission (already the 9-month advance; carriers that advance 6 or 12 months are scaled to match), then the carrier\'s schedule. It uses the effective date (or the submitted date if there isn\'t one).</p>';
    }
    html += "</section>";

    // ---- log
    html += '<section class="cb-sec"><div class="cb-sec-h"><h3>Chargeback log</h3></div>' + logForm();
    var log = s.chargebacks.slice().sort(function (a, b) { return a.date < b.date ? 1 : a.date > b.date ? -1 : 0; });
    if (log.length) {
      html += '<div class="table-scroll"><table class="cb-table"><thead><tr><th>Date</th><th>Client</th><th>Carrier</th><th>Reason</th><th class="num">Amount</th><th class="num">Repaid</th><th class="num">Owed</th><th></th></tr></thead><tbody>' +
        log.map(function (c) {
          var rp = CB.repaidOf(c), left = Math.max(0, (+c.amount || 0) - rp);
          return "<tr><td>" + fmtDay(c.date) + "</td><td>" + (c.dealId && dealById(c.dealId) ? '<a href="#" data-goto-deal="' + c.dealId + '">' + esc(c.client) + "</a>" : esc(c.client || "—")) + "</td>" +
            "<td>" + esc(c.carrier) + (c.product ? ' <span class="muted">· ' + esc(c.product) + "</span>" : "") + "</td><td>" + esc(c.reason || "") + (c.notes ? ' <span class="muted" title="' + esc(c.notes) + '">· ' + esc(c.notes.length > 40 ? c.notes.slice(0, 40) + "…" : c.notes) + "</span>" : "") + "</td>" +
            '<td class="num">' + money(c.amount) + (c.est ? ' <span class="cb-est" title="Estimated from the carrier rules — edit to the amount on your statement">est.</span>' : "") + '</td><td class="num">' + money(rp) + '</td><td class="num ' + (left > 0 ? "neg" : "") + '">' + money(left) + "</td>" +
            '<td class="cb-act">' + (left > 0 ? '<button type="button" class="btn secondary small" data-pay-entry="' + c.id + '">Repay</button> ' : "") +
            '<button type="button" class="btn secondary small" data-edit-cb="' + c.id + '">Edit</button> <button type="button" class="mini-x" data-del-cb="' + c.id + '" title="Delete">&times;</button></td></tr>' +
            (payFor === "e:" + c.id ? '<tr class="cb-pay-row"><td colspan="8">' + payForm("e:" + c.id, left) + "</td></tr>" : "");
        }).join("") + "</tbody></table></div>";
    }
    html += "</section>";

    // ---- rules
    html += '<details class="cb-sec cb-rules"' + (rulesOpen ? " open" : "") + '><summary><h3>Carrier advance &amp; chargeback rules</h3><span class="hint">researched defaults — edit to match your contract</span></summary>' +
      '<div class="table-scroll"><table class="cb-table cb-rule-table"><thead><tr><th>Carrier</th><th>Advance</th><th>100% back if it lapses within</th><th>Chargeback window</th><th>Death</th><th>Source</th></tr></thead><tbody>' +
      CB.RULES.map(function (r) {
        var eff = CB.ruleFor(r.key, "", s.cbRules), o = s.cbRules[r.key] || {};
        var src = SRC[r.src] || SRC.default;
        return '<tr><td><b>' + esc(r.key) + "</b>" + (o.adv != null || o.full != null || o.win != null ? ' <span class="cb-est">edited</span>' : "") + '<div class="cb-note">' + esc(r.note) + "</div></td>" +
          '<td><input type="number" min="0" max="12" step="1" class="cb-in" data-rule="' + esc(r.key) + '" data-f="adv" value="' + eff.adv + '"> mo <span class="muted">(' + Math.round(Math.min(eff.adv, 12) / CB.COM_MONTHS * 100) + "% of deal commission)</span></td>" +
          '<td><input type="number" min="0" max="24" step="1" class="cb-in" data-rule="' + esc(r.key) + '" data-f="full" value="' + CB.fullMonths(eff.lapse) + '"> mo</td>' +
          '<td><input type="number" min="0" max="36" step="1" class="cb-in" data-rule="' + esc(r.key) + '" data-f="win" value="' + CB.windowMonths(eff) + '"> mo</td>' +
          '<td class="cb-note">' + esc(r.deathNote || (r.death && r.death.length ? "Pro-rata, like a lapse" : "Not published")) + "</td>" +
          '<td><span class="cb-src ' + src[1] + '" title="' + esc(r.srcName) + '">' + src[0] + "</span>" +
          (o.adv != null || o.full != null || o.win != null ? '<br><button type="button" class="linkbtn" data-reset-rule="' + esc(r.key) + '">Reset</button>' : "") + "</td></tr>";
      }).join("") + "</tbody></table></div>" +
      '<p class="cb-fine">Product-specific rules (graded and guaranteed issue at CICA, UHL and Corebridge) are applied automatically from the product name on the deal. Editing the months here switches that carrier to: 100% back inside the first window, pro-rata after that until the chargeback window ends.</p></details>';

    root.innerHTML = html;
  }
  function tile(label, value, sub, cls) {
    return '<div class="tile ' + cls + '"><div class="t-label">' + label + '</div><div class="t-value">' + value + '</div><div class="t-sub">' + sub + "</div></div>";
  }
  function payForm(key, max) {
    return '<form class="cb-pay" data-pay-form="' + esc(key) + '"><label>Amount<input type="number" step="0.01" min="0.01" name="amt" value="' + (Math.round(max * 100) / 100) + '" required></label>' +
      '<label>Date<input type="date" name="date" value="' + CB.today() + '" required></label>' +
      '<label class="grow">How<select name="note"><option>Taken from commissions</option><option>Paid directly</option><option>Written off / adjusted by carrier</option></select></label>' +
      '<button type="submit" class="btn small">Save repayment</button> <button type="button" class="btn secondary small" data-pay-cancel>Cancel</button></form>';
  }
  function logForm() {
    var s = S(), c = editingId ? s.chargebacks.filter(function (x) { return x.id === editingId; })[0] : null;
    var deals = s.deals.filter(function (d) { return d.status === "Issued" || d.status === "Chargeback" || (c && d.id === c.dealId); })
      .sort(function (a, b) { return (a.client || "").localeCompare(b.client || ""); });
    var sel = c ? c.dealId || "" : "";
    return '<form class="cb-form" id="cbForm">' +
      '<label class="grow">Deal<select id="cb-deal"><option value="">— not in my deals —</option>' +
      deals.map(function (d) { return '<option value="' + d.id + '"' + (sel === d.id ? " selected" : "") + ">" + esc((d.client || "—") + " · " + (d.carrier || "") + (d.policy ? " " + d.policy : "") + (d.status === "Chargeback" ? " (chargeback)" : "")) + "</option>"; }).join("") +
      "</select></label>" +
      '<label id="cb-manual"' + (sel ? ' style="display:none"' : "") + '>Client<input type="text" id="cb-client" value="' + esc(c && !c.dealId ? c.client : "") + '"></label>' +
      '<label id="cb-manual2"' + (sel ? ' style="display:none"' : "") + '>Carrier<input type="text" id="cb-carrier" list="carrierList" value="' + esc(c && !c.dealId ? c.carrier : "") + '"></label>' +
      '<label>Date<input type="date" id="cb-date" value="' + (c ? c.date : CB.today()) + '" required></label>' +
      '<label>Reason<select id="cb-reason">' + REASONS.map(function (r) { return "<option" + (c && c.reason === r ? " selected" : "") + ">" + r + "</option>"; }).join("") + "</select></label>" +
      '<label>Amount ($)<input type="number" step="0.01" min="0" id="cb-amount" value="' + (c ? c.amount : "") + '" required placeholder="0.00"></label>' +
      '<label class="grow">Notes<input type="text" id="cb-notes" value="' + esc(c ? c.notes || "" : "") + '" placeholder="e.g. 2 failed drafts, client switched banks"></label>' +
      '<button type="submit" class="btn">' + (c ? "Save changes" : "Log chargeback") + "</button>" + (c ? ' <button type="button" class="btn secondary" id="cbCancelEdit">Cancel</button>' : "") +
      '<div class="cb-estline" id="cbEst"></div></form>';
  }
  function estimateIntoForm(force) {
    var id = $("cb-deal") && $("cb-deal").value, d = id && dealById(id);
    var amt = $("cb-amount"), out = $("cbEst");
    if (!amt || !out) return;
    $("cb-manual").style.display = id ? "none" : ""; $("cb-manual2").style.display = id ? "none" : "";
    if (!d) { out.textContent = ""; return; }
    var e = CB.exposure(d, S().cbRules, $("cb-date").value || CB.today());
    var adv = e.advance;
    out.innerHTML = "Estimate for " + esc(e.rule.key || d.carrier) + ": " + e.months + " month" + (e.months === 1 ? "" : "s") + " in force → <b>" + money(e.amount) + "</b>" +
      (adv ? " (" + Math.round(e.pct) + "% of a " + money(adv) + " advance)" : " (paid as earned — usually nothing to charge back)") + ". Use the amount on your carrier statement if it differs.";
    if (force || !amt.value) amt.value = e.amount ? e.amount.toFixed(2) : adv ? adv.toFixed(2) : "";
  }

  /* ---------------- actions ---------------- */
  function logFromDeal(d, opts) {
    var s = S(); opts = opts || {};
    if (s.chargebacks.some(function (c) { return c.dealId === d.id; })) return null;
    var date = opts.date || CB.today();
    var e = CB.exposure(d, s.cbRules, date);
    var c = { id: uid(), dealId: d.id, carrier: (e.rule.key || d.carrier || "Other"), client: d.client || "", product: d.policy || "", date: date,
              reason: opts.reason || REASONS[0], amount: opts.amount != null ? opts.amount : (e.amount || e.advance || 0), notes: opts.notes || "",
              est: opts.amount == null, auto: !!opts.auto, payments: [] };
    s.chargebacks.push(c);
    return c;
  }

  // Keep the log in step with the Deals page, however a deal's status changed
  // (deal form, CSV import, another device, or deals marked before this tab existed):
  //   deal is Chargeback, no entry      -> log an estimated entry
  //   linked deal edited                -> refresh client / carrier / product (and the estimate)
  //   deal no longer Chargeback/deleted -> drop the entry, unless repayments were already recorded
  // Returns true when anything changed (the caller saves).
  function sync() {
    if (!api) return false;
    var s = S(), changed = false, byId = {};
    s.deals.forEach(function (d) { byId[d.id] = d; });
    var linked = {};
    s.chargebacks = s.chargebacks.filter(function (c) {
      if (!c.dealId) return true;
      var d = byId[c.dealId];
      if (!d || d.status !== "Chargeback") {
        if (!CB.repaidOf(c)) { changed = true; return false; }        // nothing repaid yet: just remove it
        if (!d && !c.dealGone) { c.dealGone = true; c.dealId = null; changed = true; }
        return true;
      }
      linked[d.id] = true;
      var key = CB.ruleFor(d.carrier, d.policy, s.cbRules).key || d.carrier || "Other";
      if (c.client !== (d.client || "") || c.product !== (d.policy || "") || c.carrier !== key) {
        c.client = d.client || ""; c.product = d.policy || ""; c.carrier = key; changed = true;
      }
      if (c.est && !CB.repaidOf(c)) {
        var e = CB.exposure(d, s.cbRules, c.date), amt = e.amount || e.advance || 0;
        if (Math.abs(amt - (+c.amount || 0)) > 0.004) { c.amount = amt; changed = true; }
      }
      return true;
    });
    s.deals.forEach(function (d) {
      if (d.status === "Chargeback" && !linked[d.id]) { logFromDeal(d, { date: d.cbAt || CB.today(), auto: true }); changed = true; }
    });
    return changed;
  }
  // Called by pnl.html when a deal's status is changed to Chargeback.
  function autoLog(dealId) {
    var d = dealById(dealId); if (!d) return;
    var c = logFromDeal(d, { date: d.cbAt || CB.today(), auto: true });
    if (c) { api.save(); toast("Logged a <b>" + money(c.amount) + "</b> chargeback for " + esc(c.client || "this client") + " (estimated). <a href=\"pnl.html#chargebacks\">Review it in Chargebacks</a>"); }
  }
  function applyPayment(key, amount, date, note) {
    var s = S(), left = amount;
    var entries = key.slice(0, 2) === "e:" ? s.chargebacks.filter(function (c) { return c.id === key.slice(2); })
      : s.chargebacks.filter(function (c) { return c.carrier === key.slice(2); }).sort(function (a, b) { return a.date < b.date ? -1 : 1; });
    entries.forEach(function (c, i) {
      if (left <= 0) return;
      var open = Math.max(0, (+c.amount || 0) - CB.repaidOf(c));
      var take = i === entries.length - 1 ? left : Math.min(open, left);
      if (take <= 0) return;
      c.payments = (c.payments || []).concat([{ id: uid(), date: date, amount: Math.round(take * 100) / 100, note: note }]);
      left -= take;
    });
  }

  document.addEventListener("click", function (ev) {
    var t = ev.target, b;
    if (!api || !t.closest || !t.closest("#cbRoot")) return;
    if ((b = t.closest("[data-goto-deal]"))) { ev.preventDefault(); api.gotoDeal(b.getAttribute("data-goto-deal")); return; }
    if ((b = t.closest("[data-pay-carrier]"))) { payFor = "c:" + b.getAttribute("data-pay-carrier"); render(); return; }
    if ((b = t.closest("[data-pay-entry]"))) { payFor = "e:" + b.getAttribute("data-pay-entry"); render(); return; }
    if (t.closest("[data-pay-cancel]")) { payFor = null; render(); return; }
    if (t.id === "cbRiskMore") { showAllRisk = !showAllRisk; render(); return; }
    if (t.id === "cbCancelEdit") { editingId = null; render(); return; }
    if ((b = t.closest("[data-save-call]"))) {
      var d = dealById(b.getAttribute("data-save-call"));
      if (d) {
        d.tasks = (d.tasks || []).concat([{ id: uid(), text: "Chargeback risk (" + money(+b.getAttribute("data-amt")) + "): confirm the draft cleared — call to save the policy if it didn't", done: false, due: CB.today() }]);
        api.save(); api.render(); toast("Added a save call to " + esc(d.client || "the client") + "'s to-dos, due today.");
      }
      return;
    }
    if ((b = t.closest("[data-cb-deal]"))) {
      editingId = null; render();
      $("cb-deal").value = b.getAttribute("data-cb-deal"); estimateIntoForm(true);
      $("cbForm").scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }
    if ((b = t.closest("[data-edit-cb]"))) { editingId = b.getAttribute("data-edit-cb"); render(); $("cbForm").scrollIntoView({ behavior: "smooth", block: "center" }); return; }
    if ((b = t.closest("[data-del-cb]"))) {
      var s = S(), id = b.getAttribute("data-del-cb"), c = s.chargebacks.filter(function (x) { return x.id === id; })[0];
      if (c && confirm("Delete this " + money(c.amount) + " chargeback for " + (c.client || "this client") + "? Repayments recorded against it are deleted too.")) {
        s.chargebacks = s.chargebacks.filter(function (x) { return x.id !== id; }); api.save(); api.render();
      }
      return;
    }
    if ((b = t.closest("[data-reset-rule]"))) { delete S().cbRules[b.getAttribute("data-reset-rule")]; api.save(); api.render(); return; }
  });
  document.addEventListener("toggle", function (ev) {
    if (ev.target.classList && ev.target.classList.contains("cb-rules")) rulesOpen = ev.target.open;
  }, true);
  document.addEventListener("change", function (ev) {
    var t = ev.target;
    if (!api || !t.closest || !t.closest("#cbRoot")) return;
    if (t.id === "cb-deal" || t.id === "cb-date") { estimateIntoForm(t.id === "cb-deal"); return; }
    if (t.classList.contains("cb-in")) {
      var s = S(), k = t.getAttribute("data-rule"), f = t.getAttribute("data-f");
      var o = s.cbRules[k] = s.cbRules[k] || {};
      var eff = CB.ruleFor(k, "", {});
      if (o.full == null && f !== "full") o.full = CB.fullMonths(eff.lapse);
      if (o.win == null && f !== "win") o.win = CB.windowMonths(eff);
      o[f] = t.value === "" ? null : +t.value;
      api.save(); api.render();
    }
  });
  document.addEventListener("submit", function (ev) {
    var f = ev.target;
    if (!api || !f.closest || !f.closest("#cbRoot")) return;
    ev.preventDefault();
    var s = S();
    if (f.id === "cbForm") {
      var dealId = $("cb-deal").value, d = dealId && dealById(dealId);
      var amount = Math.round((+$("cb-amount").value || 0) * 100) / 100;
      var fields = { date: $("cb-date").value, reason: $("cb-reason").value, amount: amount, notes: $("cb-notes").value.trim() };
      var c = editingId ? s.chargebacks.filter(function (x) { return x.id === editingId; })[0] : null;
      if (c) {
        Object.assign(c, fields, { est: false });
        if (d) { c.dealId = d.id; c.client = d.client || ""; c.carrier = CB.ruleFor(d.carrier, d.policy, s.cbRules).key || d.carrier; c.product = d.policy || ""; }
        else { c.dealId = null; c.client = $("cb-client").value.trim(); c.carrier = $("cb-carrier").value.trim() || "Other"; }
      } else if (d) {
        if (s.chargebacks.some(function (x) { return x.dealId === d.id; })) { alert("This deal already has a chargeback logged — edit that entry instead."); return; }
        c = logFromDeal(d, fields); c.est = false;
      } else {
        var carrier = $("cb-carrier").value.trim();
        if (!carrier) { alert("Pick a deal, or enter the carrier."); return; }
        var r = CB.findRule(carrier);
        s.chargebacks.push(Object.assign({ id: uid(), dealId: null, carrier: r ? r.key : carrier, client: $("cb-client").value.trim(), product: "", payments: [], est: false }, fields));
      }
      if (d && d.status !== "Chargeback") { d.status = "Chargeback"; d.cbAt = fields.date; }
      editingId = null;
      api.save(); api.render();
      toast("Chargeback saved.");
      return;
    }
    var key = f.getAttribute("data-pay-form");
    if (key) {
      var amt = +f.amt.value || 0;
      if (amt > 0) applyPayment(key, amt, f.date.value, f.note.value);
      payFor = null; api.save(); api.render();
    }
  });

  global.HubCBUI = { attach: function (a) { api = a; }, render: render, autoLog: autoLog, sync: sync };
})(window);
