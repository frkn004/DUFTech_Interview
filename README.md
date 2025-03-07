# DUFTech Web Sitesi

## 💻 Yapay Zeka Danışmanlık ve Çözümleri Kurumsal Web Sitesi

![DUFTech](https://via.placeholder.com/800x400?text=DUFTech+Web+Sitesi)

DUFTech kurumsal web sitesi, yapay zeka danışmanlık ve çözümleri sunan firmamızın hizmetlerini, projelerini ve uzmanlık alanlarını tanıtan modern ve responsive bir web sitesidir. Tek sayfalık (one-page) tasarımıyla ziyaretçilere sezgisel bir kullanıcı deneyimi sunar.

## 🌟 Özellikler

- **Modern Tasarım**: Çağdaş, temiz ve profesyonel görünüm
- **Tek Sayfa Yapısı**: Tüm içeriğe kolay erişim imkanı
- **Tamamen Responsive**: Mobil, tablet ve masaüstü uyumlu
- **AI Odaklı İçerik**: Yapay zeka hizmetleri ve çözümleri
- **Çözüm Detayları**: Sunulan hizmetlerin detaylı açıklamaları
- **Proje Vitrini**: Gerçekleştirilen projelerin sunumu
- **İletişim Formu**: Potansiyel müşteriler için iletişim imkanı
- **Animasyonlar**: Modern ve çekici kullanıcı deneyimi için özel animasyonlar



## 🚀 Kurulum

### Gereksinimler

- Web sunucusu (Apache, Nginx vb.)
- PHP 7.4 veya üzeri (iletişim formu için)
- Modern web tarayıcısı

### Adım 1: Dosyaları Sunucuya Yükleme

1. Bu projedeki tüm dosyaları web sunucunuzun kök dizinine yükleyin.
2. Dosya yapısını koruyun:
   - `css/` - Stil dosyaları
   - `js/` - JavaScript dosyaları
   - `images/` - Görseller (yüklenmesi gerekir)
   - Diğer tüm HTML ve PHP dosyaları

### Adım 2: İletişim Formu Ayarları

1. `iletisim.php` dosyasını açın
2. E-posta adresini düzenleyin:
   ```php
   $to = 'info@duftech.com'; // Alıcı e-posta adresinizi buraya yazın
   ```
3. E-posta şablonundaki logo ve sosyal medya linkleri gibi detayları güncelleyin

### Adım 3: Görselleri Hazırlama

1. `images/` klasörü oluşturun (yoksa)
2. Aşağıdaki alt klasörleri oluşturun:
   - `images/projects/` - Proje görselleri için
   - `images/partners/` - Referans firma logoları için
   - `images/social/` - Sosyal medya ikonları için

### Adım 4: Test Etme

1. Web sitenizi tarayıcıda açın (`http://sizinsiteniz.com`)
2. Tüm sayfaların ve özelliklerin düzgün çalıştığından emin olun
3. İletişim formunu test edin
4. Farklı cihazlarda responsive tasarımı kontrol edin

## 📊 Kullanım Kılavuzu

### Görsellerin Değiştirilmesi

- **Logo**: `duftech-interlocked-3d.svg` ve `duftech-logo-final.svg` dosyalarını kendi logonuzla değiştirin
- **Proje Görselleri**: `images/projects/` klasöründeki görselleri değiştirin (project1.jpg - project10.jpg)
- **Referans Logoları**: `images/partners/` klasöründeki logoları kendi referanslarınızla değiştirin

### İçerik Güncelleme

- `index.html` dosyasını düzenleyerek site içeriğini güncelleyebilirsiniz
- Hizmetler, projeler ve diğer bilgiler bu dosya içerisindedir
- Yeni bölümler eklemek istiyorsanız, CSS stillerini de güncellemeyi unutmayın

### Stil Ayarları

- `css/style.css` dosyasındaki `:root` seçicisinde tanımlanan değişkenleri düzenleyerek sitenin renk şemasını ve genel görünümünü değiştirebilirsiniz:
  ```css
  :root {
    --primary-color: #8a2be2; /* Ana renk (Lila) */
    --secondary-color: #00e5ff; /* İkincil renk (Turkuaz) */
    /* Diğer değişkenler... */
  }
  ```

### İletişim Formu

- `iletisim.php` dosyasındaki e-posta adreslerini ve şablonları güncelleyin
- Otomatik yanıt mesajını kendi ihtiyaçlarınıza göre düzenleyin
- Veritabanı bağlantısı için yorum satırlarını kaldırın ve gerekli veritabanı bilgilerini girin

## 📁 Proje Yapısı

```
duftech-website/
│
├── index.html              # Ana sayfa
├── 404.html                # 404 hata sayfası
├── 500.html                # 500 hata sayfası
├── iletisim.php            # İletişim formu işleme
├── robots.txt              # Arama motoru indexleme ayarları
├── sitemap.xml             # Site haritası
├── README.md               # Proje dökümantasyonu
│
├── css/                    # Stil dosyaları
│   └── style.css           # Ana stil dosyası
│
├── js/                     # JavaScript dosyaları
│   ├── main.js             # Ana JavaScript dosyası
│   ├── main.js.backup      # Yedek dosya
│   └── main.js.bak         # Yedek dosya
│
├── images/                 # Görseller (oluşturulması gerekir)
│   ├── projects/           # Proje görselleri
│   │   ├── project1.jpg
│   │   ├── project2.jpg
│   │   └── ...
│   │
│   ├── partners/           # Referans logoları
│   │   ├── ostim.png
│   │   ├── maren.png
│   │   └── ...
│   │
│   └── social/             # Sosyal medya ikonları
│       ├── facebook.png
│       ├── twitter.png
│       └── ...
│
└── duftech-interlocked-3d.svg  # Logo dosyası
    duftech-logo-final.svg      # Alternatif logo
```

## 🛠️ Teknik Detaylar

DUFTech web sitesi aşağıdaki teknolojileri kullanmaktadır:

- **HTML5**: Modern web yapısı
- **CSS3**: Gelişmiş stillendirme özellikleri
- **JavaScript**: İnteraktif UI elementleri ve animasyonlar
- **PHP**: İletişim formu işleme
- **SVG**: Vektörel logolar ve grafikler
- **Responsive Design**: Farklı ekran boyutlarına uyum
- **Font Awesome**: İkon setleri

## 🧩 Önemli Özellikler

### Responsive Tasarım

- Mobil öncelikli yaklaşım
- Bootstrap benzeri grid sistemi
- Mobil menü ve navigasyon
- Esnek medya ve görseller

### Proje Gösterimi

- İnteraktif proje slider'ı
- Proje detay modalları
- Otomatik kaydırma
- Proje kategorileri

### Hizmet Bölümleri

- Detaylı çözüm açıklamaları
- İnteraktif kartlar
- Detay görüntüleme seçenekleri

### İletişim Formu

- Form doğrulama
- SMTP e-posta gönderimi
- Otomatik yanıt sistemi
- Danışmanlık görüşmesi planlama

## 🔮 Planlanan Özellikler

- Blog bölümü
- Çoklu dil desteği
- Karanlık tema desteği
- SEO optimizasyonları
- Gerçek zamanlı chat desteği
- Case study sayfaları
- Yapay zeka demolarının entegrasyonu

## 🤝 Katkıda Bulunma

Projeye katkıda bulunmak isterseniz:

1. Bu depoyu fork edin
2. Yeni bir feature branch oluşturun (`git checkout -b feature/amazing-feature`)
3. Değişikliklerinizi commit edin (`git commit -m 'Add some amazing feature'`)
4. Branch'inizi push edin (`git push origin feature/amazing-feature`)
5. Pull request oluşturun

## 🐛 Sorun Bildirme

Bir hata bulduysanız veya bir öneriniz varsa, lütfen bir issue açın veya doğrudan iletişime geçin.

## 📄 Lisans

Bu proje MIT lisansı altında lisanslanmıştır. Detaylı bilgi için LICENSE dosyasına bakınız.

## 📞 İletişim

Sorularınız veya önerileriniz için [info@duftech.com](mailto:info@duftech.com) adresine e-posta gönderebilirsiniz.

---

Made with ❤️ by DUFTech Team
