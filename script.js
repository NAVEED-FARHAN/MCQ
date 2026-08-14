/**
 * 100 MCQ — shared engine.
 *
 * Days register themselves through MCQ.registerDay(id, title, questions).
 * A new day requires only two edits, both additive:
 *   1. data/dayN.js  ->  const dayNQuestions = [...]; MCQ.registerDay("dayN", "Day N", dayNQuestions);
 *   2. index.html    ->  <script src="data/dayN.js"></script>
 * Day 11: register the key "final" to unlock the Final Test.
 *
 * Per-day progress (score, answers, resume position) persists in localStorage
 * under "freebuff_mcq_v1", so a refresh resumes mid-quiz.
 */
(function () {
  "use strict";

  var STORE_KEY = "freebuff_mcq_v1";
  var TOTAL_DAYS = 10;

  var registry = {};
  var store = loadStore();
  var session = null;  /* active quiz: { id, title, questions, index, answers } */
  var view = "home";

  var app = document.getElementById("app");
  var navEl = document.getElementById("nav");

  /* ---------------------------------------------------------- registry */
  window.MCQ = {
    registerDay: function (id, title, questions) {
      registry[id] = { id: id, title: title, questions: questions || [] };
    },
    get: function (id) { return registry[id] || null; }
  };

  /* ---------------------------------------------------------- storage */
  function loadStore() {
    try {
      var raw = localStorage.getItem(STORE_KEY);
      return raw ? JSON.parse(raw) : {};
    } catch (e) { return {}; }
  }
  function saveStore() {
    try { localStorage.setItem(STORE_KEY, JSON.stringify(store)); } catch (e) { /* private mode */ }
  }
  function dayState(id) {
    if (!store.days) store.days = {};
    return store.days[id] || null;
  }
  function setDayState(id, s) {
    if (!store.days) store.days = {};
    store.days[id] = s;
    saveStore();
  }

  /* ---------------------------------------------------------- helpers */
  function esc(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }
  function pad(n) { return String(n).padStart(2, "0"); }
  function mount(html) { app.innerHTML = html; }
  function dayList() {
    var out = [];
    for (var i = 1; i <= TOTAL_DAYS; i++) {
      var id = "day" + i;
      out.push({ id: id, num: i, title: "Day " + i, data: registry[id] || null });
    }
    return out;
  }
  function segBar(total, filled, cls) {
    var html = '<div class="progress-seg ' + (cls || "") + '" aria-hidden="true">';
    for (var i = 0; i < total; i++) {
      html += "<i" + (i < filled ? ' class="on"' : "") + "></i>";
    }
    return html + "</div>";
  }
  function scoreOf(answers) {
    var n = 0;
    (answers || []).forEach(function (a) { if (a && a.correct) n++; });
    return n;
  }
  function accClass(acc) {
    if (acc >= 70) return "good";
    if (acc >= 40) return "warn";
    return "bad";
  }
  function statRow(label, value, unit) {
    return '<div class="stat-row"><span class="stat-label">' + label + "</span>" +
      '<span class="stat-value">' + value + (unit ? '<span class="unit">' + unit + "</span>" : "") + "</span></div>";
  }

  /* ---------------------------------------------------------- theme */
  function applyTheme(t) {
    document.documentElement.setAttribute("data-theme", t);
    Array.prototype.forEach.call(document.querySelectorAll(".seg-btn[data-theme-val]"), function (b) {
      b.classList.toggle("active", b.getAttribute("data-theme-val") === t);
    });
  }
  function setTheme(t) {
    store.theme = t;
    saveStore();
    applyTheme(t);
  }

  /* ---------------------------------------------------------- nav */
  function renderNav() {
    var html = '<div class="label nav-sec">Curriculum</div>';

    dayList().forEach(function (d) {
      var st = dayState(d.id);
      var done = !!(st && st.done);
      var cls = "nav-item" + (view === d.id ? " active" : "") + (d.data ? "" : " locked");
      var score = "";
      if (done) {
        score = '<span class="nav-score is-done">' + st.score + "/" + st.total + "</span>";
      } else if (st && st.answers && st.answers.length) {
        score = '<span class="nav-score">' + st.answers.length + "/" + st.total + "</span>";
      }
      html += '<button type="button" class="' + cls + '" data-nav="' + d.id + '">' +
        '<span class="nav-day">Day ' + pad(d.num) + "</span>" + score + "</button>";
    });

    html += '<div class="label nav-sec">Exam</div>';
    var fst = dayState("final");
    var fdone = !!(fst && fst.done);
    var fcls = "nav-item nav-final" + (view === "final" ? " active" : "") + (registry.final ? "" : " locked");
    var fscore = fdone ? '<span class="nav-score is-done">' + fst.score + "/" + fst.total + "</span>" : "";
    html += '<button type="button" class="' + fcls + '" data-nav="final">' +
      '<span class="nav-day">Final Test</span>' +
      (fscore || '<span class="nav-tag">' + (registry.final ? "Unlocked" : "Day 11") + "</span>") +
      "</button>";

    navEl.innerHTML = html;
  }

  /* ---------------------------------------------------------- router */
  function openView(id) {
    view = id;
    renderNav();
    if (id === "home") {
      renderHome();
    } else if (registry[id]) {
      startDay(id, false);
    } else if (id === "final") {
      renderFinalLocked();
    } else {
      renderComingSoon(id);
    }
    window.scrollTo(0, 0);
  }

  /* ---------------------------------------------------------- home */
  function renderHome() {
    var days = dayList();
    var doneCount = 0, answered = 0, correct = 0, nextDay = null, resumeDay = null;
    days.forEach(function (d) {
      var st = dayState(d.id);
      if (st && st.done) doneCount++;
      if (st && st.answers) {
        st.answers.forEach(function (a) { if (a) { answered++; if (a.correct) correct++; } });
      }
      if (!nextDay && !(st && st.done)) nextDay = d;
      if (!resumeDay && st && !st.done && st.answers && st.answers.length) resumeDay = d;
    });
    var acc = answered ? Math.round((correct / answered) * 100) : null;

    var ctas = "";
    if (resumeDay) {
      ctas += '<button type="button" class="btn primary" data-nav="' + resumeDay.id + '">Resume ' + resumeDay.title + "</button>";
    } else if (nextDay) {
      ctas += '<button type="button" class="btn primary" data-nav="' + nextDay.id + '">Start ' + nextDay.title + "</button>";
    } else {
      ctas += '<button type="button" class="btn primary" data-nav="final">Final Test</button>';
    }

    var rows = "";
    days.forEach(function (d, i) {
      var st = dayState(d.id);
      var status = '<span class="stat-value is-off">—</span>';
      if (st && st.done) status = '<span class="stat-value is-done">' + st.score + "/" + st.total + "</span>";
      else if (st && st.answers && st.answers.length) status = '<span class="stat-value">' + st.answers.length + "/" + st.total + " in progress</span>";
      rows += '<button type="button" class="day-row" data-nav="' + d.id + '">' +
        '<span class="day-row-num">' + pad(i + 1) + "</span>" +
        '<span class="day-row-name">' + d.title + "</span>" +
        '<span class="day-row-status">' + status + "</span></button>";
    });

    mount(
      '<section class="home">' +
        '<div class="hero-zone">' +
          '<div class="dot-grid-subtle"></div>' +
          '<span class="label">[ 10-Day Study System ]</span>' +
          '<h1 class="hero">100<small>MCQ</small></h1>' +
          '<p class="hero-sub">Ten daily sets of ten questions, then a cumulative final test on day eleven.</p>' +
        "</div>" +
        '<div class="hero-bar">' +
          segBar(TOTAL_DAYS, doneCount, "hero") +
          '<span class="label">' + doneCount + " / " + TOTAL_DAYS + " days</span>" +
        "</div>" +
        '<div class="actions">' + ctas + "</div>" +
        '<div class="panel">' +
          statRow("Days completed", doneCount, "/ " + TOTAL_DAYS) +
          statRow("Questions answered", answered) +
          statRow("Accuracy", acc === null ? "—" : acc, acc === null ? "" : "%") +
        "</div>" +
        '<div class="label">[ Daily sets ]</div>' +
        '<div class="day-list">' + rows + "</div>" +
      "</section>"
    );
  }

  /* ---------------------------------------------------------- quiz */
  function startDay(id, reset) {
    var d = registry[id];
    var st = dayState(id);
    if (!reset && st && st.done && st.answers && st.answers.length === d.questions.length) {
      renderResult(id, st);
      return;
    }
    var answers = (!reset && st && st.answers) ? st.answers.slice() : [];
    var index = (!reset && st) ? Math.min(st.index || 0, d.questions.length) : 0;
    session = { id: id, title: d.title, questions: d.questions, index: index, answers: answers };
    if (index >= d.questions.length) { finish(); return; }
    renderQuestion();
  }

  function currentScore() { return scoreOf(session.answers); }

  function renderQuestion() {
    var s = session;
    var q = s.questions[s.index];
    var opts = q.options.map(function (opt, i) {
      var key = String.fromCharCode(65 + i);
      return '<button type="button" class="option" data-opt="' + i + '">' +
        '<span class="opt-key">' + key + "</span>" +
        '<span class="opt-text">' + esc(opt) + "</span></button>";
    }).join("");

    mount(
      '<section class="quiz">' +
        '<header class="quiz-head">' +
          '<div class="quiz-meta">' +
            '<span class="tag">' + esc(q.category || "General") + "</span>" +
            '<span class="label">Question ' + pad(s.index + 1) + " / " + pad(s.questions.length) + "</span>" +
          "</div>" +
          '<span class="label quiz-score">Score ' + pad(currentScore()) + "</span>" +
        "</header>" +
        segBar(s.questions.length, s.index, "compact") +
        '<h1 class="question">' + esc(q.question) + "</h1>" +
        '<div class="options" role="group" aria-label="Answer options">' + opts + "</div>" +
        '<div class="feedback hidden" id="feedback" aria-live="polite"></div>' +
        '<div class="quiz-actions">' +
          '<button type="button" class="btn ghost" id="btn-reset">[ Reset ]</button>' +
          '<button type="button" class="btn primary" id="btn-next" disabled>Next</button>' +
        "</div>" +
      "</section>"
    );

    Array.prototype.forEach.call(document.querySelectorAll(".option"), function (o) {
      o.addEventListener("click", function () { answer(parseInt(o.getAttribute("data-opt"), 10)); });
    });
    document.getElementById("btn-reset").addEventListener("click", function () { startDay(s.id, true); });
    document.getElementById("btn-next").addEventListener("click", advance);
  }

  function answer(picked) {
    var s = session;
    var q = s.questions[s.index];
    var correct = picked === q.correctIndex;
    s.answers[s.index] = { picked: picked, correct: correct };

    /* persist after every answer so a refresh resumes in place */
    setDayState(s.id, {
      answers: s.answers,
      index: s.index + 1,
      score: currentScore(),
      total: s.questions.length,
      done: false
    });
    renderNav();

    Array.prototype.forEach.call(document.querySelectorAll(".option"), function (o, idx) {
      o.disabled = true;
      if (idx === q.correctIndex) o.classList.add("correct");
      else if (idx === picked) o.classList.add("wrong");
      else o.classList.add("dim");
    });

    var scoreEl = document.querySelector(".quiz-score");
    if (scoreEl) scoreEl.textContent = "Score " + pad(currentScore());

    var fb = document.getElementById("feedback");
    fb.classList.remove("hidden");
    fb.classList.add(correct ? "is-correct" : "is-wrong");
    fb.innerHTML =
      '<span class="fb-status ' + (correct ? "ok" : "no") + '">[ ' + (correct ? "Correct" : "Incorrect") + " ]</span>" +
      '<span class="fb-answer">Answer ' + String.fromCharCode(65 + q.correctIndex) + " — " + esc(q.options[q.correctIndex]) + "</span>" +
      '<p class="fb-explain">' + esc(q.explanation || "") + "</p>";

    document.getElementById("btn-next").disabled = false;
  }

  function advance() {
    session.index++;
    if (session.index >= session.questions.length) finish();
    else renderQuestion();
  }

  function finish() {
    var s = session;
    setDayState(s.id, {
      answers: s.answers,
      index: s.questions.length,
      score: currentScore(),
      total: s.questions.length,
      done: true,
      completedAt: Date.now()
    });
    renderNav();
    renderResult(s.id, dayState(s.id));
  }

  /* ---------------------------------------------------------- result */
  function renderResult(id, st) {
    var d = registry[id];
    var score = st.score;
    var total = st.total || d.questions.length;
    var acc = total ? Math.round((score / total) * 100) : 0;
    var cls = accClass(acc);

    var cats = {};
    d.questions.forEach(function (q, i) {
      var c = q.category || "General";
      if (!cats[c]) cats[c] = { total: 0, correct: 0 };
      cats[c].total++;
      if (st.answers[i] && st.answers[i].correct) cats[c].correct++;
    });
    var catRows = Object.keys(cats).map(function (c) {
      var cat = cats[c];
      var bar = '<div class="cat-bar">';
      for (var i = 0; i < cat.total; i++) bar += "<i" + (i < cat.correct ? ' class="on"' : "") + "></i>";
      bar += "</div>";
      return '<div class="cat-row">' +
        '<span class="cat-name">' + esc(c) + "</span>" +
        bar +
        '<span class="cat-num">' + cat.correct + "/" + cat.total + "</span></div>";
    }).join("");

    var review = d.questions.map(function (q, i) {
      var ok = st.answers[i] && st.answers[i].correct;
      return '<div class="review-item">' +
        '<span class="rev-num">' + pad(i + 1) + "</span>" +
        '<span class="rev-text">' + esc(q.question) + "</span>" +
        '<span class="rev-status ' + (ok ? "ok" : "no") + '">' + (ok ? "[ OK ]" : "[ X ]") + "</span></div>";
    }).join("");

    mount(
      '<section class="result">' +
        '<div class="label">[ ' + esc(d.title.toUpperCase()) + " — Result ]</div>" +
        '<div class="hero-row">' +
          '<div class="hero-num">' + pad(score) + "<small>/ " + pad(total) + "</small></div>" +
          '<div class="hero-side">' +
            '<span class="label">Accuracy</span>' +
            '<span class="acc ' + cls + '">' + acc + "%</span>" +
          "</div>" +
        "</div>" +
        segBar(total, score, "hero " + cls) +
        '<div class="panel">' + catRows + "</div>" +
        '<div class="label">[ Review ]</div>' +
        '<div class="review">' + review + "</div>" +
        '<div class="quiz-actions">' +
          '<button type="button" class="btn secondary" id="btn-retry">[ Retry ' + esc(d.title) + " ]</button>" +
          '<button type="button" class="btn ghost" data-nav="home">Home</button>' +
        "</div>" +
      "</section>"
    );

    document.getElementById("btn-retry").addEventListener("click", function () { startDay(id, true); });
  }

  /* ---------------------------------------------------------- empty states */
  function renderComingSoon(id) {
    var num = id.replace("day", "");
    mount(
      '<section class="empty">' +
        '<div class="dot-grid-subtle"></div>' +
        '<span class="label">[ ' + esc(id.toUpperCase()) + " ]</span>" +
        '<h2 class="empty-title">Not built yet.</h2>' +
        '<p class="empty-desc">Day ' + num + " arrives tomorrow. The engine is ready — it switches on the moment data/day" + num + '.js is added to index.html.</p>' +
        '<button type="button" class="btn secondary" data-nav="home">Back home</button>' +
      "</section>"
    );
  }

  function renderFinalLocked() {
    var done = dayList().filter(function (d) { var s = dayState(d.id); return s && s.done; }).length;
    var remaining = TOTAL_DAYS - done;
    mount(
      '<section class="empty">' +
        '<div class="dot-grid-subtle"></div>' +
        '<span class="label">[ Final Test ]</span>' +
        '<h2 class="empty-title">' + (remaining ? "Unlocks after Day " + TOTAL_DAYS + "." : "Ready when you are.") + "</h2>" +
        '<div class="hero-bar empty-bar">' +
          segBar(TOTAL_DAYS, done, "hero") +
          '<span class="label">' + done + " / " + TOTAL_DAYS + " days</span>" +
        "</div>" +
        '<p class="empty-desc">' + (remaining
          ? remaining + " daily set" + (remaining === 1 ? "" : "s") + " remaining. The cumulative final draws from all ten days."
          : "All ten days are complete. The cumulative final will be added as Day 11.") + "</p>" +
      "</section>"
    );
  }

  /* ---------------------------------------------------------- boot */
  document.addEventListener("DOMContentLoaded", function () {
    applyTheme(store.theme || "dark");

    Array.prototype.forEach.call(document.querySelectorAll(".seg-btn[data-theme-val]"), function (b) {
      b.addEventListener("click", function () { setTheme(b.getAttribute("data-theme-val")); });
    });

    var brand = document.querySelector(".brand");
    if (brand) brand.addEventListener("click", function () { openView("home"); });

    /* global delegation for every [data-nav] trigger */
    document.addEventListener("click", function (e) {
      var el = e.target.closest("[data-nav]");
      if (el) openView(el.getAttribute("data-nav"));
    });

    renderNav();
    openView("home");
  });
})();
