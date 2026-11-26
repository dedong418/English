/* 域控英语 — 纯前端，无后端。进度存 localStorage。朗读用浏览器 TTS。 */
"use strict";

const STORE = "ykyy_v1";
const state = {
  week: 1,
  tab: "read",
  rate: "normal", // normal | slow
  data: load(),
};

function load() {
  try { return JSON.parse(localStorage.getItem(STORE)) || {}; }
  catch { return {}; }
}
function save() { localStorage.setItem(STORE, JSON.stringify(state.data)); }
function wk(id = state.week) {
  state.data[id] = state.data[id] || { srs: {}, read: {}, shadow: {}, done: {} };
  return state.data[id];
}

/* ---------- TTS ---------- */
let VOICES = [];
function pickVoice() {
  const en = VOICES.filter(v => /^en(-|_|$)/i.test(v.lang));
  const prefer = en.find(v => /US/i.test(v.lang)) || en[0];
  return prefer || null;
}
function refreshVoices() { VOICES = speechSynthesis.getVoices() || []; }
if ("speechSynthesis" in window) {
  refreshVoices();
  speechSynthesis.onvoiceschanged = refreshVoices;
}
let warnedNoVoice = false;
function speak(text, opts = {}) {
  if (!("speechSynthesis" in window)) { alert("这个浏览器不支持朗读"); return; }
  speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance(text);
  const v = pickVoice();
  if (v) u.voice = v;
  else if (!warnedNoVoice) {
    warnedNoVoice = true;
    alert("这个浏览器没装英语语音，朗读可能不准。\n手机一般自带，电脑建议用 Edge 或 Chrome 打开，或在系统设置里加一个英语语音（如 English US）。");
  }
  u.lang = (v && v.lang) || "en-US";
  u.rate = opts.rate != null ? opts.rate : (state.rate === "slow" ? 0.7 : 0.95);
  if (opts.onend) u.onend = opts.onend;
  if (opts.onstart) u.onstart = opts.onstart;
  speechSynthesis.speak(u);
}
function stopSpeak() { if ("speechSynthesis" in window) speechSynthesis.cancel(); }

const el = (t, c, h) => { const e = document.createElement(t); if (c) e.className = c; if (h != null) e.innerHTML = h; return e; };
const esc = s => s.replace(/[&<>"]/g, m => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[m]));

/* ---------- 阅读 ---------- */
function viewRead() {
  const w = COURSE.weeks.find(x => x.id === state.week);
  const v = el("div");
  if (!w || !w.ready) { v.appendChild(el("div", "card muted center", "本周内容还没上线")); return v; }
  const r = w.reading;
  v.appendChild(el("div", "card", `<h2>${esc(r.title)}</h2>
    <div class="row small muted"><span>第 ${w.week || state.week} 周 · ${esc(w.topic)}</span><span class="spacer"></span>
    <span>计时读，别回看、别逐字翻</span></div>`));

  r.paras.forEach((p, i) => {
    const box = el("div", "para");
    box.appendChild(el("p", null, esc(p)));
    const tools = el("div", "ptools");
    const play = el("button", "btn sm ghost", "🔊 朗读");
    play.onclick = () => {
      document.querySelectorAll(".para").forEach(x => x.classList.remove("playing"));
      box.classList.add("playing");
      speak(p, { onend: () => box.classList.remove("playing") });
    };
    tools.appendChild(play);
    box.appendChild(tools);
    v.appendChild(box);
  });

  const qc = el("div", "card");
  qc.appendChild(el("h2", null, "理解题"));
  r.questions.forEach((qa, i) => {
    qc.appendChild(el("details", "qa", `<summary>${i + 1}. ${esc(qa.q)}</summary><div class="ans">${esc(qa.a)}</div>`));
  });
  v.appendChild(qc);

  const wc = el("div", "card");
  wc.innerHTML = `<h2>写作任务</h2><p class="small">${esc(r.writing)}</p>`;
  const doneBtn = el("button", "btn sm" + (wk().done.read ? " ghost" : ""), wk().done.read ? "✓ 本周阅读已标记完成" : "标记本周阅读完成");
  doneBtn.onclick = () => { wk().done.read = !wk().done.read; save(); render(); };
  wc.appendChild(doneBtn);
  v.appendChild(wc);
  return v;
}

/* ---------- 单词卡（简单间隔重复）---------- */
let flashState = null;
function viewVocab() {
  const v = el("div");
  const list = VOCAB[state.week] || [];
  if (!list.length) { v.appendChild(el("div", "card muted center", "本周没有单词")); return v; }
  const due = list.map((c, i) => ({ c, i })).filter(({ i }) => {
    const s = wk().srs[i]; return !s || !s.due || s.due <= Date.now();
  });
  const learned = list.filter((c, i) => { const s = wk().srs[i]; return s && s.reps >= 2; }).length;

  const head = el("div", "card");
  head.innerHTML = `<div class="row"><b>第 ${state.week} 周单词</b><span class="spacer"></span>
    <span class="small muted">待复习 ${due.length} · 已掌握 ${learned}/${list.length}</span></div>
    <div class="progress-bar" style="margin-top:10px"><i style="width:${Math.round(learned / list.length * 100)}%"></i></div>`;
  v.appendChild(head);

  if (!due.length) {
    v.appendChild(el("div", "card center", `<p>🎉 本周单词都复习过了。</p><p class="small muted">想重练就点下面。</p>`));
    const again = el("button", "btn ghost", "再过一遍全部");
    again.onclick = () => { flashState = { queue: list.map((c, i) => i), pos: 0, flipped: false, forced: true }; render(); };
    v.appendChild(again);
    return v;
  }

  if (!flashState || flashState.week !== state.week || flashState.pos >= flashState.queue.length) {
    flashState = { week: state.week, queue: due.map(d => d.i), pos: 0, flipped: false };
  }
  const idx = flashState.queue[flashState.pos];
  const card = list[idx];
  const fc = el("div", "card flash");
  if (!flashState.flipped) {
    fc.innerHTML = `<div class="term">${esc(card.term)}</div><div class="phon">${esc(card.phon)}</div>
      <div class="hint">点卡片看中文 · 点 🔊 听读音</div>`;
  } else {
    fc.innerHTML = `<div class="term">${esc(card.term)}</div><div class="phon">${esc(card.phon)}</div>
      <div class="zh">${esc(card.zh)}</div><div class="ex">${esc(card.ex)}</div>
      <span class="pill ${card.cat}" style="margin-top:12px">${card.cat === "tech" ? "技术" : "会议"}</span>`;
  }
  fc.onclick = () => { flashState.flipped = !flashState.flipped; render(); };
  v.appendChild(fc);

  const bar = el("div", "row", "");
  const sp = el("button", "btn ghost sm", "🔊 读单词");
  sp.onclick = e => { e.stopPropagation(); speak(card.term, { rate: 0.9 }); };
  const spx = el("button", "btn ghost sm", "🔊 读例句");
  spx.onclick = e => { e.stopPropagation(); speak(card.ex); };
  bar.append(sp, spx, el("span", "spacer"), el("span", "small muted", `${flashState.pos + 1}/${flashState.queue.length}`));
  v.appendChild(bar);

  if (flashState.flipped) {
    const g = el("div", "grade"); g.style.marginTop = "12px";
    const again = el("button", "btn again", "没记住");
    const good = el("button", "btn good", "记住了");
    again.onclick = () => gradeCard(idx, false);
    good.onclick = () => gradeCard(idx, true);
    g.append(again, good);
    v.appendChild(g);
  }
  return v;
}
function gradeCard(idx, ok) {
  const srs = wk().srs;
  const s = srs[idx] || { reps: 0 };
  const steps = [10 * 60e3, 60 * 60e3, 24 * 3600e3, 3 * 24 * 3600e3, 7 * 24 * 3600e3];
  if (ok) s.reps = (s.reps || 0) + 1; else s.reps = 0;
  s.due = Date.now() + steps[Math.min(s.reps, steps.length - 1)];
  srs[idx] = s; save();
  flashState.pos++; flashState.flipped = false;
  render();
}

/* ---------- 会议 ---------- */
function viewMeeting() {
  const v = el("div");
  const m = MEETING[state.week];
  if (!m) { v.appendChild(el("div", "card muted center", "本周没有会议材料")); return v; }

  m.phrases.forEach(grp => {
    const c = el("div", "card");
    c.appendChild(el("h2", null, esc(grp.group)));
    grp.items.forEach(t => {
      const row = el("div", "phrase");
      row.appendChild(el("div", "t", esc(t)));
      const b = el("button", "btn ghost sm", "🔊");
      b.onclick = () => speak(t);
      row.appendChild(b);
      c.appendChild(row);
    });
    v.appendChild(c);
  });

  const d = el("div", "card");
  d.appendChild(el("h2", null, "角色扮演脚本"));
  const playAll = el("button", "btn sm", "🔊 连续朗读整段对话");
  let seq = 0;
  playAll.onclick = () => {
    const lines = m.dialog;
    const next = () => { if (seq < lines.length) { const l = lines[seq++]; speak(l.t, { onend: next }); } else seq = 0; };
    seq = 0; next();
  };
  d.appendChild(playAll);
  d.appendChild(el("div", "small muted", "<br>"));
  m.dialog.forEach(line => {
    const who = line.s === "You" ? "you" : "cust";
    const row = el("div", "dlg " + who);
    const bub = el("div", "bubble", esc(line.t));
    bub.onclick = () => speak(line.t);
    row.appendChild(bub);
    d.appendChild(row);
  });
  v.appendChild(d);

  v.appendChild(el("div", "card small muted", esc(m.roleplay)));
  return v;
}

/* ---------- 跟读 ---------- */
function viewShadow() {
  const v = el("div");
  const lines = SHADOWING[state.week] || [];
  if (!lines.length) { v.appendChild(el("div", "card muted center", "本周没有跟读材料")); return v; }

  const head = el("div", "card");
  head.innerHTML = `<div class="row"><b>第 ${state.week} 周跟读</b><span class="spacer"></span></div>
    <p class="small muted">先听慢速跟顺，再切正常速度。点句子或 🔊 播放。</p>`;
  const rt = el("div", "rate-toggle");
  ["slow", "normal"].forEach(r => {
    const b = el("button", state.rate === r ? "active" : "", r === "slow" ? "慢速" : "正常");
    b.onclick = () => { state.rate = r; render(); };
    rt.appendChild(b);
  });
  head.appendChild(rt);
  v.appendChild(head);

  lines.forEach((t, i) => {
    const box = el("div", "shadow-line");
    box.appendChild(el("div", "t", esc(t)));
    const bar = el("div", "row");
    const play = el("button", "btn ghost sm", "🔊 播放");
    play.onclick = () => {
      document.querySelectorAll(".shadow-line").forEach(x => x.classList.remove("playing"));
      box.classList.add("playing");
      speak(t, { onend: () => box.classList.remove("playing") });
    };
    const chk = wk().shadow[i];
    const done = el("button", "btn sm" + (chk ? " good" : " ghost"), chk ? "✓ 跟顺了" : "标记跟顺");
    done.onclick = () => { wk().shadow[i] = !wk().shadow[i]; save(); render(); };
    bar.append(play, el("span", "spacer"), done);
    box.appendChild(bar);
    v.appendChild(box);
  });
  return v;
}

/* ---------- 进度 / 首页 ---------- */
function viewHome() {
  const v = el("div");
  // 统计
  let totalLearned = 0, totalWords = 0, shadowDone = 0, shadowTotal = 0;
  COURSE.weeks.forEach(w => {
    const list = VOCAB[w.id] || [];
    totalWords += list.length;
    const d = state.data[w.id];
    if (d) {
      list.forEach((_, i) => { if (d.srs[i] && d.srs[i].reps >= 2) totalLearned++; });
      const sl = SHADOWING[w.id] || [];
      shadowTotal += sl.length;
      sl.forEach((_, i) => { if (d.shadow[i]) shadowDone++; });
    } else { shadowTotal += (SHADOWING[w.id] || []).length; }
  });

  const stat = el("div", "stat");
  stat.innerHTML = `
    <div class="box"><b>${totalLearned}</b><span class="small muted">已掌握单词</span></div>
    <div class="box"><b>${shadowDone}</b><span class="small muted">跟读句</span></div>
    <div class="box"><b>${COURSE.weeks.filter(w => w.ready).length}</b><span class="small muted">已上线周</span></div>`;
  v.appendChild(stat);

  const intro = el("div", "card small muted");
  intro.innerHTML = `${esc(COURSE.subtitle)}<br><br>
    <b style="color:var(--fg)">怎么用：</b>每天阅读一段 + 过单词卡 + 跟读几句；每周和 Claude 做一次会议角色扮演，交一篇写作让它批改。
    进度只存在这台设备，不上传。`;
  v.appendChild(intro);

  const wl = el("div", "card");
  wl.appendChild(el("h2", null, "16 周"));
  const topics = ["CAN / CAN FD", "车载以太网 / VLAN", "SOME/IP", "AUTOSAR CP/AP", "电源管理", "网络管理", "时间同步 gPTP", "UDS 诊断", "CAN TP / DoIP", "DTC 故障管理", "故障响应降级", "刷写 / OTA", "EOL", "日志 DLT", "系统架构", "端到端场景"];
  for (let i = 1; i <= 16; i++) {
    const w = COURSE.weeks.find(x => x.id === i);
    const ready = w && w.ready;
    const item = el("div", "weekcard wk-item" + (ready ? "" : " locked") + (i === state.week ? " active" : ""));
    item.innerHTML = `<div class="n">${i}</div><div style="flex:1"><div>${esc(topics[i - 1] || "")}</div>
      <div class="small muted">${ready ? "已上线" : "待上线"}</div></div>`;
    if (ready) item.onclick = () => { state.week = i; state.tab = "read"; flashState = null; render(); };
    wl.appendChild(item);
  }
  v.appendChild(wl);
  return v;
}

/* ---------- 周次选择弹层 ---------- */
function openWeekSheet() {
  const bg = el("div", "sheet-bg");
  const sheet = el("div", "sheet");
  sheet.appendChild(el("h3", null, "选择周次"));
  COURSE.weeks.filter(w => w.ready).forEach(w => {
    const it = el("div", "wk-item" + (w.id === state.week ? " active" : ""), `第 ${w.id} 周 · ${esc(w.topic)}`);
    it.onclick = () => { state.week = w.id; flashState = null; document.body.removeChild(bg); render(); };
    sheet.appendChild(it);
  });
  bg.appendChild(sheet);
  bg.onclick = e => { if (e.target === bg) document.body.removeChild(bg); };
  document.body.appendChild(bg);
}

/* ---------- 路由 ---------- */
function render() {
  stopSpeak();
  const view = document.getElementById("view");
  view.innerHTML = "";
  const map = { read: viewRead, vocab: viewVocab, meeting: viewMeeting, shadow: viewShadow, home: viewHome };
  view.appendChild((map[state.tab] || viewHome)());
  view.scrollTop = 0; window.scrollTo(0, 0);
  const names = { read: "阅读", vocab: "单词", meeting: "会议", shadow: "跟读", home: "域控英语" };
  document.getElementById("title").textContent = state.tab === "home" ? "域控英语" : `第 ${state.week} 周 · ${names[state.tab]}`;
  document.querySelectorAll(".tabbar button").forEach(b => b.classList.toggle("active", b.dataset.tab === state.tab));
}

document.querySelectorAll(".tabbar button").forEach(b => {
  b.onclick = () => { state.tab = b.dataset.tab; render(); };
});
document.getElementById("menuBtn").onclick = openWeekSheet;
document.getElementById("backBtn").hidden = true;

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => navigator.serviceWorker.register("sw.js").catch(() => {}));
}

render();

