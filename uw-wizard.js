/* ===========================================================================
   uw-wizard.js -- live underwriting pre-screen for the Underwriting tab.

   Rules come from uw-data.js (generated from the agency's term and final expense
   underwriting cheat sheets). For every contracted product it takes the WORST
   result across the client's answers -- conditions, build, age, state -- and
   ranks the products best-first.

   Outcomes, best to worst:
     best    level / preferred      std     standard or table-rated
     graded  graded / modified      gi      guaranteed issue only
     refer   check with the carrier decline decline / no coverage
   Nothing typed here is saved anywhere: client health details stay on screen.
   =========================================================================== */
(function (global) {
  "use strict";
  var D = global.UW_DATA;
  if (!D || !document.getElementById("uwWizard")) return;

  function $(id) { return document.getElementById(id); }
  function esc(s) { return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]; }); }

  var RANK = { best: 0, std: 1, graded: 2, gi: 3, refer: 4, decline: 5 };
  var LABEL = { best: "Level / preferred", std: "Standard / rated", graded: "Graded / modified", gi: "Guaranteed issue only", refer: "Check with carrier", decline: "Decline" };
  var TONE = { best: "good", std: "good", graded: "warn", gi: "warn", refer: "muted", decline: "bad" };
  function worse(a, b) { return RANK[a] >= RANK[b] ? a : b; }

  // product carrier name -> name used in underwriting-guide.js (contracted chips)
  var CARRIER_ALIAS = { "F&G": "Fidelity & Guaranty (F&G)" };
  function uwCarrier(p) { return CARRIER_ALIAS[p.carrier] || p.carrier; }
  function excludesFor(p) {
    var list = global.UW_CARRIERS || [];
    var c = list.filter(function (x) { return x.name === uwCarrier(p); })[0];
    return c && c.excludes ? c.excludes.split(/\s*,\s*/) : [];
  }

  var STATES = [["AL","Alabama"],["AK","Alaska"],["AZ","Arizona"],["AR","Arkansas"],["CA","California"],["CO","Colorado"],["CT","Connecticut"],["DE","Delaware"],["DC","District of Columbia"],["FL","Florida"],["GA","Georgia"],["HI","Hawaii"],["ID","Idaho"],["IL","Illinois"],["IN","Indiana"],["IA","Iowa"],["KS","Kansas"],["KY","Kentucky"],["LA","Louisiana"],["ME","Maine"],["MD","Maryland"],["MA","Massachusetts"],["MI","Michigan"],["MN","Minnesota"],["MS","Mississippi"],["MO","Missouri"],["MT","Montana"],["NE","Nebraska"],["NV","Nevada"],["NH","New Hampshire"],["NJ","New Jersey"],["NM","New Mexico"],["NY","New York"],["NC","North Carolina"],["ND","North Dakota"],["OH","Ohio"],["OK","Oklahoma"],["OR","Oregon"],["PA","Pennsylvania"],["RI","Rhode Island"],["SC","South Carolina"],["SD","South Dakota"],["TN","Tennessee"],["TX","Texas"],["UT","Utah"],["VT","Vermont"],["VA","Virginia"],["WA","Washington"],["WV","West Virginia"],["WI","Wisconsin"],["WY","Wyoming"]];
  STATES.forEach(function (st) { var o = document.createElement("option"); o.value = st[0]; o.textContent = st[1]; $("uwState").appendChild(o); });

  // "How long ago" choices -> years used against the look-back windows
  var WHEN = [["", "— when? —"], ["0.25", "Within 6 months"], ["0.75", "6–12 months ago"], ["1.5", "1–2 years ago"], ["2.5", "2–3 years ago"],
              ["4", "3–5 years ago"], ["7.5", "5–10 years ago"], ["15", "10+ years ago"]];

  /* ---------------- state (in memory only) ---------------- */
  var S;
  function reset() {
    S = { line: "both", yn: {}, conds: {}, meds: [], openGroups: {} };
  }
  reset();

  /* ---------------- client section ---------------- */
  $("uwLine").addEventListener("click", function (ev) {
    var b = ev.target.closest("button[data-v]"); if (!b) return;
    S.line = b.getAttribute("data-v");
    [].forEach.call(this.querySelectorAll("button"), function (x) { x.classList.toggle("on", x === b); });
    score();
  });
  [].forEach.call(document.querySelectorAll("#uwWizard .yn"), function (g) {
    g.addEventListener("click", function (ev) {
      var b = ev.target.closest("button[data-v]"); if (!b) return;
      var k = g.getAttribute("data-yn"), v = b.getAttribute("data-v");
      S.yn[k] = S.yn[k] === v ? "" : v;
      [].forEach.call(g.querySelectorAll("button"), function (x) { x.classList.toggle("on", x.getAttribute("data-v") === S.yn[k]); });
      $("uwHospD").hidden = S.yn.hosp !== "Y";
      $("uwSurgD").hidden = S.yn.surg !== "Y";
      score();
    });
  });
  ["uwAge", "uwGender", "uwState", "uwFt", "uwIn", "uwLbs", "uwTob", "uwHospD", "uwSurgD", "uwNotes"].forEach(function (id) {
    $(id).addEventListener("input", score);
    $(id).addEventListener("change", score);
  });
  function heightIn() { var ft = +$("uwFt").value || 0, inch = +$("uwIn").value || 0; return ft ? ft * 12 + inch : 0; }
  function bmi() { var h = heightIn(), lbs = +$("uwLbs").value || 0; return h && lbs ? 703 * lbs / (h * h) : null; }

  /* ---------------- health conditions ---------------- */
  var CONDS = D.conds, CMAP = {};
  CONDS.forEach(function (c) { CMAP[c.key] = c; });
  var GROUPS = [];
  CONDS.forEach(function (c) { if (GROUPS.indexOf(c.group) === -1) GROUPS.push(c.group); });

  function condRow(c) {
    var st = S.conds[c.key] || {};
    var on = st.yes === true, off = st.yes === false;
    var html = '<div class="uw-cond' + (on ? " yes" : "") + '" data-cond="' + c.key + '" id="uwc-' + c.key + '">' +
      '<span class="uw-cl">' + esc(c.label) + "</span>" +
      '<span class="yn sm"><button type="button" data-c="' + c.key + '" data-v="Y"' + (on ? ' class="on bad"' : "") + '>Yes</button>' +
      '<button type="button" data-c="' + c.key + '" data-v="N"' + (off ? ' class="on"' : "") + ">No</button></span></div>";
    if (on) {
      html += '<div class="uw-drill" data-drill="' + c.key + '">' +
        '<label>When diagnosed / last treated / last event<select data-when="' + c.key + '">' +
        WHEN.map(function (w) { return '<option value="' + w[0] + '"' + (String(st.when || "") === w[0] ? " selected" : "") + ">" + w[1] + "</option>"; }).join("") + "</select></label>" +
        (c.sev ? '<label>How is it now?<select data-sev="' + c.key + '"><option value="">— ask —</option>' +
          '<option value="mild"' + (st.sev === "mild" ? " selected" : "") + ">Controlled / mild / stable</option>" +
          '<option value="severe"' + (st.sev === "severe" ? " selected" : "") + ">Severe / uncontrolled / complications</option></select></label>" : "") +
        '<label class="wide">Details (meds, doctor, notes)<input type="text" data-note="' + c.key + '" value="' + esc(st.note || "") + '" placeholder="e.g. Metformin, A1C 6.8"></label>' +
        "</div>";
    }
    return html;
  }
  function renderConds() {
    var q = $("uwCondFind").value.trim().toLowerCase();
    $("uwConds").innerHTML = GROUPS.map(function (g) {
      var list = CONDS.filter(function (c) { return c.group === g && (!q || c.label.toLowerCase().indexOf(q) !== -1 || c.key.indexOf(q) !== -1); });
      if (!list.length) return "";
      var yesN = list.filter(function (c) { return (S.conds[c.key] || {}).yes; }).length;
      var open = q || S.openGroups[g] || yesN;
      return '<details class="uw-group"' + (open ? " open" : "") + ' data-group="' + esc(g) + '"><summary>' + esc(g) +
        (yesN ? ' <span class="uw-pill bad">' + yesN + " yes</span>" : "") + "</summary>" +
        list.map(condRow).join("") + "</details>";
    }).join("") || '<p class="wiz-note">No condition matches that search.</p>';
  }
  $("uwCondFind").addEventListener("input", renderConds);
  $("uwConds").addEventListener("toggle", function (ev) {
    var d = ev.target;
    if (d.matches && d.matches("details.uw-group") && !$("uwCondFind").value.trim()) S.openGroups[d.getAttribute("data-group")] = d.open;
  }, true);
  $("uwConds").addEventListener("click", function (ev) {
    var b = ev.target.closest("button[data-c]"); if (!b) return;
    var k = b.getAttribute("data-c"), v = b.getAttribute("data-v") === "Y";
    var st = S.conds[k] = S.conds[k] || {};
    st.yes = st.yes === v ? undefined : v;
    renderConds(); score();
    if (st.yes) { var sel = document.querySelector('[data-when="' + k + '"]'); if (sel) sel.focus(); }
  });
  $("uwConds").addEventListener("change", function (ev) {
    var t = ev.target, k;
    if ((k = t.getAttribute("data-when"))) { S.conds[k].when = t.value; score(); }
    else if ((k = t.getAttribute("data-sev"))) { S.conds[k].sev = t.value; score(); }
  });
  $("uwConds").addEventListener("input", function (ev) {
    var k = ev.target.getAttribute("data-note");
    if (k) { S.conds[k].note = ev.target.value; }
  });

  /* ---------------- medications ---------------- */
  var RX = D.rx; // [name, [[indicates, planrightOutcome, conditionKey], ...]]
  var suggIdx = -1;
  function medMatches(q) {
    q = q.toLowerCase();
    var starts = [], has = [];
    RX.forEach(function (r) { var n = r[0].toLowerCase(); if (n.indexOf(q) === 0) starts.push(r); else if (n.indexOf(q) !== -1) has.push(r); });
    return starts.concat(has).slice(0, 8);
  }
  function renderSugg() {
    var q = $("uwMedFind").value.trim(), ul = $("uwMedSugg");
    if (q.length < 2) { ul.hidden = true; ul.innerHTML = ""; return; }
    var m = medMatches(q);
    ul.innerHTML = m.map(function (r, i) {
      return '<li><button type="button" data-med="' + esc(r[0]) + '"' + (i === suggIdx ? ' class="hl"' : "") + "><b>" + esc(r[0]) + '</b><span class="muted"> — ' +
        esc(r[1].map(function (x) { return x[0]; }).join("; ")) + "</span></button></li>";
    }).join("") + '<li><button type="button" data-med-free="' + esc(q) + '">Add "' + esc(q) + '" (not in the PlanRight list)</button></li>';
    ul.hidden = false;
  }
  function addMed(name, free) {
    if (S.meds.some(function (m) { return m.name.toLowerCase() === name.toLowerCase(); })) return;
    var r = free ? null : RX.filter(function (x) { return x[0] === name; })[0];
    S.meds.push({ name: name, rows: r ? r[1] : [] });
    $("uwMedFind").value = ""; suggIdx = -1; renderSugg(); renderMeds(); score();
  }
  $("uwMedFind").addEventListener("input", function () { suggIdx = -1; renderSugg(); });
  $("uwMedFind").addEventListener("keydown", function (ev) {
    var btns = $("uwMedSugg").querySelectorAll("button");
    if (ev.key === "ArrowDown" || ev.key === "ArrowUp") {
      if (!btns.length) return; ev.preventDefault();
      suggIdx = (suggIdx + (ev.key === "ArrowDown" ? 1 : -1) + btns.length) % btns.length; renderSugg();
    } else if (ev.key === "Enter") {
      ev.preventDefault();
      var b = btns[suggIdx >= 0 ? suggIdx : 0];
      if (b) b.click();
    } else if (ev.key === "Escape") { this.value = ""; renderSugg(); }
  });
  $("uwMedSugg").addEventListener("click", function (ev) {
    var b = ev.target.closest("button"); if (!b) return;
    if (b.hasAttribute("data-med")) addMed(b.getAttribute("data-med"), false);
    else addMed(b.getAttribute("data-med-free"), true);
  });
  document.addEventListener("click", function (ev) { if (!ev.target.closest(".uw-medadd")) $("uwMedSugg").hidden = true; });
  function renderMeds() {
    $("uwMeds").innerHTML = S.meds.length ? S.meds.map(function (m, i) {
      var rows = m.rows.length ? m.rows.map(function (x) {
        var ck = x[2], marked = ck && (S.conds[ck] || {}).yes;
        return '<li><span class="uw-ind">' + esc(x[0]) + '</span><span class="uw-tag ' + TONE[x[1]] + '">PlanRight: ' + LABEL[x[1]] + "</span>" +
          (ck ? (marked ? '<span class="muted">✓ ' + esc(CMAP[ck].label) + " marked</span>"
                        : '<button type="button" class="linkbtn" data-mark="' + ck + '">Mark "' + esc(CMAP[ck].label) + '"</button>') : "") + "</li>";
      }).join("") : '<li class="muted">Not in the PlanRight list — ask what it is for and mark that condition above.</li>';
      return '<div class="uw-med"><div class="uw-med-h"><b>' + esc(m.name) + '</b><button type="button" class="todo-x" data-unmed="' + i + '" title="Remove">&times;</button></div><ul>' + rows + "</ul></div>";
    }).join("") : '<p class="wiz-note">No medications added yet.</p>';
  }
  $("uwMeds").addEventListener("click", function (ev) {
    var b = ev.target.closest("[data-mark],[data-unmed]"); if (!b) return;
    if (b.hasAttribute("data-unmed")) { S.meds.splice(+b.getAttribute("data-unmed"), 1); }
    else {
      var k = b.getAttribute("data-mark");
      S.conds[k] = S.conds[k] || {}; S.conds[k].yes = true;
      S.openGroups[CMAP[k].group] = true;
      renderConds();
      var row = $("uwc-" + k); if (row) row.scrollIntoView({ behavior: "smooth", block: "center" });
    }
    renderMeds(); score();
  });

  /* ---------------- scoring ---------------- */
  function evalCell(cell, st) {
    var years = st.when ? +st.when : null, sev = st.sev || "";
    var notes = [];
    var tierOut = null, tierTxt = "";
    if (cell.tiers) {
      var y = years == null ? 0.01 : years;
      var t = cell.tiers.filter(function (x) { return y >= x[0] && (x[1] == null || y < x[1]); })[0];
      tierOut = t ? t[2] : "refer";
      tierTxt = t ? t[3] : "gap in the look-back — confirm";
      if (years == null) notes.push("assumed recent — add when");
    }
    var out;
    if (cell.sev) {
      // with a look-back table, "controlled" follows the timing; without one, the mild outcome
      if (sev === "mild") { out = cell.tiers ? tierOut : cell.sev.mild; if (cell.sev.mild_t && !cell.tiers) tierTxt = cell.sev.mild_t; }
      else if (sev === "severe") { out = cell.sev.severe; if (cell.sev.severe_t) tierTxt = cell.sev.severe_t; }
      else { out = worse(tierOut || cell.sev.mild, cell.sev.severe); notes.push("assumed severe — ask how it is now"); }
    } else if (cell.tiers) out = tierOut;
    else out = cell.base || "refer";
    return { o: out, why: tierTxt, notes: notes };
  }
  function buildCheck(p) {
    var b = D.build[p.key], h = heightIn(), lbs = +$("uwLbs").value || 0;
    if (!b || !h || !lbs) return null;
    var table = b.max;
    if (b.maxM) table = $("uwGender").value === "Female" ? b.maxF : b.maxM;
    var row = table[h];
    if (!row) return { o: "refer", txt: "height outside the " + p.carrier + " build chart — check" };
    if (b.min && b.min[h] && lbs < b.min[h]) return { o: "decline", txt: "under the minimum weight (" + b.min[h] + " lbs)" };
    for (var i = 0; i < row.length; i++) {
      if (row[i] != null && lbs <= row[i]) {
        var o = b.tierOut ? b.tierOut[i] : (i === 0 ? "best" : "std");
        return { o: o, txt: "build fits " + b.classes[i] + " (max " + row[i] + " lbs)" };
      }
    }
    return { o: b.over, txt: b.overText + " (max " + row[row.length - 1] + " lbs)" };
  }
  function contracted() {
    var mine = global.UWMyCarriers ? global.UWMyCarriers() : null;
    return function (p) { return !mine || mine.indexOf(uwCarrier(p)) !== -1; };
  }
  function scoreProduct(p) {
    var res = { p: p, o: "best", lines: [], warn: [] };
    var age = +$("uwAge").value || 0, state = $("uwState").value;
    if (age && p.ages && (age < p.ages[0] || age > p.ages[1])) { res.o = "decline"; res.lines.push({ o: "decline", t: "Age " + age + " is outside issue ages " + p.ages[0] + "–" + p.ages[1] }); }
    if (state && excludesFor(p).indexOf(state) !== -1) { res.o = "decline"; res.lines.push({ o: "decline", t: "Not available in " + state }); }
    Object.keys(S.conds).forEach(function (k) {
      var st = S.conds[k]; if (!st.yes) return;
      var cell = D.cells[k] && D.cells[k][p.key];
      if (!cell) {                 // not on this carrier's cheat-sheet grid
        if (p.line === "term" && !p.gi) { res.o = worse(res.o, "refer"); res.lines.push({ o: "refer", c: CMAP[k].label, t: "Not on the cheat sheet for this carrier — check the carrier guide" }); }
        else res.lines.push({ o: "best", c: CMAP[k].label, t: "Not asked on this application" });
        return;
      }
      var e = evalCell(cell, st);
      // on fully/accelerated-underwritten term, a plain "Accept" means insurable, usually at standard or table rates
      if (p.line === "term" && e.o === "best" && /accept/i.test(cell.text) && !/pref/i.test(cell.text)) e.o = "std";
      res.o = worse(res.o, e.o);
      res.lines.push({ o: e.o, c: CMAP[k].label, t: cell.text, why: e.why, notes: e.notes.concat(cell.note ? [cell.note] : []), approx: cell.approx });
    });
    var bc = buildCheck(p);
    if (bc) { res.o = worse(res.o, bc.o); res.lines.push({ o: bc.o, c: "Build", t: bc.txt }); }
    var tob = $("uwTob").value;
    if (tob === "cig" || tob === "other") {
      if (p.key === "sf" && tob === "other") res.warn.push("Strong Foundation only counts cigarettes as tobacco — non-tobacco rates possible");
      else res.warn.push("Tobacco rates");
      if (p.key === "sf" && (S.conds.copd || {}).yes && tob === "cig") { res.o = "decline"; res.lines.push({ o: "decline", c: "COPD + smoker", t: "Strong Foundation declines smokers with COPD" }); }
    }
    if (S.yn.cit === "N") res.warn.push("Not a US citizen — check residency rules");
    // a guaranteed-issue product never ranks above real underwriting
    res.rank = RANK[res.o] + (p.gi && res.o === "best" ? 3 : 0);
    res.label = p.gi && res.o === "best" ? "Guaranteed issue (2-yr graded)" : LABEL[res.o];
    res.tone = p.gi && res.o === "best" ? "warn" : TONE[res.o];
    return res;
  }
  function score() {
    var age = +$("uwAge").value || 0;
    var b = bmi(); $("uwBmi").textContent = b ? "BMI " + b.toFixed(1) : "";
    var ok = contracted();
    var lines = [["term", "Mortgage protection / term"], ["fe", "Final expense / whole life"]].filter(function (l) { return S.line === "both" || S.line === l[0]; });
    var anyYes = Object.keys(S.conds).some(function (k) { return S.conds[k].yes; });
    var html = "", tally = { good: 0, warn: 0, bad: 0 };
    lines.forEach(function (l) {
      var prods = D.products.filter(function (p) { return p.line === l[0] && ok(p); });
      var res = prods.map(scoreProduct).sort(function (a, b) { return a.rank - b.rank; });
      html += '<h3 class="uw-lh">' + l[1] + "</h3>";
      if (!res.length) { html += '<p class="wiz-note">None of your checked carriers are scored for this line.</p>'; return; }
      res.forEach(function (r, i) {
        if (r.tone === "good") tally.good++; else if (r.tone === "warn") tally.warn++; else if (r.tone === "bad") tally.bad++;
        var bad = r.lines;
        html += '<div class="uw-res ' + r.tone + (i === 0 && r.tone !== "bad" ? " top" : "") + '">' +
          '<div class="uw-res-h"><div><b>' + esc(r.p.carrier) + '</b><span class="muted"> · ' + esc(r.p.name) + "</span></div>" +
          '<span class="uw-tag ' + r.tone + '">' + esc(r.label) + "</span></div>" +
          (bad.length || r.warn.length ? '<ul class="uw-why">' + bad.map(function (x) {
            return '<li><span class="dot ' + TONE[x.o] + '"></span>' + (x.c ? "<b>" + esc(x.c) + ":</b> " : "") + esc(x.t) +
              (x.why && x.t.indexOf(x.why) === -1 && x.why.indexOf("<=") === -1 ? ' <span class="muted">(' + esc(x.why) + ")</span>" : "") +
              (x.notes && x.notes.length ? ' <span class="muted">— ' + esc(x.notes.join("; ")) + "</span>" : "") +
              (x.approx ? ' <span class="muted">(from the "' + esc(x.approx) + '" row)</span>' : "") + "</li>";
          }).join("") + r.warn.map(function (w) { return '<li><span class="dot muted"></span>' + esc(w) + "</li>"; }).join("") + "</ul>"
            : (anyYes || heightIn() ? '<p class="uw-ok">No knockouts in the cheat sheet for these answers.</p>' : "")) +
          "</div>";
      });
    });
    $("uwResults").innerHTML = html;
    $("uwTally").innerHTML = '<span class="uw-tag good">' + tally.good + " likely</span>" +
      '<span class="uw-tag warn">' + tally.warn + " graded / GI</span>" +
      '<span class="uw-tag bad">' + tally.bad + " decline</span>" +
      (age ? "" : ' <span class="muted">Add age to check issue ages.</span>');
    lastResults = lines;
  }
  var lastResults = null;

  /* ---------------- copy summary ---------------- */
  function summaryText() {
    var st = $("uwState").value, stName = st ? (STATES.filter(function (x) { return x[0] === st; })[0] || [st, st])[1] : "";
    var ft = $("uwFt").value, inch = $("uwIn").value, lbs = $("uwLbs").value, b = bmi();
    var hw = (ft ? ft + "'" + (inch || 0) + '"' : "") + (lbs ? (ft ? " / " : "") + lbs + " lbs" : "") + (b ? " (BMI " + b.toFixed(1) + ")" : "");
    var tob = { none: "N", cig: "Y — cigarettes", other: "Y — other nicotine" }[$("uwTob").value] || "";
    var conds = Object.keys(S.conds).filter(function (k) { return S.conds[k].yes; }).map(function (k) {
      var c = S.conds[k], w = WHEN.filter(function (x) { return x[0] === String(c.when || ""); })[0];
      return "- " + CMAP[k].label + (c.when ? " — " + w[1].toLowerCase() : "") + (c.sev ? " — " + (c.sev === "mild" ? "controlled/mild" : "severe/uncontrolled") : "") + (c.note ? " — " + c.note : "");
    });
    var meds = S.meds.map(function (m) { return "- " + m.name + (m.rows.length ? " (" + m.rows.map(function (x) { return x[0]; }).join("; ") + ")" : ""); });
    var mine = global.UWMyCarriers ? global.UWMyCarriers() : [];
    var out = [
      "Age: " + $("uwAge").value,
      "Gender: " + $("uwGender").value,
      "State: " + stName,
      "Height/Weight: " + hw,
      "Smoker? " + tob,
      "Medical Conditions: " + (conds.length ? "\n" + conds.join("\n") : "None reported"),
      "Medications: " + (meds.length ? "\n" + meds.join("\n") : "None reported"),
      "Hospitalizations? " + (S.yn.hosp || "") + (S.yn.hosp === "Y" && $("uwHospD").value ? " - " + $("uwHospD").value : ""),
      "Surgeries? " + (S.yn.surg || "") + (S.yn.surg === "Y" && $("uwSurgD").value ? " - " + $("uwSurgD").value : ""),
      "Criminal Record? " + (["dui1", "dui2", "reckless", "suspended", "felony", "misd", "probation", "jail"].filter(function (k) { return (S.conds[k] || {}).yes; }).map(function (k) { return CMAP[k].label; }).join(", ") || "None reported"),
      "US Citizen? " + (S.yn.cit || ""),
      "Your contracted carriers? " + mine.join(", ")
    ];
    if ($("uwNotes").value.trim()) out.push("Notes: " + $("uwNotes").value.trim());
    // top matches
    var ok = contracted(), tops = [];
    D.products.filter(function (p) { return (S.line === "both" || S.line === p.line) && ok(p); }).map(scoreProduct)
      .sort(function (a, b) { return a.rank - b.rank; }).slice(0, 4).forEach(function (r) { tops.push("- " + r.p.carrier + " " + r.p.name + ": " + r.label); });
    if (tops.length) out.push("\nWizard pre-screen (confirm on the carrier app):\n" + tops.join("\n"));
    return out.join("\n");
  }
  function copyText(text, btn) {
    var done = function () { var old = btn.textContent; btn.textContent = "Copied!"; setTimeout(function () { btn.textContent = old; }, 1200); };
    function fallback() {
      var ta = document.createElement("textarea"); ta.value = text; ta.style.position = "fixed"; ta.style.opacity = "0";
      document.body.appendChild(ta); ta.select(); try { document.execCommand("copy"); } catch (e) {} document.body.removeChild(ta); done();
    }
    if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(text).then(done, fallback); else fallback();
  }
  $("uwCopy").addEventListener("click", function () { copyText(summaryText(), this); });

  $("uwClear").addEventListener("click", function () {
    reset();
    ["uwAge", "uwGender", "uwState", "uwFt", "uwIn", "uwLbs", "uwTob", "uwHospD", "uwSurgD", "uwNotes", "uwCondFind", "uwMedFind"].forEach(function (id) { $(id).value = ""; });
    [].forEach.call(document.querySelectorAll("#uwWizard .yn button, #uwLine button"), function (x) { x.classList.toggle("on", x.getAttribute("data-v") === "both"); });
    $("uwHospD").hidden = true; $("uwSurgD").hidden = true;
    renderConds(); renderMeds(); score();
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  global.UWWizard = { refresh: score, _summary: summaryText, _state: function () { return S; } };
  renderConds(); renderMeds(); score();
})(window);
