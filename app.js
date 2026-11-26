/* 域控英语 — 纯前端，无后端。进度存 localStorage。朗读用浏览器 TTS。 */
"use strict";

const STORE = "ykyy_v1";
const state = {
  week: 1,
  tab: "read",
  dailySub: "scene", // scene | read | listen
  dailyScene: null,
  dailyArticle: null,
  dailyClip: null,
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

/* ---------- 日常交流：场景 / 阅读 / 听力 ---------- */
function viewDaily() {
  const v = el("div");
  const sub = el("div", "rate-toggle");
  sub.style.display = "flex"; sub.style.marginBottom = "12px"; sub.style.width = "100%";
  [["scene", "场景"], ["read", "阅读"], ["listen", "听力"]].forEach(([k, lbl]) => {
    const b = el("button", state.dailySub === k ? "active" : "", lbl);
    b.style.flex = "1";
    b.onclick = () => { state.dailySub = k; render(); };
    sub.appendChild(b);
  });
  v.appendChild(sub);
  if (state.dailySub === "read") { v.appendChild(viewDailyRead()); return v; }
  if (state.dailySub === "listen") { v.appendChild(viewDailyListen()); return v; }
  v.appendChild(viewDailyScene());
  return v;
}

function viewDailyScene() {
  const v = el("div");
  const scenes = (window.DAILY && DAILY.scenes) || [];
  if (!scenes.length) { v.appendChild(el("div", "card muted center", "日常内容未加载")); return v; }

  // 场景列表
  if (!state.dailyScene) {
    v.appendChild(el("div", "card small muted", "挑一个场景，看句型、听读音、跟对话练。弱项优先：表达看法、电话会议。"));
    scenes.forEach(sc => {
      const item = el("div", "card weekcard");
      item.style.cursor = "pointer";
      item.innerHTML = `<div class="n">${sc.icon}</div><div style="flex:1"><div><b>${esc(sc.title)}</b></div>
        <div class="small muted">${esc(sc.desc)}</div></div><div class="muted">›</div>`;
      item.onclick = () => { state.dailyScene = sc.id; render(); };
      v.appendChild(item);
    });
    return v;
  }

  // 场景详情
  const sc = scenes.find(s => s.id === state.dailyScene) || scenes[0];
  const back = el("button", "btn ghost sm", "‹ 所有场景");
  back.onclick = () => { state.dailyScene = null; render(); };
  v.appendChild(back);
  v.appendChild(el("div", "card", `<h2>${sc.icon} ${esc(sc.title)}</h2><div class="small muted">${esc(sc.desc)}</div>`));

  sc.phrases.forEach(grp => {
    const c = el("div", "card");
    c.appendChild(el("h2", null, esc(grp.group)));
    grp.items.forEach(p => {
      const row = el("div", "phrase");
      row.appendChild(el("div", "t", `${esc(p.en)}<br><span class="small muted">${esc(p.zh)}</span>`));
      const b = el("button", "btn ghost sm", "🔊");
      b.onclick = () => speak(p.en);
      row.appendChild(b);
      c.appendChild(row);
    });
    v.appendChild(c);
  });

  const d = el("div", "card");
  d.appendChild(el("h2", null, "对话"));
  const playAll = el("button", "btn sm", "🔊 连续朗读");
  let seq = 0;
  playAll.onclick = () => {
    const lines = sc.dialog;
    const next = () => { if (seq < lines.length) { const l = lines[seq++]; speak(l.t, { onend: next }); } else seq = 0; };
    seq = 0; next();
  };
  d.appendChild(playAll);
  d.appendChild(el("div", null, "<br>"));
  sc.dialog.forEach(line => {
    const who = line.s === "You" ? "you" : "cust";
    const row = el("div", "dlg " + who);
    const bub = el("div", "bubble", esc(line.t));
    bub.onclick = () => speak(line.t);
    row.appendChild(bub);
    d.appendChild(row);
  });
  v.appendChild(d);

  if (sc.tip) v.appendChild(el("div", "card small", `💡 ${esc(sc.tip)}`));
  return v;
}

/* ---------- 日常阅读 ---------- */
function viewDailyRead() {
  const v = el("div");
  const arts = (window.DAILYREAD && DAILYREAD.articles) || [];
  if (!arts.length) { v.appendChild(el("div", "card muted center", "暂无阅读")); return v; }

  if (!state.dailyArticle) {
    v.appendChild(el("div", "card small muted", "计时读，读完看每分钟多少词。目标是越读越快，不是查光生词。点生词看中文。"));
    arts.forEach(a => {
      const item = el("div", "card weekcard"); item.style.cursor = "pointer";
      item.innerHTML = `<div class="n">📰</div><div style="flex:1"><div><b>${esc(a.title)}</b></div>
        <div class="small muted">${esc(a.level)} · ${a.words} 词</div></div><div class="muted">›</div>`;
      item.onclick = () => { state.dailyArticle = a.id; render(); };
      v.appendChild(item);
    });
    return v;
  }

  const a = arts.find(x => x.id === state.dailyArticle) || arts[0];
  const back = el("button", "btn ghost sm", "‹ 所有文章");
  back.onclick = () => { state.dailyArticle = null; render(); };
  v.appendChild(back);

  // 计时器
  const timer = el("div", "card");
  timer.innerHTML = `<h2>${esc(a.title)}</h2><div class="small muted">${esc(a.level)} · ${a.words} 词</div>`;
  const trow = el("div", "row"); trow.style.marginTop = "10px";
  const disp = el("span", null, "00:00"); disp.style.fontSize = "22px"; disp.style.fontWeight = "700";
  let t0 = 0, raf = 0;
  const fmt = ms => { const s = Math.floor(ms / 1000); return String(Math.floor(s / 60)).padStart(2, "0") + ":" + String(s % 60).padStart(2, "0"); };
  const startBtn = el("button", "btn sm", "▶ 开始计时");
  const stopBtn = el("button", "btn sm ghost", "■ 读完");
  const result = el("div", "small"); result.style.marginTop = "8px";
  const tick = () => { disp.textContent = fmt(performance.now() - t0); raf = requestAnimationFrame(tick); };
  startBtn.onclick = () => { t0 = performance.now(); cancelAnimationFrame(raf); tick(); result.textContent = ""; };
  stopBtn.onclick = () => {
    if (!t0) return; cancelAnimationFrame(raf);
    const sec = (performance.now() - t0) / 1000; t0 = 0;
    const wpm = Math.round(a.words / (sec / 60));
    result.innerHTML = `用时 ${fmt(sec * 1000)}，约 <b style="color:var(--accent)">${wpm}</b> 词/分钟。` +
      (wpm < 60 ? "（逐字翻译的信号，下次试着不回看）" : wpm < 120 ? "（不错，继续提速）" : "（很好的速度）");
  };
  trow.append(startBtn, stopBtn, el("span", "spacer"), disp);
  timer.appendChild(trow); timer.appendChild(result);
  v.appendChild(timer);

  // 正文（生词可点）
  const body = el("div", "card");
  a.paras.forEach(p => {
    const para = el("p"); para.style.fontSize = "16.5px"; para.style.margin = "0 0 12px";
    const words = p.split(/(\s+)/);
    words.forEach(tok => {
      const key = tok.toLowerCase().replace(/[^a-z-]/g, "");
      if (a.gloss && a.gloss[key]) {
        const span = el("span", null, esc(tok));
        span.style.cssText = "color:var(--tech);border-bottom:1px dotted var(--tech);cursor:pointer";
        span.onclick = () => alert(key + " = " + a.gloss[key]);
        para.appendChild(span);
      } else para.appendChild(document.createTextNode(tok));
    });
    body.appendChild(para);
  });
  // 多词词组 gloss（单独列出，避免分词切不中）
  const phraseGloss = Object.keys(a.gloss || {}).filter(k => k.includes(" "));
  if (phraseGloss.length) {
    const pg = el("div", "small muted"); pg.style.borderTop = "1px dashed var(--line)"; pg.style.paddingTop = "8px";
    pg.innerHTML = "词组：" + phraseGloss.map(k => `${k} = ${a.gloss[k]}`).join("　·　");
    body.appendChild(pg);
  }
  const sp = el("button", "btn ghost sm", "🔊 朗读全文");
  sp.onclick = () => speak(a.paras.join(" "));
  body.appendChild(sp);
  v.appendChild(body);

  const qc = el("div", "card");
  qc.appendChild(el("h2", null, "理解题"));
  a.questions.forEach((qa, i) => qc.appendChild(el("details", "qa", `<summary>${i + 1}. ${esc(qa.q)}</summary><div class="ans">${esc(qa.a)}</div>`)));
  v.appendChild(qc);
  return v;
}

/* ---------- 日常听力：盲听 + 听写 ---------- */
function viewDailyListen() {
  const v = el("div");
  const clips = (window.DAILYLISTEN && DAILYLISTEN.clips) || [];
  if (!clips.length) { v.appendChild(el("div", "card muted center", "暂无听力")); return v; }

  if (!state.dailyClip) {
    v.appendChild(el("div", "card small muted", "先盲听（不看文字）答题，再逐句听写核对。机器音偏平，每篇附真人音频链接。"));
    clips.forEach(c => {
      const item = el("div", "card weekcard"); item.style.cursor = "pointer";
      item.innerHTML = `<div class="n">🎧</div><div style="flex:1"><div><b>${esc(c.title)}</b></div>
        <div class="small muted">${esc(c.level)} · ${c.sentences.length} 句</div></div><div class="muted">›</div>`;
      item.onclick = () => { state.dailyClip = c.id; render(); };
      v.appendChild(item);
    });
    return v;
  }

  const c = clips.find(x => x.id === state.dailyClip) || clips[0];
  const back = el("button", "btn ghost sm", "‹ 所有听力");
  back.onclick = () => { state.dailyClip = null; render(); };
  v.appendChild(back);

  // 速度切换
  const head = el("div", "card");
  head.innerHTML = `<h2>${esc(c.title)}</h2><div class="small muted">${esc(c.level)}</div>`;
  const rt = el("div", "rate-toggle"); rt.style.marginTop = "8px";
  ["slow", "normal"].forEach(r => {
    const b = el("button", state.rate === r ? "active" : "", r === "slow" ? "慢速" : "正常");
    b.onclick = () => { state.rate = r; render(); };
    rt.appendChild(b);
  });
  head.appendChild(rt);
  v.appendChild(head);

  // 盲听区
  const blind = el("div", "card");
  blind.appendChild(el("h2", null, "① 盲听答题"));
  blind.appendChild(el("div", "small muted", "先别展开文字。整段听 2~3 遍，试着答题。"));
  const playFull = el("button", "btn"); playFull.style.marginTop = "10px"; playFull.textContent = "🔊 播放整段";
  playFull.onclick = () => {
    let i = 0; const next = () => { if (i < c.sentences.length) speak(c.sentences[i++], { onend: next }); };
    next();
  };
  blind.appendChild(playFull);
  const qc = el("div"); qc.style.marginTop = "10px";
  c.questions.forEach((qa, i) => qc.appendChild(el("details", "qa", `<summary>${i + 1}. ${esc(qa.q)}</summary><div class="ans">${esc(qa.a)}</div>`)));
  blind.appendChild(qc);
  v.appendChild(blind);

  // 听写区
  const dict = el("div", "card");
  dict.appendChild(el("h2", null, "② 逐句听写"));
  dict.appendChild(el("div", "small muted", "每句播放 → 写下来 → 点显示核对。"));
  c.sentences.forEach((s, i) => {
    const line = el("div", "shadow-line"); line.style.marginTop = "10px";
    const bar = el("div", "row");
    const play = el("button", "btn ghost sm", `🔊 第 ${i + 1} 句`);
    play.onclick = () => speak(s);
    const show = el("button", "btn ghost sm", "显示");
    const text = el("div", "small"); text.style.marginTop = "8px"; text.style.display = "none";
    text.textContent = s;
    show.onclick = () => { text.style.display = text.style.display === "none" ? "block" : "none"; show.textContent = text.style.display === "none" ? "显示" : "隐藏"; };
    bar.append(play, el("span", "spacer"), show);
    line.append(bar, text);
    dict.appendChild(line);
  });
  v.appendChild(dict);

  // 真人音频
  if (c.realAudio && c.realAudio.length) {
    const ra = el("div", "card");
    ra.appendChild(el("h2", null, "③ 换真人语调"));
    ra.appendChild(el("div", "small muted", "机器音语调偏平。同主题的真人材料："));
    c.realAudio.forEach(r => {
      const a = el("a", null, esc(r.label));
      a.href = r.url; a.target = "_blank"; a.rel = "noopener";
      a.style.cssText = "display:block;margin-top:8px;color:var(--accent)";
      ra.appendChild(a);
    });
    v.appendChild(ra);
  }
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
  const map = { read: viewRead, vocab: viewVocab, meeting: viewMeeting, daily: viewDaily, shadow: viewShadow, home: viewHome };
  view.appendChild((map[state.tab] || viewHome)());
  view.scrollTop = 0; window.scrollTo(0, 0);
  const names = { read: "阅读", vocab: "单词", meeting: "会议", shadow: "跟读", home: "域控英语" };
  if (state.tab === "home") document.getElementById("title").textContent = "域控英语";
  else if (state.tab === "daily") document.getElementById("title").textContent = "日常交流";
  else document.getElementById("title").textContent = `第 ${state.week} 周 · ${names[state.tab]}`;
  document.querySelectorAll(".tabbar button").forEach(b => b.classList.toggle("active", b.dataset.tab === state.tab));
}

document.querySelectorAll(".tabbar button").forEach(b => {
  b.onclick = () => {
    if (state.tab !== b.dataset.tab) { state.dailyScene = null; state.dailyArticle = null; state.dailyClip = null; }
    state.tab = b.dataset.tab; render();
  };
});
document.getElementById("menuBtn").onclick = openWeekSheet;
document.getElementById("backBtn").hidden = true;

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => navigator.serviceWorker.register("sw.js").catch(() => {}));
}

render();

