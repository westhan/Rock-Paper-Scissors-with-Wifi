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

// XP puanları: Ana Görevler (top 5) kritik ağırlıkta
const XP_MAIN = 50, XP_REGULAR = 10, XP_FREE = 15, XP_CRISIS = 20, XP_SCHEMA = 10;

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

// Ayarlardan seçilebilen söz havuzları
const QURAN_QUOTES = [
  '"Şüphesiz Allah sabredenlerle beraberdir." — Bakara 153',
  '"Nefsini arındıran kurtuluşa ermiştir." — Şems 9',
  '"Bizim uğrumuzda cihad edenleri elbette yollarımıza eriştiririz." — Ankebut 69',
  '"Kalpler ancak Allah\'ı anmakla huzur bulur." — Ra\'d 28',
  '"Mümin erkeklere söyle, gözlerini haramdan sakınsınlar ve iffetlerini korusunlar." — Nur 30',
  '"Şüphesiz zorlukla beraber bir kolaylık vardır." — İnşirah 6',
  '"Allah bir kimseyi ancak gücünün yettiği şeyle yükümlü kılar." — Bakara 286',
  '"Kim Allah\'a karşı gelmekten sakınırsa, Allah ona bir çıkış yolu açar." — Talak 2',
  '"Sabret! Senin sabrın ancak Allah\'ın yardımıyladır." — Nahl 127',
  '"Nefis, kötülüğü şiddetle emreder; ancak Rabbimin merhamet ettiği hariç." — Yusuf 53'
];
const BIBLE_QUOTES = [
  '"Tanrı, dayanabileceğinizden fazlasıyla denenmenize izin vermez." — 1. Korintliler 10:13',
  '"Ruh\'un meyvesi sevgi, sevinç, esenlik, sabır ve özdenetimdir." — Galatyalılar 5:22-23',
  '"Beni güçlendirenin aracılığıyla her şeyi yapabilirim." — Filipililer 4:13',
  '"Bu çağın gidişine uymayın; düşüncenizin yenilenmesiyle değişin." — Romalılar 12:2',
  '"Genç insan yolunu nasıl temiz tutar? Senin sözünü tutmakla." — Mezmur 119:9',
  '"Denenmeye dayanan kişiye ne mutlu!" — Yakup 1:12',
  '"Bedeniniz, Kutsal Ruh\'un tapınağıdır." — 1. Korintliler 6:19',
  '"Uyanık durun, dua edin; ruh isteklidir ama beden güçsüzdür." — Matta 26:41'
];
const CONGRATS = [
  'Tebrikler! {d} gündür ayaktasın — bu gerçek bir irade zaferi. 🏆',
  '{d} gün! Eski sen bunu hayal bile edemezdi. Devam! ⚔️',
  'Her sabah uyandığında {d} günlük bir kale inşa etmiş oluyorsun. 🏰',
  '{d} gündür dalgaları kırıyorsun. Deniz sakinleşiyor, kaptan güçleniyor. 🌊',
  'Vücudun ve zihnin sana teşekkür ediyor: {d} gün temiz enerji. ⚡'
];
// Seçili kaynaklardan birleşik söz havuzu
function quotePool() {
  const q = S.quoteSources || { moti: true };
  let pool = [];
  if (q.moti !== false) pool = pool.concat(QUOTES);
  if (q.quran) pool = pool.concat(QURAN_QUOTES);
  if (q.bible) pool = pool.concat(BIBLE_QUOTES);
  return pool.length ? pool : QUOTES;
}
function dayOfYear() {
  const now = new Date();
  return Math.floor((now - new Date(now.getFullYear(), 0, 0)) / 86400000);
}

const PRAYER_NAMES = [['sabah', 'Sabah'], ['ogle', 'Öğle'], ['ikindi', 'İkindi'], ['aksam', 'Akşam'], ['yatsi', 'Yatsı']];

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
  { id: 'chall',    e: '🏆', n: 'Meydan Okuyan', d: 'Bir challenge bitir',           f: s => s.challengesDone >= 1 },
  { id: 'lv5',      e: '⚡', n: 'Yükselen Güç',  d: 'Seviye 5 ol',                   f: s => s.level >= 5 },
  { id: 'lv10',     e: '🌟', n: 'Efsane',        d: 'Seviye 10 ol',                  f: s => s.level >= 10 }
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
    timers: { h1: Date.now(), h9: Date.now() },  // gün sayaçları
    bestNofap: 0,
    journal: [],
    schemas: [],
    challenges: [],
    crisisSurvived: 0,
    widgetHabit: 'h1',
    firstUse: Date.now(),
    // Çalışma Merkezi
    study: { items: { books: [], notes: [], lessons: [] }, log: {}, running: null },
    // Ekran süresi
    screenLog: {},      // { 'YYYY-MM-DD': dakika }
    screenGoal: 120,
    screenPics: [],     // { d, img } — küçültülmüş ekran görüntüleri
    // ADHD sürümü
    prayers: {},        // { 'YYYY-MM-DD': { sabah,ogle,ikindi,aksam,yatsi: bool, kaza: int } }
    cigs: {},           // { 'YYYY-MM-DD': adet }
    books: [],          // { ts, title, summary }
    oneoffs: [],        // { id, name, xp, created, done, doneTs }
    expenses: [],       // { ts, desc, amount, type: 'gider'|'gelir' }
    countdowns: [],     // { id, name, target }
    kingHabit: '',      // bu sayaç sıfırlanırsa tüm sayaçlar sıfırlanır
    quoteSources: { moti: true, quran: false, bible: false }
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
    // eski sürümden yükseltme
    const d = defaultState();
    for (const k of ['study', 'screenLog', 'screenPics', 'prayers', 'cigs', 'books', 'oneoffs', 'expenses', 'countdowns', 'quoteSources'])
      if (S[k] == null) S[k] = d[k];
    if (!S.screenGoal) S.screenGoal = 120;
    if (S.kingHabit == null) S.kingHabit = '';
  } catch (e) { S = defaultState(); }
}
function save() {
  try { localStorage.setItem('lifemaxx', JSON.stringify(S)); }
  catch (e) {
    // kota dolduysa en eski ekran görüntülerini at ve tekrar dene
    if (S.screenPics && S.screenPics.length) {
      S.screenPics.splice(0, Math.ceil(S.screenPics.length / 2));
      try { localStorage.setItem('lifemaxx', JSON.stringify(S)); return; } catch (e2) {}
    }
    alert('Depolama alanı doldu — eski ekran görüntülerini silmeyi dene.');
  }
}

// ---------- Rozet & sayaç ----------
function rankForDays(days) {
  let idx = 0;
  for (let i = 0; i < BADGE_DAYS.length; i++) if (days >= BADGE_DAYS[i]) idx = i;
  return idx;
}
function currentRank() {
  return SERIES[S.series].ranks[rankForDays(timerDays('h1'))];
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

// ---------- XP & Seviye ----------
// Ana Görevler (top 5) 50 XP — seviye atlamak için hem XP hem Ana Görev tamamlaması ŞART.
function xpForHabit(h) {
  if (h.xp) return h.xp; // kullanıcı özel puan verdiyse o geçerli
  return h.main ? XP_MAIN : (h.freq === 'free' ? XP_FREE : XP_REGULAR);
}
function totalXP() {
  let xp = 0;
  for (const h of S.habits) xp += Object.keys(S.done[h.id] || {}).length * xpForHabit(h);
  xp += S.crisisSurvived * XP_CRISIS + S.schemas.length * XP_SCHEMA;
  // tek seferlik görevler
  for (const o of S.oneoffs) if (o.done) xp += (o.xp || 20);
  // namaz: kaza +5, tam gün (5/5) +25 bonus
  for (const k in S.prayers) {
    const p = S.prayers[k];
    xp += (p.kaza || 0) * 5;
    if (PRAYER_NAMES.every(([key]) => p[key])) xp += 25;
  }
  return xp;
}
function mainDoneCount() {
  let c = 0;
  for (const h of S.habits) if (h.main) c += Object.keys(S.done[h.id] || {}).length;
  return c;
}
function xpNeed(L) { return Math.round(200 * Math.pow(L - 1, 1.5)); }   // L. seviyeye ulaşmak için XP
function mainNeed(L) { return 8 * (L - 1); }                            // L. seviye için Ana Görev tamamlaması
function level() {
  const xp = totalXP(), md = mainDoneCount();
  let L = 1;
  while (L < 99 && xp >= xpNeed(L + 1) && md >= mainNeed(L + 1)) L++;
  return L;
}
function todayXP() {
  const k = dateKey();
  let xp = 0;
  for (const h of S.habits) if (S.done[h.id] && S.done[h.id][k]) xp += xpForHabit(h);
  return xp;
}

// ---------- Görev tamamlama & seri mantığı ----------
function isDoneToday(h) { return !!(S.done[h.id] && S.done[h.id][dateKey()]); }
function countRange(h, start, days) {
  const log = S.done[h.id] || {};
  const end = new Date(start); end.setDate(end.getDate() + days);
  let c = 0;
  for (const k in log) { const d = new Date(k + 'T12:00'); if (d >= start && d < end) c++; }
  return c;
}
function countInWeek(h) { return countRange(h, weekStart(new Date()), 7); }
function countInMonth(h) {
  const now = new Date();
  const pre = now.getFullYear() + '-' + pad(now.getMonth() + 1);
  const log = S.done[h.id] || {};
  let c = 0;
  for (const k in log) if (k.startsWith(pre)) c++;
  return c;
}
function lastDone(h) {
  const keys = Object.keys(S.done[h.id] || {}).sort();
  return keys.length ? keys[keys.length - 1] : null;
}
// Günlük seri (ardışık günler)
function streak(h) {
  const log = S.done[h.id] || {};
  let s = 0; const d = new Date();
  if (!log[dateKey(d)]) d.setDate(d.getDate() - 1);
  while (log[dateKey(d)]) { s++; d.setDate(d.getDate() - 1); }
  return s;
}
// Haftalık seri: haftada N kez yapmak seriyi korur (hafta bitmeden bozulmaz)
function weekStreak(h, n) {
  let s = 0;
  const ws = weekStart(new Date());
  if (countRange(h, ws, 7) >= n) s++;
  const d = new Date(ws);
  while (true) {
    d.setDate(d.getDate() - 7);
    if (countRange(h, new Date(d), 7) >= n) s++;
    else break;
  }
  return s;
}
// Aylık seri
function monthStreak(h, n) {
  const log = S.done[h.id] || {};
  const cnt = (y, m) => {
    const pre = y + '-' + pad(m + 1);
    let c = 0;
    for (const k in log) if (k.startsWith(pre)) c++;
    return c;
  };
  const now = new Date();
  let y = now.getFullYear(), m = now.getMonth(), s = 0;
  if (cnt(y, m) >= n) s++;
  while (true) {
    m--; if (m < 0) { m = 11; y--; }
    if (cnt(y, m) >= n) s++;
    else break;
  }
  return s;
}
// Her görev için seri etiketi
function streakLabel(h) {
  if (h.freq === 'daily') { const s = streak(h); return s > 0 ? '🔥 ' + s + ' gün' : ''; }
  if (h.freq.startsWith('weekly-')) { const s = weekStreak(h, +h.freq.split('-')[1]); return s > 0 ? '🔥 ' + s + ' hafta' : ''; }
  if (h.freq.startsWith('monthly-')) { const s = monthStreak(h, +h.freq.split('-')[1]); return s > 0 ? '🔥 ' + s + ' ay' : ''; }
  return '';
}
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
function tickToday(id) {
  S.done[id] = S.done[id] || {};
  S.done[id][dateKey()] = true;
}

// Özel görevler
function studyHabit() { return S.habits.find(h => h.id === 'h9') || S.habits.find(h => h.name.toLowerCase().includes('sınav')); }
function screenHabit() { return S.habits.find(h => h.name.toLowerCase().includes('ekran')); }
function prayerHabit() { return S.habits.find(h => h.name.toLowerCase().includes('namaz')); }
function cigHabit() { return S.habits.find(h => h.name.toLowerCase().includes('sigara')); }
function bookHabit() { return S.habits.find(h => h.name.toLowerCase().includes('sesli kitap')); }
function todayPrayers() {
  const k = dateKey();
  if (!S.prayers[k]) S.prayers[k] = { kaza: 0 };
  return S.prayers[k];
}

// ---------- İstatistik ----------
function stats() {
  let totalDone = 0, bestStreak = 0;
  for (const h of S.habits) {
    totalDone += Object.keys(S.done[h.id] || {}).length;
    if (h.freq === 'daily') bestStreak = Math.max(bestStreak, streak(h));
  }
  const nofapNow = timerDays('h1');
  if (nofapNow > S.bestNofap) S.bestNofap = nofapNow;
  return {
    totalDone, bestStreak,
    bestNofap: Math.max(S.bestNofap, nofapNow),
    schemaCount: S.schemas.length,
    journalCount: S.journal.length,
    crisisSurvived: S.crisisSurvived,
    challengesDone: S.challenges.filter(c => c.done).length,
    daysUsed: Math.floor((Date.now() - S.firstUse) / 86400000) + 1,
    level: level(), xp: totalXP(), mainDone: mainDoneCount()
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
  if (currentPage === 'study') renderStudy();
}

function renderTop() {
  const r = currentRank();
  $('topAvatar').textContent = r.e;
  $('topHeroName').textContent = S.heroName || 'İsimsiz Kahraman';
  $('topHeroRank').textContent = 'Lv ' + level() + ' · ' + r.n + ' · ' + totalXP() + ' XP';
}

// ----- Ana sayfa -----
let hiddenListOpen = false;
function renderHome() {
  const pool = quotePool();
  $('dailyQuote').textContent = '“' + pool[dayOfYear() % pool.length] + '”';

  // Geri sayımlar
  $('countdownRow').innerHTML = S.countdowns.map(c => {
    const days = Math.ceil((c.target - Date.now()) / 86400000);
    return `<div class="cd-chip ${days < 0 ? 'past' : ''}">
      <span class="cd-days">${days < 0 ? '✓' : days}</span>
      <span class="cd-name">${esc(c.name)}${days >= 0 ? ' · gün kaldı' : ' · geçti'}</span>
      <button class="cd-del" onclick="App.delCountdown('${c.id}')">✕</button>
    </div>`;
  }).join('') + `<button class="cd-chip cd-add" onclick="App.openCountdownForm()">⏳ ＋ Geri sayım</button>`;

  // Tek seferlik görevler
  const pending = S.oneoffs.filter(o => !o.done);
  $('oneoffList').innerHTML = pending.map(o => `
    <div class="quest oneoff">
      <button class="q-check" onclick="App.doneOneoff('${o.id}')">✓</button>
      <div class="q-body">
        <div class="q-name">${esc(o.name)}</div>
        <div class="q-meta">Tek seferlik · +${o.xp} XP</div>
      </div>
      <button class="q-edit" onclick="App.delOneoff('${o.id}')">🗑️</button>
    </div>`).join('');

  // Ana görevler (en üstte, sürüklenebilir)
  const mains = S.habits.filter(h => h.main && !h.hidden).sort((a, b) => a.order - b.order);
  $('mainQuests').innerHTML = mains.map(h => questHTML(h, true, true)).join('') ||
    '<p class="hint-block">Henüz ana görev yok. Görevler sayfasından ⭐ ile seç.</p>';
  attachDrag($('mainQuests'));

  // Sayaç kartları
  $('mainTimers').innerHTML = S.habits.filter(h => h.timer).map(h => timerCardHTML(h)).join('');

  // Bugün beklenenler (ana olmayan, gizli olmayan)
  const today = S.habits.filter(h => !h.main && !h.timer && !h.hidden && h.freq !== 'free' && (neededToday(h) || isDoneToday(h)))
    .sort((a, b) => a.order - b.order);
  $('todayQuests').innerHTML = today.map(h => questHTML(h)).join('') ||
    '<p class="hint-block">Bugünlük her şey tamam. 🏆</p>';

  // Serbest görevler (gizli olmayan)
  const free = S.habits.filter(h => h.freq === 'free' && !h.timer && !h.hidden).sort((a, b) => a.order - b.order);
  $('freeQuests').innerHTML = free.map(h => questHTML(h)).join('');

  // Pasif (gizli) görevler — sadece istenince görünür
  const hid = S.habits.filter(h => h.hidden).sort((a, b) => a.order - b.order);
  $('hiddenToggle').textContent = (hiddenListOpen ? '− Gizle' : '＋ Diğer') + ' (' + hid.length + ' pasif görev)';
  $('hiddenToggle').classList.toggle('hidden', !hid.length);
  $('hiddenQuests').classList.toggle('hidden', !hiddenListOpen);
  if (hiddenListOpen) $('hiddenQuests').innerHTML = hid.map(h => questHTML(h)).join('');

  attachLongPress($('page-home'));
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
  const isStudy = studyHabit() && h.id === studyHabit().id;
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
    ${isNofap && days > 0 ? `<p class="congrats-line">${esc(nofapCongrats(days))}</p>` : ''}
    <div class="row-2">
      ${isNofap ? '<button class="btn btn-danger" onclick="App.openCrisis()">🆘 Kriz</button>' : ''}
      ${isStudy ? '<button class="btn btn-gold" onclick="App.go(\'study\')">📚 Çalışma Merkezi</button>' : ''}
      <button class="btn btn-outline" onclick="App.openStart('${h.id}')">✏️</button>
      <button class="btn btn-outline" onclick="App.askReset('${h.id}')">↺</button>
      <button class="btn btn-outline" onclick="App.showWidget('${h.id}')">🧷</button>
    </div>
  </div>`;
}

// NoFap tebrik + seçili kaynaklardan söz
function nofapCongrats(days) {
  const c = CONGRATS[days % CONGRATS.length].replace('{d}', days);
  const pool = quotePool();
  return c + ' ' + pool[(dayOfYear() + days) % pool.length];
}

function questHTML(h, isMain, draggable) {
  const done = isDoneToday(h);
  let meta = FREQ_LABEL[h.freq] || '';
  let weekComplete = false, boxes = '';
  if (h.freq.startsWith('weekly-')) {
    const n = +h.freq.split('-')[1], c = countInWeek(h);
    weekComplete = c >= n;
    // haftalık hedef kutucukları — dolunca altın kutlama
    boxes = `<div class="wk-boxes">` +
      Array.from({ length: n }, (_, i) => `<span class="wk-box ${i < c ? 'filled' : ''}"></span>`).join('') +
      (weekComplete ? '<span class="wk-done">🏆 Hafta tamam!</span>' : '') + `</div>`;
    meta += ` · bu hafta ${c}/${n}`;
  }
  else if (h.freq.startsWith('monthly-')) meta += ` · bu ay ${countInMonth(h)}/${h.freq.split('-')[1]}`;
  else if (h.freq === 'free') {
    const ld = lastDone(h);
    meta = ld ? 'Son: ' + ld : 'Hazır olunca — yük yok';
  }
  meta += ' · +' + xpForHabit(h) + ' XP';
  const sl = streakLabel(h);
  const sh = studyHabit(), sch = screenHabit(), cg = cigHabit(), bk = bookHabit();
  const extra =
    (sh && h.id === sh.id ? `<button class="q-tool" onclick="App.go('study')">📚</button>` : '') +
    (sch && h.id === sch.id ? `<button class="q-tool" onclick="App.openScreen()">📵</button>` : '') +
    (cg && h.id === cg.id ? `<button class="q-tool" onclick="App.openCig()">🚬</button>` : '') +
    (bk && h.id === bk.id ? `<button class="q-tool" onclick="App.goBooks()">📖</button>` : '');
  // Namaz: 5 vakit + kaza çipleri
  let prayerRow = '';
  const ph = prayerHabit();
  if (ph && h.id === ph.id) {
    const p = S.prayers[dateKey()] || { kaza: 0 };
    const full = PRAYER_NAMES.every(([k]) => p[k]);
    prayerRow = `<div class="prayer-row">` +
      PRAYER_NAMES.map(([k, label]) =>
        `<button class="pr-chip ${p[k] ? 'on' : ''}" onclick="App.togglePrayer('${k}')">${label}</button>`).join('') +
      `<button class="pr-chip pr-kaza" onclick="App.addKaza()">＋Kaza${p.kaza ? ' (' + p.kaza + ')' : ''}</button>` +
      (full ? '<span class="wk-done">🕌 5/5 Maşallah! +25 XP</span>' : '') + `</div>`;
  }
  // Sigara: bugünkü adet göster
  if (cg && h.id === cg.id) {
    const c = S.cigs[dateKey()];
    if (c != null) meta += c === 0 ? ' · bugün 0 🎉' : ' · bugün ' + c + ' adet';
  }
  return `
  <div class="quest ${done ? 'done' : ''} ${isMain ? 'main-quest' : ''} ${weekComplete ? 'week-complete' : ''}" data-id="${h.id}" data-press="${h.id}">
    ${draggable ? `<span class="drag-handle" data-drag="${h.id}">⠿</span>` : ''}
    <button class="q-check" onclick="App.toggle('${h.id}')">✓</button>
    <div class="q-body">
      <div class="q-name">${isMain ? '⭐ ' : ''}${esc(h.name)}</div>
      <div class="q-meta">${esc(meta)}</div>
      ${boxes}${prayerRow}
    </div>
    ${extra}
    ${sl ? `<span class="q-streak">${sl}</span>` : ''}
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
    for (const h of list) {
      const el = document.createElement('div');
      el.className = 'quest' + (h.main ? ' main-quest' : '');
      el.dataset.id = h.id;
      const sl = streakLabel(h);
      el.innerHTML = `
        <span class="drag-handle" data-drag="${h.id}">⠿</span>
        <div class="q-body">
          <div class="q-name">${esc(h.name)} ${h.timer ? '⏱️' : ''} ${h.hidden ? '🕶️' : ''}</div>
          <div class="q-meta">${FREQ_LABEL[h.freq]} · +${xpForHabit(h)} XP ${sl ? '· ' + sl : ''}${h.hidden ? ' · pasif' : ''}</div>
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

// Dokunmatik sürükle-bırak: bırakınca görünür sıra, mevcut order değerlerine dağıtılır
// (böylece Ana Görev sıralaması ile kategori sıralaması birbirini bozmaz)
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
        const ids = [...list.querySelectorAll('.quest')].map(q => q.dataset.id);
        const slots = ids.map(id => S.habits.find(x => x.id === id))
          .filter(Boolean).map(h => h.order).sort((a, b) => a - b);
        ids.forEach((id, i) => {
          const h = S.habits.find(x => x.id === id);
          if (h) h.order = slots[i];
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

  const cur = rankForDays(timerDays('h1'));
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
  $('tabBooks').classList.toggle('active', journalMode === 'books');
  $('tabBudget').classList.toggle('active', journalMode === 'budget');
  $('journalPane').classList.toggle('hidden', journalMode !== 'journal');
  $('schemaPane').classList.toggle('hidden', journalMode !== 'schema');
  $('booksPane').classList.toggle('hidden', journalMode !== 'books');
  $('budgetPane').classList.toggle('hidden', journalMode !== 'budget');

  // Kitaplık
  $('bookEntries').innerHTML = S.books.slice().reverse().map((b, ri) => {
    const i = S.books.length - 1 - ri;
    return `<div class="entry">
      <button class="e-del" onclick="App.delBook(${i})">🗑️</button>
      <div class="e-date">${fmtDate(b.ts)}</div>
      <div class="e-text"><b>📖 ${esc(b.title)}</b>${b.summary ? '<br>' + esc(b.summary) : ''}</div>
    </div>`;
  }).join('') || '<p class="hint-block">Henüz kitap yok.</p>';

  // Bütçe
  const now = new Date();
  const pre = now.getFullYear() + '-' + pad(now.getMonth() + 1);
  let gelir = 0, gider = 0;
  for (const e of S.expenses) {
    if (dateKey(new Date(e.ts)).startsWith(pre)) {
      if (e.type === 'gelir') gelir += e.amount; else gider += e.amount;
    }
  }
  const net = gelir - gider;
  $('budgetSummary').innerHTML = `
    <div class="stats-grid budget-grid">
      <div class="stat-tile"><div class="st-num" style="color:var(--green)">+${gelir.toFixed(0)}₺</div><div class="st-label">Bu ay gelir</div></div>
      <div class="stat-tile"><div class="st-num" style="color:var(--red)">−${gider.toFixed(0)}₺</div><div class="st-label">Bu ay gider</div></div>
      <div class="stat-tile" style="grid-column:1/-1"><div class="st-num">${net >= 0 ? '+' : ''}${net.toFixed(0)}₺</div><div class="st-label">Net birikim ${net >= 0 ? '📈' : '📉'}</div></div>
    </div>`;
  $('expenseList').innerHTML = S.expenses.slice().reverse().map((e, ri) => {
    const i = S.expenses.length - 1 - ri;
    return `<div class="exp-row ${e.type}">
      <span class="exp-desc">${esc(e.desc)}</span>
      <span class="exp-date">${new Date(e.ts).toLocaleDateString('tr-TR', { day: 'numeric', month: 'short' })}</span>
      <span class="exp-amount">${e.type === 'gelir' ? '+' : '−'}${e.amount.toFixed(2)}₺</span>
      <button class="e-del" onclick="App.delExpense(${i})">🗑️</button>
    </div>`;
  }).join('') || '<p class="hint-block">Henüz kayıt yok. Harcamalarını ve gelirlerini ekle, net birikimini gör.</p>';

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
  const L = st.level;
  const xpCur = st.xp - xpNeed(L), xpNext = xpNeed(L + 1) - xpNeed(L);
  const mdCur = st.mainDone, mdNext = mainNeed(L + 1);
  $('levelCard').innerHTML = `
    <div class="lv-num">⚡ Seviye ${L}</div>
    <div class="lv-row"><span>XP</span><span>${st.xp} / ${xpNeed(L + 1)}</span></div>
    <div class="lv-bar"><div class="lv-fill" style="width:${Math.min(100, Math.round(xpCur / xpNext * 100))}%"></div></div>
    <div class="lv-row"><span>⭐ Ana Görev tamamlama <small>(seviye şartı)</small></span><span>${mdCur} / ${mdNext}</span></div>
    <div class="lv-bar"><div class="lv-fill lv-fill-main" style="width:${Math.min(100, Math.round(mdCur / Math.max(1, mdNext) * 100))}%"></div></div>
    <p class="hint-block">Seviye atlamak için XP tek başına yetmez — Ana Görevlerini (en etkili 5 mücadele) tamamlamak şarttır.</p>`;

  $('statsGrid').innerHTML = `
    <div class="stat-tile"><div class="st-num">${st.xp}</div><div class="st-label">Toplam XP</div></div>
    <div class="stat-tile"><div class="st-num">${timerDays('h1')}</div><div class="st-label">NoFap (gün)</div></div>
    <div class="stat-tile"><div class="st-num">${st.bestNofap}</div><div class="st-label">NoFap Rekoru</div></div>
    <div class="stat-tile"><div class="st-num">${st.totalDone}</div><div class="st-label">Toplam Görev</div></div>
    <div class="stat-tile"><div class="st-num">${st.bestStreak}</div><div class="st-label">En İyi Seri</div></div>
    <div class="stat-tile"><div class="st-num">${st.crisisSurvived}</div><div class="st-label">Atlatılan Kriz</div></div>`;

  $('achievements').innerHTML = ACHIEVEMENTS.map(a => `
    <div class="ach ${a.f(st) ? '' : 'locked'}" title="${a.d}">
      <div class="a-emoji">${a.e}</div>
      <div class="a-name">${a.n}</div>
    </div>`).join('');

  $('widgetPicker').innerHTML = S.habits.filter(h => h.timer).map(h => `
    <button class="widget-pick-btn" onclick="App.showWidget('${h.id}')">
      <span>⏱️ ${esc(h.name)}</span><span>${timerDays(h.id)} gün →</span>
    </button>`).join('');

  // Başarım geçmişi (tamamlanan tek seferlikler)
  const doneOffs = S.oneoffs.filter(o => o.done).sort((a, b) => b.doneTs - a.doneTs);
  $('oneoffHistory').innerHTML = doneOffs.map(o => `
    <div class="exp-row gelir">
      <span class="exp-desc">🏅 ${esc(o.name)}</span>
      <span class="exp-date">${new Date(o.doneTs).toLocaleDateString('tr-TR', { day: 'numeric', month: 'short' })}</span>
      <span class="exp-amount">+${o.xp} XP</span>
    </div>`).join('') || '<p class="hint-block">Henüz tamamlanan tek seferlik görev yok.</p>';

  // Ayarlar
  const q = S.quoteSources;
  $('setMoti').checked = q.moti !== false;
  $('setQuran').checked = !!q.quran;
  $('setBible').checked = !!q.bible;
  $('setKing').innerHTML = '<option value="">— Yok —</option>' +
    S.habits.filter(h => h.timer).map(h =>
      `<option value="${h.id}" ${S.kingHabit === h.id ? 'selected' : ''}>👑 ${esc(h.name)}</option>`).join('');
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

// ----- Çalışma Merkezi -----
let studyTabName = 'time';
const STUDY_GROUPS = { books: '📕 Kitaplar', notes: '📝 Notlar', lessons: '🎓 Dersler' };

function renderStudy() {
  document.querySelectorAll('[data-stab]').forEach(t =>
    t.classList.toggle('active', t.dataset.stab === studyTabName));
  const isTime = studyTabName === 'time';
  $('studyTimePane').classList.toggle('hidden', !isTime);
  $('studyListPane').classList.toggle('hidden', isTime);

  if (isTime) {
    updateStudyClock();
    $('studyStartBtn').textContent = S.study.running ? '⏸ Durdur & Kaydet' : '▶ Başlat';
    // son 7 gün
    let rows = '';
    for (let i = 0; i < 7; i++) {
      const d = new Date(); d.setDate(d.getDate() - i);
      const k = dateKey(d);
      const min = S.study.log[k] || 0;
      const label = i === 0 ? 'Bugün' : d.toLocaleDateString('tr-TR', { weekday: 'long', day: 'numeric', month: 'short' });
      rows += `<div class="week-row"><span>${label}</span>
        <span class="week-bar"><span class="week-fill" style="width:${Math.min(100, min / 3)}%"></span></span>
        <span class="week-min">${min} dk</span></div>`;
    }
    $('studyWeek').innerHTML = rows;
  } else {
    const items = S.study.items[studyTabName] || [];
    $('studyItems').innerHTML = items.map((it, i) => `
      <div class="quest ${it.done ? 'done' : ''}">
        <button class="q-check" onclick="App.studyToggleItem('${studyTabName}', ${i})">✓</button>
        <div class="q-body"><div class="q-name">${esc(it.name)}</div>
          <div class="q-meta">${it.done ? '✅ Tamamlandı' : STUDY_GROUPS[studyTabName]}</div></div>
        <button class="q-edit" onclick="App.studyDelItem('${studyTabName}', ${i})">🗑️</button>
      </div>`).join('') || '<p class="hint-block">Henüz madde yok. Yukarıdan ekle — örn. bitirilecek kitap, çözülecek deneme, izlenecek ders.</p>';
  }
}
function updateStudyClock() {
  const el = $('studyClock');
  if (!el) return;
  const base = (S.study.log[dateKey()] || 0);
  let extra = 0;
  if (S.study.running) extra = Math.floor((Date.now() - S.study.running) / 60000);
  if (S.study.running) {
    const sec = Math.floor((Date.now() - S.study.running) / 1000);
    el.textContent = pad(Math.floor(sec / 60)) + ':' + pad(sec % 60);
    el.classList.add('running');
  } else {
    el.textContent = '00:00';
    el.classList.remove('running');
  }
  const t = $('studyToday');
  if (t) t.textContent = 'Bugün toplam: ' + (base + extra) + ' dk çalıştın' + (S.study.running ? ' (sayaç çalışıyor…)' : '');
}

// Saat güncelleme
setInterval(() => {
  document.querySelectorAll('[data-clock]').forEach(el => {
    el.textContent = timerClock(el.dataset.clock);
  });
  if (currentPage === 'study' && studyTabName === 'time') updateStudyClock();
}, 1000);

/* ============================================================
   APP — kullanıcı eylemleri
   ============================================================ */
let crisisInterval = null, crisisResetTarget = null, resetTargetId = null;
let nightQueue = [];

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
    $('hfHidden').checked = h ? !!h.hidden : false;
    $('hfXp').value = h && h.xp ? h.xp : '';
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
    const customXp = parseInt($('hfXp').value, 10);
    if (App.editingHabit) {
      const h = S.habits.find(x => x.id === App.editingHabit);
      h.name = name; h.cat = $('hfCategory').value; h.freq = $('hfFreq').value;
      h.main = main;
      h.hidden = $('hfHidden').checked;
      h.xp = customXp > 0 ? customXp : undefined;
      const wantTimer = $('hfTimer').checked;
      if (wantTimer && !h.timer) S.timers[h.id] = S.timers[h.id] || Date.now();
      h.timer = wantTimer;
    } else {
      const id = 'h' + Date.now();
      const h = {
        id, name, cat: $('hfCategory').value, freq: $('hfFreq').value,
        main, timer: $('hfTimer').checked,
        hidden: $('hfHidden').checked,
        xp: customXp > 0 ? customXp : undefined,
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
      doTimerReset(resetTargetId);
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
    if (crisisResetTarget) {
      doTimerReset(crisisResetTarget);
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

  // --- Gece değerlendirmesi (kaydırmalı) ---
  openNight() {
    nightQueue = S.habits.filter(h => !h.timer && !h.hidden && h.freq !== 'free' && !isDoneToday(h) && neededToday(h))
      .sort((a, b) => (b.main ? 1 : 0) - (a.main ? 1 : 0) || a.order - b.order);
    $('nightOverlay').classList.remove('hidden');
    App.renderNight();
  },
  renderNight() {
    const stack = $('nightStack');
    if (!nightQueue.length) {
      $('nightBtns').classList.add('hidden');
      stack.innerHTML = `
        <div class="night-done">
          <div class="nd-emoji">🌟</div>
          <h2>Gün Kapandı!</h2>
          <p>Bugün <b>${todayXP()} XP</b> kazandın.<br>Seviye ${level()} · ${totalXP()} XP toplam</p>
          <button class="btn btn-gold" onclick="App.closeNight()">İyi geceler, savaşçı 🌙</button>
        </div>`;
      return;
    }
    $('nightBtns').classList.remove('hidden');
    // en fazla 3 kart göster (üstteki aktif)
    stack.innerHTML = nightQueue.slice(0, 3).map((h, i) => `
      <div class="night-card" style="z-index:${10 - i}; transform: translateY(${i * 10}px) scale(${1 - i * 0.05});" data-idx="${i}">
        <div class="nc-badge">${h.main ? '⭐ ANA GÖREV · +50 XP' : '+' + xpForHabit(h) + ' XP'}</div>
        <div class="nc-name">${esc(h.name)}</div>
        <div class="nc-meta">${FREQ_LABEL[h.freq]}${streakLabel(h) ? ' · ' + streakLabel(h) : ''}</div>
        <div class="nc-q">Bugün yaptın mı?</div>
        <div class="nc-arrows"><span>← Yapmadım</span><span>Yaptım →</span></div>
      </div>`).join('');
    attachNightSwipe(stack.querySelector('.night-card'));
  },
  nightSwipe(yes) {
    const card = $('nightStack').querySelector('.night-card');
    if (!card || !nightQueue.length) return;
    card.style.transition = 'transform .35s, opacity .35s';
    card.style.transform = `translateX(${yes ? '' : '-'}120%) rotate(${yes ? 18 : -18}deg)`;
    card.style.opacity = '0';
    const h = nightQueue.shift();
    if (yes) { tickToday(h.id); save(); }
    setTimeout(() => App.renderNight(), 300);
  },
  closeNight() {
    $('nightOverlay').classList.add('hidden');
    render();
  },

  // --- Çalışma Merkezi ---
  studyTab(t) { studyTabName = t; renderStudy(); },
  studyToggleTimer() {
    if (S.study.running) {
      const min = Math.round((Date.now() - S.study.running) / 60000);
      const k = dateKey();
      S.study.log[k] = (S.study.log[k] || 0) + min;
      S.study.running = null;
      const sh = studyHabit();
      if (min > 0 && sh) tickToday(sh.id);
      save();
      alert(min > 0 ? `⚔️ ${min} dakika kaydedildi!` : 'Süre 1 dakikadan kısaydı, kaydedilmedi.');
    } else {
      S.study.running = Date.now();
      save();
    }
    renderStudy();
  },
  studyManual() {
    const v = prompt('Kaç dakika çalıştın?');
    const min = parseInt(v, 10);
    if (!min || min < 1) return;
    const k = dateKey();
    S.study.log[k] = (S.study.log[k] || 0) + min;
    const sh = studyHabit();
    if (sh) tickToday(sh.id);
    save(); renderStudy();
  },
  studyAddItem() {
    const name = $('stNewItem').value.trim();
    if (!name) return;
    S.study.items[studyTabName].push({ name, done: false, ts: Date.now() });
    $('stNewItem').value = '';
    save(); renderStudy();
  },
  studyToggleItem(group, i) {
    const it = S.study.items[group][i];
    it.done = !it.done;
    if (it.done) {
      const sh = studyHabit();
      if (sh) tickToday(sh.id);
    }
    save(); renderStudy();
  },
  studyDelItem(group, i) {
    S.study.items[group].splice(i, 1);
    save(); renderStudy();
  },

  // --- Ekran süresi ---
  openScreen() {
    $('scGoal').value = S.screenGoal;
    $('scMinutes').value = S.screenLog[dateKey()] || '';
    let rows = '';
    for (let i = 0; i < 7; i++) {
      const d = new Date(); d.setDate(d.getDate() - i);
      const k = dateKey(d);
      const min = S.screenLog[k];
      const label = i === 0 ? 'Bugün' : d.toLocaleDateString('tr-TR', { weekday: 'short', day: 'numeric' });
      rows += `<div class="week-row"><span>${label}</span>
        <span class="week-min">${min == null ? '—' : min + ' dk ' + (min <= S.screenGoal ? '✅' : '⚠️')}</span></div>`;
    }
    $('scWeek').innerHTML = rows;
    App.renderScreenPics();
    $('screenModal').classList.remove('hidden');
  },
  saveScreen() {
    const min = parseInt($('scMinutes').value, 10);
    const goal = parseInt($('scGoal').value, 10);
    if (goal > 0) S.screenGoal = goal;
    if (!isNaN(min) && min >= 0) {
      S.screenLog[dateKey()] = min;
      const sch = screenHabit();
      if (sch) {
        S.done[sch.id] = S.done[sch.id] || {};
        if (min <= S.screenGoal) S.done[sch.id][dateKey()] = true;
        else delete S.done[sch.id][dateKey()];
      }
    }
    save();
    App.closeModal('screenModal');
    render();
  },

  // --- Günlük ---
  journalTab(m) { journalMode = m; renderJournal(); },
  saveJournal() {
    const t = $('journalInput').value.trim();
    if (!t) return;
    S.journal.push({ ts: Date.now(), text: t });
    $('journalInput').value = '';
    const jh = S.habits.find(h => h.name.toLowerCase().includes('günlük'));
    if (jh) tickToday(jh.id);
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

  // --- Tek seferlik görevler ---
  addOneoff() {
    const name = $('oneoffInput').value.trim();
    if (!name) return;
    S.oneoffs.push({ id: 'o' + Date.now(), name, xp: parseInt($('oneoffXp').value, 10) || 20, created: Date.now(), done: false });
    $('oneoffInput').value = '';
    save(); renderHome(); renderTop();
  },
  doneOneoff(id) {
    const o = S.oneoffs.find(x => x.id === id);
    if (!o) return;
    o.done = true; o.doneTs = Date.now();
    save(); render();
  },
  delOneoff(id) {
    S.oneoffs = S.oneoffs.filter(x => x.id !== id);
    save(); renderHome();
  },

  // --- Pasif görev listesi ---
  toggleHiddenList() { hiddenListOpen = !hiddenListOpen; renderHome(); },

  // --- Namaz ---
  togglePrayer(k) {
    const p = todayPrayers();
    p[k] = !p[k];
    const ph = prayerHabit();
    if (ph) {
      // en az 1 vakit işaretliyse görev tik, hiçbiri yoksa tiki kaldır
      const any = PRAYER_NAMES.some(([key]) => p[key]);
      S.done[ph.id] = S.done[ph.id] || {};
      if (any) S.done[ph.id][dateKey()] = true;
      else delete S.done[ph.id][dateKey()];
    }
    save(); render();
  },
  addKaza() {
    const p = todayPrayers();
    p.kaza = (p.kaza || 0) + 1;
    save(); render();
  },

  // --- Sigara ---
  cigTemp: 0,
  openCig() {
    App.cigTemp = S.cigs[dateKey()] ?? 0;
    $('cigCount').textContent = App.cigTemp;
    let rows = '';
    for (let i = 0; i < 7; i++) {
      const d = new Date(); d.setDate(d.getDate() - i);
      const k = dateKey(d);
      const c = S.cigs[k];
      const label = i === 0 ? 'Bugün' : d.toLocaleDateString('tr-TR', { weekday: 'short', day: 'numeric' });
      rows += `<div class="week-row"><span>${label}</span>
        <span class="week-min">${c == null ? '—' : (c === 0 ? '0 🎉' : c + ' adet')}</span></div>`;
    }
    $('cigWeek').innerHTML = rows;
    $('cigModal').classList.remove('hidden');
  },
  cigAdjust(d) {
    App.cigTemp = Math.max(0, App.cigTemp + d);
    $('cigCount').textContent = App.cigTemp;
  },
  saveCig() {
    S.cigs[dateKey()] = App.cigTemp;
    const ch = cigHabit();
    if (ch) {
      S.done[ch.id] = S.done[ch.id] || {};
      if (App.cigTemp === 0) S.done[ch.id][dateKey()] = true;
      else delete S.done[ch.id][dateKey()];
    }
    save();
    App.closeModal('cigModal');
    render();
  },

  // --- Kitaplık ---
  goBooks() { journalMode = 'books'; App.go('journal'); },
  saveBook() {
    const title = $('bookTitle').value.trim();
    if (!title) { alert('Kitap adı gerekli.'); return; }
    S.books.push({ ts: Date.now(), title, summary: $('bookSummary').value.trim() });
    $('bookTitle').value = ''; $('bookSummary').value = '';
    const bh = bookHabit();
    if (bh) tickToday(bh.id);
    save(); renderJournal();
  },
  delBook(i) { if (confirm('Kitap kaydı silinsin mi?')) { S.books.splice(i, 1); save(); renderJournal(); } },

  // --- Bütçe ---
  addExpense(type) {
    const desc = $('expDesc').value.trim();
    const amount = parseFloat($('expAmount').value);
    if (!desc || !amount || amount <= 0) { alert('Açıklama ve tutar gerekli.'); return; }
    S.expenses.push({ ts: Date.now(), desc, amount, type });
    $('expDesc').value = ''; $('expAmount').value = '';
    save(); renderJournal();
  },
  delExpense(i) { S.expenses.splice(i, 1); save(); renderJournal(); },

  // --- Geri sayım ---
  openCountdownForm() { $('countdownModal').classList.remove('hidden'); },
  saveCountdown() {
    const name = $('cdName').value.trim();
    const date = $('cdDate').value;
    if (!name || !date) { alert('İsim ve tarih gerekli.'); return; }
    S.countdowns.push({ id: 'cd' + Date.now(), name, target: new Date(date + 'T23:59').getTime() });
    $('cdName').value = ''; $('cdDate').value = '';
    save();
    App.closeModal('countdownModal');
    renderHome();
  },
  delCountdown(id) {
    if (!confirm('Geri sayım silinsin mi?')) return;
    S.countdowns = S.countdowns.filter(c => c.id !== id);
    save(); renderHome();
  },

  // --- Sayaç başlangıcını manuel ayarla ---
  startTargetId: null,
  openStart(id) {
    App.startTargetId = id;
    const h = S.habits.find(x => x.id === id);
    $('startText').textContent = `"${h.name}" sayacının gerçek başlangıcını gir — son sıfırlanmanın tarihi ve saati.`;
    const t = new Date(S.timers[id] || Date.now());
    t.setMinutes(t.getMinutes() - t.getTimezoneOffset());
    $('startInput').value = t.toISOString().slice(0, 16);
    $('startModal').classList.remove('hidden');
  },
  saveStart() {
    const v = $('startInput').value;
    if (!v) return;
    const ts = new Date(v).getTime();
    if (isNaN(ts)) { alert('Geçersiz tarih.'); return; }
    if (ts > Date.now()) { alert('Gelecek bir tarih giremezsin.'); return; }
    S.timers[App.startTargetId] = ts;
    save();
    App.closeModal('startModal');
    render();
  },

  // --- Ekran görüntüsü arşivi ---
  addScreenshot(ev) {
    const f = ev.target.files[0];
    if (!f) return;
    const img = new Image();
    const url = URL.createObjectURL(f);
    img.onload = () => {
      const w = Math.min(480, img.width);
      const hgt = Math.round(img.height * w / img.width);
      const cv = document.createElement('canvas');
      cv.width = w; cv.height = hgt;
      cv.getContext('2d').drawImage(img, 0, 0, w, hgt);
      URL.revokeObjectURL(url);
      S.screenPics.push({ d: dateKey(), img: cv.toDataURL('image/jpeg', 0.55) });
      while (S.screenPics.length > 30) S.screenPics.shift(); // en fazla 30 kayıt
      save();
      App.renderScreenPics();
    };
    img.src = url;
    ev.target.value = '';
  },
  renderScreenPics() {
    $('scPics').innerHTML = S.screenPics.slice().reverse().map((p, ri) => {
      const i = S.screenPics.length - 1 - ri;
      return `<div class="sc-pic-row">
        <img src="${p.img}" onclick="this.classList.toggle('big')" alt="ss">
        <span>${p.d}${S.screenLog[p.d] != null ? ' · ' + S.screenLog[p.d] + ' dk' : ''}</span>
        <button class="e-del" onclick="App.delScreenshot(${i})">🗑️</button>
      </div>`;
    }).join('');
  },
  delScreenshot(i) { S.screenPics.splice(i, 1); save(); App.renderScreenPics(); },

  // --- Ayarlar ---
  setQuoteSource() {
    S.quoteSources = { moti: $('setMoti').checked, quran: $('setQuran').checked, bible: $('setBible').checked };
    save();
  },
  setKing(v) { S.kingHabit = v; save(); },
  resetAllTimers() {
    if (!confirm('TÜM sayaçlar şimdiden başlatılacak. Emin misin?')) return;
    const d = timerDays('h1');
    if (d > S.bestNofap) S.bestNofap = d;
    for (const h of S.habits) if (h.timer) S.timers[h.id] = Date.now();
    save(); render();
  },

  closeModal(id) { $(id).classList.add('hidden'); }
};

// Sayaç sıfırlama (Kral Görev zinciriyle): kral sayaç düşerse tüm sayaçlar düşer
function doTimerReset(id) {
  if (id === 'h1') {
    const d = timerDays('h1');
    if (d > S.bestNofap) S.bestNofap = d;
  }
  S.timers[id] = Date.now();
  if (S.kingHabit && id === S.kingHabit) {
    for (const h of S.habits) if (h.timer) S.timers[h.id] = Date.now();
  }
}

// Basılı tutunca görev düzenleme (550ms)
function attachLongPress(root) {
  root.querySelectorAll('[data-press]').forEach(el => {
    if (el._lpBound) return;
    el._lpBound = true;
    let timer = null;
    const start = e => {
      if (e.target.closest('button, .drag-handle, input, .pr-chip')) return;
      timer = setTimeout(() => {
        timer = null;
        if (navigator.vibrate) navigator.vibrate(30);
        App.openHabitForm(el.dataset.press);
      }, 550);
    };
    const cancel = () => { if (timer) { clearTimeout(timer); timer = null; } };
    el.addEventListener('pointerdown', start);
    el.addEventListener('pointermove', cancel);
    el.addEventListener('pointerup', cancel);
    el.addEventListener('pointerleave', cancel);
  });
}

// Sekmeler arası sağa-sola kaydırma
const NAV_PAGES = ['home', 'habits', 'badges', 'journal', 'guild'];
(function initSwipeNav() {
  let sx = null, sy = null;
  document.addEventListener('touchstart', e => {
    if (e.target.closest('.drag-handle, .night-card, .modal, .crisis-overlay, input, textarea, select')) { sx = null; return; }
    sx = e.touches[0].clientX; sy = e.touches[0].clientY;
  }, { passive: true });
  document.addEventListener('touchend', e => {
    if (sx == null) return;
    const dx = e.changedTouches[0].clientX - sx;
    const dy = e.changedTouches[0].clientY - sy;
    sx = null;
    if (Math.abs(dx) < 70 || Math.abs(dy) > 60) return;
    const i = NAV_PAGES.indexOf(currentPage);
    if (i === -1) return;
    const next = dx < 0 ? i + 1 : i - 1;
    if (next >= 0 && next < NAV_PAGES.length) App.go(NAV_PAGES[next]);
  }, { passive: true });
})();

// Gece kartı kaydırma (dokunmatik)
function attachNightSwipe(card) {
  if (!card) return;
  let startX = null;
  card.addEventListener('pointerdown', e => {
    startX = e.clientX;
    card.setPointerCapture(e.pointerId);
    card.style.transition = 'none';
  });
  card.addEventListener('pointermove', e => {
    if (startX == null) return;
    const dx = e.clientX - startX;
    card.style.transform = `translateX(${dx}px) rotate(${dx / 12}deg)`;
    card.style.opacity = String(Math.max(.4, 1 - Math.abs(dx) / 400));
  });
  card.addEventListener('pointerup', e => {
    if (startX == null) return;
    const dx = e.clientX - startX;
    startX = null;
    if (Math.abs(dx) > 90) App.nightSwipe(dx > 0);
    else {
      card.style.transition = 'transform .25s, opacity .25s';
      card.style.transform = '';
      card.style.opacity = '1';
    }
  });
}

// ---------- Başlat ----------
load();
render();
window.App = App;
