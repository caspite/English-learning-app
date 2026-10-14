/* =========================================================
   English Quest – מיומנויות לקראת סוף כיתה ח'
   אוצר מילים (Band 1 / Band 2 / רשימות מהכיתה), קריאה, הבנת הנשמע, כתיבה
   ========================================================= */
"use strict";

const HAS_READ = typeof READINGS !== "undefined" && READINGS.length;
const HAS_LISTEN = typeof PODCASTS !== "undefined" && PODCASTS.length;
const HAS_WRITE = typeof WRITING !== "undefined" && WRITING.length;
const mastered = (id) => !!(S.words[id] && S.words[id].s >= 3);
const packWords = (pk) => ALL_WORDS.filter((w) => w.ui === pk);
const skillRec = (kind, id) => (S.skills[kind] || {})[id];
const recordDay = () => { const dk = dateKey(); S.days[dk] = S.days[dk] || { sec: 0, st: 0 }; S.days[dk].st++; };

/* ---------- רשימות מילים מהכיתה (מודבקות ע"י ההורה) ---------- */
function registerCustom() {
  for (let i = ALL_WORDS.length - 1; i >= 0; i--) if (ALL_WORDS[i].custom) ALL_WORDS.splice(i, 1);
  (S.custom || []).forEach((list) => list.words.forEach((w, i) => {
    ALL_WORDS.push({ en: w.en, he: w.he, ex: w.ex || "", id: `${list.id}-${i}`, ui: `${list.id}p${Math.floor(i / PACK)}`, custom: true });
  }));
}
function parseWordList(text) {
  const out = [];
  const seen = new Set();
  text.split(/\r?\n/).forEach((line) => {
    line = line.trim();
    if (!line) return;
    let parts = null;
    for (const sep of ["\t", " - ", " – ", " — ", "=", ":", " -", "- "]) {
      if (line.includes(sep)) { const i = line.indexOf(sep); parts = [line.slice(0, i), line.slice(i + sep.length)]; break; }
    }
    if (!parts && line.includes(",")) { const i = line.indexOf(","); parts = [line.slice(0, i), line.slice(i + 1)]; }
    if (!parts) return;
    let [a, b] = parts.map((x) => x.trim());
    if (/[֐-׿]/.test(a) && !/[֐-׿]/.test(b)) [a, b] = [b, a];
    if (!a || !b || !/[A-Za-z]/.test(a)) return;
    const key = a.toLowerCase();
    if (seen.has(key)) return;
    seen.add(key);
    out.push({ en: a.slice(0, 60), he: b.slice(0, 80) });
  });
  return out.slice(0, 400);
}
const vocabSources = () => [
  ...BANDS.map((b) => ({ key: b.key, name: b.name, packs: b.packs, size: b.size,
    desc: b.key === "b1" ? "המילים הבסיסיות – לוודא שהכל ידוע" : "המילים של כיתות ז'–ט'" })),
  ...(S.custom || []).map((l) => ({ key: l.id, name: l.name, custom: true, size: l.words.length,
    packs: [...new Set(ALL_WORDS.filter((w) => w.custom && w.id.startsWith(l.id + "-")).map((w) => w.ui))], desc: "רשימה מהכיתה" }))
];
const srcWords = (src) => src.packs.flatMap(packWords);
const srcMastered = (src) => srcWords(src).filter((w) => mastered(w.id)).length;

/* ---------- מסך המיומנויות ---------- */
function skillsTeaser() {
  const b1 = BANDS.find((b) => b.key === "b1");
  const pct = (a, b) => (b ? Math.round((a / b) * 100) : 0);
  const tiles = [
    ["📚", "אוצר מילים", b1 ? `<span dir="ltr">Band 1: ${pct(srcMastered({ packs: b1.packs }), b1.size)}%</span>` : ""],
    ["📜", "קריאה", HAS_READ ? `${Object.keys(S.skills.read).length}/${READINGS.length}` : ""],
    ["🎧", "שמיעה", HAS_LISTEN ? `${Object.keys(S.skills.listen).length}/${PODCASTS.length}` : ""],
    ["✍️", "כתיבה", HAS_WRITE ? `שלב ${writeLevelUnlocked()}` : ""]
  ];
  return `<button class="card skills-t" id="skillsT">
    <div class="skills-t-h"><b>🏋️ מיומנויות לקראת סוף כיתה ח'</b><span class="go-arrow">←</span></div>
    <div class="skills-t-grid">${tiles.map(([i, n, v]) => `<div><span>${i}</span><b>${n}</b><small>${v}</small></div>`).join("")}</div>
  </button>`;
}

function skillsScreen() {
  registerCustom();
  const srcs = vocabSources();
  show(`${topbar()}<main class="page">
    <h2 class="sec-t">🏋️ מיומנויות</h2>
    <p class="sec-sub">ארבעת התחומים שצריך לשלוט בהם עד סוף כיתה ח'. מומלץ לשלב בכל מפגש: יחידה מהמסע + תרגול אחד מכאן.</p>
    <div class="sk-grid">
      <button class="sk-card" data-sk="vocab"><span class="sk-ic">📚</span><b>אוצר מילים</b>
        <small>${srcs.map((s) => `<span dir="ltr">${esc(s.name)}: ${srcMastered(s)}/${s.size}</span>`).join("<br>") || "—"}</small></button>
      <button class="sk-card" data-sk="read" ${HAS_READ ? "" : "disabled"}><span class="sk-ic">📜</span><b>הבנת הנקרא</b>
        <small>${HAS_READ ? `${Object.keys(S.skills.read).length} מתוך ${READINGS.length} סיפורים` : "בקרוב"}</small></button>
      <button class="sk-card" data-sk="listen" ${HAS_LISTEN ? "" : "disabled"}><span class="sk-ic">🎧</span><b>הבנת הנשמע</b>
        <small>${HAS_LISTEN ? `${Object.keys(S.skills.listen).length} מתוך ${PODCASTS.length} ראיונות` : "בקרוב"}</small></button>
      <button class="sk-card" data-sk="write" ${HAS_WRITE ? "" : "disabled"}><span class="sk-ic">✍️</span><b>כתיבה</b>
        <small>${HAS_WRITE ? `שלב ${writeLevelUnlocked()} · ${WRITE_LEVELS[writeLevelUnlocked() - 1].range}` : "בקרוב"}</small></button>
    </div>
  </main>${navbar("skills")}`);
  bindNav();
  $$("[data-sk]").forEach((b) => (b.onclick = () => {
    sfx.tap();
    ({ vocab: vocabScreen, read: readListScreen, listen: listenListScreen, write: writeListScreen })[b.dataset.sk]();
  }));
}

/* =========================================================
   📚 אוצר מילים
   ========================================================= */
function vocabScreen() {
  registerCustom();
  const srcs = vocabSources();
  show(`${topbar(true)}<main class="page">
    <h2 class="sec-t">📚 אוצר מילים</h2>
    <p class="sec-sub">קודם מוודאים שכל מילות Band 1 ידועות, ואז מתקדמים ל-Band 2.</p>
    ${srcs.map((s) => {
      const m = srcMastered(s);
      return `<button class="card src" data-src="${s.key}">
        <div class="src-h"><b dir="ltr">${esc(s.name)}</b><span>${m}/${s.size}</span></div>
        <div class="pbar thin"><div style="width:${s.size ? (m / s.size) * 100 : 0}%"></div></div>
        <small class="muted">${esc(s.desc)}</small></button>`;
    }).join("")}
    <p class="hint">💡 יש לכם רשימת מילים מהחוברת או מ-Quizlet? אפשר להוסיף אותה באזור ההורים ← "רשימות מילים מהכיתה".</p>
  </main>`);
  bindTopbar(skillsScreen);
  $$("[data-src]").forEach((b) => (b.onclick = () => { sfx.tap(); bandScreen(b.dataset.src); }));
}

function bandScreen(key) {
  const src = vocabSources().find((s) => s.key === key);
  if (!src) return vocabScreen();
  const words = srcWords(src);
  const unchecked = words.filter((w) => !S.words[w.id]);
  show(`${topbar(true)}<main class="page">
    <h2 class="sec-t" dir="ltr" style="text-align:right">${esc(src.name)}</h2>
    <div class="card">
      <div class="stats3">
        <div><b>${srcMastered(src)}</b><small>שולט 💪</small></div>
        <div><b>${words.filter((w) => S.words[w.id] && !mastered(w.id)).length}</b><small>בתהליך</small></div>
        <div><b>${unchecked.length}</b><small>עוד לא נבדקו</small></div>
      </div>
      ${unchecked.length ? `<button class="btn big" id="check">🔍 בדיקת ידע מהירה (20 מילים)</button>
        <p class="hint">המשחק שואל מילים שעוד לא בדקנו. מה שאתה כבר יודע – מסומן כ"שולט", ומה שלא – נכנס ללימוד.</p>` : ""}
      <button class="btn ${unchecked.length ? "ghost" : ""} big" id="weak">🔁 תרגול המילים הכי חלשות</button>
    </div>
    <h3 class="sec-t small">חבילות (15 מילים בכל אחת)</h3>
    <div class="packs">${src.packs.map((pk, i) => {
      const ws = packWords(pk), m = ws.filter((w) => mastered(w.id)).length, rec = skillRec("band", pk);
      return `<button class="pack ${m === ws.length ? "full" : ""}" data-pk="${pk}">
        <b>${i + 1}</b><small>${m}/${ws.length}</small>${rec ? `<span class="pk-st">${"★".repeat(rec.stars)}</span>` : ""}</button>`;
    }).join("")}</div>
  </main>`);
  bindTopbar(vocabScreen);
  $$("[data-pk]").forEach((b) => (b.onclick = () => { sfx.tap(); packScreen(key, b.dataset.pk); }));
  const c = $("#check");
  if (c) c.onclick = () => {
    const pick = unchecked.slice(0, 60);
    const chosen = shuffle(pick).slice(0, 20);
    runner({ title: "🔍 בדיקת ידע", items: chosen.map((w) => ({ kind: "know", wordId: w.id, w, opts: shuffle([w, ...sample(words.filter((x) => x.id !== w.id && x.he !== w.he), 3)]), noRetry: true })),
      onQuit: () => bandScreen(key),
      onFinish: (r) => {
        S.xp += r.xp; recordDay(); const na = checkAch(); save(true); sfx.win();
        show(`<main class="page center-screen result"><div class="res-ic">🔍</div><h2 class="title">בדיקת הידע הסתיימה</h2>
          <div class="card res-card"><div class="res-row"><span>מילים שאתה כבר יודע</span><b>${r.first}/${r.total}</b></div>
          <div class="res-row"><span>נקודות</span><b dir="ltr">+${r.xp} XP</b></div></div>
          ${na.map((a) => `<div class="card ach-new">${a.icon} הישג חדש: <b>${a.name}</b><small>${a.desc}</small></div>`).join("")}
          <p class="hint">המילים שלא ידעת מחכות לך בחבילות – תלמד אותן בכרטיסיות ובתרגול.</p>
          <div class="row"><button class="btn ghost" id="b">חזרה</button><button class="btn" id="again">עוד 20 מילים 🔍</button></div></main>`);
        $("#b").onclick = () => bandScreen(key);
        $("#again").onclick = () => { bandScreen(key); const cc = $("#check"); if (cc) cc.click(); };
      } });
  };
  $("#weak").onclick = () => {
    const seen = words.filter((w) => S.words[w.id] && S.words[w.id].seen);
    if (seen.length < 4) { toast("קודם צריך ללמוד כמה מילים בחבילות 📖"); return; }
    const chosen = shuffle(seen).sort((a, b) => S.words[a.id].s - S.words[b.id].s).slice(0, 12);
    runner({ title: "🔁 מילים חלשות", items: shuffle(chosen).map((w) => vocabMixItem(w)), onQuit: () => bandScreen(key),
      onFinish: (r) => simpleResult("🔁", "סבב חיזוק הושלם!", r, () => bandScreen(key)) });
  };
}
function vocabMixItem(w) {
  const pool = packWords(w.ui).length >= 4 ? packWords(w.ui) : ALL_WORDS.filter((x) => x.ui === w.ui || x.id.split("-")[0] === w.id.split("-")[0]);
  const k = pick((S.words[w.id] || {}).s >= 2 ? ["mcWord", "mcHe", "listen", "spell"] : ["mcWord", "mcHe", "listen"]);
  return k === "spell" ? { kind: "spell", wordId: w.id, w } : mkVocab(k, w, pool);
}

function packScreen(key, pk) {
  const ws = packWords(pk);
  const src = vocabSources().find((s) => s.key === key);
  const idx = src ? src.packs.indexOf(pk) + 1 : 1;
  show(`${topbar(true)}<main class="page">
    <h2 class="sec-t"><span dir="ltr">${esc(src ? src.name : "")}</span> · חבילה ${idx}</h2>
    <div class="row"><button class="btn" id="learn">📖 כרטיסיות</button><button class="btn" id="prac">🎯 תרגול</button></div>
    <div class="card dict">${ws.map((w) => { const s = (S.words[w.id] || {}).s || 0; return `<div class="dict-row"><span dir="ltr">${spk(w.en)} ${esc(w.en)}</span><span>${esc(w.he)}</span><span class="str s${Math.min(s, 5)}">${S.words[w.id] ? "●".repeat(Math.max(1, s)) : "○"}</span></div>`; }).join("")}</div>
  </main>`);
  bindTopbar(() => bandScreen(key));
  $("#learn").onclick = () => flashcards(ws, () => packScreen(key, pk), () => packPractice(key, pk));
  $("#prac").onclick = () => packPractice(key, pk);
}
function packPractice(key, pk) {
  const ws = packWords(pk);
  ws.forEach((w) => markSeen(w.id));
  const sh = shuffle(ws);
  const items = [{ kind: "match", words: sh.slice(0, 6), noRetry: true }];
  if (sh.length >= 12) items.push({ kind: "match", words: sh.slice(6, 12), noRetry: true });
  const order = shuffle(ws);
  let k = 0;
  const nw = () => order[k++ % order.length];
  for (let i = 0; i < 3; i++) items.push(mkVocab("mcWord", nw(), ws));
  for (let i = 0; i < 3; i++) items.push(mkVocab("mcHe", nw(), ws));
  for (let i = 0; i < 2; i++) items.push(mkVocab("listen", nw(), ws));
  let f = 0;
  for (const w of shuffle(ws)) { const it = mkFill(w, ws); if (it) { items.push(it); if (++f >= 3) break; } }
  for (const w of sample(ws, 3)) items.push({ kind: "spell", wordId: w.id, w });
  runner({ title: "🎯 תרגול חבילה", items, onQuit: () => packScreen(key, pk), onFinish: (r) => {
    const prev = skillRec("band", pk);
    S.skills.band[pk] = { stars: Math.max(r.stars, (prev && prev.stars) || 0), best: Math.max(Math.round(r.acc * 100), (prev && prev.best) || 0) };
    simpleResult("🎯", "החבילה תורגלה!", r, () => packScreen(key, pk), { coins: prev ? r.stars : r.stars * 4 });
  } });
}

/* כרטיסיות כלליות */
function flashcards(words, back, done) {
  let i = 0, revealed = false;
  const render = () => {
    const w = words[i];
    markSeen(w.id);
    const exHtml = w.ex ? esc(w.ex).replace(new RegExp(`\\b(${w.en.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})\\b`, "i"), "<mark>$1</mark>") : "";
    show(`${topbar(true)}<main class="page">
      <div class="run-top"><div class="pbar"><div style="width:${((i + 1) / words.length) * 100}%"></div></div><span class="cnt">${i + 1}/${words.length}</span></div>
      <div class="flash card">
        <div class="fl-en" dir="ltr">${esc(w.en)}</div>${spk(w.en, "big")}
        ${revealed ? `<div class="fl-he">${esc(w.he)}</div>${w.ex ? `<div class="fl-ex" dir="ltr">${exHtml} ${spk(w.ex)}</div>` : ""}` : `<button class="btn ghost" id="rev">👀 הצג תרגום</button>`}
      </div>
      <div class="row"><button class="btn ghost" id="prev" ${i === 0 ? "disabled" : ""}>→ הקודם</button>
        <button class="btn" id="next">${i === words.length - 1 ? "לתרגול 🎯" : "הבא ←"}</button></div>
    </main>`);
    bindTopbar(back);
    const r = $("#rev");
    if (r) r.onclick = () => { revealed = true; render(); };
    $("#prev").onclick = () => { if (i > 0) { i--; revealed = false; render(); } };
    const nxt = () => {
      if (!revealed) { revealed = true; render(); return; }
      if (i < words.length - 1) { i++; revealed = false; render(); } else { save(); done(); }
    };
    $("#next").onclick = nxt;
    onEnter = nxt;
  };
  render();
}

/* תוצאה כללית לתרגולי מיומנויות */
function simpleResult(icon, title, r, back, { coins = r.stars * 3, extra = "", xpBonus = 0 } = {}) {
  const lvlBefore = levelOf(S.xp);
  S.xp += r.xp + xpBonus; S.coins += coins; recordDay();
  const na = [...(r.perfect ? grantAch("perfect") : []), ...checkAch()];
  save(true); sfx.win(); confetti(70);
  const lvlAfter = levelOf(S.xp);
  show(`<main class="page center-screen result"><div class="res-ic">${icon}</div><h2 class="title">${title}</h2>
    <div class="res-stars">${starsHtml(r.stars)}</div>
    <div class="card res-card">
      ${r.total ? `<div class="res-row"><span>נכון בניסיון ראשון</span><b>${r.first}/${r.total}</b></div>` : ""}
      <div class="res-row"><span>נקודות</span><b dir="ltr">+${r.xp + xpBonus} XP</b></div>
      <div class="res-row"><span>מטבעות</span><b dir="ltr">+${coins} 🪙</b></div>
    </div>
    ${lvlAfter > lvlBefore ? `<div class="card levelup">⬆️ עלית לרמה <b>${lvlAfter}</b>! ${rankOf(lvlAfter).icon} ${rankOf(lvlAfter).name}</div>` : ""}
    ${na.map((a) => `<div class="card ach-new">${a.icon} הישג חדש: <b>${a.name}</b><small>${a.desc}</small></div>`).join("")}
    ${extra}
    <div class="row"><button class="btn" id="b">המשך ←</button></div></main>`);
  $("#b").onclick = back;
  onEnter = back;
}

/* תרגיל "האם אתה מכיר?" – עם כפתור "לא יודע" */
RENDER.know = function (it, el, done) {
  const opts = it.opts.map((o) => o.he);
  el.innerHTML = `<div class="prompt"><div class="q-lbl">אתה מכיר את המילה?</div><div class="big-word" dir="ltr">${esc(it.w.en)} ${spk(it.w.en)}</div></div>
    <div class="opts grid">${opts.map((o, i) => `<button class="opt" data-i="${i}"><span class="k">${i + 1}</span>${esc(o)}</button>`).join("")}</div>
    <button class="btn ghost dunno" id="dunno">🤷 לא יודע</button>`;
  const correct = it.opts.indexOf(it.w);
  const btns = $$(".opt", el);
  const finish = (i) => {
    const ok = i === correct;
    btns[correct].classList.add("right");
    if (i >= 0 && !ok) btns[i].classList.add("wrong");
    if (ok) { const r = (S.words[it.w.id] = S.words[it.w.id] || { s: 0, ok: 0, bad: 0 }); r.s = Math.max(r.s, 3); r.known = true; }
    onKey = null;
    $("#dunno", el).disabled = true;
    done(ok, it.w.he);
  };
  btns.forEach((b, i) => (b.onclick = () => finish(i)));
  $("#dunno", el).onclick = () => finish(-1);
  onKey = (n) => { if (n >= 1 && n <= opts.length) finish(n - 1); };
};

/* =========================================================
   📜 הבנת הנקרא
   ========================================================= */
const LEVEL_NAMES = { 1: "רמה 1 – בסיסי", 2: "רמה 2 – בינוני", 3: "רמה 3 – מתקדם" };
function readListScreen() {
  show(`${topbar(true)}<main class="page">
    <h2 class="sec-t">📜 הבנת הנקרא</h2>
    <p class="sec-sub">סיפורים קצרים בשלוש פסקאות: פתיחה, גוף הסיפור וסיום. בכל סיפור 8 שאלות – אמריקאיות, השלמה והעתקה מהטקסט.</p>
    ${[1, 2, 3].map((lv) => {
      const list = READINGS.filter((r) => r.level === lv);
      if (!list.length) return "";
      return `<h3 class="sec-t small">${LEVEL_NAMES[lv]}</h3><div class="list">${list.map((r) => {
        const rec = skillRec("read", r.id);
        return `<button class="li" data-r="${r.id}"><span class="li-ic">📜</span><span class="li-t"><b dir="ltr">${esc(r.title)}</b><small>${esc(r.he || "")}</small></span><span class="li-s">${rec ? starsHtml(rec.stars) : "▶"}</span></button>`;
      }).join("")}</div>`;
    }).join("")}
  </main>`);
  bindTopbar(skillsScreen);
  $$("[data-r]").forEach((b) => (b.onclick = () => { sfx.tap(); readScreen(READINGS.find((r) => r.id === b.dataset.r)); }));
}
const PARA_TAGS = ["פתיחה", "גוף הסיפור", "סיום"];
const textOf = (r) => r.paragraphs.join("\n\n");
const sentencesOf = (r) => r.paragraphs.join(" ").split(/(?<=[.!?])\s+/).filter(Boolean);
function readScreen(r) {
  show(`${topbar(true)}<main class="page">
    <div class="card">
      <div class="node-n">📜 קריאה · ${LEVEL_NAMES[r.level] || ""}</div>
      <h2 dir="ltr" class="unit-t">${esc(r.title)} ${spk(r.paragraphs.join(" "))}</h2>
      <p class="hint">👆 לחץ על מילה כדי לראות תרגום. שים לב למבנה: פתיחה ← גוף הסיפור ← סיום.</p>
      ${r.paragraphs.map((p, i) => `<div class="para"><span class="para-tag">${PARA_TAGS[i] || ""}</span><div class="passage-text" dir="ltr">${passageHtml(p)}</div></div>`).join("")}
      <button class="btn big" id="go">קראתי – לשאלות! ❓</button>
    </div></main>`);
  bindTopbar(readListScreen);
  bindPassage(app);
  $("#go").onclick = () => runner({
    title: `📜 ${esc(r.title)}`,
    items: r.questions.map((q) => q.type === "mc" ? { kind: "mc", q: q.q, options: q.options, a: q.a }
      : q.type === "quote" ? { kind: "quote", q: q.q, answer: q.answer, sentences: sentencesOf(r) }
      : { kind: "type", q: q.q, answer: q.answer, he: "השלם במילה או במספר מתוך הטקסט" }),
    passage: { title: r.title, text: textOf(r) },
    onQuit: () => readScreen(r),
    onFinish: (res) => {
      const prev = skillRec("read", r.id);
      S.skills.read[r.id] = { stars: Math.max(res.stars, (prev && prev.stars) || 0), best: Math.max(Math.round(res.acc * 100), (prev && prev.best) || 0), date: dateKey() };
      simpleResult("📜", "סיימת את הסיפור!", res, readListScreen, { coins: prev ? res.stars : res.stars * 5, xpBonus: prev ? 0 : 20 });
    }
  });
}
/* תרגיל העתקה מהטקסט: בוחרים את המשפט המתאים */
RENDER.quote = function (it, el, done) {
  let sel = -1;
  el.innerHTML = `<div class="prompt"><div class="q-lbl">✂️ העתק מהטקסט – בחר את המשפט המתאים</div><div class="sentence small" dir="ltr">${esc(it.q)}</div></div>
    <div class="quotes" dir="ltr">${it.sentences.map((s, i) => `<button class="qs" data-i="${i}">${esc(s)}</button>`).join("")}</div>
    <button class="btn" id="chk" disabled>בדוק ✔️</button>`;
  $$(".qs", el).forEach((b) => (b.onclick = () => {
    sel = +b.dataset.i;
    $$(".qs", el).forEach((x) => x.classList.toggle("sel", x === b));
    $("#chk", el).disabled = false;
  }));
  $("#chk", el).onclick = () => {
    const ok = norm(it.sentences[sel]) === norm(it.answer);
    const right = it.sentences.findIndex((s) => norm(s) === norm(it.answer));
    if (right >= 0) $$(".qs", el)[right].classList.add("right");
    if (!ok) $$(".qs", el)[sel].classList.add("wrong");
    done(ok, it.answer);
  };
};

/* =========================================================
   🎧 הבנת הנשמע – ראיונות קצרים
   ========================================================= */
const MALE_RE = /\b(male|david|daniel|alex|fred|guy|mark|george|james|tom|aaron|arthur|ryan|christopher|eric|roger|brian|andrew|thomas|oliver|rishi|lee|gordon|reed|rocko|eddy|grandpa)\b/i;
const FEMALE_RE = /\b(female|samantha|zira|susan|karen|moira|tessa|victoria|aria|jenny|hazel|libby|sonia|emma|ava|allison|serena|fiona|kate|catherine|nicky|joanna|salli|kimberly|ivy|kendra|amy|olivia|natasha|clara|michelle|ana|sara|grandma|shelley|sandy|flo)\b/i;
function podcastVoices() {
  if (!("speechSynthesis" in window)) return null;
  const en = speechSynthesis.getVoices().filter((v) => /^en[-_]/i.test(v.lang));
  const male = en.filter((v) => MALE_RE.test(v.name) && !FEMALE_RE.test(v.name));
  const neutral = en.filter((v) => !FEMALE_RE.test(v.name));
  const host = male[0] || neutral[0] || en[0] || null;
  const guest = male.find((v) => v !== host) || neutral.find((v) => v !== host) || host;
  return { host, guest, same: host === guest };
}
const player = { playing: false, idx: 0, pod: null, onLine: null, onEnd: null, rate: 1 };
function playPodcast(pod, from = 0) {
  if (!("speechSynthesis" in window)) { ttsMissing(); return; }
  speechSynthesis.cancel();
  const vs = podcastVoices() || {};
  player.pod = pod; player.idx = from; player.playing = true;
  const next = () => {
    if (!player.playing || player.pod !== pod) return;
    if (player.idx >= pod.lines.length) { player.playing = false; player.idx = 0; if (player.onEnd) player.onEnd(); return; }
    const line = pod.lines[player.idx];
    const u = new SpeechSynthesisUtterance(line.t);
    u.lang = "en-US";
    const isHost = line.s === "host";
    const v = isHost ? vs.host : vs.guest;
    if (v) u.voice = v;
    u.rate = (isHost ? 0.95 : 0.9) * player.rate * (S.settings.rate / 0.85);
    u.pitch = vs.same ? (isHost ? 1 : 0.75) : (isHost ? 1 : 0.9);
    u.onend = () => { if (player.pod === pod && player.playing) { player.idx++; setTimeout(next, 350); } };
    u.onerror = () => { player.playing = false; if (player.onLine) player.onLine(); };
    if (player.onLine) player.onLine();
    speechSynthesis.speak(u);
  };
  next();
}
function stopPodcast() { player.playing = false; if ("speechSynthesis" in window) speechSynthesis.cancel(); if (player.onLine) player.onLine(); }

function listenListScreen() {
  show(`${topbar(true)}<main class="page">
    <h2 class="sec-t">🎧 הבנת הנשמע</h2>
    <p class="sec-sub">ראיונות קצרים (פודקאסט): מנחה מראיין אורח – מי הוא, מה המקצוע שלו, וסיפור אחד מעניין. מקשיבים ועונים על שאלות.</p>
    ${[1, 2, 3].map((lv) => {
      const list = PODCASTS.filter((p) => p.level === lv);
      if (!list.length) return "";
      return `<h3 class="sec-t small">${LEVEL_NAMES[lv]}</h3><div class="list">${list.map((p) => {
        const rec = skillRec("listen", p.id), n = PODCASTS.indexOf(p) + 1;
        return `<button class="li" data-p="${p.id}"><span class="li-ic">🎧</span><span class="li-t"><b>פרק ${n}</b><small>${rec ? `<span dir="ltr">${esc(p.title)}</span>` : "עוד לא הקשבת"}</small></span><span class="li-s">${rec ? starsHtml(rec.stars) : "▶"}</span></button>`;
      }).join("")}</div>`;
    }).join("")}
    <p class="hint">💡 הראיונות מושמעים בקול ממוחשב של הדפדפן. מומלץ אוזניות ומקום שקט.</p>
  </main>`);
  bindTopbar(() => { stopPodcast(); skillsScreen(); });
  $$("[data-p]").forEach((b) => (b.onclick = () => { sfx.tap(); listenScreen(PODCASTS.find((p) => p.id === b.dataset.p)); }));
}
function playerHtml(pod) {
  return `<div class="player card">
    <div class="pl-row">
      <button class="pl-btn" id="plPlay">${player.playing && player.pod === pod ? "⏸" : "▶"}</button>
      <div class="pl-lines">${pod.lines.map((l, i) => `<span class="pl-dot ${l.s} ${player.pod === pod && player.playing && i === player.idx ? "on" : ""} ${player.pod === pod && i < player.idx ? "past" : ""}" data-li="${i}" title="${l.s === "host" ? "מראיין" : "אורח"}"></span>`).join("")}</div>
    </div>
    <div class="pl-row small">
      <span class="pl-who" id="plWho">${player.pod === pod && player.playing ? (pod.lines[player.idx].s === "host" ? "🎙️ המראיין מדבר" : "👤 האורח מדבר") : "לחץ ▶ כדי להקשיב"}</span>
      <button class="chip" id="plRate">${player.rate < 1 ? "🐢 איטי" : "🐇 רגיל"}</button>
      <button class="chip" id="plRestart">⏮ מההתחלה</button>
    </div></div>`;
}
function bindPlayer(pod) {
  const refresh = () => {
    const box = $(".player");
    if (!box) return;
    box.outerHTML = playerHtml(pod);
    bindPlayer(pod);
  };
  player.onLine = refresh;
  player.onEnd = () => { refresh(); const g = $("#go"); if (g) g.classList.add("pulse"); };
  $("#plPlay").onclick = () => { if (player.playing && player.pod === pod) stopPodcast(); else playPodcast(pod, player.pod === pod ? player.idx : 0); refresh(); };
  $("#plRestart").onclick = () => { playPodcast(pod, 0); refresh(); };
  $("#plRate").onclick = () => { player.rate = player.rate < 1 ? 1 : 0.75; refresh(); };
  $$("[data-li]").forEach((d) => (d.onclick = () => { playPodcast(pod, +d.dataset.li); refresh(); }));
}
function listenScreen(pod) {
  const n = PODCASTS.indexOf(pod) + 1;
  stopPodcast(); player.pod = pod; player.idx = 0;
  show(`${topbar(true)}<main class="page">
    <div class="card">
      <div class="node-n">🎧 הבנת הנשמע · ${LEVEL_NAMES[pod.level] || ""}</div>
      <h2 class="unit-t">פרק ${n}</h2>
      <p>🎙️ ראיון קצר בין מנחה לאורח. שים לב: <b>מי האורח? מה המקצוע שלו? מה הסיפור שהוא מספר?</b></p>
      <p class="hint">🔴 נקודות כחולות = המראיין · 🟠 נקודות כתומות = האורח. אפשר ללחוץ על נקודה כדי לשמוע שוב משפט.</p>
    </div>
    ${playerHtml(pod)}
    <button class="btn big" id="go">לשאלות ❓</button>
    <p class="hint center">💡 מומלץ להקשיב פעם אחת עד הסוף לפני השאלות. בזמן השאלות אפשר להקשיב שוב.</p>
  </main>`);
  bindTopbar(() => { stopPodcast(); listenListScreen(); });
  bindPlayer(pod);
  $("#go").onclick = () => {
    runner({
      title: `🎧 פרק ${n}`,
      items: pod.questions.map((q) => q.type === "mc" ? { kind: "mc", q: q.q, options: q.options, a: q.a } : { kind: "type", q: q.q, answer: q.answer, he: "ענה במילה אחת או במספר" }),
      header: () => playerHtml(pod),
      onRender: () => bindPlayer(pod),
      onQuit: () => { stopPodcast(); listenScreen(pod); },
      onFinish: (res) => {
        stopPodcast();
        const prev = skillRec("listen", pod.id);
        S.skills.listen[pod.id] = { stars: Math.max(res.stars, (prev && prev.stars) || 0), best: Math.max(Math.round(res.acc * 100), (prev && prev.best) || 0), date: dateKey() };
        const transcript = `<details class="card transcript"><summary>📄 תמליל הראיון – <span dir="ltr">${esc(pod.title)}</span></summary>
          ${pod.lines.map((l) => `<p dir="ltr"><b>${esc(l.s === "host" ? pod.host : pod.guest)}:</b> ${esc(l.t)} ${spk(l.t)}</p>`).join("")}</details>`;
        simpleResult("🎧", "סיימת את הראיון!", res, listenListScreen, { coins: prev ? res.stars : res.stars * 5, xpBonus: prev ? 0 : 20, extra: transcript });
      }
    });
  };
}

/* =========================================================
   ✍️ כתיבה – פתיחה, אמצע, סיום
   ========================================================= */
const WRITE_LEVELS = [
  { lv: 1, min: 30, max: 40, range: "30 עד 40 מילים", name: "שלב 1" },
  { lv: 2, min: 40, max: 50, range: "40 עד 50 מילים", name: "שלב 2" },
  { lv: 3, min: 50, max: 60, range: "50 עד 60 מילים", name: "שלב 3" },
  { lv: 4, min: 70, max: 90, range: "70 עד 90 מילים", name: "שלב 4 – מתקדם (ט'–י')" }
];
const TYPE_NAMES = { description: "📝 תיאור", opinion: "💭 הבעת דעה", suggestion: "💡 הצעה", letter: "✉️ מכתב" };
const CONNECTORS = ["when", "after", "before", "first", "second", "third", "then", "also", "in addition", "moreover", "however", "but", "because", "so", "for example", "for instance", "finally", "in conclusion", "to sum up", "on the other hand", "although", "after that", "besides", "therefore", "lastly", "and"];
const writeDoneAt = (lv) => WRITING.filter((t) => t.level === lv && skillRec("write", t.id)).length;
function writeLevelUnlocked() {
  if (!HAS_WRITE) return 1;
  if (S.settings.unlockAll) return 4;
  let lv = 1;
  while (lv < 4 && writeDoneAt(lv) >= 3) lv++;
  return lv;
}
function writeListScreen() {
  const open = writeLevelUnlocked();
  show(`${topbar(true)}<main class="page">
    <h2 class="sec-t">✍️ כתיבה</h2>
    <p class="sec-sub">כותבים טקסט מסודר: <b>פתיחה</b>, <b>אמצע</b> ו<b>סיום</b>. מתחילים ב-30 עד 40 מילים, ומשלימים 3 משימות כדי לפתוח את השלב הבא.</p>
    ${WRITE_LEVELS.map((L) => {
      const list = WRITING.filter((t) => t.level === L.lv);
      if (!list.length) return "";
      const locked = L.lv > open;
      return `<h3 class="sec-t small">${locked ? "🔒" : "✏️"} ${L.name} · ${L.range} ${!locked && L.lv < 4 ? `<small class="muted">(${Math.min(writeDoneAt(L.lv), 3)}/3 לפתיחת השלב הבא)</small>` : ""}</h3>
        <div class="list ${locked ? "locked" : ""}">${list.map((t) => {
          const rec = skillRec("write", t.id);
          return `<button class="li" data-w="${t.id}" ${locked ? "disabled" : ""}><span class="li-ic">${(TYPE_NAMES[t.type] || "📝").split(" ")[0]}</span><span class="li-t"><b dir="ltr">${esc(t.title)}</b><small>${TYPE_NAMES[t.type] ? TYPE_NAMES[t.type].split(" ").slice(1).join(" ") : ""}</small></span><span class="li-s">${rec ? starsHtml(rec.stars) : locked ? "" : "▶"}</span></button>`;
        }).join("")}</div>`;
    }).join("")}
  </main>`);
  bindTopbar(skillsScreen);
  $$("[data-w]").forEach((b) => (b.onclick = () => { sfx.tap(); writeTaskScreen(WRITING.find((t) => t.id === b.dataset.w)); }));
}
const CLOSING_RE = /\b(thank you|thanks|yours|sincerely|best regards|regards|best wishes|see you|your friend|love)\b/i;
function writeChecks(parts, task) {
  const L = WRITE_LEVELS[task.level - 1];
  const all = [parts.open, parts.middle, parts.end].map((x) => x.trim()).filter(Boolean).join(" ");
  const n = wordCount(all);
  const low = all.toLowerCase();
  const conn = CONNECTORS.filter((c) => new RegExp(`(^|[^a-z])${c}([^a-z]|$)`).test(low)).filter((c) => c !== "and");
  const needConn = task.level === 1 ? 1 : 2;
  /* במכתב: שורת הפנייה (Dear ...,) ושורות החתימה (Thank you, / שם) אינן משפטים רגילים */
  let body = all;
  if (task.type === "letter") {
    body = body.replace(/^\s*dear\b[^,\n]*,?\s*/i, "");
    const m = body.match(/(^|[.!?]\s+)((thank you|thanks|yours|sincerely|best regards|regards|best wishes|see you|your friend|love)\b[^.!?]*)$/i);
    if (m) body = body.slice(0, body.length - m[2].length);
  }
  body = body.trim();
  const sentences = body.split(/(?<=[.!?])\s+/).filter((x) => x.trim());
  const isLetter = task.type === "letter";
  const checks = [
    { label: `אורך: ${L.range} (כתבת ${n})`, ok: n >= L.min && n <= L.max + 5, must: true },
    { label: isLetter ? "יש פתיחה: פנייה ומשפט שמסביר למה אתה כותב" : "יש פתיחה", ok: wordCount(parts.open) >= 4 },
    { label: "יש אמצע (לפחות 2 משפטים)", ok: (parts.middle.match(/[.!?]+/g) || []).length >= 2 },
    { label: isLetter ? "יש סיום ושם" : "יש סיום", en: isLetter ? "Thank you, / Yours," : "", ok: isLetter ? CLOSING_RE.test(parts.end) || wordCount(parts.end) >= 4 : wordCount(parts.end) >= 4 },
    { label: needConn === 1 ? "מילת קישור אחת לפחות" : "2 מילות קישור לפחות", en: conn.length ? conn.join(", ") : "First, also, because, In conclusion…", ok: conn.length >= needConn },
    { label: "כל משפט מתחיל באות גדולה ומסתיים בנקודה", ok: body.length > 0 && sentences.every((x) => /^[^A-Za-z]*[A-Z]/.test(x)) && /[.!?]["']?$/.test(body) },
    { label: "המילה I כתובה באות גדולה", ok: all.length > 0 && !/(^|[^A-Za-z'])i([^A-Za-z']|$)/.test(all) }
  ];
  if (task.type === "opinion") checks.push({ label: "הבעת דעה (I think / In my opinion / I believe)", ok: /\b(i think|in my opinion|i believe|i feel|i agree|i disagree)\b/i.test(all) });
  if (task.type === "suggestion") checks.push({ label: "הצעה", en: "I suggest / We should", ok: /\b(suggest|should|could|recommend)\b/i.test(all) });
  if (isLetter) checks.push({ label: "פנייה בתחילת המכתב", en: "Dear ...", ok: /^\s*dear\b/i.test(parts.open) });
  return { checks, n };
}
function writeTaskScreen(task) {
  const L = WRITE_LEVELS[task.level - 1];
  const dk = `wdraft_${task.id}`;
  let draft = { open: "", middle: "", end: "" };
  try { draft = { ...draft, ...JSON.parse(localStorage.getItem(dk) || "{}") }; } catch (e) { /* ignore */ }
  const sec = (key, num, name) => {
    const p = task.parts[key];
    return `<div class="wpart"><div class="wpart-h"><b>${num}. ${name}</b><small>${esc(p.he)}</small></div>
      <div class="chips">${p.starters.map((s) => `<button class="chip" data-ins="${key}" data-t="${esc(s)}" dir="ltr">${esc(s)}…</button>`).join("")}</div>
      <textarea class="ta wta" id="w_${key}" dir="ltr" spellcheck="false" autocapitalize="sentences" rows="${key === "middle" ? 5 : 3}">${esc(draft[key])}</textarea></div>`;
  };
  show(`${topbar(true)}<main class="page">
    <div class="card">
      <div class="node-n">✍️ ${L.name} · ${L.range} · ${TYPE_NAMES[task.type] || ""}</div>
      <h2 dir="ltr" class="unit-t">${esc(task.title)}</h2>
      <p dir="ltr" class="task-en">${esc(task.prompt)} ${spk(task.prompt)}</p>
      <p class="task">${esc(task.he)}</p>
      <div class="wcount" id="wcount"></div>
      ${sec("open", 1, "פתיחה")}${sec("middle", 2, "אמצע")}${sec("end", 3, "סיום")}
      <ul class="checks" id="checks"></ul>
      <div class="row"><button class="btn ghost" id="read">🔊 הקרא לי</button><button class="btn" id="send" disabled>שלח ✔️</button></div>
      <p class="hint">💡 לחץ על מילות הפתיחה כדי להוסיף אותן. אפשר לצאת באמצע – הטיוטה נשמרת.</p>
    </div></main>`);
  bindTopbar(writeListScreen);
  const get = () => ({ open: $("#w_open").value, middle: $("#w_middle").value, end: $("#w_end").value });
  const upd = () => {
    const parts = get();
    const { checks, n } = writeChecks(parts, task);
    const pct = Math.min(100, (n / L.max) * 100);
    $("#wcount").innerHTML = `<div class="wc-bar"><div class="wc-fill ${n > L.max + 5 ? "over" : n >= L.min ? "ok" : ""}" style="width:${pct}%"></div><div class="wc-min" style="right:${(L.min / L.max) * 100}%"></div></div><span>${n} מילים · יעד ${L.range}</span>`;
    $("#checks").innerHTML = checks.map((x) => `<li class="${x.ok ? "ok" : ""}">${x.ok ? "✅" : "⬜"} ${esc(x.label)}${x.en ? ` <span dir="ltr" class="muted">(${esc(x.en)})</span>` : ""}</li>`).join("");
    $("#send").disabled = n < L.min;
    try { localStorage.setItem(dk, JSON.stringify(parts)); } catch (e) { /* ignore */ }
  };
  $$(".wta").forEach((t) => (t.oninput = upd));
  $$("[data-ins]").forEach((b) => (b.onclick = () => {
    const ta = $(`#w_${b.dataset.ins}`);
    const t = b.dataset.t;
    ta.value = (ta.value.trim() ? ta.value.replace(/\s*$/, " ") : "") + t + " ";
    ta.focus(); ta.setSelectionRange(ta.value.length, ta.value.length);
    upd();
  }));
  upd();
  $("#read").onclick = () => { const p = get(); speak([p.open, p.middle, p.end].join(" ")); };
  $("#send").onclick = () => {
    const parts = get();
    const { checks, n } = writeChecks(parts, task);
    const score = checks.filter((x) => x.ok).length / checks.length;
    const stars = score === 1 ? 3 : score >= 0.7 ? 2 : 1;
    const text = [parts.open, parts.middle, parts.end].map((x) => x.trim()).filter(Boolean).join("\n\n");
    const prev = skillRec("write", task.id);
    S.skills.write[task.id] = { stars: Math.max(stars, (prev && prev.stars) || 0), words: n, date: dateKey() };
    const entry = { unit: -1, task: `${L.name}: ${task.title}`, date: dateKey(), text: text.slice(0, 3000), score: Math.round(score * 100), words: n };
    S.writings.unshift(entry);
    S.writings = S.writings.slice(0, 60);
    try { localStorage.removeItem(dk); } catch (e) { /* ignore */ }
    const before = writeLevelUnlocked();
    const r = { stars, xp: Math.round(score * 60), total: 0, first: 0, perfect: score === 1, acc: score };
    const extra = `<div class="card"><h3>📋 הבדיקה</h3><ul class="checks">${checks.map((x) => `<li class="${x.ok ? "ok" : ""}">${x.ok ? "✅" : "⬜"} ${esc(x.label)}${x.en ? ` <span dir="ltr" class="muted">(${esc(x.en)})</span>` : ""}</li>`).join("")}</ul></div>
      <div class="card ai-box" id="aibox" hidden><h3>🤖 משוב מהמורה הווירטואלי</h3><button class="btn" id="aibtn">בקש משוב על הכתיבה</button><div class="fbtext" id="aiout"></div></div>
      <details class="card"><summary>📝 תשובה לדוגמה</summary><p dir="ltr" class="model">${esc(task.model)}</p>${spk(task.model)}</details>`;
    simpleResult("✍️", "הכתיבה נשלחה!", r, writeListScreen, { coins: prev ? stars : stars * 6, extra });
    if (writeLevelUnlocked() > before) toast(`🔓 נפתח ${WRITE_LEVELS[writeLevelUnlocked() - 1].name}: ${WRITE_LEVELS[writeLevelUnlocked() - 1].range}`, 4000);
    setupAiFeedback(task, text, n, entry);
  };
}

/* משוב AI על כתיבה – זמין רק כשהמשחק פתוח דרך claude.ai */
async function setupAiFeedback(task, text, n, entry) {
  if (!window.claude || typeof window.claude.use !== "function") return;
  let ai = null;
  try { ai = await window.claude.use("sample"); } catch (e) { ai = null; }
  const box = $("#aibox");
  if (!ai || !box) return;
  box.hidden = false;
  const L = WRITE_LEVELS[task.level - 1];
  $("#aibtn").onclick = async () => {
    const btn = $("#aibtn"), out = $("#aiout");
    btn.disabled = true; btn.textContent = "חושב…";
    const prompt = `You are a warm, encouraging English teacher in Israel. A 12-13 year old boy in 7th grade (Hebrew speaker, about 4 years of English) wrote a short text.
Task (${task.type}): ${task.prompt}
Target length: ${L.min}-${L.max} words (he wrote ${n}). Required structure: opening, middle, ending.

His text:
<<<
${text}
>>>

Write your feedback IN HEBREW (English only when quoting or correcting his English), short and clear for a child, in exactly this format:
✅ מה טוב: one or two specific compliments.
✏️ לתיקון: up to 4 of his most important mistakes, each on its own line as: "<his words>" ← "<correct English>" – very short Hebrew explanation.
🧱 מבנה: one sentence about his opening / middle / ending.
💡 טיפ לפעם הבאה: one practical tip.
⭐ ציון: X/10
📝 גרסה מתוקנת: his text with minimal corrections (keep his ideas and level), in English.
Keep everything appropriate for a religious boy. Do not use markdown symbols like ** or #.`;
    try {
      const res = await ai(prompt, { onText: ({ text: t }) => { out.textContent = t; } });
      out.textContent = res.text;
      entry.fb = res.text.slice(0, 2500);
      save(true);
      btn.remove();
    } catch (e) {
      if (e && e.code === "not_granted") { box.hidden = true; return; }
      btn.disabled = false; btn.textContent = "נסה שוב";
      out.textContent = e && e.code === "rate_limited" ? "יותר מדי בקשות כרגע – נסה שוב בעוד כמה דקות." : "לא הצלחנו לקבל משוב כרגע.";
    }
  };
}

/* =========================================================
   הישגים חדשים
   ========================================================= */
ACHIEVEMENTS.push(
  { id: "band1half", icon: "📗", name: "חצי Band 1", desc: "שולט ב-50% ממילות Band 1" },
  { id: "band1all", icon: "📕", name: "אלוף Band 1", desc: "שולט ב-90% ממילות Band 1" },
  { id: "band2_100", icon: "📙", name: "100 מילים ב-Band 2", desc: "שולט ב-100 מילים מ-Band 2" },
  { id: "reader5", icon: "📜", name: "קורא נלהב", desc: "סיימת 5 סיפורים בהבנת הנקרא" },
  { id: "listener5", icon: "🎧", name: "אוזן קשבת", desc: "סיימת 5 ראיונות בהבנת הנשמע" },
  { id: "write2", icon: "✒️", name: "כותב מתקדם", desc: "פתחת את שלב הכתיבה של 40 עד 50 מילים" },
  { id: "write3", icon: "🏛️", name: "כותב אלוף", desc: "פתחת את שלב הכתיבה של 50 עד 60 מילים" }
);
Object.assign(EXTRA_ACH, {
  band1half: () => { const b = BANDS.find((x) => x.key === "b1"); return b && srcMastered(b) >= b.size * 0.5; },
  band1all: () => { const b = BANDS.find((x) => x.key === "b1"); return b && srcMastered(b) >= b.size * 0.9; },
  band2_100: () => { const b = BANDS.find((x) => x.key === "b2"); return b && srcMastered(b) >= 100; },
  reader5: () => Object.keys(S.skills.read).length >= 5,
  listener5: () => Object.keys(S.skills.listen).length >= 5,
  write2: () => HAS_WRITE && writeDoneAt(1) >= 3,
  write3: () => HAS_WRITE && writeDoneAt(2) >= 3
});

/* =========================================================
   אזור הורים – מיומנויות ורשימות מילים
   ========================================================= */
function parentSkillsHtml() {
  registerCustom();
  const srcs = vocabSources();
  const avg = (o) => { const v = Object.values(o); return v.length ? Math.round(v.reduce((a, b) => a + (b.best || 0), 0) / v.length) : 0; };
  return `<div class="card"><h3>מיומנויות ז'–ח'</h3>
    <div class="res-row"><span>📚 אוצר מילים</span><b>${srcs.map((s) => `<span dir="ltr">${esc(s.name)}</span> ${srcMastered(s)}/${s.size}`).join(" · ") || "—"}</b></div>
    ${HAS_READ ? `<div class="res-row"><span>📜 הבנת הנקרא</span><b>${Object.keys(S.skills.read).length}/${READINGS.length} סיפורים · ממוצע ${avg(S.skills.read)}%</b></div>` : ""}
    ${HAS_LISTEN ? `<div class="res-row"><span>🎧 הבנת הנשמע</span><b>${Object.keys(S.skills.listen).length}/${PODCASTS.length} ראיונות · ממוצע ${avg(S.skills.listen)}%</b></div>` : ""}
    ${HAS_WRITE ? `<div class="res-row"><span>✍️ כתיבה</span><b>${WRITE_LEVELS[writeLevelUnlocked() - 1].name} · ${Object.keys(S.skills.write).length} משימות</b></div>` : ""}
    <p class="hint">"שולט" = ענה נכון על המילה כמה פעמים, או ידע אותה בבדיקת הידע.</p>
  </div>
  <div class="card"><h3>רשימות מילים מהכיתה</h3>
    <p class="hint">מדביקים רשימה – שורה לכל מילה: <span dir="ltr">word - תרגום</span>. אפשר גם להעתיק ישר מ-Quizlet (ייצוא) או מהחוברת. הרשימה תופיע ב"אוצר מילים" עם כרטיסיות ותרגול.</p>
    ${(S.custom || []).map((l) => `<div class="res-row"><span>${esc(l.name)} · ${l.words.length} מילים</span><button class="chip" data-delist="${l.id}">🗑️ מחק</button></div>`).join("")}
    <input id="clname" class="inp" placeholder="שם הרשימה (למשל: יחידה 3 בחוברת)" maxlength="40">
    <textarea id="cltext" class="ta small" dir="ltr" placeholder="borrow - לשאול&#10;careful - זהיר&#10;decide - להחליט"></textarea>
    <button class="btn" id="cladd">➕ הוסף רשימה</button>
  </div>`;
}
function bindParentSkills() {
  const add = $("#cladd");
  if (add) add.onclick = () => {
    const words = parseWordList($("#cltext").value);
    if (!words.length) { toast("לא נמצאו מילים. כל שורה צריכה להיות: word - תרגום"); return; }
    S.custom = S.custom || [];
    const id = "c" + (Date.now() % 1e8).toString(36);
    S.custom.push({ id, name: $("#clname").value.trim() || `רשימה ${S.custom.length + 1}`, words });
    registerCustom(); save(true);
    toast(`✔️ נוספו ${words.length} מילים`);
    parentScreen();
  };
  $$("[data-delist]").forEach((b) => (b.onclick = async () => {
    if (!(await ask("למחוק את הרשימה?", { ok: "מחק", danger: true }))) return;
    S.custom = S.custom.filter((l) => l.id !== b.dataset.delist);
    registerCustom(); save(true); parentScreen();
  }));
}
