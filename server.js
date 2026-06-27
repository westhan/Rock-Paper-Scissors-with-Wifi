const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const os = require('os');
const fs = require('fs');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = new Server(server);
const PORT = 3000;

const odalar = {};

function getLocalIP() {
  const interfaces = os.networkInterfaces();
  for (const name of Object.keys(interfaces)) {
    for (const iface of interfaces[name]) {
      if (iface.family === 'IPv4' && !iface.internal) return iface.address;
    }
  }
  return 'localhost';
}

function lobiBilgisi() {
  return Object.entries(odalar)
    .filter(([, o]) => o.durum === 'bekliyor')
    .map(([id, o]) => ({ id, isim: o.isim, sahip: o.oyuncular[0]?.ad || '?' }));
}

function tumaTumaBildir() {
  io.emit('lobiGuncelle', lobiBilgisi());
}

// socket.io client JS'i paketten oku
const socketClientPath = path.join(
  path.dirname(require.resolve('socket.io')),
  '../client-dist/socket.io.min.js'
);
const socketClientJS = fs.readFileSync(socketClientPath, 'utf8');

app.get('/socket.io/socket.io.js', (req, res) => {
  res.setHeader('Content-Type', 'application/javascript');
  res.send(socketClientJS);
});

const HTML = `<!DOCTYPE html>
<html lang="tr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Taş Kağıt Makas</title>
  <style>
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      font-family: 'Segoe UI', system-ui, sans-serif;
      background: linear-gradient(135deg, #0f0c29, #302b63, #24243e);
      min-height: 100vh;
      color: #fff;
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 20px;
    }
    header { text-align: center; margin-bottom: 28px; margin-top: 10px; }
    header h1 { font-size: 2.2rem; letter-spacing: 2px; }
    header p { color: #a0aec0; font-size: 0.9rem; margin-top: 4px; }
    .panel {
      background: rgba(255,255,255,0.05);
      border: 1px solid rgba(255,255,255,0.12);
      border-radius: 18px;
      padding: 28px;
      width: 100%;
      max-width: 480px;
      backdrop-filter: blur(12px);
    }
    h2 { font-size: 1.1rem; margin-bottom: 16px; color: #e2e8f0; }
    input {
      width: 100%;
      padding: 11px 14px;
      border-radius: 10px;
      border: 1px solid rgba(255,255,255,0.18);
      background: rgba(255,255,255,0.08);
      color: #fff;
      font-size: 0.95rem;
      margin-bottom: 10px;
      outline: none;
      transition: border 0.2s;
    }
    input:focus { border-color: #63b3ed; }
    input::placeholder { color: #718096; }
    button {
      padding: 11px 18px;
      border-radius: 10px;
      border: none;
      font-size: 0.95rem;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.18s;
    }
    .btn-blue { background: #4299e1; color: #fff; width: 100%; }
    .btn-blue:hover { background: #3182ce; }
    .btn-gray { background: rgba(255,255,255,0.1); color: #fff; border: 1px solid rgba(255,255,255,0.2); }
    .btn-gray:hover { background: rgba(255,255,255,0.18); }
    .btn-sm { padding: 8px 14px; font-size: 0.85rem; }
    .btn-red { background: rgba(245,101,101,0.2); color: #fc8181; border: 1px solid rgba(245,101,101,0.4); }
    .btn-red:hover { background: rgba(245,101,101,0.35); }
    button:disabled { opacity: 0.45; cursor: not-allowed; }
    #lobiPanel { display: block; }
    .giris-kutu { display: flex; gap: 10px; margin-bottom: 20px; }
    .giris-kutu input { margin-bottom: 0; }
    .giris-kutu button { white-space: nowrap; }
    .lobi-baslik { display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px; }
    #odaListesi { display: flex; flex-direction: column; gap: 10px; min-height: 60px; }
    .oda-satir {
      display: flex;
      align-items: center;
      justify-content: space-between;
      background: rgba(255,255,255,0.06);
      border: 1px solid rgba(255,255,255,0.1);
      border-radius: 12px;
      padding: 12px 16px;
    }
    .oda-satir .oda-bilgi .oda-adi { font-weight: 600; }
    .oda-satir .oda-bilgi .oda-sahip { font-size: 0.8rem; color: #718096; margin-top: 2px; }
    .bos-mesaj { color: #4a5568; text-align: center; font-size: 0.9rem; padding: 20px 0; }
    #hataLobi { color: #fc8181; font-size: 0.85rem; margin-top: 10px; min-height: 18px; }
    #yeniOdaPanel { display: none; margin-top: 16px; border-top: 1px solid rgba(255,255,255,0.1); padding-top: 16px; }
    #beklePanel { display: none; }
    .oda-kodu {
      text-align: center;
      background: rgba(99,179,237,0.1);
      border: 1px dashed #63b3ed;
      border-radius: 12px;
      padding: 16px;
      margin: 16px 0;
    }
    .oda-kodu span { font-size: 2.4rem; font-weight: 700; letter-spacing: 8px; color: #63b3ed; }
    #oyunPanel { display: none; }
    .skor-bar {
      display: flex;
      justify-content: space-around;
      background: rgba(0,0,0,0.3);
      border-radius: 12px;
      padding: 14px;
      margin-bottom: 20px;
    }
    .skor-oyuncu .isim { font-size: 0.85rem; color: #a0aec0; }
    .skor-oyuncu .puan { font-size: 2rem; font-weight: 700; color: #63b3ed; margin-top: 2px; }
    .durum-mesaj {
      text-align: center;
      background: rgba(99,179,237,0.08);
      border: 1px solid rgba(99,179,237,0.2);
      border-radius: 10px;
      padding: 11px;
      margin-bottom: 18px;
      color: #bee3f8;
      font-size: 0.9rem;
    }
    .secimler { display: flex; gap: 12px; justify-content: center; margin-bottom: 16px; }
    .s-btn {
      font-size: 2.6rem;
      background: rgba(255,255,255,0.06);
      border: 2px solid rgba(255,255,255,0.15) !important;
      border-radius: 16px;
      width: 92px; height: 92px;
      display: flex; align-items: center; justify-content: center;
      transition: all 0.18s;
    }
    .s-btn:hover:not(:disabled) { background: rgba(99,179,237,0.18); border-color: #63b3ed !important; transform: scale(1.07); }
    .s-btn.secildi { border-color: #68d391 !important; background: rgba(104,211,145,0.12); }
    .sonuc-kutu {
      background: rgba(0,0,0,0.3);
      border-radius: 12px;
      padding: 14px 18px;
      text-align: center;
      margin-bottom: 12px;
      display: none;
    }
    .sonuc-kutu.goster { display: block; }
    .sonuc-baslik { font-size: 1.25rem; font-weight: 700; margin-bottom: 6px; }
    .sonuc-baslik.k { color: #68d391; }
    .sonuc-baslik.k2 { color: #fc8181; }
    .sonuc-baslik.b { color: #f6e05e; }
    .sonuc-detay { color: #718096; font-size: 0.88rem; }
    .oyun-alt { display: flex; justify-content: flex-end; margin-top: 4px; }
    .ayrac { text-align: center; color: #4a5568; font-size: 0.8rem; margin: 8px 0; }
  </style>
</head>
<body>
<header>
  <h1>&#x270A; &#x270B; &#x270C;&#xFE0F;</h1>
  <p>Ta&#351; Ka&#287;&#305;t Makas &mdash; Wi-Fi &Ccedil;ok Oyunculu</p>
</header>

<div class="panel" id="lobiPanel">
  <h2>Oyuncu Ad&#305;n</h2>
  <div class="giris-kutu">
    <input id="adInput" placeholder="Ad&#305;n&#305; gir" maxlength="16">
  </div>
  <div class="lobi-baslik">
    <h2 style="margin:0">A&#231;&#305;k Odalar</h2>
    <button class="btn-gray btn-sm" onclick="lobiYenile()">&#8635; Yenile</button>
  </div>
  <div id="odaListesi"><p class="bos-mesaj">Y&#252;kleniyor...</p></div>
  <div id="hataLobi"></div>
  <div class="ayrac">&mdash; ya da &mdash;</div>
  <button class="btn-gray" onclick="yeniOdaToggle()">+ Yeni Oda Olu&#351;tur</button>
  <div id="yeniOdaPanel">
    <input id="odaIsimInput" placeholder="Oda ad&#305; (opsiyonel)" maxlength="30">
    <button class="btn-blue" onclick="odaOlustur()">Olu&#351;tur ve Bekle</button>
  </div>
</div>

<div class="panel" id="beklePanel">
  <h2>&#9203; Rakip Bekleniyor</h2>
  <p style="color:#a0aec0; font-size:0.9rem">Arkada&#351;&#305;na oda kodunu g&#246;nder:</p>
  <div class="oda-kodu"><span id="gosterilenKod">&mdash;</span></div>
  <div class="durum-mesaj" id="bekleMesaj">&#304;kinci oyuncu ba&#287;lanmad&#305; hen&#252;z...</div>
  <button class="btn-red btn-sm" onclick="lobiyeDon()">&larr; Lobiye D&#246;n</button>
</div>

<div class="panel" id="oyunPanel">
  <div class="skor-bar">
    <div class="skor-oyuncu" id="s1"><div class="isim">&mdash;</div><div class="puan">0</div></div>
    <div style="color:#4a5568; align-self:center; font-size:0.8rem">VS</div>
    <div class="skor-oyuncu" id="s2"><div class="isim">&mdash;</div><div class="puan">0</div></div>
  </div>
  <div class="durum-mesaj" id="oyunDurum">Se&#231;imini yap!</div>
  <div class="secimler">
    <button class="s-btn" id="bTas"   onclick="sec('tas')">&#x270A;</button>
    <button class="s-btn" id="bKagit" onclick="sec('kagit')">&#x270B;</button>
    <button class="s-btn" id="bMakas" onclick="sec('makas')">&#x270C;&#xFE0F;</button>
  </div>
  <div class="sonuc-kutu" id="sonucKutu">
    <div class="sonuc-baslik" id="sonucBaslik"></div>
    <div class="sonuc-detay" id="sonucDetay"></div>
  </div>
  <div class="oyun-alt">
    <button class="btn-red btn-sm" onclick="lobiyeDon()">&larr; Lobiye D&ouml;n</button>
  </div>
</div>

<script src="/socket.io/socket.io.js"></script>
<script>
const socket = io();
let benimId = null;
const emj = { tas:'✊', kagit:'✋', makas:'✌️' };
socket.on('connect', () => { benimId = socket.id; });
socket.on('lobiGuncelle', renderLobi);
function renderLobi(odalar) {
  const el = document.getElementById('odaListesi');
  if (!odalar || odalar.length === 0) {
    el.innerHTML = '<p class="bos-mesaj">Henüz açık oda yok. İlk sen oluştur!</p>';
    return;
  }
  el.innerHTML = odalar.map(o =>
    '<div class="oda-satir"><div class="oda-bilgi"><div class="oda-adi">'+esc(o.isim)+'</div><div class="oda-sahip">Kuran: '+esc(o.sahip)+'</div></div><button class="btn-gray btn-sm katil-btn" data-oda="'+esc(o.id)+'">Katıl &rarr;</button></div>'
  ).join('');
  el.querySelectorAll('.katil-btn').forEach(function(b){
    b.addEventListener('click', function(){ odaKatil(b.getAttribute('data-oda')); });
  });
}
function lobiYenile() { socket.emit('lobiIste'); }
function hata(msg) { document.getElementById('hataLobi').textContent = msg; }
function esc(s) { return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;'); }
function yeniOdaToggle() {
  const p = document.getElementById('yeniOdaPanel');
  p.style.display = p.style.display === 'block' ? 'none' : 'block';
}
function odaOlustur() {
  const ad = document.getElementById('adInput').value.trim();
  if (!ad) return hata('Lütfen adını gir.');
  const odaIsim = document.getElementById('odaIsimInput').value.trim() || (ad + "'in Odası");
  socket.emit('odaOlustur', { ad, odaIsim });
}
socket.on('odaOlusturuldu', ({ odaId }) => {
  document.getElementById('gosterilenKod').textContent = odaId;
  goster('beklePanel');
});
function odaKatil(odaId) {
  const ad = document.getElementById('adInput').value.trim();
  if (!ad) return hata('Lütfen önce adını gir.');
  socket.emit('odaKatil', { ad, odaId });
}
socket.on('hata', hata);
socket.on('oyunBasladi', ({ oyuncular }) => {
  document.querySelector('#s1 .isim').textContent = oyuncular[0];
  document.querySelector('#s2 .isim').textContent = oyuncular[1];
  document.querySelector('#s1 .puan').textContent = '0';
  document.querySelector('#s2 .puan').textContent = '0';
  document.getElementById('oyunDurum').textContent = 'Seçimini yap!';
  document.getElementById('sonucKutu').classList.remove('goster');
  secimAktif(true);
  goster('oyunPanel');
});
socket.on('durum', ({ mesaj }) => { document.getElementById('oyunDurum').textContent = mesaj; });
function sec(s) {
  secimAktif(false);
  document.getElementById('b'+s.charAt(0).toUpperCase()+s.slice(1)).classList.add('secildi');
  socket.emit('secim', { secim: s });
}
socket.on('turSonucu', ({ secimler, adlar, kazanan, skor }) => {
  const s1Isim = document.querySelector('#s1 .isim').textContent;
  const s2Isim = document.querySelector('#s2 .isim').textContent;
  for (const [id, ad] of Object.entries(adlar)) {
    if (ad === s1Isim) document.querySelector('#s1 .puan').textContent = skor[id];
    if (ad === s2Isim) document.querySelector('#s2 .puan').textContent = skor[id];
  }
  const diger = Object.keys(secimler).find(id => id !== benimId);
  const kutu = document.getElementById('sonucKutu');
  const baslik = document.getElementById('sonucBaslik');
  const detay = document.getElementById('sonucDetay');
  if (kazanan === null) { baslik.textContent = '🤝 Berabere!'; baslik.className = 'sonuc-baslik b'; }
  else if (kazanan === benimId) { baslik.textContent = '🎉 Kazandın!'; baslik.className = 'sonuc-baslik k'; }
  else { baslik.textContent = '😞 Kaybettin!'; baslik.className = 'sonuc-baslik k2'; }
  detay.textContent = 'Sen: '+emj[secimler[benimId]]+'  |  '+adlar[diger]+': '+emj[secimler[diger]];
  kutu.classList.add('goster');
  setTimeout(() => { kutu.classList.remove('goster'); secimAktif(true); document.getElementById('oyunDurum').textContent = 'Seçimini yap!'; }, 2200);
});
socket.on('oyuncuAyrildi', () => {
  document.getElementById('oyunDurum').textContent = '⚠️ Rakibin bağlantısı kesildi.';
  secimAktif(false);
  setTimeout(lobiyeDon, 2500);
});
function secimAktif(aktif) {
  ['bTas','bKagit','bMakas'].forEach(id => {
    const b = document.getElementById(id);
    b.disabled = !aktif;
    b.classList.remove('secildi');
  });
}
function lobiyeDon() {
  socket.emit('lobiyeDon');
  goster('lobiPanel');
  document.getElementById('yeniOdaPanel').style.display = 'none';
  document.getElementById('hataLobi').textContent = '';
}
function goster(panelId) {
  ['lobiPanel','beklePanel','oyunPanel'].forEach(id => {
    document.getElementById(id).style.display = id === panelId ? 'block' : 'none';
  });
}
</script>
</body>
</html>`;

app.get('/', (req, res) => {
  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  res.send(HTML);
});

io.on('connection', (socket) => {
  socket.emit('lobiGuncelle', lobiBilgisi());

  socket.on('odaOlustur', ({ ad, odaIsim }) => {
    const odaId = Math.random().toString(36).substr(2, 5).toUpperCase();
    odalar[odaId] = {
      isim: odaIsim || (ad + "'in Odasi"),
      oyuncular: [{ id: socket.id, ad, secim: null }],
      skor: { [socket.id]: 0 },
      durum: 'bekliyor'
    };
    socket.join(odaId);
    socket.odaId = odaId;
    socket.emit('odaOlusturuldu', { odaId });
    tumaTumaBildir();
  });

  socket.on('odaKatil', ({ ad, odaId }) => {
    const oda = odalar[odaId];
    if (!oda) return socket.emit('hata', 'Oda bulunamadi.');
    if (oda.durum !== 'bekliyor') return socket.emit('hata', 'Bu oda dolu veya oyun basladi.');
    oda.oyuncular.push({ id: socket.id, ad, secim: null });
    oda.skor[socket.id] = 0;
    oda.durum = 'oyunda';
    socket.join(odaId);
    socket.odaId = odaId;
    io.to(odaId).emit('oyunBasladi', { oyuncular: oda.oyuncular.map(o => o.ad) });
    tumaTumaBildir();
  });

  socket.on('secim', ({ secim }) => {
    const odaId = socket.odaId;
    const oda = odalar[odaId];
    if (!oda) return;
    const oyuncu = oda.oyuncular.find(o => o.id === socket.id);
    if (!oyuncu || oyuncu.secim) return;
    oyuncu.secim = secim;
    const hazir = oda.oyuncular.filter(o => o.secim);
    if (hazir.length < 2) { socket.emit('durum', { mesaj: 'Rakibin secim yapmasini bekle...' }); return; }
    const [p1, p2] = oda.oyuncular;
    const sonuc = hesapla(p1.secim, p2.secim);
    if (sonuc === 1) oda.skor[p1.id]++;
    else if (sonuc === 2) oda.skor[p2.id]++;
    io.to(odaId).emit('turSonucu', {
      secimler: { [p1.id]: p1.secim, [p2.id]: p2.secim },
      adlar: { [p1.id]: p1.ad, [p2.id]: p2.ad },
      kazanan: sonuc === 0 ? null : (sonuc === 1 ? p1.id : p2.id),
      skor: { [p1.id]: oda.skor[p1.id], [p2.id]: oda.skor[p2.id] }
    });
    p1.secim = null;
    p2.secim = null;
  });

  socket.on('lobiyeDon', () => {
    const odaId = socket.odaId;
    if (odaId && odalar[odaId]) {
      socket.leave(odaId);
      const oda = odalar[odaId];
      oda.oyuncular = oda.oyuncular.filter(o => o.id !== socket.id);
      delete oda.skor[socket.id];
      if (oda.oyuncular.length === 0) delete odalar[odaId];
      else { oda.durum = 'bekliyor'; io.to(odaId).emit('oyuncuAyrildi'); }
      tumaTumaBildir();
    }
    socket.odaId = null;
    socket.emit('lobiGuncelle', lobiBilgisi());
  });

  socket.on('disconnect', () => {
    const odaId = socket.odaId;
    if (!odaId || !odalar[odaId]) return;
    const oda = odalar[odaId];
    oda.oyuncular = oda.oyuncular.filter(o => o.id !== socket.id);
    delete oda.skor[socket.id];
    if (oda.oyuncular.length === 0) delete odalar[odaId];
    else { oda.durum = 'bekliyor'; io.to(odaId).emit('oyuncuAyrildi'); }
    tumaTumaBildir();
  });
});

function hesapla(a, b) {
  if (a === b) return 0;
  return { tas: 'makas', makas: 'kagit', kagit: 'tas' }[a] === b ? 1 : 2;
}

function baslat(port) {
  server.listen(port, '0.0.0.0', () => {
    const ip = getLocalIP();
    console.log('');
    console.log('=========================================');
    console.log('   TAS KAGIT MAKAS - Cok Oyunculu');
    console.log('=========================================');
    console.log('  Bu bilgisayarda: http://localhost:' + port);
    console.log('  Ayni Wi-Fi:      http://' + ip + ':' + port);
    console.log('  Kapat: CTRL+C');
    console.log('=========================================');
  });
}

server.on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    const yeni = err.port + 1;
    console.log('Port ' + err.port + ' mesgul, ' + yeni + ' deneniyor...');
    server.close();
    baslat(yeni);
  }
});

baslat(PORT);
