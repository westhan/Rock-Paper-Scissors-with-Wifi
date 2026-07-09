# 📱 LifeMaxx'i Telefona Kurma — Basit Adımlar

Uygulaman tamamen offline çalışır; kurulum için sadece **bir kere** internetten açman gerekir.
Verilerin hiçbir zaman internete gitmez — hepsi telefonunda kalır.

## Adım 1 (EN KOLAY): GitHub Pages — tek tık kaldı

Uygulama `gh-pages` dalına otomatik yayınlanıyor. Tek yapman gereken (bir kere):

1. Şu adresi aç: **github.com/westhan/Rock-Paper-Scissors-with-Wifi/settings/pages**
2. "Build and deployment" → Source: **Deploy from a branch** → Branch: **gh-pages** → **Save**.
3. 1-2 dakika sonra uygulaman şurada canlı olur:
   **https://westhan.github.io/Rock-Paper-Scissors-with-Wifi/**
4. Bu adresi telefonda Safari ile aç → Adım 2'ye geç.

Bundan sonrası otomatik: her güncelleme push'unda site kendini yeniler.

## Adım 1 (Alternatif): Netlify Drop

1. `LifeMaxx.zip` dosyasını indir (Claude'un gönderdiği dosya veya GitHub → Code → Download ZIP).
2. Tarayıcıda **app.netlify.com/drop** adresine git, ZIP'i sayfaya **sürükleyip bırak**.
3. Sana `https://sakin-kartal-123abc.netlify.app` gibi rastgele bir adres verir — arama motorlarında listelenmez.

## Adım 2: Telefonda ana ekrana ekle (1 dakika)

**iPhone:**
1. **Safari** ile o adresi aç (Chrome değil, Safari olmalı).
2. Alttaki **Paylaş** düğmesine bas (kare + yukarı ok).
3. **"Ana Ekrana Ekle"** seçeneğine bas → **Ekle**.

**Android:**
1. **Chrome** ile adresi aç.
2. Sağ üst **⋮** menü → **"Ana ekrana ekle"** (veya "Uygulamayı yükle").

## Adım 3: Bitti! 🎉

- Ana ekranında altın kılıçlı LifeMaxx simgesi belirir.
- Artık **internetsiz** çalışır, tam ekran açılır — normal uygulamadan farksız.
- Verilerin sadece telefonunda. Yedeklemek istersen: Profil → **Yedek Al**.

## Sık Sorulanlar

**Ekran süresi otomatik çekilir mi?**
Hayır — Apple, Ekran Süresi verisini hiçbir uygulamaya (web veya App Store) dışa aktarmaz; bu bir güvenlik politikası. App Store sürümünde bile ancak uygulama *içinde gösterim* (DeviceActivityReport) mümkündür, veriyi okuyup kaydetmek yasaktır. Bu yüzden uygulamada 10 saniyelik hızlı giriş var: Ayarlar → Ekran Süresi'ndeki sayıyı yaz, hedefin altındaysa görev otomatik ✅ olur.

**Telefonu değiştirirsem verilerim?**
Profil → Yedek Al (JSON dosyası indirir) → yeni telefonda Yedek Yükle.

**Gerçek ana ekran widget'ı?**
Web uygulamaları iOS/Android widget'ı ekleyemez. Şimdilik uygulama içindeki 🧷 Widget modu var (tam ekran sayaç). Gerçek widget, App Store sürümünde (Capacitor + WidgetKit) gelecek.

**GitHub'daki kod gizli mi?**
Repo'yu gizlemek istersen: GitHub'da repo sayfası → Settings → en altta "Change repository visibility" → **Private**. Uygulama bundan etkilenmez.
