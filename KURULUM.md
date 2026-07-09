# 📱 LifeMaxx'i Telefona Kurma — Basit Adımlar

Uygulaman tamamen offline çalışır; kurulum için sadece **bir kere** internetten açman gerekir.
Verilerin hiçbir zaman internete gitmez — hepsi telefonunda kalır.

## Adım 1: Uygulamayı bir adrese koy (5 dakika, bir kere)

En kolay yol — **Netlify Drop** (ücretsiz, hesap bile şart değil):

1. Bilgisayarında `lifemaxxing` klasörünü indir (GitHub → Code → Download ZIP → içinden `lifemaxxing` klasörü).
2. Tarayıcıda **app.netlify.com/drop** adresine git.
3. `lifemaxxing` klasörünü sayfaya **sürükleyip bırak**.
4. Sana `https://sakin-kartal-123abc.netlify.app` gibi rastgele bir adres verir. **Bu adresi kimseyle paylaşmazsan kimse bulamaz** — arama motorlarında listelenmez.

> Alternatif: GitHub Pages da olur ama repo'nun public olması gerekir. Gizlilik istediğin için Netlify'ın rastgele adresi daha uygun.

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
