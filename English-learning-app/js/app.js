/* =========================================================
   English Quest – מנוע המשחק
   ========================================================= */
"use strict";

const STORE_KEY = "englishQuest_v1";
const $ = (s, el = document) => el.querySelector(s);
const $$ = (s, el = document) => Array.from(el.querySelectorAll(s));
const app = document.getElementById("app");

/* ---------- עזרים כלליים ---------- */
const shuffle = (arr) => {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};
const sample = (arr, n) => shuffle(arr).slice(0, n);
const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];
const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
const pad = (n) => String(n).padStart(2, "0");
const dateKey = (d = new Date()) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
const norm = (s) => String(s).toLowerCase().replace(/[’‘`]/g, "'").replace(/[.!?,]+$/g, "").replace(/\s+/g, " ").trim();
const wordCount = (t) => (t.match(/[A-Za-z']+/g) || []).length;

/* ---------- מילים ---------- */
const ALL_WORDS = [];
UNITS.forEach((u, ui) => u.words.forEach((w, wi) => ALL_WORDS.push({ ...w, id: `${u.id}-${wi}`, ui })));
/* רשימות Band: כל 15 מילים = חבילה. ui של מילה בחבילה הוא מפתח החבילה (למשל "b1p0") */
const PACK = 15;
const BANDS = [];
[["b1", "Band 1", typeof BAND1 !== "undefined" ? BAND1 : []], ["b2", "Band 2", typeof BAND2 !== "undefined" ? BAND2 : []]].forEach(([key, name, list]) => {
  if (!list.length) return;
  const packs = [];
  list.forEach((w, i) => {
    const pk = `${key}p${Math.floor(i / PACK)}`;
    if (!packs.includes(pk)) packs.push(pk);
    ALL_WORDS.push({ ...w, id: `${key}-${i}`, ui: pk });
  });
  BANDS.push({ key, name, packs, size: list.length });
});
const unitWords = (ui) => ALL_WORDS.filter((w) => w.ui === ui);
const wordById = (id) => ALL_WORDS.find((w) => w.id === id);

/* מילון לחיצה בקטעי הקריאה */
const DICT = {};
ALL_WORDS.forEach((w) => { if (!w.en.includes(" ")) DICT[w.en.toLowerCase()] = w.he; });
UNITS.forEach((u) => Object.entries(u.reading.glossary || {}).forEach(([k, v]) => { DICT[k.toLowerCase()] = DICT[k.toLowerCase()] || v; }));
if (typeof READINGS !== "undefined") READINGS.forEach((r) => Object.entries(r.glossary || {}).forEach(([k, v]) => { DICT[k.toLowerCase()] = DICT[k.toLowerCase()] || v; }));
Object.assign(DICT, {
  i: "אני", you: "אתה / אתם", he: "הוא", she: "היא", it: "זה", we: "אנחנו", they: "הם", my: "שלי", his: "שלו", her: "שלה",
  our: "שלנו", their: "שלהם", your: "שלך", him: "אותו", them: "אותם", us: "אותנו", me: "אותי",
  is: "הוא/היא (פועל to be)", am: "(פועל to be)", are: "(פועל to be)", was: "היה", were: "היו", a: "(מילית: אחד)", an: "(מילית: אחד)",
  the: "ה- (הידיעה)", and: "ו-", but: "אבל", or: "או", so: "אז / לכן", with: "עם", in: "ב- / בתוך", on: "על", at: "ב- (מקום/שעה)",
  to: "אל / ל-", from: "מ-", of: "של", for: "בשביל", by: "ב- / על ידי", very: "מאוד", many: "הרבה", big: "גדול", has: "יש לו", have: "יש ל-",
  every: "כל", day: "יום", morning: "בוקר", school: "בית ספר", house: "בית", good: "טוב", like: "אוהב / כמו", love: "אוהב מאוד",
  one: "אחד", two: "שתיים", three: "שלוש", four: "ארבע", five: "חמש", six: "שש", seven: "שבע", ten: "עשר", twelve: "שתים עשרה",
  fifteen: "חמש עשרה", years: "שנים", old: "זקן / ישן / בגיל", hi: "היי", there: "שם / יש", this: "זה / הזה", not: "לא", can: "יכול",
  will: "(עתיד)", all: "כל / כולם", now: "עכשיו", after: "אחרי", go: "ללכת", goes: "הולך", play: "לשחק", plays: "משחק", eat: "לאכול",
  says: "אומר", say: "לומר", water: "מים", table: "שולחן", other: "אחר", also: "גם", about: "על (נושא)", o: "", "o'clock": "בשעה (עגולה)",
  everybody: "כולם", food: "אוכל", room: "חדר", home: "בית", come: "לבוא", see: "לראות", talk: "לדבר", know: "לדעת"
});
function lookup(raw) {
  let w = raw.toLowerCase().replace(/'s$/, "");
  if (DICT[w] !== undefined) return DICT[w];
  const tries = [w.replace(/ies$/, "y"), w.replace(/es$/, ""), w.replace(/s$/, ""), w.replace(/ed$/, ""), w.replace(/d$/, ""), w.replace(/ing$/, ""), w.replace(/ing$/, "e")];
  for (const t of tries) if (DICT[t]) return DICT[t];
  return null;
}

/* ---------- מצב ושמירה ---------- */
function defaultState() {
  return {
    v: 1, name: "", avatar: "🦁", theme: "ocean",
    xp: 0, coins: 0,
    owned: { avatars: AVATARS.filter((a) => a.price === 0).map((a) => a.id), themes: ["ocean"] },
    units: {}, words: {}, days: {}, writings: [], ach: {}, reviews: 0,
    skills: { read: {}, listen: {}, write: {}, band: {} }, custom: [],
    settings: { sound: true, autoSpeak: false, rate: 0.85, goal: 2, unlockAll: false, pin: "" },
    created: dateKey()
  };
}
function loadState() {
  const d = defaultState();
  try {
    const raw = localStorage.getItem(STORE_KEY);
    if (raw) {
      const s = JSON.parse(raw);
      return { ...d, ...s, owned: { ...d.owned, ...(s.owned || {}) }, settings: { ...d.settings, ...(s.settings || {}) }, skills: { ...d.skills, ...(s.skills || {}) } };
    }
  } catch (e) { /* ignore */ }
  return d;
}
let S = loadState();
function save(important) {
  S.t = Date.now();
  try { localStorage.setItem(STORE_KEY, JSON.stringify(S)); } catch (e) { /* ignore */ }
  cloudSchedule(important);
}

/* ---------- סנכרון לחשבון ----------
   כשהמשחק פתוח דרך claude.ai, ההתקדמות נשמרת גם בחשבון של מי שמחובר,
   וכך היא זמינה בכל מכשיר. מחוץ ל-claude.ai (למשל באתר עצמאי) הכל נשמר רק בדפדפן. */
const cloud = { ref: null, status: "local", timer: null, writing: false, again: false };
async function cloudInit() {
  if (!window.claude || typeof window.claude.use !== "function") return;
  const localT = S.t || 0;
  try {
    const [db, user] = await Promise.all([window.claude.use("db"), window.claude.use("user")]);
    if (!db || !user) return;
    const id = await user.id();
    if (!id) return;
    const ref = db.doc("data/users/" + id + "/progress");
    const snap = await ref.get();
    cloud.ref = ref;
    cloud.status = "on";
    const body = snap.exists ? snap.data() : null;
    const remote = body && typeof body.state === "string" ? JSON.parse(body.state) : null;
    if (remote && (remote.t || 0) > localT) {
      try { localStorage.setItem(STORE_KEY, body.state); } catch (e) { /* ignore */ }
      S = loadState();
      if (!S.t) S.t = remote.t;
      if (typeof registerCustom === "function") registerCustom();
      applyTheme();
      if (["home", "onboard"].includes(app.dataset.view)) homeScreen();
      toast("☁️ ההתקדמות נטענה מהחשבון");
    } else if (S.name && (!remote || localT > (remote.t || 0))) {
      cloudPush();
    }
    refreshCloudBadge();
  } catch (e) {
    cloud.status = "local";
  }
}
function cloudSchedule(now) {
  if (!cloud.ref) return;
  clearTimeout(cloud.timer);
  cloud.timer = setTimeout(cloudPush, now ? 800 : 30000);
}
async function cloudPush() {
  if (!cloud.ref) return;
  clearTimeout(cloud.timer);
  if (cloud.writing) { cloud.again = true; return; }
  cloud.writing = true;
  try {
    await cloud.ref.set({ state: JSON.stringify(S), t: S.t || Date.now(), v: 1 });
    cloud.status = "on";
  } catch (e) {
    const code = e && e.code;
    if (code === "invalid_argument" || code === "not_granted" || code === "revoked" || code === "capability_disabled") { cloud.status = "ro"; cloud.ref = null; }
    else if (code === "unavailable") setTimeout(cloudPush, 3000 + Math.random() * 2000);
  }
  cloud.writing = false;
  refreshCloudBadge();
  if (cloud.again) { cloud.again = false; cloudPush(); }
}
function refreshCloudBadge() {
  const b = document.getElementById("cloudb");
  if (b) b.textContent = cloud.status === "on" ? "☁️" : "";
}
document.addEventListener("visibilitychange", () => { if (document.visibilityState === "hidden" && cloud.ref && cloud.timer) cloudPush(); });

/* ---------- רמות ---------- */
const xpForLevel = (n) => 50 * n * (n - 1);
const levelOf = (xp) => { let n = 1; while (xp >= xpForLevel(n + 1)) n++; return n; };
const rankOf = (lvl) => RANKS.filter((r) => r.lvl <= lvl).pop();

/* ---------- סאונד ---------- */
let actx = null;
function tone(freq, dur, type = "sine", when = 0, vol = 0.12) {
  if (!S.settings.sound) return;
  try {
    actx = actx || new (window.AudioContext || window.webkitAudioContext)();
    const o = actx.createOscillator(), g = actx.createGain();
    o.type = type; o.frequency.value = freq;
    const t = actx.currentTime + when;
    g.gain.setValueAtTime(vol, t);
    g.gain.exponentialRampToValueAtTime(0.001, t + dur);
    o.connect(g).connect(actx.destination);
    o.start(t); o.stop(t + dur + 0.02);
  } catch (e) { /* ignore */ }
}
const sfx = {
  ok: () => { tone(660, 0.12); tone(880, 0.2, "sine", 0.1); },
  bad: () => { tone(200, 0.3, "triangle", 0, 0.15); },
  win: () => [523, 659, 784, 1047].forEach((f, i) => tone(f, 0.25, "sine", i * 0.13)),
  coin: () => { tone(988, 0.08, "square", 0, 0.05); tone(1319, 0.2, "square", 0.08, 0.05); },
  tap: () => tone(520, 0.04, "sine", 0, 0.06)
};

/* ---------- הקראה (Text to Speech) ---------- */
let voice = null;
function pickVoice() {
  if (!("speechSynthesis" in window)) return;
  const vs = speechSynthesis.getVoices().filter((v) => /^en[-_]/i.test(v.lang));
  voice = vs.find((v) => /en[-_]US/i.test(v.lang) && /google|samantha|natural|aria|jenny/i.test(v.name))
    || vs.find((v) => /en[-_]US/i.test(v.lang)) || vs.find((v) => /en[-_]GB/i.test(v.lang)) || vs[0] || null;
}
if ("speechSynthesis" in window) { pickVoice(); speechSynthesis.onvoiceschanged = pickVoice; }
let ttsWarned = false;
function ttsMissing() {
  if (ttsWarned) return;
  ttsWarned = true;
  toast("🔇 ההקראה לא זמינה כאן. פתחו את המשחק בדפדפן Chrome / Edge / Safari כדי לשמוע הגייה.", 5000);
}
function speak(text, rate) {
  if (!text) return;
  if (!("speechSynthesis" in window)) return ttsMissing();
  if (!speechSynthesis.getVoices().length) setTimeout(() => { if (!speechSynthesis.getVoices().length && !speechSynthesis.speaking) ttsMissing(); }, 1500);
  speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance(text);
  u.lang = "en-US";
  u.rate = rate || S.settings.rate;
  if (voice) u.voice = voice;
  speechSynthesis.speak(u);
}
/* הקראה אוטומטית – רק אם ההורה הפעיל אותה בהגדרות. ברירת מחדל: רק בלחיצה על 🔊 */
function autoSay(text, rate) { if (S.settings.autoSpeak) speak(text, rate); }

/* ---------- מעקב זמן לימוד ---------- */
let lastAct = Date.now();
["pointerdown", "keydown", "touchstart"].forEach((ev) => document.addEventListener(ev, () => { lastAct = Date.now(); }, { passive: true }));
setInterval(() => {
  if (document.visibilityState !== "visible" || Date.now() - lastAct > 90000 || !S.name) return;
  const k = dateKey();
  S.days[k] = S.days[k] || { sec: 0, st: 0 };
  S.days[k].sec += 15;
  save();
}, 15000);

const dayActive = (k) => { const d = S.days[k]; return d && (d.sec >= 300 || d.st > 0); };
function weekStart(d = new Date()) { const x = new Date(d); x.setHours(12, 0, 0, 0); x.setDate(x.getDate() - x.getDay()); return x; }
function weekDays(ws) { return [...Array(7)].map((_, i) => { const d = new Date(ws); d.setDate(d.getDate() + i); return dateKey(d); }); }
const weekCount = (ws) => weekDays(ws).filter(dayActive).length;
const weekMinutes = (ws) => Math.round(weekDays(ws).reduce((s, k) => s + ((S.days[k] && S.days[k].sec) || 0), 0) / 60);
function weekStreak() {
  let ws = weekStart(), streak = 0;
  if (weekCount(ws) >= S.settings.goal) streak = 1;
  for (;;) {
    ws = new Date(ws); ws.setDate(ws.getDate() - 7);
    if (weekCount(ws) >= S.settings.goal) streak++; else break;
  }
  return streak;
}
const todayMin = () => Math.round(((S.days[dateKey()] || {}).sec || 0) / 60);
const totalMin = () => Math.round(Object.values(S.days).reduce((s, d) => s + (d.sec || 0), 0) / 60);

/* ---------- התקדמות ---------- */
const unitRec = (ui) => (S.units[UNITS[ui].id] = S.units[UNITS[ui].id] || {});
const stRec = (ui, k) => unitRec(ui)[k];
const stDone = (ui, k) => !!(stRec(ui, k) && stRec(ui, k).stars);
const unitStars = (ui) => STATIONS.reduce((s, st) => s + ((stRec(ui, st.key) || {}).stars || 0), 0);
const unitUnlocked = (ui) => S.settings.unlockAll || ui === 0 || stDone(ui - 1, "boss");
function stationUnlocked(ui, k) {
  if (!unitUnlocked(ui)) return false;
  const i = STATIONS.findIndex((s) => s.key === k);
  return S.settings.unlockAll || i === 0 || stDone(ui, STATIONS[i - 1].key);
}
function nextStep() {
  for (let ui = 0; ui < UNITS.length; ui++) {
    if (!unitUnlocked(ui)) continue;
    for (const st of STATIONS) if (!stDone(ui, st.key) && stationUnlocked(ui, st.key)) return { ui, k: st.key };
  }
  return null;
}
const learnedCount = () => Object.values(S.words).filter((w) => w.seen).length;
const bossCount = () => UNITS.filter((_, ui) => stDone(ui, "boss")).length;

function wordResult(id, ok) {
  if (!id) return;
  const w = (S.words[id] = S.words[id] || { s: 0, ok: 0, bad: 0, seen: true });
  w.seen = true;
  if (ok) { w.ok++; w.s = Math.min(5, w.s + 1); } else { w.bad++; w.s = Math.max(0, w.s - 2); }
  w.t = Date.now();
}
function markSeen(id) { S.words[id] = S.words[id] || { s: 0, ok: 0, bad: 0 }; S.words[id].seen = true; }

/* ---------- הישגים ---------- */
const EXTRA_ACH = {};
function checkAch() {
  const has = (id) => !!S.ach[id];
  const cond = {
    ...EXTRA_ACH,
    first: () => Object.values(S.units).some((u) => Object.keys(u).length > 0),
    words25: () => learnedCount() >= 25, words60: () => learnedCount() >= 60, words120: () => learnedCount() >= 120,
    boss1: () => bossCount() >= 1, boss6: () => bossCount() >= 6, boss12: () => bossCount() >= 12,
    writer: () => S.writings.length >= 5, review5: () => S.reviews >= 5,
    week2: () => weekStreak() >= 2, week6: () => weekStreak() >= 6,
    xp1000: () => S.xp >= 1000, xp5000: () => S.xp >= 5000,
    hours3: () => totalMin() >= 180, rich: () => S.coins >= 200
  };
  const fresh = [];
  ACHIEVEMENTS.forEach((a) => {
    if (!has(a.id) && cond[a.id] && cond[a.id]()) { S.ach[a.id] = dateKey(); fresh.push(a); }
  });
  return fresh;
}
function grantAch(id) {
  if (S.ach[id]) return [];
  S.ach[id] = dateKey();
  return ACHIEVEMENTS.filter((a) => a.id === id);
}

/* ---------- ממשק: עזרים ---------- */
let onEnter = null;
document.addEventListener("keydown", (e) => {
  if (e.key === "Enter" && onEnter && !(e.target && e.target.tagName === "TEXTAREA")) { e.preventDefault(); const f = onEnter; f(); }
});
function show(html) {
  onEnter = null;
  if ("speechSynthesis" in window) speechSynthesis.cancel();
  app.dataset.view = "";
  app.innerHTML = html;
  window.scrollTo(0, 0);
}
function applyTheme() {
  const t = THEMES.find((x) => x.id === S.theme) || THEMES[0];
  const r = document.documentElement.style;
  r.setProperty("--primary", t.colors[0]);
  r.setProperty("--primary-dark", t.colors[1]);
  r.setProperty("--accent", t.colors[2]);
  document.documentElement.classList.toggle("dark", !!t.dark);
  const m = document.querySelector('meta[name="theme-color"]');
  if (m) m.setAttribute("content", t.colors[0]);
}
function toast(html, ms = 2600) {
  const t = document.createElement("div");
  t.className = "toast";
  t.innerHTML = html;
  document.body.appendChild(t);
  setTimeout(() => t.classList.add("out"), ms);
  setTimeout(() => t.remove(), ms + 500);
}
function confetti(n = 90) {
  const colors = ["#f59e0b", "#2563eb", "#16a34a", "#ef4444", "#a855f7", "#06b6d4"];
  const box = document.createElement("div");
  box.className = "confetti";
  for (let i = 0; i < n; i++) {
    const p = document.createElement("i");
    p.style.left = Math.random() * 100 + "%";
    p.style.background = pick(colors);
    p.style.animationDelay = Math.random() * 0.6 + "s";
    p.style.animationDuration = 1.8 + Math.random() * 1.6 + "s";
    p.style.transform = `rotate(${Math.random() * 360}deg)`;
    box.appendChild(p);
  }
  document.body.appendChild(box);
  setTimeout(() => box.remove(), 4000);
}
const starsHtml = (n, max = 3) => [...Array(max)].map((_, i) => `<span class="star ${i < n ? "on" : ""}">★</span>`).join("");
const spk = (text, cls = "") => `<button class="spk ${cls}" data-say="${esc(text)}" aria-label="השמע">🔊</button>`;
document.addEventListener("click", (e) => {
  if (e.target.closest("#tbcoins")) { sfx.tap(); shopScreen(); return; }
  const b = e.target.closest("[data-say]");
  if (b) { e.preventDefault(); speak(b.getAttribute("data-say")); }
});

function topbar(back) {
  const lvl = levelOf(S.xp);
  const cur = xpForLevel(lvl), nxt = xpForLevel(lvl + 1);
  const pct = Math.round(((S.xp - cur) / (nxt - cur)) * 100);
  return `<header class="topbar">
    ${back ? `<button class="icon-btn" id="tb-back" aria-label="חזרה">→</button>` : ""}
    <div class="tb-avatar">${S.avatar}</div>
    <div class="tb-mid">
      <div class="tb-name">${esc(S.name)} <span class="tb-lvl">רמה ${lvl}</span></div>
      <div class="xpbar" title="${S.xp} XP"><div style="width:${pct}%"></div></div>
    </div>
    <button class="tb-coins" id="tbcoins" title="לחנות"><span id="cloudb" class="cloud-badge" title="מסונכרן לחשבון">${cloud.status === "on" ? "☁️" : ""}</span> 🪙 <b>${S.coins}</b> <span class="tb-shop">🛒</span></button>
  </header>`;
}
function bindTopbar(backFn) { const b = $("#tb-back"); if (b) b.onclick = backFn; }
function navbar(active) {
  const items = [["home", "🗺️", "המסע"], ["skills", "🏋️", "מיומנויות"], ["review", "🔁", "חזרה"], ["ach", "🏅", "הישגים"], ["parent", "⚙️", "הורים"]];
  return `<nav class="navbar">${items.map(([k, i, t]) => `<button data-nav="${k}" class="${k === active ? "on" : ""}"><span>${i}</span>${t}</button>`).join("")}</nav>`;
}
function bindNav() {
  $$("[data-nav]").forEach((b) => (b.onclick = () => {
    sfx.tap();
    ({ home: homeScreen, skills: skillsScreen, review: reviewScreen, ach: achScreen, parent: parentGate })[b.dataset.nav]();
  }));
}

/* =========================================================
   מסכים
   ========================================================= */

/* ---------- פתיחה ---------- */
function onboarding() {
  let av = S.avatar;
  show(`<div class="center-screen">
    <div class="logo">🧭</div>
    <h1 class="title">English Quest</h1>
    <p class="sub">מסע באנגלית – שלב אחרי שלב, מטבע אחרי מטבע 🪙</p>
    <div class="card">
      <label class="lbl">איך קוראים לך?</label>
      <input id="nm" class="inp" maxlength="16" placeholder="השם שלך" value="${esc(S.name)}">
      <label class="lbl">בחר דמות למסע:</label>
      <div class="av-grid">${S.owned.avatars.map((a) => `<button class="av ${a === av ? "on" : ""}" data-av="${a}">${a}</button>`).join("")}</div>
      <p class="hint">עוד דמויות אפשר לקנות בחנות עם מטבעות שתרוויח 😉</p>
      <button class="btn big" id="go">יוצאים לדרך! 🚀</button>
    </div>
  </div>`);
  $$("[data-av]").forEach((b) => (b.onclick = () => { av = b.dataset.av; $$("[data-av]").forEach((x) => x.classList.toggle("on", x === b)); sfx.tap(); }));
  const go = () => {
    const nm = $("#nm").value.trim();
    if (!nm) { $("#nm").focus(); $("#nm").classList.add("shake"); setTimeout(() => $("#nm").classList.remove("shake"), 500); return; }
    S.name = nm; S.avatar = av; save(true); sfx.win(); homeScreen();
  };
  $("#go").onclick = go;
  onEnter = go;
  app.dataset.view = "onboard";
}

/* ---------- מסך הבית / מפת המסע ---------- */
function homeScreen() {
  if (!S.name) return onboarding();
  const lvl = levelOf(S.xp), rank = rankOf(lvl);
  const ws = weekStart(), days = weekDays(ws), wc = weekCount(ws), goal = S.settings.goal;
  const dayNames = ["א", "ב", "ג", "ד", "ה", "ו", "ש"];
  const today = dateKey(), tmin = todayMin();
  const nx = nextStep();
  const streak = weekStreak();
  const nodes = UNITS.map((u, ui) => {
    const un = unitUnlocked(ui), stars = unitStars(ui), done = stDone(ui, "boss");
    const cur = nx && nx.ui === ui;
    return `<button class="node ${un ? "" : "locked"} ${done ? "done" : ""} ${cur ? "cur" : ""}" data-unit="${ui}" style="--i:${ui}">
      <div class="node-ic">${un ? u.icon : "🔒"}</div>
      <div class="node-txt"><div class="node-n">יחידה ${ui + 1}</div><div class="node-t" dir="ltr">${u.title}</div><div class="node-he">${u.he}</div></div>
      <div class="node-st">${done ? "✅" : ""}<small>⭐ ${stars}/18</small></div>
    </button>`;
  }).join("");
  show(`${topbar()}
  <main class="page">
    <section class="hero card">
      <div class="hero-rank">${rank.icon} <b>${rank.name}</b> · <span dir="ltr">${S.xp} XP</span></div>
      <div class="week">
        <div class="week-h"><span>יעד שבועי: ${goal} מפגשים</span><span>${wc >= goal ? "✅ הושג!" : `${wc}/${goal}`}</span></div>
        <div class="week-days">${days.map((k, i) => `<div class="wd ${dayActive(k) ? "on" : ""} ${k === today ? "today" : ""}"><span>${dayNames[i]}</span></div>`).join("")}</div>
        <div class="week-f">${streak > 0 ? `🔥 רצף של ${streak} שבועות` : "עמוד ביעד השבועי כדי להתחיל רצף 🔥"} · היום: ${tmin} דק'</div>
      </div>
      ${nx ? `<button class="btn big pulse" id="cont">${STATIONS.find((s) => s.key === nx.k).icon} המשך: יחידה ${nx.ui + 1} – ${STATIONS.find((s) => s.key === nx.k).name}</button>`
           : `<div class="done-all">🎉 סיימת את כל המסע! אפשר לשפר כוכבים או לעשות חזרה.</div>`}
    </section>
    ${typeof skillsTeaser === "function" ? skillsTeaser() : ""}
    <h2 class="sec-t">🗺️ מפת המסע</h2>
    <p class="sec-sub">כל יחידה = מפגש של כחצי שעה (6 תחנות)</p>
    <div class="path">${nodes}</div>
  </main>
  ${navbar("home")}`);
  bindNav();
  app.dataset.view = "home";
  const st = $("#skillsT");
  if (st) st.onclick = () => { sfx.tap(); skillsScreen(); };
  if (nx) $("#cont").onclick = () => { sfx.tap(); startStation(nx.ui, nx.k); };
  $$("[data-unit]").forEach((b) => (b.onclick = () => {
    const ui = +b.dataset.unit;
    if (!unitUnlocked(ui)) { sfx.bad(); toast("🔒 קודם צריך לנצח את הבוס של היחידה הקודמת"); return; }
    sfx.tap(); unitScreen(ui);
  }));
  const cur = $(".node.cur");
  if (cur && S.xp > 0) setTimeout(() => cur.scrollIntoView({ behavior: "smooth", block: "center" }), 250);
}

/* ---------- מסך יחידה ---------- */
function unitScreen(ui) {
  const u = UNITS[ui];
  const totalMinUnit = STATIONS.reduce((s, x) => s + x.min, 0);
  show(`${topbar(true)}
  <main class="page">
    <div class="unit-head card">
      <div class="unit-ic">${u.icon}</div>
      <div><div class="node-n">יחידה ${ui + 1} · כ-${totalMinUnit} דקות</div><h2 dir="ltr" class="unit-t">${u.title}</h2><div class="node-he">${u.he}</div></div>
    </div>
    <div class="stations">
      ${STATIONS.map((st, i) => {
        const un = stationUnlocked(ui, st.key), rec = stRec(ui, st.key);
        return `<button class="station ${un ? "" : "locked"} ${rec && rec.stars ? "done" : ""}" data-st="${st.key}">
          <div class="st-ic">${un ? st.icon : "🔒"}</div>
          <div class="st-txt"><b>${i + 1}. ${st.name}</b><small>${st.desc} · ${st.min} דק'</small></div>
          <div class="st-stars">${rec && rec.stars ? starsHtml(rec.stars) : un ? "<span class='go'>▶</span>" : ""}</div>
        </button>`;
      }).join("")}
    </div>
    <p class="hint center">💡 אפשר לעצור בין תחנות ולהמשיך בפעם הבאה – ההתקדמות נשמרת.</p>
  </main>`);
  bindTopbar(homeScreen);
  $$("[data-st]").forEach((b) => (b.onclick = () => {
    if (!stationUnlocked(ui, b.dataset.st)) { sfx.bad(); toast("🔒 קודם סיים את התחנה הקודמת"); return; }
    sfx.tap(); startStation(ui, b.dataset.st);
  }));
}

/* ---------- בניית תרגילים ---------- */
function mkVocab(kind, w, pool) {
  const others = sample(pool.filter((x) => x.id !== w.id && x.en !== w.en && x.he !== w.he), 3);
  return { kind, wordId: w.id, w, opts: shuffle([w, ...others]) };
}
function mkFill(w, pool) {
  const re = new RegExp(`\\b${w.en.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\b`, "i");
  if (!re.test(w.ex)) return null;
  const others = sample(pool.filter((x) => x.id !== w.id && !re.test(x.en)), 3);
  return { kind: "fill", wordId: w.id, w, sentence: w.ex.replace(re, "_____"), opts: shuffle([w, ...others]) };
}
function practiceItems(ui) {
  const ws = shuffle(unitWords(ui)), pool = unitWords(ui);
  const items = [{ kind: "match", words: ws.slice(0, 6), noRetry: true }, { kind: "match", words: ws.slice(6, 12), noRetry: true }];
  const order = shuffle(pool);
  let k = 0;
  const nextW = () => order[k++ % order.length];
  for (let i = 0; i < 3; i++) items.push(mkVocab("mcWord", nextW(), pool));
  for (let i = 0; i < 3; i++) items.push(mkVocab("mcHe", nextW(), pool));
  for (let i = 0; i < 3; i++) items.push(mkVocab("listen", nextW(), pool));
  let f = 0;
  for (const w of shuffle(pool)) { const it = mkFill(w, pool); if (it) { items.push(it); if (++f >= 3) break; } }
  for (const w of sample(pool, 4)) items.push({ kind: "spell", wordId: w.id, w });
  return items;
}
const grammarItem = (q) => (q.options ? { kind: "mc", q: q.q, he: q.he, options: q.options, a: q.a } : { kind: "type", q: q.q, he: q.he, answer: q.answer });
function bossItems(ui) {
  const pool = unitWords(ui), ws = shuffle(pool), u = UNITS[ui];
  const items = [
    mkVocab("mcWord", ws[0], pool), mkVocab("mcHe", ws[1], pool), mkVocab("listen", ws[2], pool),
    { kind: "spell", wordId: ws[3].id, w: ws[3] }, { kind: "spell", wordId: ws[4].id, w: ws[4] }
  ];
  const fill = ws.slice(5).map((w) => mkFill(w, pool)).find(Boolean);
  if (fill) items.push(fill); else items.push(mkVocab("mcWord", ws[5], pool));
  sample(u.grammar.questions, 3).forEach((q) => items.push(grammarItem(q)));
  items.push({ kind: "scramble", sentence: pick(u.writing.scramble) });
  if (ui > 0) { const prev = unitWords(ui - 1); items.push(mkVocab("mcHe", pick(prev), prev)); }
  else items.push(mkVocab("mcWord", ws[6], pool));
  items.push(mkVocab("mcHe", ws[7], pool));
  return shuffle(items);
}

/* ---------- הפעלת תחנה ---------- */
function startStation(ui, k) {
  const u = UNITS[ui];
  const back = () => unitScreen(ui);
  if (k === "learn") return learnScreen(ui);
  if (k === "practice") {
    return runner({ title: "🎯 אימון מילים", items: practiceItems(ui), onQuit: back,
      onFinish: (r) => finishStation(ui, k, r) });
  }
  if (k === "grammar") return grammarIntro(ui);
  if (k === "reading") return readingIntro(ui);
  if (k === "writing") {
    return runner({ title: "✍️ בונים משפטים", items: u.writing.scramble.map((s) => ({ kind: "scramble", sentence: s })), onQuit: back,
      onFinish: (r) => writingTask(ui, r) });
  }
  if (k === "boss") {
    show(`${topbar(true)}<main class="page center-screen">
      <div class="boss-ic">🐲</div><h2 class="title">אתגר הבוס – יחידה ${ui + 1}</h2>
      <div class="card"><p>12 שאלות מכל מה שלמדת ביחידה: מילים, איות, דקדוק ומשפטים.</p>
      <p>יש לך <b>3 לבבות</b> ❤️❤️❤️ – כל טעות מורידה לב אחד.</p>
      <p>ניצחת את הבוס? היחידה הבאה נפתחת! 🔓</p>
      <button class="btn big" id="fight">⚔️ להילחם!</button></div></main>`);
    bindTopbar(back);
    const fight = () => runner({ title: "🏆 אתגר הבוס", items: bossItems(ui), rebuild: () => bossItems(ui), boss: true, onQuit: back,
      onFinish: (r) => finishStation(ui, k, r) });
    $("#fight").onclick = fight;
    onEnter = fight;
  }
}

/* ---------- תחנה 1: כרטיסיות ---------- */
function learnScreen(ui) {
  const words = unitWords(ui);
  let i = 0, revealed = false;
  const render = () => {
    const w = words[i];
    markSeen(w.id); save();
    const exHtml = esc(w.ex).replace(new RegExp(`\\b(${w.en.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})\\b`, "i"), "<mark>$1</mark>");
    show(`${topbar(true)}<main class="page">
      <div class="run-top"><div class="pbar"><div style="width:${((i + 1) / words.length) * 100}%"></div></div><span class="cnt">${i + 1}/${words.length}</span></div>
      <div class="flash card ${revealed ? "rev" : ""}" id="card">
        <div class="fl-en" dir="ltr">${esc(w.en)}</div>
        ${spk(w.en, "big")}
        ${revealed ? `<div class="fl-he">${esc(w.he)}</div>
          <div class="fl-ex" dir="ltr">${exHtml} ${spk(w.ex)}</div>`
          : `<button class="btn ghost" id="rev">👀 הצג תרגום</button>`}
      </div>
      <div class="row">
        <button class="btn ghost" id="prev" ${i === 0 ? "disabled" : ""}>→ הקודם</button>
        <button class="btn" id="next">${i === words.length - 1 ? "סיימתי! לבוחן 🎯" : "הבא ←"}</button>
      </div>
      <p class="hint center">💡 נסה להגיד את המילה בקול לפני שאתה לוחץ על 🔊</p>
    </main>`);
    bindTopbar(() => unitScreen(ui));
    const r = $("#rev");
    if (r) r.onclick = () => { revealed = true; sfx.tap(); render(); autoSay(w.en); };
    $("#prev").onclick = () => { if (i > 0) { i--; revealed = false; render(); } };
    const nxt = () => {
      if (!revealed) { revealed = true; render(); autoSay(w.en); return; }
      if (i < words.length - 1) { i++; revealed = false; render(); autoSay(words[i].en); }
      else quiz();
    };
    $("#next").onclick = nxt;
    onEnter = nxt;
  };
  const quiz = () => {
    const pool = words;
    const items = shuffle(sample(words, 8).map((w, j) => mkVocab(j % 2 ? "mcHe" : "mcWord", w, pool)));
    runner({ title: "📖 בוחן מילים", items, onQuit: () => unitScreen(ui), onFinish: (r) => finishStation(ui, "learn", r) });
  };
  render();
  autoSay(words[0].en);
}

/* ---------- תחנה 3: דקדוק ---------- */
function grammarIntro(ui) {
  const g = UNITS[ui].grammar;
  show(`${topbar(true)}<main class="page">
    <div class="card gram">
      <div class="node-n">🧩 דקדוק</div>
      <h2 dir="ltr" class="unit-t">${esc(g.title)}</h2>
      <div class="gram-body">${g.explain}</div>
      <h3>דוגמאות:</h3>
      <ul class="ex-list">${g.examples.map((e) => `<li dir="ltr">${spk(e)} ${esc(e)}</li>`).join("")}</ul>
      <button class="btn big" id="go">הבנתי – בוא נתרגל! 💪</button>
    </div></main>`);
  bindTopbar(() => unitScreen(ui));
  const go = () => runner({ title: "🧩 תרגול דקדוק", items: g.questions.map(grammarItem), help: g, onQuit: () => unitScreen(ui),
    onFinish: (r) => finishStation(ui, "grammar", r) });
  $("#go").onclick = go;
}

/* ---------- תחנה 4: קריאה ---------- */
const passageHtml = (text) => esc(text).replace(/[A-Za-z][A-Za-z']*/g, (m) => `<span class="w">${m}</span>`);
function bindPassage(root) {
  $$(".w", root).forEach((s) => (s.onclick = () => {
    const word = s.textContent, tr = lookup(word);
    $$(".w.sel").forEach((x) => x.classList.remove("sel"));
    s.classList.add("sel");
    autoSay(word);
    const isName = !tr && /^[A-Z]/.test(word) && s.previousSibling && !/[.!?"]\s*$/.test(s.previousSibling.textContent);
    showTip(`${spk(word)} <b dir="ltr">${esc(word)}</b> = ${tr ? esc(tr) : isName ? "שם (של אדם או מקום) 📍" : "<span class='muted'>לא במילון 🙂 נסה לנחש מההקשר</span>"}`);
  }));
}
function showTip(html) {
  let t = $("#tip");
  if (!t) { t = document.createElement("div"); t.id = "tip"; t.className = "tip"; document.body.appendChild(t); }
  t.innerHTML = html;
  t.classList.add("on");
  clearTimeout(showTip._t);
  showTip._t = setTimeout(() => t.classList.remove("on"), 5000);
}
function readingIntro(ui) {
  const r = UNITS[ui].reading;
  show(`${topbar(true)}<main class="page">
    <div class="card">
      <div class="node-n">📜 קריאה</div>
      <h2 dir="ltr" class="unit-t">${esc(r.title)} ${spk(r.text)}</h2>
      <p class="hint">👆 לחץ על כל מילה שאתה לא מכיר כדי לראות תרגום ולשמוע אותה. 🔊 מקריא את כל הקטע.</p>
      <div class="passage-text" dir="ltr">${passageHtml(r.text)}</div>
      <button class="btn big" id="go">קראתי – לשאלות! ❓</button>
    </div></main>`);
  bindTopbar(() => unitScreen(ui));
  bindPassage(app);
  $("#go").onclick = () => runner({ title: "📜 שאלות הבנה", items: r.questions.map((q) => ({ kind: "mc", q: q.q, options: q.options, a: q.a })),
    passage: r, onQuit: () => unitScreen(ui), onFinish: (res) => finishStation(ui, "reading", res) });
}

/* ---------- תחנה 5: כתיבה חופשית ---------- */
function writingChecks(text, task) {
  const t = text.trim();
  const sentences = t.split(/(?<=[.!?])\s+/).filter((x) => x.trim());
  const checks = [{ label: `לפחות ${task.min} מילים (כתבת ${wordCount(t)})`, ok: wordCount(t) >= task.min, must: true }];
  task.need.forEach((n) => {
    let ok = false;
    if (n.re) ok = new RegExp(n.re, "i").test(t);
    else if (n.sentences) ok = (t.match(/[.!?]+/g) || []).length >= n.sentences;
    else if (n.count) ok = (t.match(new RegExp(n.count, "g")) || []).length >= n.n;
    else if (n.distinct) ok = new Set((t.toLowerCase().match(new RegExp(n.distinct, "gi")) || [])).size >= n.n;
    checks.push({ label: n.label, ok });
  });
  checks.push({ label: "כל משפט מתחיל באות גדולה", ok: t.length > 0 && sentences.every((s) => /^[^A-Za-z]*[A-Z]/.test(s)) });
  checks.push({ label: "בסוף המשפט יש נקודה / סימן שאלה / קריאה", ok: /[.!?]["']?$/.test(t) });
  checks.push({ label: "המילה I כתובה תמיד באות גדולה", ok: t.length > 0 && !/(^|[^A-Za-z'])i([^A-Za-z']|$)/.test(t) });
  return checks;
}
function writingTask(ui, scrRes) {
  const u = UNITS[ui], task = u.writing.task;
  const draftKey = `draft_${u.id}`;
  let text = "";
  try { text = localStorage.getItem(draftKey) || task.starter; } catch (e) { text = task.starter; }
  show(`${topbar(true)}<main class="page">
    <div class="card">
      <div class="node-n">✍️ כתיבה חופשית</div>
      <p class="task">${esc(task.he)}</p>
      <details class="words-help"><summary>📒 מילים מהיחידה שיכולות לעזור</summary>
        <div class="chips">${unitWords(ui).map((w) => `<span class="chip" dir="ltr" title="${esc(w.he)}">${esc(w.en)}</span>`).join("")}</div></details>
      <textarea id="ta" dir="ltr" class="ta" spellcheck="false" autocapitalize="sentences">${esc(text)}</textarea>
      <ul class="checks" id="checks"></ul>
      <div class="row">
        <button class="btn ghost" id="read">🔊 הקרא לי</button>
        <button class="btn" id="send" disabled>שלח ✔️</button>
      </div>
      <p class="hint">💡 טיפ: לחץ "הקרא לי" ושמע אם המשפטים נשמעים נכון.</p>
    </div></main>`);
  bindTopbar(() => unitScreen(ui));
  const ta = $("#ta");
  const upd = () => {
    const c = writingChecks(ta.value, task);
    $("#checks").innerHTML = c.map((x) => `<li class="${x.ok ? "ok" : ""}">${x.ok ? "✅" : "⬜"} ${esc(x.label)}</li>`).join("");
    $("#send").disabled = !c[0].ok;
    try { localStorage.setItem(draftKey, ta.value); } catch (e) { /* ignore */ }
  };
  ta.oninput = upd; upd();
  ta.focus(); ta.setSelectionRange(ta.value.length, ta.value.length);
  $("#read").onclick = () => speak(ta.value);
  $("#send").onclick = () => {
    const c = writingChecks(ta.value, task);
    const score = c.filter((x) => x.ok).length / c.length;
    const tStars = score === 1 ? 3 : score >= 0.7 ? 2 : 1;
    S.writings.unshift({ unit: ui, date: dateKey(), text: ta.value.trim().slice(0, 3000), score: Math.round(score * 100) });
    S.writings = S.writings.slice(0, 60);
    try { localStorage.removeItem(draftKey); } catch (e) { /* ignore */ }
    const stars = Math.max(1, Math.round((scrRes.stars + tStars) / 2));
    finishStation(ui, "writing", { ...scrRes, stars, xp: scrRes.xp + Math.round(score * 40), perfect: scrRes.perfect && score === 1 });
  };
}

/* =========================================================
   מנוע תרגילים
   ========================================================= */
const PRAISE = ["מעולה!", "כל הכבוד!", "יפה מאוד!", "אלוף!", "בדיוק!", "מצוין!", "Great job!", "Excellent!", "Well done!", "Perfect!"];
const ENCOURAGE = ["לא נורא – ננסה שוב בהמשך 💪", "טעות זה חלק מהלמידה 🙂", "כמעט! נחזור על זה עוד מעט", "זה בסדר, בפעם הבאה תצליח!"];

function runner(cfg) {
  const st = { queue: cfg.items.filter(Boolean).map((it) => ({ ...it, tries: 0 })), pos: 0, done: 0, first: 0, xp: 0, lives: cfg.boss ? 3 : null };
  st.total = st.queue.length;

  const render = () => {
    if (st.pos >= st.queue.length) return finish();
    const it = st.queue[st.pos];
    show(`<div class="run">
      <div class="run-top">
        <button class="icon-btn" id="quit" aria-label="יציאה">✕</button>
        <div class="pbar"><div style="width:${(st.done / st.total) * 100}%"></div></div>
        ${cfg.boss ? `<span class="hearts">${"❤️".repeat(st.lives)}${"🖤".repeat(3 - st.lives)}</span>` : `<span class="cnt">${Math.min(st.done + 1, st.total)}/${st.total}</span>`}
      </div>
      <div class="run-title">${cfg.title}${it.tries ? ' <span class="again">🔁 שוב</span>' : ""}
        ${cfg.help ? `<button class="chip" id="help">📘 ההסבר</button>` : ""}</div>
      ${cfg.header ? cfg.header() : ""}
      ${cfg.passage ? `<details class="passage" ${st.pos === 0 ? "open" : ""}><summary>📜 הקטע: ${esc(cfg.passage.title)}</summary><div class="passage-text" dir="ltr">${passageHtml(cfg.passage.text)}</div></details>` : ""}
      <div class="item" id="item"></div>
      <div class="fb" id="fb"></div>
    </div>`);
    $("#quit").onclick = async () => { if (await ask("לצאת מהתחנה? ההתקדמות בתחנה הזו לא תישמר.", { ok: "צא", cancel: "המשך לשחק" })) cfg.onQuit(); };
    if (cfg.help) $("#help").onclick = () => modal(`<h3 dir="ltr">${esc(cfg.help.title)}</h3><div class="gram-body">${cfg.help.explain}</div>`);
    if (cfg.passage) bindPassage(app);
    if (cfg.onRender) cfg.onRender();
    RENDER[it.kind](it, $("#item"), answer);
  };

  const answer = (ok, correctText) => {
    const it = st.queue[st.pos];
    $$("#item button, #item input").forEach((b) => (b.disabled = true));
    if (it.wordId) wordResult(it.wordId, ok);
    if (it.words && it.badIds) it.words.forEach((w) => wordResult(w.id, !it.badIds.has(w.id)));
    let retry = false;
    if (ok) {
      st.xp += it.tries ? 5 : 10;
      if (!it.tries) st.first++;
      st.done++;
      sfx.ok();
    } else {
      sfx.bad();
      if (cfg.boss) { st.lives--; st.done++; }
      else if (!it.noRetry && it.tries < 1) { st.queue.push({ ...it, tries: 1 }); retry = true; }
      else st.done++;
    }
    if (ok && it.kind !== "listen" && it.w) setTimeout(() => autoSay(it.w.en), 150);
    if (ok && it.kind === "scramble") setTimeout(() => autoSay(it.sentence), 150);
    save();
    const dead = cfg.boss && st.lives <= 0;
    const fb = $("#fb");
    fb.className = `fb show ${ok ? "good" : "bad"}`;
    fb.innerHTML = `<div class="fb-in">
      <div class="fb-msg">${ok ? `✅ ${pick(PRAISE)} <small dir="ltr">+${it.tries ? 5 : 10} XP</small>`
        : `❌ ${dead ? "נגמרו הלבבות..." : cfg.boss ? "אוי! איבדת לב" : pick(ENCOURAGE)}`}</div>
      ${!ok && correctText ? `<div class="fb-ans">התשובה הנכונה: <b dir="ltr">${esc(correctText)}</b> ${spk(correctText)}</div>` : ""}
      ${retry ? `<div class="fb-note">🔁 השאלה תחזור בסוף</div>` : ""}
      <button class="btn" id="cont">${dead ? "סיום" : "המשך ←"}</button></div>`;
    const go = () => { if (dead) return fail(); st.pos++; render(); };
    $("#cont").onclick = go;
    setTimeout(() => { onEnter = go; $("#cont").focus({ preventScroll: true }); }, 50);
    fb.scrollIntoView({ behavior: "smooth", block: "end" });
  };

  const fail = () => {
    const xp = Math.round(st.xp / 2);
    S.xp += xp; save();
    show(`<main class="page center-screen"><div class="boss-ic">🐲</div>
      <h2 class="title">הבוס ניצח הפעם...</h2>
      <div class="card"><p>אבל כל ניסיון מחזק אותך! קיבלת <b dir="ltr">+${xp} XP</b> על המאמץ.</p>
      <p>💡 טיפ: אפשר לחזור לתחנות של היחידה (מילים / דקדוק) ולהתאמן לפני שמנסים שוב.</p>
      <div class="row"><button class="btn ghost" id="back">ליחידה</button><button class="btn" id="again">⚔️ נסה שוב</button></div></div></main>`);
    $("#back").onclick = cfg.onQuit;
    $("#again").onclick = () => runner({ ...cfg, items: cfg.rebuild ? cfg.rebuild() : shuffle(cfg.items) });
  };

  const finish = () => {
    const acc = st.total ? st.first / st.total : 1;
    let stars = cfg.boss ? st.lives : acc >= 0.9 ? 3 : acc >= 0.7 ? 2 : 1;
    cfg.onFinish({ acc, stars, xp: st.xp, perfect: st.first === st.total, total: st.total, first: st.first });
  };
  render();
}

function modal(html) {
  const m = document.createElement("div");
  m.className = "modal";
  m.innerHTML = `<div class="modal-box card">${html}<button class="btn" id="mclose">סגור</button></div>`;
  document.body.appendChild(m);
  const close = () => m.remove();
  $("#mclose", m).onclick = close;
  m.onclick = (e) => { if (e.target === m) close(); };
}

/* חלון אישור / הקלדה בתוך הדף (במקום confirm / prompt של הדפדפן) */
function ask(msg, { ok = "כן", cancel = "ביטול", input = false, danger = false } = {}) {
  return new Promise((resolve) => {
    const m = document.createElement("div");
    m.className = "modal";
    m.innerHTML = `<div class="modal-box card ask"><p>${msg}</p>
      ${input ? `<input class="inp" id="askin" autocomplete="off" ${input === "pin" ? 'inputmode="numeric" type="password"' : ""}>` : ""}
      <div class="row"><button class="btn ghost" id="askno">${cancel}</button><button class="btn ${danger ? "red" : ""}" id="askyes">${ok}</button></div></div>`;
    document.body.appendChild(m);
    const prevEnter = onEnter;
    const close = (v) => { m.remove(); onEnter = prevEnter; resolve(v); };
    const yes = () => close(input ? $("#askin", m).value : true);
    $("#askyes", m).onclick = yes;
    $("#askno", m).onclick = () => close(input ? null : false);
    m.onclick = (e) => { if (e.target === m) close(input ? null : false); };
    onEnter = yes;
    setTimeout(() => (input ? $("#askin", m) : $("#askyes", m)).focus(), 50);
  });
}

/* ---------- סוגי תרגילים ---------- */
function mcButtons(el, prompt, opts, correctIdx, done, { ltr = true, say = false } = {}) {
  el.innerHTML = `${prompt}<div class="opts ${opts.length > 3 ? "grid" : ""}">${opts.map((o, i) =>
    `<button class="opt" data-i="${i}" ${ltr ? 'dir="ltr"' : ""}><span class="k">${i + 1}</span>${esc(o)}</button>`).join("")}</div>`;
  const btns = $$(".opt", el);
  const choose = (i) => {
    if (btns[i].disabled) return;
    const ok = i === correctIdx;
    btns[correctIdx].classList.add("right");
    if (!ok) btns[i].classList.add("wrong");
    onKey = null;
    done(ok, ok ? null : opts[correctIdx]);
  };
  btns.forEach((b, i) => (b.onclick = () => { if (say) autoSay(opts[i]); choose(i); }));
  onKey = (n) => { if (n >= 1 && n <= opts.length) choose(n - 1); };
}
let onKey = null;
document.addEventListener("keydown", (e) => {
  if (!onKey || e.target.tagName === "INPUT" || e.target.tagName === "TEXTAREA") return;
  const n = parseInt(e.key, 10);
  if (!isNaN(n)) onKey(n);
});

function typedInput(el, prompt, accept, done, { placeholder = "הקלד כאן…", hint = null } = {}) {
  el.innerHTML = `${prompt}
    <input class="inp ans" id="ans" dir="ltr" autocomplete="off" autocapitalize="off" autocorrect="off" spellcheck="false" placeholder="${placeholder}">
    ${hint ? `<div class="hint-row"><button class="chip" id="hintb">💡 רמז</button><span id="hintt" dir="ltr" class="hint-t"></span></div>` : ""}
    <button class="btn" id="chk">בדוק ✔️</button>`;
  const inp = $("#ans", el);
  setTimeout(() => inp.focus(), 60);
  let shown = 0;
  if (hint) $("#hintb", el).onclick = () => {
    shown = Math.min(hint.length, shown + 1);
    $("#hintt", el).textContent = hint.slice(0, shown) + hint.slice(shown).replace(/[A-Za-z]/g, " _");
    inp.focus();
  };
  const check = () => {
    if (!inp.value.trim()) { inp.focus(); return; }
    const ok = accept.map(norm).includes(norm(inp.value));
    inp.classList.add(ok ? "right" : "wrong");
    done(ok, ok ? null : accept[0]);
  };
  $("#chk", el).onclick = check;
  inp.onkeydown = (e) => { if (e.key === "Enter") { e.preventDefault(); e.stopPropagation(); check(); } };
}

const RENDER = {
  mcWord(it, el, done) {
    mcButtons(el, `<div class="prompt"><div class="q-lbl">מה הפירוש?</div><div class="big-word" dir="ltr">${esc(it.w.en)} ${spk(it.w.en)}</div></div>`,
      it.opts.map((o) => o.he), it.opts.indexOf(it.w), (ok) => done(ok, it.w.he), { ltr: false });
    autoSay(it.w.en);
  },
  mcHe(it, el, done) {
    mcButtons(el, `<div class="prompt"><div class="q-lbl">איך אומרים באנגלית?</div><div class="big-word">${esc(it.w.he)}</div></div>`,
      it.opts.map((o) => o.en), it.opts.indexOf(it.w), (ok) => done(ok, it.w.en), { say: true });
  },
  listen(it, el, done) {
    mcButtons(el, `<div class="prompt"><div class="q-lbl">לחץ על 🔊, הקשב ובחר את המילה ששמעת</div>
      <button class="spk huge" data-say="${esc(it.w.en)}">🔊</button>
      <button class="chip" id="slow">🐢 לאט</button></div>`,
      it.opts.map((o) => o.en), it.opts.indexOf(it.w), (ok) => done(ok, it.w.en));
    $("#slow", el).onclick = () => speak(it.w.en, 0.5);
    setTimeout(() => autoSay(it.w.en), 250);
  },
  fill(it, el, done) {
    mcButtons(el, `<div class="prompt"><div class="q-lbl">השלם את המשפט</div><div class="sentence" dir="ltr">${esc(it.sentence)}</div></div>`,
      it.opts.map((o) => o.en), it.opts.indexOf(it.w), (ok) => { done(ok, it.w.en); if (ok) setTimeout(() => autoSay(it.w.ex), 900); });
  },
  spell(it, el, done) {
    typedInput(el, `<div class="prompt"><div class="q-lbl">כתוב באנגלית</div><div class="big-word">${esc(it.w.he)} ${spk(it.w.en)}</div>
      <div class="letters" dir="ltr">${it.w.en.split("").map((c) => (c === " " ? "&nbsp;&nbsp;" : "_")).join(" ")}</div></div>`,
      [it.w.en], done, { hint: it.w.en });
  },
  mc(it, el, done) {
    const order = shuffle(it.options.map((o, i) => i));
    const opts = order.map((i) => it.options[i]);
    mcButtons(el, `<div class="prompt"><div class="sentence" dir="ltr">${esc(it.q)}</div>${it.he ? `<div class="q-he">${esc(it.he)}</div>` : ""}</div>`,
      opts, order.indexOf(it.a), done);
  },
  type(it, el, done) {
    typedInput(el, `<div class="prompt"><div class="sentence" dir="ltr">${esc(it.q)}</div>${it.he ? `<div class="q-he">${esc(it.he)}</div>` : ""}</div>`,
      it.answer, done);
  },
  scramble(it, el, done) {
    const tokens = it.sentence.split(" ");
    let bank = shuffle(tokens.map((t, i) => ({ t, i })));
    let tries = 0;
    while (tokens.length > 1 && bank.map((b) => b.t).join(" ") === it.sentence && tries++ < 10) bank = shuffle(bank);
    const line = [];
    const draw = () => {
      el.innerHTML = `<div class="prompt"><div class="q-lbl">סדר את המילים למשפט נכון</div></div>
        <div class="line" dir="ltr">${line.map((b, i) => `<button class="tile" data-l="${i}">${esc(b.t)}</button>`).join("") || '<span class="muted">לחץ על המילים לפי הסדר…</span>'}</div>
        <div class="bank" dir="ltr">${bank.map((b, i) => `<button class="tile" data-b="${i}">${esc(b.t)}</button>`).join("")}</div>
        <button class="btn" id="chk" ${bank.length ? "disabled" : ""}>בדוק ✔️</button>`;
      $$("[data-b]", el).forEach((b) => (b.onclick = () => { sfx.tap(); line.push(bank.splice(+b.dataset.b, 1)[0]); draw(); }));
      $$("[data-l]", el).forEach((b) => (b.onclick = () => { bank.push(line.splice(+b.dataset.l, 1)[0]); draw(); }));
      $("#chk", el).onclick = () => {
        const ok = line.map((b) => b.t).join(" ") === it.sentence;
        $(".line", el).classList.add(ok ? "right" : "wrong");
        done(ok, it.sentence);
      };
    };
    draw();
  },
  match(it, el, done) {
    const left = shuffle(it.words), right = shuffle(it.words);
    let selL = null, selR = null, matched = 0;
    it.badIds = new Set();
    el.innerHTML = `<div class="prompt"><div class="q-lbl">התאם כל מילה לפירוש שלה</div></div>
      <div class="match">
        <div class="mcol" dir="ltr">${left.map((w) => `<button class="mt" data-id="${w.id}" data-side="L">${esc(w.en)}</button>`).join("")}</div>
        <div class="mcol">${right.map((w) => `<button class="mt" data-id="${w.id}" data-side="R">${esc(w.he)}</button>`).join("")}</div>
      </div>`;
    const tryPair = () => {
      if (!selL || !selR) return;
      const a = selL, b = selR;
      selL = selR = null;
      if (a.dataset.id === b.dataset.id) {
        sfx.tap();
        [a, b].forEach((x) => { x.classList.remove("sel"); x.classList.add("matched"); x.disabled = true; });
        if (++matched === it.words.length) setTimeout(() => done(it.badIds.size === 0, null), 250);
      } else {
        it.badIds.add(a.dataset.id); it.badIds.add(b.dataset.id);
        tone(220, 0.15, "triangle");
        [a, b].forEach((x) => { x.classList.add("wrong"); setTimeout(() => x.classList.remove("wrong", "sel"), 450); });
      }
    };
    $$(".mt", el).forEach((b) => (b.onclick = () => {
      if (b.dataset.side === "L") {
        autoSay(wordById(b.dataset.id).en);
        if (selL) selL.classList.remove("sel");
        selL = b;
      } else {
        if (selR) selR.classList.remove("sel");
        selR = b;
      }
      b.classList.add("sel");
      tryPair();
    }));
  }
};

/* ---------- סיום תחנה ---------- */
function finishStation(ui, k, r) {
  const rec = stRec(ui, k);
  const firstTime = !(rec && rec.stars);
  const lvlBefore = levelOf(S.xp);
  const bonus = firstTime ? 20 + (r.perfect ? 20 : 0) : r.perfect ? 10 : 0;
  const xp = r.xp + bonus;
  let coins = firstTime ? r.stars * 5 : r.stars;
  if (k === "boss" && firstTime) coins += r.stars * 10;
  const improved = !firstTime && r.stars > rec.stars;
  if (improved) coins += (r.stars - rec.stars) * 5;
  unitRec(ui)[k] = { stars: Math.max(r.stars, (rec && rec.stars) || 0), best: Math.max(Math.round(r.acc * 100), (rec && rec.best) || 0), date: dateKey(), plays: ((rec && rec.plays) || 0) + 1 };
  S.xp += xp;
  S.coins += coins;
  const dk = dateKey();
  S.days[dk] = S.days[dk] || { sec: 0, st: 0 };
  S.days[dk].st++;
  const newAch = [...(r.perfect ? grantAch("perfect") : []), ...checkAch()];
  save(true);
  const lvlAfter = levelOf(S.xp);
  const st = STATIONS.find((s) => s.key === k);
  const nx = nextStep();
  const isBoss = k === "boss";
  sfx.win();
  confetti(isBoss ? 160 : 80);
  show(`<main class="page center-screen result">
    <div class="res-ic">${isBoss ? "🏆" : st.icon}</div>
    <h2 class="title">${isBoss ? "ניצחת את הבוס!" : `סיימת: ${st.name}!`}</h2>
    <div class="res-stars">${starsHtml(r.stars)}</div>
    <div class="card res-card">
      ${r.total ? `<div class="res-row"><span>תשובות נכונות בניסיון ראשון</span><b>${r.first}/${r.total}</b></div>` : ""}
      <div class="res-row"><span>נקודות ניסיון</span><b dir="ltr">+${xp} XP</b></div>
      <div class="res-row"><span>מטבעות</span><b dir="ltr">+${coins} 🪙</b></div>
      ${improved ? `<div class="res-row"><span>שיפרת את התוצאה!</span><b>📈</b></div>` : ""}
    </div>
    ${lvlAfter > lvlBefore ? `<div class="card levelup">⬆️ עלית לרמה <b>${lvlAfter}</b>! ${rankOf(lvlAfter).icon} ${rankOf(lvlAfter).name}</div>` : ""}
    ${isBoss && ui < UNITS.length - 1 && firstTime ? `<div class="card levelup">🔓 נפתחה יחידה ${ui + 2}: <span dir="ltr">${UNITS[ui + 1].title}</span></div>` : ""}
    ${newAch.map((a) => `<div class="card ach-new">${a.icon} הישג חדש: <b>${a.name}</b><small>${a.desc}</small></div>`).join("")}
    ${!r.perfect && r.stars < 3 ? `<p class="hint">💡 רוצה 3 כוכבים? אפשר לשחק שוב בתחנה בכל זמן.</p>` : ""}
    <div class="row">
      <button class="btn ghost" id="map">🗺️ למפה</button>
      ${nx ? `<button class="btn" id="next">${nx.ui === ui ? `לתחנה הבאה: ${STATIONS.find((s) => s.key === nx.k).name}` : `ליחידה ${nx.ui + 1}`} ←</button>` : ""}
    </div>
    ${todayMin() >= 30 ? `<p class="hint center">⏱️ למדת היום ${todayMin()} דקות – עבודה מצוינת! אפשר לעצור כאן ולהמשיך בפעם הבאה.</p>` : ""}
  </main>`);
  if (lvlAfter > lvlBefore) setTimeout(() => sfx.coin(), 700);
  $("#map").onclick = homeScreen;
  if (nx) { const go = () => (nx.ui === ui ? startStation(nx.ui, nx.k) : unitScreen(nx.ui)); $("#next").onclick = go; onEnter = go; }
}

/* ---------- חזרה (מילים חלשות) ---------- */
function reviewScreen() {
  const seen = ALL_WORDS.filter((w) => S.words[w.id] && S.words[w.id].seen);
  const weak = seen.filter((w) => S.words[w.id].s <= 2).length;
  show(`${topbar()}<main class="page">
    <h2 class="sec-t">🔁 חזרה חכמה</h2>
    <div class="card">
      <p>המשחק זוכר אילו מילים קשות לך ומחזיר אותן לתרגול – כך הן נכנסות לזיכרון לטווח ארוך.</p>
      <div class="stats3">
        <div><b>${seen.length}</b><small>מילים שלמדת</small></div>
        <div><b>${seen.filter((w) => S.words[w.id].s >= 4).length}</b><small>מילים "חזקות" 💪</small></div>
        <div><b>${weak}</b><small>מילים לחיזוק</small></div>
      </div>
      ${seen.length < 4 ? `<p class="hint">קודם צריך ללמוד כמה מילים בתחנה "מילים חדשות" 📖</p>`
        : `<button class="btn big" id="go">התחל סבב חזרה (10 שאלות) 🔁</button>`}
    </div>
    ${seen.length ? `<h3 class="sec-t small">📒 המילון שלי</h3>
    <div class="card dict">${seen.map((w) => { const s = S.words[w.id].s; return `<div class="dict-row"><span dir="ltr">${spk(w.en)} ${esc(w.en)}</span><span>${esc(w.he)}</span><span class="str s${Math.min(s, 5)}" title="חוזק">${"●".repeat(Math.max(1, s))}</span></div>`; }).join("")}</div>` : ""}
  </main>${navbar("review")}`);
  bindNav();
  const go = $("#go");
  if (go) go.onclick = () => {
    const chosen = shuffle(seen).sort((a, b) => S.words[a.id].s - S.words[b.id].s).slice(0, 10);
    const items = shuffle(chosen).map((w) => {
      const pool = unitWords(w.ui);
      const kinds = S.words[w.id].s >= 2 ? ["mcWord", "mcHe", "listen", "spell"] : ["mcWord", "mcHe", "listen"];
      const k = pick(kinds);
      return k === "spell" ? { kind: "spell", wordId: w.id, w } : mkVocab(k, w, pool);
    });
    runner({ title: "🔁 חזרה חכמה", items, onQuit: reviewScreen, onFinish: (r) => {
      S.reviews++;
      const coins = r.stars * 3;
      S.xp += r.xp; S.coins += coins;
      const dk = dateKey(); S.days[dk] = S.days[dk] || { sec: 0, st: 0 }; S.days[dk].st++;
      const newAch = checkAch();
      save(true); sfx.win(); confetti(60);
      show(`<main class="page center-screen result"><div class="res-ic">🔁</div><h2 class="title">סבב חזרה הושלם!</h2>
        <div class="res-stars">${starsHtml(r.stars)}</div>
        <div class="card res-card"><div class="res-row"><span>נכון בניסיון ראשון</span><b>${r.first}/${r.total}</b></div>
        <div class="res-row"><span>נקודות</span><b dir="ltr">+${r.xp} XP</b></div><div class="res-row"><span>מטבעות</span><b dir="ltr">+${coins} 🪙</b></div></div>
        ${newAch.map((a) => `<div class="card ach-new">${a.icon} הישג חדש: <b>${a.name}</b><small>${a.desc}</small></div>`).join("")}
        <div class="row"><button class="btn ghost" id="map">🗺️ למפה</button><button class="btn" id="again">עוד סבב 🔁</button></div></main>`);
      $("#map").onclick = homeScreen; $("#again").onclick = reviewScreen;
    } });
  };
}

/* ---------- הישגים ---------- */
function achScreen() {
  const lvl = levelOf(S.xp);
  show(`${topbar()}<main class="page">
    <h2 class="sec-t">🏅 ההישגים שלי</h2>
    <div class="card">
      <div class="stats3">
        <div><b>${lvl}</b><small>רמה</small></div>
        <div><b>${bossCount()}/12</b><small>בוסים</small></div>
        <div><b>${learnedCount()}</b><small>מילים</small></div>
      </div>
      <div class="ranks">${RANKS.map((r) => `<div class="rank ${lvl >= r.lvl ? "on" : ""}"><span>${r.icon}</span><small>${r.name}<br>רמה ${r.lvl}</small></div>`).join("")}</div>
    </div>
    <div class="ach-grid">${ACHIEVEMENTS.map((a) => `<div class="ach ${S.ach[a.id] ? "on" : ""}"><div class="ach-ic">${S.ach[a.id] ? a.icon : "🔒"}</div><b>${a.name}</b><small>${a.desc}</small></div>`).join("")}</div>
  </main>${navbar("ach")}`);
  bindNav();
}

/* ---------- חנות ---------- */
function shopScreen() {
  show(`${topbar()}<main class="page">
    <h2 class="sec-t">🛒 החנות</h2>
    <p class="sec-sub">מרוויחים מטבעות 🪙 בכל תחנה – וקונים דמויות וצבעים חדשים!</p>
    <h3 class="sec-t small">הדמות שלי</h3>
    <div class="shop-grid">${AVATARS.map((a) => {
      const own = S.owned.avatars.includes(a.id), cur = S.avatar === a.id;
      return `<button class="shop-it ${cur ? "cur" : ""} ${own ? "own" : ""}" data-av="${a.id}"><span class="shop-ic">${a.id}</span><small>${cur ? "בשימוש" : own ? "בחר" : `🪙 ${a.price}`}</small></button>`;
    }).join("")}</div>
    <h3 class="sec-t small">ערכות צבע</h3>
    <div class="shop-grid themes">${THEMES.map((t) => {
      const own = S.owned.themes.includes(t.id), cur = S.theme === t.id;
      return `<button class="shop-it ${cur ? "cur" : ""} ${own ? "own" : ""}" data-th="${t.id}"><span class="swatch" style="background:linear-gradient(135deg,${t.colors[0]},${t.colors[2]})"></span><b>${t.name}</b><small>${cur ? "בשימוש" : own ? "בחר" : `🪙 ${t.price}`}</small></button>`;
    }).join("")}</div>
  </main>${navbar("shop")}`);
  bindNav();
  const buy = async (price, apply) => {
    if (S.coins < price) { sfx.bad(); toast(`חסרים לך ${price - S.coins} מטבעות 🪙 – המשך ללמוד!`); return; }
    if (!(await ask(`לקנות ב-${price} מטבעות? 🪙`, { ok: "קנה" }))) return;
    S.coins -= price; apply(); sfx.coin(); toast("🎉 נקנה בהצלחה!");
    save(true); applyTheme(); shopScreen();
  };
  $$("[data-av]").forEach((b) => (b.onclick = () => {
    const a = AVATARS.find((x) => x.id === b.dataset.av);
    if (!S.owned.avatars.includes(a.id)) return buy(a.price, () => { S.owned.avatars.push(a.id); S.avatar = a.id; });
    S.avatar = a.id; save(); shopScreen();
  }));
  $$("[data-th]").forEach((b) => (b.onclick = () => {
    const t = THEMES.find((x) => x.id === b.dataset.th);
    if (!S.owned.themes.includes(t.id)) return buy(t.price, () => { S.owned.themes.push(t.id); S.theme = t.id; });
    S.theme = t.id; save(); applyTheme(); shopScreen();
  }));
}

/* ---------- אזור הורים ---------- */
async function parentGate() {
  if (!S.settings.pin) return parentScreen();
  const p = await ask("הקש קוד הורים:", { ok: "כניסה", input: "pin" });
  if (p === null) return;
  if (p === S.settings.pin) parentScreen(); else { sfx.bad(); toast("קוד שגוי"); }
}
function parentScreen() {
  const weeks = [...Array(8)].map((_, i) => { const ws = weekStart(); ws.setDate(ws.getDate() - 7 * (7 - i)); return { ws, min: weekMinutes(ws), days: weekCount(ws) }; });
  const maxMin = Math.max(30, ...weeks.map((w) => w.min));
  const weakWords = ALL_WORDS.filter((w) => S.words[w.id] && S.words[w.id].bad > 0).sort((a, b) => (S.words[a.id].s - S.words[b.id].s) || (S.words[b.id].bad - S.words[a.id].bad)).slice(0, 15);
  const stationsDone = UNITS.reduce((s, _, ui) => s + STATIONS.filter((st) => stDone(ui, st.key)).length, 0);
  show(`${topbar()}<main class="page parent">
    <h2 class="sec-t">⚙️ אזור הורים</h2>
    <div class="card">
      <div class="stats3">
        <div><b>${Math.floor(totalMin() / 60)}:${pad(totalMin() % 60)}</b><small>שעות לימוד</small></div>
        <div><b>${stationsDone}/${UNITS.length * STATIONS.length}</b><small>תחנות</small></div>
        <div><b>${learnedCount()}</b><small>מילים נלמדו</small></div>
      </div>
      <h3>דקות לימוד בשבוע (8 שבועות אחרונים)</h3>
      <div class="chart">${weeks.map((w) => `<div class="bar-w" title="${w.min} דק'"><div class="bar-v">${w.min}</div><div class="bar ${w.days >= S.settings.goal ? "met" : ""}" style="height:${(w.min / maxMin) * 100}%"></div><small>${w.ws.getDate()}/${w.ws.getMonth() + 1}</small></div>`).join("")}</div>
      <p class="hint">עמודה ירוקה = שבוע שבו הושג היעד (${S.settings.goal} ימי לימוד).</p>
    </div>

    ${typeof parentSkillsHtml === "function" ? parentSkillsHtml() : ""}
    <div class="card"><h3>התקדמות לפי יחידות</h3>
      <div class="tbl-wrap"><table class="ptable"><tr><th>יחידה</th>${STATIONS.map((s) => `<th title="${s.name}">${s.icon}</th>`).join("")}</tr>
      ${UNITS.map((u, ui) => `<tr><td dir="ltr">${ui + 1}. ${u.title}</td>${STATIONS.map((s) => { const r = stRec(ui, s.key); return `<td>${r && r.stars ? `${"★".repeat(r.stars)}<small>${r.best}%</small>` : "–"}</td>`; }).join("")}</tr>`).join("")}
      </table></div><p class="hint">האחוז = הציון הטוב ביותר בניסיון ראשון.</p></div>

    <div class="card"><h3>מילים שדורשות חיזוק</h3>
      ${weakWords.length ? `<div class="chips">${weakWords.map((w) => `<span class="chip" title="${S.words[w.id].bad} טעויות"><span dir="ltr">${esc(w.en)}</span> – ${esc(w.he)}</span>`).join("")}</div>` : `<p class="muted">עדיין אין – מצוין!</p>`}</div>

    <div class="card"><h3>חיבורים שנכתבו (${S.writings.length})</h3>
      ${S.writings.length ? S.writings.slice(0, 20).map((w) => `<div class="writing"><div class="muted">${w.date} · ${w.task ? esc(w.task) : `יחידה ${w.unit + 1}`} · ${w.words ? `${w.words} מילים · ` : ""}בדיקה אוטומטית ${w.score}%</div><p dir="ltr">${esc(w.text)}</p>${w.fb ? `<details><summary>🤖 משוב</summary><p class="fbtext">${esc(w.fb)}</p></details>` : ""}</div>`).join("") : `<p class="muted">עדיין לא נכתבו חיבורים.</p>`}
      <p class="hint">הבדיקה האוטומטית בודקת רק מבנה (אורך, מילים נדרשות, אות גדולה, נקודה). כדאי לקרוא יחד ולתת משוב.</p></div>

    <div class="card"><h3>הגדרות</h3>
      <label class="set"><span>צלילים</span><input type="checkbox" id="snd" ${S.settings.sound ? "checked" : ""}></label>
      <label class="set"><span>הקראה אוטומטית (בלי ללחוץ על 🔊)</span><input type="checkbox" id="auto" ${S.settings.autoSpeak ? "checked" : ""}></label>
      <label class="set"><span>מהירות הקראה</span><select id="rate">
        ${[[0.7, "איטית"], [0.85, "רגילה"], [1, "מהירה"]].map(([v, t]) => `<option value="${v}" ${S.settings.rate == v ? "selected" : ""}>${t}</option>`).join("")}</select></label>
      <label class="set"><span>יעד ימי לימוד בשבוע</span><select id="goal">${[1, 2, 3, 4, 5].map((n) => `<option ${S.settings.goal === n ? "selected" : ""}>${n}</option>`).join("")}</select></label>
      <label class="set"><span>פתח את כל היחידות (למשל כדי להתאים לחומר בבית הספר)</span><input type="checkbox" id="ulk" ${S.settings.unlockAll ? "checked" : ""}></label>
      <label class="set"><span>קוד הורים לאזור הזה (ריק = בלי קוד)</span><input id="pin" class="inp small" inputmode="numeric" maxlength="6" value="${esc(S.settings.pin)}"></label>
      <label class="set"><span>שם הילד</span><input id="nm" class="inp small" maxlength="16" value="${esc(S.name)}"></label>
      <button class="btn" id="saveset">שמור הגדרות</button>
    </div>

    <div class="card"><h3>גיבוי והעברה בין מכשירים</h3>
      <p class="sync ${cloud.status === "on" ? "ok" : ""}">${cloud.status === "on" ? "☁️ ההתקדמות מסונכרנת לחשבון Claude שמחובר עכשיו. בכל מכשיר שבו נכנסים לאותו קישור עם אותו חשבון, ההתקדמות תהיה זהה." : cloud.status === "ro" ? "⚠️ לחשבון הזה אין הרשאה לשמור. בעלת המשחק צריכה לשתף אותו עם הרשאת שימוש (Contributor)." : "💾 ההתקדמות נשמרת רק בדפדפן של המכשיר הזה."}</p>
      <p class="hint">ההתקדמות נשמרת בדפדפן של המכשיר הזה. כדי לעבור למכשיר אחר (מחשב ↔ טלפון): העתק את קוד הגיבוי, שלח אותו לעצמך, ובמכשיר השני הדבק אותו ולחץ "שחזר".</p>
      <div class="row"><button class="btn ghost" id="exp">📤 צור קוד גיבוי</button><button class="btn ghost" id="imp">📥 שחזר מקוד</button></div>
      <textarea id="bk" class="ta small" dir="ltr" placeholder="קוד הגיבוי יופיע כאן / הדבק כאן קוד לשחזור"></textarea>
    </div>

    <div class="card danger"><h3>איפוס</h3><button class="btn red" id="reset">🗑️ מחק את כל ההתקדמות</button></div>
  </main>${navbar("parent")}`);
  bindNav();
  if (typeof bindParentSkills === "function") bindParentSkills();
  $("#saveset").onclick = () => {
    S.settings.sound = $("#snd").checked;
    S.settings.autoSpeak = $("#auto").checked;
    S.settings.rate = parseFloat($("#rate").value);
    S.settings.goal = parseInt($("#goal").value, 10);
    S.settings.unlockAll = $("#ulk").checked;
    S.settings.pin = $("#pin").value.trim();
    if ($("#nm").value.trim()) S.name = $("#nm").value.trim();
    save(true); toast("✔️ נשמר"); parentScreen();
  };
  $("#exp").onclick = () => {
    const code = btoa(unescape(encodeURIComponent(JSON.stringify(S))));
    $("#bk").value = code;
    $("#bk").select();
    if (navigator.clipboard) navigator.clipboard.writeText(code).then(() => toast("📋 הקוד הועתק"), () => {});
  };
  $("#imp").onclick = async () => {
    try {
      const obj = JSON.parse(decodeURIComponent(escape(atob($("#bk").value.trim()))));
      if (!obj || typeof obj.xp !== "number") throw new Error("bad");
      if (!(await ask("לשחזר? ההתקדמות הנוכחית במכשיר הזה תוחלף.", { ok: "שחזר" }))) return;
      localStorage.setItem(STORE_KEY, JSON.stringify(obj));
      S = loadState(); applyTheme(); save(true); toast("✔️ שוחזר בהצלחה"); homeScreen();
    } catch (e) { toast("❌ הקוד לא תקין"); }
  };
  $("#reset").onclick = async () => {
    const v = await ask("למחוק את כל ההתקדמות? אי אפשר לבטל.<br>כדי לאשר, הקלד: <b>מחק</b>", { ok: "מחק הכל", input: true, danger: true });
    if (v === null || v.trim() !== "מחק") return;
    try { localStorage.removeItem(STORE_KEY); } catch (e) { /* ignore */ }
    S = loadState(); applyTheme(); save(true); onboarding();
  };
}

/* ---------- הפעלה ---------- */

