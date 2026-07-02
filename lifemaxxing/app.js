/* ============================================================
   LifeMaxx — Kahramanın Yolculuğu
   Offline-first habit tracker. Tüm veri localStorage'da.
   ============================================================ */

// ---------- Rozet serileri ----------
const BADGE_DAYS = [0, 1, 3, 7, 15, 30, 45, 60, 120];
const SERIES = {
  chad: {
    name: 'Chad Serisi', emoji: '🗿',
    ranks: [
      { n: 'Clown', e: '🤡' }, { n: 'Noob', e: '😢' }, { n: 'Novice', e: '🙂' },
      { n: 'Average', e: '😐' }, { n: 'Advanced', e: '🧔' }, { n: 'Sigma', e: '🕶️' },
      { n: 'Chad', e: '😎' }, { n: 'Absolute Chad', e: '💪' }, { n: 'Giga Chad', e: '🗿' }
    ]
  },
  crusader: {
    name: 'Crusader Serisi', emoji: '⚔️',
    ranks: [
      { n: 'Köylü', e: '🧑‍🌾' }, { n: 'Çırak', e: '🐴' }, { n: 'Silahtar', e: '🗡️' },
      { n: 'Şövalye', e: '⚔️' }, { n: 'Komutan', e: '🛡️' }, { n: 'Baron', e: '🏰' },
      { n: 'Haçlı Lordu', e: '⚜️' }, { n: 'Kral', e: '👑' }, { n: 'Efsanevi Paladin', e: '🌟' }
    ]
  },
  viking: {
    name: 'Viking Serisi', emoji: '🪓',
    ranks: [
      { n: 'Thrall', e: '⛓️' }, { n: 'Çiftçi', e: '🌾' }, { n: 'Denizci', e: '⛵' },
      { n: 'Savaşçı', e: '🪓' }, { n: 'Berserker', e: '🐻' }, { n: 'Jarl', e: '🛡️' },
      { n: 'Deniz Kralı', e: '🌊' }, { n: 'Ragnar', e: '👑' }, { n: 'Odin\'in Seçilmişi', e: '⚡' }
    ]
  },
  ottoman: {
    name: 'Ottoman Serisi', emoji: '🌙',
    ranks: [
      { n: 'Acemi Oğlan', e: '🌱' }, { n: 'Yeniçeri', e: '🪖' }, { n: 'Sipahi', e: '🐎' },
      { n: 'Subaşı', e: '🗡️' }, { n: 'Sancakbeyi', e: '🚩' }, { n: 'Beylerbeyi', e: '🛡️' },
      { n: 'Paşa', e: '🌙' }, { n: 'Vezir', e: '💎' }, { n: 'Padişah', e: '👑' }
    ]
  }
};

const CATEGORIES = {
  addiction: '🛡️ Bağımlılıkla Savaş',
  spirit:    '🕌 Maneviyat & Zihin',
  study:     '📚 Eğitim & Sınav',
  content:   '🎬 İçerik Üretimi',
  social:    '🗣️ Sosyal Beceriler',
  body:      '💪 Beden & Sağlık',
  life:      '🗂️ Düzen & Kariyer'
};

const FREQ_LABEL = {
  'daily': 'Her gün', 'weekly-1': 'Haftada 1', 'weekly-2': 'Haftada 2',
  'weekly-3': 'Haftada 3', 'weekly-5': 'Haftada 5', 'monthly-1': 'Ayda 1',
  'free': 'Serbest'
};

const QUOTES = [
  'Kahraman, dürtülerinin efendisi olandır.',
  'Disiplin, kendine verdiğin sözü kimse bakmıyorken tutmaktır.',
  'Bugün kaçtığın savaş, yarın seni bulur. Bugün savaş.',
  'Düşmek yenilgi değildir; kalkmamak yenilgidir.',
  'Küçük zaferler biriken çığlardır. Bir tik daha at.',
  'Rahatlık isteyen köle kalır; zorluğu seçen kral olur.',
  'Zihin dalgalanır, kaptan sen kal.',
  'En karanlık gece bile sabaha teslim olur.',
  'Sen dünle yarışmıyorsun; dünkü kendinle yarışıyorsun.',
  'Enerjini yok etme — dönüştür. Şehvet ateşi, eser ateşine dönsün.',
  'Bir işi 120 gün yapan, onu kaderi yapar.',
  'Savaşçı planlarını gizler, zaferlerini gösterir.'
];

const CRISIS_QUOTES = [
  'Bu his geçici. Pişmanlık daha uzun sürer, gurur ise sonsuza dek kalır.',
  '15 dakika dayan. Dalga her zaman geri çekilir.',
  'Şu an savaşın tam ortasındasın. Kahramanlar burada doğar.',
  'O ekranın arkasında hiçbir şey yok. Senin önünde koca bir hayat var.',
  'Gelecekteki sen, şu anki sana dua ediyor: dayan.',
  'Enerjin kutsaldır. Onu bir esere dönüştür.'
];

const ACHIEVEMENTS = [
  { id: 'first',    e: '🌱', n: 'İlk Adım',      d: 'İlk görevi tamamla',            f: s => s.totalDone >= 1 },
  { id: 'week',     e: '🔥', n: '7 Gün Seri',    d: 'Bir görevde 7 gün seri',        f: s => s.bestStreak >= 7 },
  { id: 'nf7',      e: '🛡️', n: 'Kalkan',       d: 'NoFap 7 gün',                   f: s => s.bestNofap >= 7 },
  { id: 'nf30',     e: '⚔️', n: 'Savaşçı',      d: 'NoFap 30 gün',                  f: s => s.bestNofap >= 30 },
  { id: 'nf120',    e: '👑', n: 'Kral',          d: 'NoFap 120 gün',                 f: s => s.bestNofap >= 120 },
  { id: 'schema',   e: '🧠', n: 'Kendini Tanı',  d: 'İlk şema notunu yaz',           f: s => s.schemaCount >= 1 },
  { id: 'crisis',   e: '🌊', n: 'Dalga Kıran',   d: 'Kriz modunda 5 dalga atlat',    f: s => s.crisisSurvived >= 5 },
  { id: 'journal',  e: '📜', n: 'Vakanüvis',     d: '10 günlük kaydı',               f: s => s.journalCount >= 10 },
  { id: 'hundred',  e: '💯', n: 'Yüzler Ordusu', d: 'Toplam 100 görev tamamla',      f: s => s.totalDone >= 100 },
  { id: 'chall',    e: '🏆', n: 'Meydan Okuyan', d: 'Bir challenge bitir',           f: s => s.challengesDone >= 1 }
];

// ---------- Varsayılan veri ----------
function defaultHabits() {
  let i = 0;
  const H = (name, cat, freq, main, timer) =>
    ({ id: 'h' + (++i), name, cat, freq, main: !!main, timer: !!timer, order: i });
  return [
    // Bağımlılıkla Savaş
    H('NoFap', 'addiction', 'daily', false, true),
    H('Alkol içmemek', 'addiction', 'daily'),
    H('Sigara içmemek', 'addiction', 'daily'),
    H('Ekran Süresi Kontrol', 'addiction', 'daily'),
    // Maneviyat & Zihin
    H('Namaz', 'spirit', 'daily', true),
    H('Günlük yazmak', 'spirit', 'daily'),
    H('Sesli kitap dinlemek', 'spirit', 'daily'),
    H('Psikolog', 'spirit', 'free'),
    // Eğitim & Sınav
    H('Sınava Çalışmak (Ders)', 'study', 'daily', true, true),
    H('Arapça', 'study', 'free'),
    H('YDS', 'study', 'free'),
    H('Mind Map', 'study', 'free'),
    // İçerik Üretimi
    H('Yapay Zeka ile proje konuşma', 'content', 'daily', true),
    H('Youtube videoları oluştur', 'content', 'free'),
    H('Hamza Muhammed videoları çevir', 'content', 'free'),
    H('Sosyal medya paylaşımı', 'content', 'free'),
    // Sosyal Beceriler
    H('İkna', 'social', 'free'),
    H('Diksiyon', 'social', 'free'),
    H('Satış', 'social', 'free'),
    H('İletişim yetenekleri', 'social', 'free'),
    // Beden & Sağlık
    H('Vücut Geliştirme', 'body', 'weekly-2', true),
    H('Koşma', 'body', 'weekly-1'),
    H('Esneme FTR Hareketleri', 'body', 'daily'),
    H('Yüz Yogası', 'body', 'daily'),
    H('Minoksil', 'body', 'daily'),
    H('Bachata Çalışması', 'body', 'weekly-2'),
    H('8 saat uyku', 'body', 'daily'),
    H('Uyuma saati hedefi', 'body', 'daily'),
    H('Kalori Takibi', 'body', 'free'),
    // Düzen & Kariyer
    H('9-6 haftada 5 işe gitmek', 'life', 'weekly-5', true),
    H('Not Geçmişi Düzenlemek', 'life', 'free'),
    H('Fotoğrafları Düzenlemek', 'life', 'free'),
    H('Ufak Geziler', 'life', 'monthly-1'),
  ];
}

function defaultState() {
  return {
    heroName: '',
    series: 'chad',
    habits: defaultHabits(),
    done: {},           // { habitId: { 'YYYY-MM-DD': true } }
    timers: { h1: Date.now(), h9: Date.now() },  // gün sayaçları: habitId -> start ts
    bestNofap: 0,
    journal: [],        // { ts, text }
    schemas: [],        // { ts, trigger, thought, feeling, action }
    challenges: [],     // { id, name, days, start, done }
    crisisSurvived: 0,
    widgetHabit: 'h1',
    firstUse: Date.now()
  };
}

// ---------- Yardımcılar ----------
const $ = id => document.getElementById(id);
const pad = n => String(n).padStart(2, '0');
function dateKey(d) { d = d || new Date(); return d.getFullYear() + '-' + pad(d.getMonth() + 1) + '-' + pad(d.getDate()); }
function esc(s) { const d = document.createElement('div'); d.textContent = s; return d.innerHTML; }
function weekStart(d) { d = new Date(d); const day = (d.getDay() + 6) % 7; d.setDate(d.getDate() - day); d.setHours(0,0,0,0); return d; }
function fmtDate(ts) {
  return new Date(ts).toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' });
}

// ---------- Durum ----------
let S;
function load() {
  try {
    const raw = localStorage.getItem('lifemaxx');
    S = raw ? Object.assign(defaultState(), JSON.parse(raw)) : defaultState();
  } catch (e) { S = defaultState(); }
}
function save() { localStorage.setItem('lifemaxx', JSON.stringify(S)); }

// ---------- Rozet hesabı ----------
function rankForDays(days) {
  let idx = 0;
  for (let i = 0; i < BADGE_DAYS.length; i++) if (days >= BADGE_DAYS[i]) idx = i;
  return idx;
}
function currentRank() {
  const days = timerDays('h1'); // NoFap ana rozet kaynağı
  const idx = rankForDays(days);
  return SERIES[S.series].ranks[idx];
}
function timerDays(id) {
  if (!S.timers[id]) return 0;
  return Math.floor((Date.now() - S.timers[id]) / 86400000);
}
function timerClock(id) {
  if (!S.timers[id]) return '00:00:00';
  const ms = Date.now() - S.timers[id];
  const h = Math.floor(ms / 3600000) % 24, m = Math.floor(ms / 60000) % 60, s = Math.floor(ms / 1000) % 60;
  return pad(h) + ':' + pad(m) + ':' + pad(s);
}

// ---------- Görev tamamlama mantığı ----------
function isDoneToday(h) { return !!(S.done[h.id] && S.done[h.id][dateKey()]); }
function countInWeek(h) {
  const ws = weekStart(new Date());
  let c = 0;
  const log = S.done[h.id] || {};
  for (const k in log) { if (new Date(k + 'T12:00') >= ws) c++; }
  return c;
}
function countInMonth(h) {
  const now = new Date(); let c = 0;
  const log = S.done[h.id] || {};
  const pre = now.getFullYear() + '-' + pad(now.getMonth() + 1);
  for (const k in log) if (k.startsWith(pre)) c++;
  return c;
}
function lastDone(h) {
  const log = S.done[h.id] || {};
  const keys = Object.keys(log).sort();
  return keys.length ? keys[keys.length - 1] : null;
}
function streak(h) {
  const log = S.done[h.id] || {};
  let s = 0; const d = new Date();
  if (!log[dateKey(d)]) d.setDate(d.getDate() - 1); // bugün henüz yapılmadıysa dünden say
  while (log[dateKey(d)]) { s++; d.setDate(d.getDate() - 1); }
  return s;
}
// Bu görev bugün "beklenen" mi? (serbest görevler asla beklenmez → yük yok)
function neededToday(h) {
  if (h.freq === 'daily') return !isDoneToday(h);
  if (h.freq === 'free') return false;
  if (h.freq.startsWith('weekly-')) return countInWeek(h) < +h.freq.split('-')[1] && !isDoneToday(h);
  if (h.freq.startsWith('monthly-')) return countInMonth(h) < +h.freq.split('-')[1] && !isDoneToday(h);
  return false;
}
function toggleDone(id) {
  const h = S.habits.find(x => x.id === id);
  if (!h) return;
  const k = dateKey();
  S.done[id] = S.done[id] || {};
  if (S.done[id][k]) delete S.done[id][k];
  else S.done[id][k] = true;
  save(); render();
}

// ---------- İstatistik ----------
function stats() {
  let totalDone = 0, bestStreak = 0;
  for (const h of S.habits) {
    const log = S.done[h.id] || {};
    totalDone += Object.keys(log).length;
    if (h.freq === 'daily') bestStreak = Math.max(bestStreak, streak(h));
  }
  const nofapNow = timerDays('h1');
  if (nofapNow > S.bestNofap) { S.bestNofap = nofapNow; }
  return {
    totalDone, bestStreak,
    bestNofap: Math.max(S.bestNofap, nofapNow),
    schemaCount: S.schemas.length,
    journalCount: S.journal.length,
    crisisSurvived: S.crisisSurvived,
    challengesDone: S.challenges.filter(c => c.done).length,
    daysUsed: Math.floor((Date.now() - S.firstUse) / 86400000) + 1
  };
}

/* ============================================================
   RENDER
   ============================================================ */
let currentPage = 'home';

function render() {
  renderTop();
  if (currentPage === 'home') renderHome();
  if (currentPage === 'habits') renderAllHabits();
  if (currentPage === 'badges') renderBadges();
  if (currentPage === 'journal') renderJournal();
  if (currentPage === 'guild') renderGuild();
  if (currentPage === 'profile') renderProfile();
  if (currentPage === 'widget') renderWidget();
}

function renderTop() {
  const r = currentRank();
  $('topAvatar').textContent = r.e;
  $('topHeroName').textContent = S.heroName || 'İsimsiz Kahraman';
  $('topHeroRank').textContent = r.n + ' · ' + timerDays('h1') + ' gün';
}

// ----- Ana sayfa -----
function renderHome() {
  const q = QUOTES[new Date().getDate() % QUOTES.length];
  $('dailyQuote').textContent = '“' + q + '”';

  // Sayaç kartları
  const timers = S.habits.filter(h => h.timer);
  $('mainTimers').innerHTML = timers.map(h => timerCardHTML(h)).join('');

  // Ana görevler
  const mains = S.habits.filter(h => h.main && !h.timer).sort((a, b) => a.order - b.order);
  $('mainQuests').innerHTML = mains.map(h => questHTML(h, true)).join('') ||
    '<p class="hint-block">Henüz ana görev yok. Görevler sayfasından ⭐ ile seç.</p>';

  // Bugün beklenenler (ana olmayan)
  const today = S.habits.filter(h => !h.main && !h.timer && h.freq !== 'free' && (neededToday(h) || isDoneToday(h)))
    .sort((a, b) => a.order - b.order);
  $('todayQuests').innerHTML = today.map(h => questHTML(h)).join('') ||
    '<p class="hint-block">Bugünlük her şey tamam. 🏆</p>';

  // Serbest görevler
  const free = S.habits.filter(h => h.freq === 'free' && !h.timer).sort((a, b) => a.order - b.order);
  $('freeQuests').innerHTML = free.map(h => questHTML(h)).join('');
}

function timerCardHTML(h) {
  const days = timerDays(h.id);
  const idx = rankForDays(days);
  const rank = SERIES[S.series].ranks[idx];
  const next = BADGE_DAYS[idx + 1];
  const nextRank = SERIES[S.series].ranks[idx + 1];
  const prev = BADGE_DAYS[idx];
  const frac = next ? Math.min(1, (days - prev) / (next - prev)) : 1;
  const C = 2 * Math.PI * 76;
  const isNofap = h.id === 'h1';
  return `
  <div class="timer-card">
    <div class="timer-name">${esc(h.name)}</div>
    <div class="timer-ring">
      <svg width="168" height="168">
        <circle class="ring-bg" cx="84" cy="84" r="76" fill="none" stroke-width="9"/>
        <circle class="ring-fg" cx="84" cy="84" r="76" fill="none" stroke-width="9"
          stroke-dasharray="${C}" stroke-dashoffset="${C * (1 - frac)}"/>
      </svg>
      <div class="ring-center">
        <div class="ring-days">${days}</div>
        <div class="ring-label">Gün</div>
        <div class="ring-clock" data-clock="${h.id}">${timerClock(h.id)}</div>
      </div>
    </div>
    <div class="timer-badge-row"><span class="b-emoji">${rank.e}</span> ${rank.n}
      ${nextRank ? `<span class="timer-next">→ ${nextRank.n} (${next} gün)</span>` : '<span class="timer-next">MAX 👑</span>'}
    </div>
    <div class="row-2">
      ${isNofap ? '<button class="btn btn-danger" onclick="App.openCrisis()">🆘 Kriz Modu</button>' : ''}
      <button class="btn btn-outline" onclick="App.askReset('${h.id}')">↺ Sıfırla</button>
      <button class="btn btn-outline" onclick="App.showWidget('${h.id}')">🧷 Widget</button>
    </div>
  </div>`;
}

function questHTML(h, isMain) {
  const done = isDoneToday(h);
  let meta = FREQ_LABEL[h.freq] || '';
  let right = '';
  if (h.freq === 'daily') {
    const s = streak(h);
    if (s > 0) right = `<span class="q-streak">🔥 ${s}</span>`;
  } else if (h.freq.startsWith('weekly-')) {
    meta += ` · bu hafta ${countInWeek(h)}/${h.freq.split('-')[1]}`;
  } else if (h.freq.startsWith('monthly-')) {
    meta += ` · bu ay ${countInMonth(h)}/${h.freq.split('-')[1]}`;
  } else if (h.freq === 'free') {
    const ld = lastDone(h);
    meta = ld ? 'Son: ' + ld : 'Hiç yapılmadı — sorun değil, hazır olunca';
  }
  return `
  <div class="quest ${done ? 'done' : ''} ${isMain ? 'main-quest' : ''}">
    <button class="q-check" onclick="App.toggle('${h.id}')">✓</button>
    <div class="q-body">
      <div class="q-name">${isMain ? '⭐ ' : ''}${esc(h.name)}</div>
      <div class="q-meta">${esc(meta)}</div>
    </div>
    ${right}
  </div>`;
}

// ----- Tüm görevler -----
function renderAllHabits() {
  const wrap = $('allHabits');
  wrap.innerHTML = '';
  for (const cat in CATEGORIES) {
    const list = S.habits.filter(h => h.cat === cat).sort((a, b) => a.order - b.order);
    if (!list.length) continue;
    const block = document.createElement('div');
    block.className = 'cat-block';
    block.innerHTML = `<div class="cat-head">${CATEGORIES[cat]} <span class="cat-count">${list.length} görev</span></div>`;
    const ul = document.createElement('div');
    ul.className = 'quest-list';
    ul.dataset.cat = cat;
    for (const h of list) {
      const el = document.createElement('div');
      el.className = 'quest' + (h.main ? ' main-quest' : '');
      el.dataset.id = h.id;
      el.innerHTML = `
        <span class="drag-handle" data-drag="${h.id}">⠿</span>
        <div class="q-body">
          <div class="q-name">${esc(h.name)} ${h.timer ? '⏱️' : ''}</div>
          <div class="q-meta">${FREQ_LABEL[h.freq]}</div>
        </div>
        <button class="q-star ${h.main ? 'on' : ''}" onclick="App.toggleMain('${h.id}')">⭐</button>
        <button class="q-edit" onclick="App.openHabitForm('${h.id}')">✏️</button>`;
      ul.appendChild(el);
    }
    block.appendChild(ul);
    wrap.appendChild(block);
  }
  attachDrag(wrap);
}

// Basit dokunmatik sürükle-bırak (kategori içinde)
function attachDrag(wrap) {
  wrap.querySelectorAll('.drag-handle').forEach(handle => {
    handle.addEventListener('pointerdown', e => {
      e.preventDefault();
      const item = handle.closest('.quest');
      const list = item.parentElement;
      item.classList.add('dragging');
      handle.setPointerCapture(e.pointerId);

      const move = ev => {
        const y = ev.clientY;
        const sibs = [...list.querySelectorAll('.quest:not(.dragging)')];
        let after = null;
        for (const s of sibs) {
          const r = s.getBoundingClientRect();
          if (y < r.top + r.height / 2) { after = s; break; }
        }
        if (after) list.insertBefore(item, after);
        else list.appendChild(item);
      };
      const up = () => {
        item.classList.remove('dragging');
        handle.removeEventListener('pointermove', move);
        handle.removeEventListener('pointerup', up);
        // yeni sırayı kaydet
        let order = 1;
        wrap.querySelectorAll('.quest').forEach(q => {
          const h = S.habits.find(x => x.id === q.dataset.id);
          if (h) h.order = order++;
        });
        save();
      };
      handle.addEventListener('pointermove', move);
      handle.addEventListener('pointerup', up);
    });
  });
}

// ----- Rozetler -----
function renderBadges() {
  $('seriesPicker').innerHTML = Object.keys(SERIES).map(k => `
    <div class="series-card ${S.series === k ? 'active' : ''}" onclick="App.setSeries('${k}')">
      <div class="s-emoji">${SERIES[k].emoji}</div>
      <div class="s-name">${SERIES[k].name}</div>
      <div class="s-sub">${SERIES[k].ranks[8].n}'e uzanan yol</div>
    </div>`).join('');

  const days = timerDays('h1');
  const cur = rankForDays(days);
  $('badgeList').innerHTML = SERIES[S.series].ranks.map((r, i) => `
    <div class="badge-row ${i > cur ? 'locked' : ''} ${i === cur ? 'current' : ''}">
      <div class="b-emoji">${r.e}</div>
      <div>
        <div class="b-name">${r.n}</div>
        <div class="b-req">${BADGE_DAYS[i]}+ Gün</div>
      </div>
      ${i === cur ? '<span class="b-tag">ŞU AN</span>' : (i <= cur ? '<span class="b-tag">✓</span>' : '')}
    </div>`).join('');
}

// ----- Günlük & Şema -----
let journalMode = 'journal';
function renderJournal() {
  $('tabJournal').classList.toggle('active', journalMode === 'journal');
  $('tabSchema').classList.toggle('active', journalMode === 'schema');
  $('journalPane').classList.toggle('hidden', journalMode !== 'journal');
  $('schemaPane').classList.toggle('hidden', journalMode !== 'schema');

  $('journalEntries').innerHTML = S.journal.slice().reverse().map((j, ri) => {
    const i = S.journal.length - 1 - ri;
    return `<div class="entry">
      <button class="e-del" onclick="App.delJournal(${i})">🗑️</button>
      <div class="e-date">${fmtDate(j.ts)}</div>
      <div class="e-text">${esc(j.text)}</div>
    </div>`;
  }).join('') || '<p class="hint-block">Henüz kayıt yok.</p>';

  $('schemaEntries').innerHTML = S.schemas.slice().reverse().map((s, ri) => {
    const i = S.schemas.length - 1 - ri;
    return `<div class="entry">
      <button class="e-del" onclick="App.delSchema(${i})">🗑️</button>
      <div class="e-date">${fmtDate(s.ts)}</div>
      <div class="e-field"><b>📍 Tetikleyici</b>${esc(s.trigger || '—')}</div>
      <div class="e-field"><b>💭 Düşünce</b>${esc(s.thought || '—')}</div>
      <div class="e-field"><b>❤️ Duygu</b>${esc(s.feeling || '—')}</div>
      <div class="e-field"><b>⚡ Eylem</b>${esc(s.action || '—')}</div>
    </div>`;
  }).join('') || '<p class="hint-block">Henüz şema notu yok. Kriz anlarında not al, desenlerini keşfet.</p>';
}

// ----- Lonca -----
function renderGuild() {
  $('challengeList').innerHTML = S.challenges.slice().reverse().map(c => {
    const elapsed = Math.floor((Date.now() - c.start) / 86400000);
    const done = c.done || elapsed >= c.days;
    if (done && !c.done) { c.done = true; save(); }
    const pct = Math.min(100, Math.round(elapsed / c.days * 100));
    return `<div class="challenge">
      <div class="ch-name">${done ? '🏆' : '⚔️'} ${esc(c.name)}</div>
      <div class="ch-bar"><div class="ch-fill" style="width:${pct}%"></div></div>
      <div class="ch-meta">
        <span>${Math.min(elapsed, c.days)}/${c.days} gün</span>
        ${done ? '<span class="ch-done">TAMAMLANDI!</span>' : `<span>%${pct}</span>`}
      </div>
    </div>`;
  }).join('') || '<p class="hint-block">Aktif challenge yok.</p>';
}

// ----- Profil -----
function renderProfile() {
  const r = currentRank();
  $('profileAvatar').textContent = r.e;
  $('profileRank').textContent = r.n + ' · ' + SERIES[S.series].name;
  $('heroNameInput').value = S.heroName;

  const st = stats();
  $('statsGrid').innerHTML = `
    <div class="stat-tile"><div class="st-num">${timerDays('h1')}</div><div class="st-label">NoFap (gün)</div></div>
    <div class="stat-tile"><div class="st-num">${st.bestNofap}</div><div class="st-label">NoFap Rekoru</div></div>
    <div class="stat-tile"><div class="st-num">${st.totalDone}</div><div class="st-label">Toplam Görev</div></div>
    <div class="stat-tile"><div class="st-num">${st.bestStreak}</div><div class="st-label">En İyi Seri</div></div>
    <div class="stat-tile"><div class="st-num">${st.crisisSurvived}</div><div class="st-label">Atlatılan Kriz</div></div>
    <div class="stat-tile"><div class="st-num">${st.daysUsed}</div><div class="st-label">Yolculuk Günü</div></div>`;

  $('achievements').innerHTML = ACHIEVEMENTS.map(a => `
    <div class="ach ${a.f(st) ? '' : 'locked'}" title="${a.d}">
      <div class="a-emoji">${a.e}</div>
      <div class="a-name">${a.n}</div>
    </div>`).join('');

  $('widgetPicker').innerHTML = S.habits.filter(h => h.timer).map(h => `
    <button class="widget-pick-btn" onclick="App.showWidget('${h.id}')">
      <span>⏱️ ${esc(h.name)}</span><span>${timerDays(h.id)} gün →</span>
    </button>`).join('');
}

// ----- Widget -----
function renderWidget() {
  const h = S.habits.find(x => x.id === S.widgetHabit) || S.habits.find(x => x.timer);
  if (!h) return;
  const days = timerDays(h.id);
  const rank = SERIES[S.series].ranks[rankForDays(days)];
  $('widgetFull').innerHTML = `
    <div class="w-name">${esc(h.name)}</div>
    <div class="w-emoji">${rank.e}</div>
    <div class="w-days">${days}</div>
    <div class="w-label">Gün · ${rank.n}</div>
    <div class="w-clock" data-clock="${h.id}">${timerClock(h.id)}</div>
    <div class="w-hint">Kapatmak için dokun</div>`;
}

// Saat güncelleme
setInterval(() => {
  document.querySelectorAll('[data-clock]').forEach(el => {
    el.textContent = timerClock(el.dataset.clock);
  });
}, 1000);

/* ============================================================
   APP — kullanıcı eylemleri
   ============================================================ */
let crisisInterval = null, crisisResetTarget = null, resetTargetId = null;

const App = {
  go(page) {
    currentPage = page;
    document.querySelectorAll('.page').forEach(p => p.classList.add('hidden'));
    $('page-' + page).classList.remove('hidden');
    document.querySelectorAll('.nav-btn').forEach(b =>
      b.classList.toggle('active', b.dataset.page === page));
    render();
    window.scrollTo(0, 0);
  },

  toggle: toggleDone,

  toggleMain(id) {
    const h = S.habits.find(x => x.id === id);
    if (!h) return;
    if (!h.main && S.habits.filter(x => x.main).length >= 5) {
      alert('En fazla 5 Ana Görev olabilir. Önce birinden ⭐ kaldır.');
      return;
    }
    h.main = !h.main;
    save(); render();
  },

  setSeries(k) { S.series = k; save(); render(); },
  setHeroName(v) { S.heroName = v.trim(); save(); renderTop(); },

  // --- Görev formu ---
  editingHabit: null,
  openHabitForm(id) {
    App.editingHabit = id || null;
    $('habitModalTitle').textContent = id ? 'Görevi Düzenle' : 'Yeni Görev';
    $('hfCategory').innerHTML = Object.keys(CATEGORIES).map(k =>
      `<option value="${k}">${CATEGORIES[k]}</option>`).join('');
    const h = id ? S.habits.find(x => x.id === id) : null;
    $('hfName').value = h ? h.name : '';
    $('hfCategory').value = h ? h.cat : 'life';
    $('hfFreq').value = h ? h.freq : 'daily';
    $('hfMain').checked = h ? h.main : false;
    $('hfTimer').checked = h ? !!h.timer : false;
    $('hfDelete').classList.toggle('hidden', !id);
    $('habitModal').classList.remove('hidden');
  },
  saveHabitForm() {
    const name = $('hfName').value.trim();
    if (!name) { alert('Görev adı gerekli.'); return; }
    const main = $('hfMain').checked;
    if (main) {
      const others = S.habits.filter(x => x.main && x.id !== App.editingHabit).length;
      if (others >= 5) { alert('En fazla 5 Ana Görev olabilir.'); return; }
    }
    if (App.editingHabit) {
      const h = S.habits.find(x => x.id === App.editingHabit);
      h.name = name; h.cat = $('hfCategory').value; h.freq = $('hfFreq').value;
      h.main = main;
      const wantTimer = $('hfTimer').checked;
      if (wantTimer && !h.timer) S.timers[h.id] = S.timers[h.id] || Date.now();
      h.timer = wantTimer;
    } else {
      const id = 'h' + Date.now();
      const h = {
        id, name, cat: $('hfCategory').value, freq: $('hfFreq').value,
        main, timer: $('hfTimer').checked,
        order: Math.max(0, ...S.habits.map(x => x.order)) + 1
      };
      if (h.timer) S.timers[id] = Date.now();
      S.habits.push(h);
    }
    save();
    App.closeModal('habitModal');
    render();
  },
  deleteHabit() {
    if (!App.editingHabit) return;
    if (!confirm('Bu görev ve tüm geçmişi silinsin mi?')) return;
    S.habits = S.habits.filter(x => x.id !== App.editingHabit);
    delete S.done[App.editingHabit];
    delete S.timers[App.editingHabit];
    save();
    App.closeModal('habitModal');
    render();
  },

  // --- Sayaç sıfırlama ---
  askReset(id) {
    resetTargetId = id;
    const h = S.habits.find(x => x.id === id);
    $('resetText').textContent = `"${h.name}" sayacın ${timerDays(id)} günde. Sıfırlarsan yolculuk 0. günden başlar.`;
    $('resetModal').classList.remove('hidden');
  },
  confirmReset() {
    if (resetTargetId) {
      if (resetTargetId === 'h1') {
        const d = timerDays('h1');
        if (d > S.bestNofap) S.bestNofap = d;
      }
      S.timers[resetTargetId] = Date.now();
      save();
    }
    App.closeModal('resetModal');
    render();
  },
  resetWithSchema() {
    crisisResetTarget = resetTargetId;
    App.closeModal('resetModal');
    App.openCrisis(3);
  },

  // --- Kriz modu ---
  openCrisis(step) {
    $('crisisOverlay').classList.remove('hidden');
    App.crisisShow(step || 1);
    if (!step || step === 1) {
      $('crisisQuote').textContent = '“' + CRISIS_QUOTES[Math.floor(Math.random() * CRISIS_QUOTES.length)] + '”';
      let left = 300;
      clearInterval(crisisInterval);
      const tick = () => {
        $('crisisTimer').textContent = pad(Math.floor(left / 60)) + ':' + pad(left % 60);
        if (left <= 0) { clearInterval(crisisInterval); App.crisisShow(4); return; }
        if (left % 20 === 0) $('crisisQuote').textContent = '“' + CRISIS_QUOTES[Math.floor(Math.random() * CRISIS_QUOTES.length)] + '”';
        left--;
      };
      tick();
      crisisInterval = setInterval(tick, 1000);
    }
  },
  crisisShow(n) {
    for (let i = 1; i <= 4; i++) $('crisisStep' + i).classList.toggle('hidden', i !== n);
  },
  crisisAlternatives() { App.crisisShow(2); },
  crisisSchema() { App.crisisShow(3); },
  crisisBack() { App.crisisShow(1); },
  crisisChooseAlt(what) {
    $('crisisVictoryText').textContent = 'Seçimin: ' + what + '. Şimdi git ve yap! Enerji dönüştü, dalga kırıldı. 🌊';
    App.crisisShow(4);
  },
  saveSchema() {
    const s = {
      ts: Date.now(),
      trigger: $('schTrigger').value.trim(),
      thought: $('schThought').value.trim(),
      feeling: $('schFeeling').value.trim(),
      action: $('schAction').value.trim()
    };
    if (!s.trigger && !s.thought && !s.feeling && !s.action) { alert('En az bir alan doldur.'); return; }
    S.schemas.push(s);
    ['schTrigger', 'schThought', 'schFeeling', 'schAction'].forEach(id => $(id).value = '');
    // Şema + sıfırlama akışıysa sayacı şimdi sıfırla
    if (crisisResetTarget) {
      if (crisisResetTarget === 'h1') {
        const d = timerDays('h1');
        if (d > S.bestNofap) S.bestNofap = d;
      }
      S.timers[crisisResetTarget] = Date.now();
      crisisResetTarget = null;
      save();
      $('crisisVictoryText').textContent = 'Şema notun kaydedildi ve sayaç sıfırlandı. Düşen kalkar — yolculuk devam ediyor. ⚔️';
    } else {
      save();
      $('crisisVictoryText').textContent = 'Şema notun kaydedildi. Kendini tanıyan savaşçı yenilmez. 🧠';
    }
    App.crisisShow(4);
  },
  closeCrisis(survived) {
    clearInterval(crisisInterval);
    if (survived) { S.crisisSurvived++; save(); }
    crisisResetTarget = null;
    $('crisisOverlay').classList.add('hidden');
    render();
  },

  // --- Günlük ---
  journalTab(m) { journalMode = m; renderJournal(); },
  saveJournal() {
    const t = $('journalInput').value.trim();
    if (!t) return;
    S.journal.push({ ts: Date.now(), text: t });
    $('journalInput').value = '';
    // "Günlük yazmak" görevini otomatik tikle
    const jh = S.habits.find(h => h.name.toLowerCase().includes('günlük'));
    if (jh) { S.done[jh.id] = S.done[jh.id] || {}; S.done[jh.id][dateKey()] = true; }
    save(); renderJournal();
  },
  delJournal(i) { S.journal.splice(i, 1); save(); renderJournal(); },
  delSchema(i) { if (confirm('Şema notu silinsin mi?')) { S.schemas.splice(i, 1); save(); renderJournal(); } },

  // --- Challenge ---
  openChallengeForm() { $('challengeModal').classList.remove('hidden'); },
  saveChallenge() {
    const name = $('cfName').value.trim();
    const days = parseInt($('cfDays').value, 10);
    if (!name || !days || days < 1) { alert('İsim ve gün sayısı gerekli.'); return; }
    S.challenges.push({ id: 'c' + Date.now(), name, days, start: Date.now(), done: false });
    $('cfName').value = '';
    save();
    App.closeModal('challengeModal');
    renderGuild();
  },

  // --- Widget ---
  showWidget(id) {
    S.widgetHabit = id;
    save();
    App.go('widget');
  },

  // --- Veri ---
  exportData() {
    const blob = new Blob([JSON.stringify(S, null, 2)], { type: 'application/json' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'lifemaxx-yedek-' + dateKey() + '.json';
    a.click();
  },
  importData(ev) {
    const f = ev.target.files[0];
    if (!f) return;
    const r = new FileReader();
    r.onload = () => {
      try {
        const data = JSON.parse(r.result);
        if (!data.habits) throw new Error('geçersiz');
        if (confirm('Mevcut verilerin üzerine yedek yüklensin mi?')) {
          S = Object.assign(defaultState(), data);
          save(); render();
        }
      } catch (e) { alert('Geçersiz yedek dosyası.'); }
    };
    r.readAsText(f);
    ev.target.value = '';
  },

  closeModal(id) { $(id).classList.add('hidden'); }
};

// ---------- Başlat ----------
load();
render();
window.App = App;
