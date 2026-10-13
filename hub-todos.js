/* ===========================================================================
   hub-todos.js -- the client to-do rules, shared by Client to-dos (pnl.html)
   and the Dashboard's daily summary so both always agree.

   Deadlines:
     cement  -> 1-2 business days after the app is submitted (submit + 2 business days)
     updates -> only once the policy is issued (issue/effective date + 3 days)
     bene    -> referral calls; non-urgent, no deadline
     decline -> (declined deals only) 1 business day after the decline
   Per-client overrides: d.todoEdit[key] = { text, due }; removed steps: d.todoHidden.
   =========================================================================== */
(function (global) {
  "use strict";

  var TODO_STEPS = [
    ["cement", "Complete cementing call + collect referrals", "1–2 business days after submitting the app"],
    ["updates", "Policy updates needed (beneficiaries, coverage amount, etc.)", "After the policy is issued"],
    ["bene", "Complete referral calls to beneficiaries and emergency contacts", "No deadline — when you have time"]
  ];
  var DECLINE_STEP = ["decline", "Decline follow-up call: inform the client and pivot to another carrier if able", "1 business day after the decline"];

  function ymd(dt) {
    return dt.getFullYear() + "-" + String(dt.getMonth() + 1).padStart(2, "0") + "-" + String(dt.getDate()).padStart(2, "0");
  }
  function addDays(s, n) {
    var p = String(s || "").split("-");
    if (p.length < 3) return null;
    return ymd(new Date(+p[0], +p[1] - 1, +p[2] + n));
  }
  // Skips Saturdays and Sundays.
  function addBusinessDays(s, n) {
    var p = String(s || "").split("-");
    if (p.length < 3) return null;
    var dt = new Date(+p[0], +p[1] - 1, +p[2]);
    while (n > 0) {
      dt.setDate(dt.getDate() + 1);
      var wd = dt.getDay();
      if (wd !== 0 && wd !== 6) n--;
    }
    return ymd(dt);
  }
  function daysFromToday(s) {
    var p = String(s || "").split("-");
    if (p.length < 3) return null;
    var t = new Date(); t = new Date(t.getFullYear(), t.getMonth(), t.getDate());
    return Math.round((new Date(+p[0], +p[1] - 1, +p[2]) - t) / 86400000);
  }

  function stepEdit(d, key) { return (d.todoEdit && d.todoEdit[key]) || {}; }
  function stepLabel(d, st) { return stepEdit(d, st[0]).text || st[1]; }
  function autoStepDue(d, key) {
    if (key === "cement") return { due: addBusinessDays(d.date, 2) };
    if (key === "bene") return {};
    if (key === "decline") return { due: addBusinessDays(d.declinedAt || d.date, 1) };
    if (key === "updates") {
      if (d.status !== "Issued") return { waiting: true };
      return { due: addDays(d.issuedDate || d.date, 3) };
    }
    return {};
  }
  // Due date for a step, or { waiting: true } when it can't start yet.
  function stepDue(d, key) {
    var ov = stepEdit(d, key).due;
    if (ov) return { due: ov, custom: true };
    return autoStepDue(d, key);
  }
  function applicableSteps(d) { return d.status === "Declined" ? [DECLINE_STEP] : TODO_STEPS; }
  function todoSteps(d) {
    var hid = d.todoHidden || {};
    return applicableSteps(d).filter(function (st) { return !hid[st[0]]; });
  }
  // Cancelled deals drop off; declined ones stay for the follow-up call.
  function todoDead(d) { return d.status === "Cancelled"; }

  // Every open, dated item across all deals, soonest first.
  function dueRows(deals) {
    var rows = [];
    (deals || []).forEach(function (d) {
      if (todoDead(d)) return;
      var t = d.todo || {};
      todoSteps(d).forEach(function (st) {
        if (t[st[0]]) return;
        var info = stepDue(d, st[0]);
        if (info.due) rows.push({ d: d, due: info.due, label: stepLabel(d, st), kind: "step", key: st[0] });
      });
      (d.tasks || []).forEach(function (x) {
        if (!x.done && x.due) rows.push({ d: d, due: x.due, label: x.text, kind: "task", key: x.id });
      });
    });
    rows.sort(function (a, b) { return a.due < b.due ? -1 : a.due > b.due ? 1 : 0; });
    return rows;
  }

  global.HubTodos = {
    TODO_STEPS: TODO_STEPS, DECLINE_STEP: DECLINE_STEP,
    addDays: addDays, addBusinessDays: addBusinessDays, daysFromToday: daysFromToday,
    stepEdit: stepEdit, stepLabel: stepLabel, stepDue: stepDue, autoStepDue: autoStepDue,
    applicableSteps: applicableSteps, todoSteps: todoSteps, todoDead: todoDead, dueRows: dueRows
  };
})(window);
