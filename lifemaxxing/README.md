# ⚔️ LifeMaxx — Kahramanın Yolculuğu

Bağımlılıkla savaş (NoFap odaklı), alışkanlık takibi ve kahramanlık temalı kişisel gelişim uygulaması.
**Tamamen offline çalışır** — tüm verilerin sadece kendi cihazında saklanır (localStorage). Sunucu yok, hesap yok, takip yok.

## 📱 Telefonda Kullanım

1. Bu klasörü herhangi bir statik hosting'e koy (GitHub Pages, Netlify, Vercel — hepsi ücretsiz) **veya** bilgisayarında `python3 -m http.server` ile aç.
2. Telefonun tarayıcısında siteyi aç.
3. **iPhone (Safari):** Paylaş → *Ana Ekrana Ekle*
   **Android (Chrome):** Menü → *Ana ekrana ekle / Uygulamayı yükle*
4. Artık ana ekranından tam ekran, uygulama gibi ve internetsiz çalışır (service worker sayesinde).

> Not: `file://` ile doğrudan açarsan uygulama çalışır ama service worker (offline kurulum) devreye girmez. En iyi deneyim için bir kere HTTPS üzerinden aç, sonrası tamamen offline.

## 🗡️ Özellikler

- **Asıl Savaşlar:** NoFap ve Ders Çalışma için gün + saat sayaçları (halka görselli).
- **Kriz Modu (🆘):** Dürtü geldiğinde tek dokunuş → nefes egzersizi, 5 dk dalga sayacı, enerji dönüştürme alternatifleri (spor, dans, AI projesi, içerik üretimi, soğuk duş) ve **şema notu** (tetikleyici → düşünce → duygu → eylem) ile desen takibi.
- **Rozet Serileri:** Chad, Crusader, Viking, Ottoman — NoFap gün sayına göre profil resmin yükselir (0/1/3/7/15/30/45/60/120 gün eşikleri).
- **Görevler:** 7 kategori, sürükle-bırak sıralama, ⭐ ile en önemli 5 "Ana Görev".
- **Devamlılık yükü yok:** "Serbest" görevler asla borç oluşturmaz — hazır olunca yapılır, sadece son yapılış tarihi görünür. Haftalık/aylık görevler sadece dönem hedefini sayar.
- **Savaş Günlüğü:** Günlük yazıları + kriz şema notları arşivi (yazınca "Günlük yazmak" görevi otomatik tiklenir).
- **Lonca:** Kişisel challenge'lar (örn. "30 gün NoFap"). Online sohbet odaları ve arkadaş challenge'ları gelecek sürümde.
- **Widget Modu:** Herhangi bir sayacı tam ekran sade görünümde aç.
- **Anonim profil**, başarımlar, istatistikler, JSON yedek alma/yükleme.

## 🏗️ Teknik

| Dosya | Görev |
|---|---|
| `index.html` | Tüm sayfalar ve modallar |
| `style.css` | Kahramanlık teması (koyu + altın) |
| `app.js` | Tüm mantık, veri modeli, render |
| `sw.js` | Offline cache (service worker) |
| `manifest.json` | PWA kurulum tanımı |

Framework yok, bağımlılık yok, derleme yok — dosyaları aç ve çalışır.

## 🚀 App Store Yolu (ileride)

PWA olduğu için native'e taşımak kolay:
1. **Capacitor** (önerilen): `npx cap init` → bu klasörü web dizini yap → iOS/Android projeleri üretir. Gerçek ana ekran widget'ları (WidgetKit) bu aşamada eklenir.
2. Veriler `localStorage`'da olduğundan Capacitor'a geçişte otomatik taşınır.
3. Online özellikler (lonca odaları, arkadaş challenge'ları) için ileride küçük bir backend (örn. Supabase/Firebase) eklenebilir — mevcut yapı buna hazır.
