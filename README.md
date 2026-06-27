# Rock-Paper-Scissors-with-Wifi

Aynı Wi-Fi ağındaki kişilerin tarayıcıdan bağlanıp birlikte oynayabildiği çok oyunculu **Taş Kağıt Makas** oyunu. Node.js + Socket.io ile gerçek zamanlı.

## Özellikler

- 🎮 Gerçek zamanlı çok oyunculu (Socket.io)
- 🏠 Oda oluşturma / odaya katılma
- 📋 Ağdaki açık odaların canlı lobi listesi
- 🔢 Tur tur skor takibi
- 📦 Tek `.exe` dosyası — kurulum gerektirmez

## Kullanım (Geliştirici)

```bash
npm install
npm start
```

Sunucu başlayınca konsolda iki adres görünür:

```
Bu bilgisayarda: http://localhost:3000
Ayni Wi-Fi:      http://<senin-ip>:3000
```

## Kullanım (Tek exe)

```bash
npm run build
```

`dist/TasKagitMakas.exe` oluşur. Bu dosyaya çift tıkla — açılan siyah pencerede adres yazar. Aynı Wi-Fi'daki herkes o adresi tarayıcıda açıp oynayabilir.

> **Not:** Windows Güvenlik Duvarı ilk çalıştırmada izin isteyebilir → "Erişime izin ver" demelisin, yoksa başka cihazlar bağlanamaz. Sunucu penceresi açık kaldığı sürece oyun erişilebilirdir.

## Nasıl Oynanır

1. Adını gir
2. **Yeni Oda Oluştur** → oda kodun lobide görünür
3. İkinci oyuncu listeden **Katıl** der
4. ✊ ✋ ✌️ seç, skor otomatik tutulur

## Teknolojiler

- Node.js
- Express
- Socket.io
- pkg (exe paketleme)
