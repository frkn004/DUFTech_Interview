document.addEventListener('DOMContentLoaded', function() {
  // DOM elementlerini seçme
  const body = document.body;
  const header = document.querySelector('header');
  const mobileMenuToggle = document.querySelector('.menu-toggle');
  const mobileMenu = document.querySelector('.mobile-menu');
  const closeMenu = document.querySelector('.close-menu');
  const navLinks = document.querySelectorAll('.nav-links a');
  const scrollTop = document.querySelector('.scroll-top');
  const solutionCards = document.querySelectorAll('.solution-card');
  const projectCards = document.querySelectorAll('.project-card');
  const partnerLogos = document.querySelectorAll('.partner-logo');
  const statisticsSection = document.getElementById('about');
  const statNumbers = document.querySelectorAll('.stat-number');
  const contactForm = document.getElementById('contact-form');
  const modal = document.getElementById('project-detail-modal');
  const closeModal = document.querySelector('.close-modal');
  
  // Sayfanın en üstte başlamasını sağla
  window.onbeforeunload = function() {
    window.scrollTo(0, 0);
  };
  
  // Sayfa yüklendiğinde en üstte başla
  window.scrollTo(0, 0);
  
  // Otomatik kaydırma için değişken
  let autoSlideInterval;
  let projectSlideDirection = 'next';
  
  // Sayfa yükleme animasyonu
  const createPageLoader = () => {
    const loader = document.createElement('div');
    loader.className = 'page-loader';
    loader.innerHTML = `<object type="image/svg+xml" data="duftech-interlocked-3d.svg" class="loader-logo"></object>`;
    document.body.appendChild(loader);
    
    setTimeout(() => {
      loader.classList.add('loader-hidden');
      setTimeout(() => {
        loader.remove();
      }, 500);
    }, 1500);
  };
  
  // Kaydırma göstergesi oluşturma
  const createScrollIndicator = () => {
    const indicator = document.createElement('div');
    indicator.className = 'scroll-indicator';
    document.body.appendChild(indicator);
    
    window.addEventListener('scroll', () => {
      const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrollPercent = (scrollTop / scrollHeight) * 100;
      indicator.style.width = scrollPercent + '%';
    });
  };
  
  // Sayfa yükleme animasyonu ve kaydırma göstergesi başlat
  createPageLoader();
  createScrollIndicator();
  
  // Otomatik kaydırma işlevini başlat
  function startAutoSlide() {
    const slider = document.querySelector('.projects-slider');
    if (!slider) return;
    
    autoSlideInterval = setInterval(() => {
      const projectWidth = document.querySelector('.project-card').offsetWidth + 30;
      const currentScroll = slider.scrollLeft;
      const maxScroll = slider.scrollWidth - slider.clientWidth;
      
      if (currentScroll >= maxScroll - 10 && projectSlideDirection === 'next') {
        // Son projeye ulaşıldığında başa dön, ancak animasyonu devam ettir
        // Önce görünmeyen bir konuma kaydır, sonra smooth olmadan başa dön
        slider.style.scrollBehavior = 'auto';
        slider.scrollLeft = 0;
        setTimeout(() => {
          slider.style.scrollBehavior = 'smooth';
        }, 50);
      } else if (currentScroll <= 10 && projectSlideDirection === 'prev') {
        // İlk projeye ulaşıldığında sona geç
        slider.style.scrollBehavior = 'auto';
        slider.scrollLeft = maxScroll;
        setTimeout(() => {
          slider.style.scrollBehavior = 'smooth';
        }, 50);
      } else {
        // Normal kaydırma
        slider.scrollTo({
          left: projectSlideDirection === 'next' ? currentScroll + projectWidth : currentScroll - projectWidth,
          behavior: 'smooth'
        });
      }
    }, 2000); // 2 saniyede bir otomatik kaydır
  }
  
  // Projeler arası geçiş için navigasyon fonksiyonu
  window.navigateProjects = function(direction) {
    const slider = document.querySelector('.projects-slider');
    if (!slider) return;
    
    const projectWidth = document.querySelector('.project-card').offsetWidth + 30; // Kart genişliği + margin
    const currentScroll = slider.scrollLeft;
    
    // Kaydırma yönünü belirle ve otomatik kaydırma için yönü güncelle
    projectSlideDirection = direction;
    
    if (direction === 'next') {
      slider.scrollTo({
        left: currentScroll + projectWidth * 2,
        behavior: 'smooth'
      });
    } else {
      slider.scrollTo({
        left: currentScroll - projectWidth * 2,
        behavior: 'smooth'
      });
    }
    
    // Otomatik kaydırmayı durdur ve 5 saniye sonra yeniden başlat
    if (autoSlideInterval) {
      clearInterval(autoSlideInterval);
      setTimeout(startAutoSlide, 5000);
    }
  };
  
  // Proje detaylarını gösterme - Safari için optimize edilmiş
  window.showProjectDetail = function(projectId, event) {
    // Sayfanın yeniden yüklenmesini engelle
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }
    
    const projectData = getProjectData(projectId);
    if (!projectData) {
      console.error('Proje bulunamadı: ' + projectId);
      return;
    }
    
    const modal = document.getElementById('project-detail-modal');
    const content = document.getElementById('project-detail-content');
    
    if (!modal || !content) {
      console.error('Modal veya içerik elementi bulunamadı');
      return;
    }
    
    // Modal içeriğini oluştur - Safari uyumlu
    content.innerHTML = `
      <div class="project-detail-header">
        <h2>${projectData.title}</h2>
      </div>
      <div class="project-detail-info">
        <div class="project-detail-image">
          <img src="${projectData.image}" alt="${projectData.title}" onerror="this.src='duftech-logo-final.svg'; this.style.padding='20px'; this.style.background='white'; this.style.borderRadius='10px';">
        </div>
        <div class="project-detail-content">
          <div class="project-detail-description">
            <p>${projectData.description}</p>
          </div>
          <div class="project-detail-features">
            <h4>Kullanılan Teknolojiler</h4>
            <ul>
              ${projectData.technologies.map(tech => `<li>${tech}</li>`).join('')}
            </ul>
          </div>
          <div class="project-detail-results">
            <h4>Sonuçlar</h4>
            <div class="results-grid">
              ${projectData.results.map(result => `
                <div class="result-item">
                  <div class="result-number">${result.number}</div>
                  <div class="result-text">${result.text}</div>
                </div>
              `).join('')}
            </div>
          </div>
        </div>
      </div>
    `;
    
    // Modalı göster - Safari için optimize edilmiş
    modal.style.display = 'block';
    
    // iOS için scroll düzeltme
    const scrollY = window.scrollY;
    document.body.style.position = 'fixed';
    document.body.style.width = '100%';
    document.body.style.top = `-${scrollY}px`;
    document.body.dataset.scrollY = scrollY;
    
    console.log('Proje detayı gösteriliyor: ' + projectId);
  };

  // Modal kapatma işlevi - Safari için optimize edilmiş
  const closeAllModals = function() {
    const modals = document.querySelectorAll('.project-modal');
    
    modals.forEach(modal => {
      modal.style.display = 'none';
    });
    
    // iOS için scroll düzeltme geri alma
    if (document.body.style.position === 'fixed') {
      const scrollY = parseInt(document.body.dataset.scrollY || 0);
      document.body.style.position = '';
      document.body.style.width = '';
      document.body.style.top = '';
      window.scrollTo(0, scrollY);
    }
  };

  // Tüm modal kapatma düğmelerine olay dinleyicisi ekle
  const closeModalButtons = document.querySelectorAll('.close-modal');
  closeModalButtons.forEach(button => {
    button.addEventListener('click', closeAllModals);
  });

  // Modal dışına tıklayarak kapatma
  const modals = document.querySelectorAll('.project-modal');
  modals.forEach(modal => {
    modal.addEventListener('click', function(e) {
      if (e.target === this) {
        closeAllModals();
      }
    });
  });

  // ESC tuşu ile modaı kapatma
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
      closeAllModals();
    }
  });

  // Proje kartları için olay dinleyicisi - Safari uyumlu
  document.querySelectorAll('.project-link').forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      e.stopPropagation();
      
      const projectId = this.getAttribute('data-project-id');
      if (projectId) {
        window.showProjectDetail(projectId, e);
      }
    });
  });

  // Proje verileri
  function getProjectData(projectId) {
    // Proje verileri
    const projectsData = {
      'project1': {
        title: 'OSTİMOSB Gelir Tahmin Algoritması',
        image: 'images/projects/project1.jpg',
        description: 'OSTİMOSB için geliştirdiğimiz gelir tahmin algoritması, eldeki verilere dayanarak ileriye dönük gelir tahminleri yapıyor. Makine öğrenmesi ve AI teknolojilerimizle tahmin doğruluk oranını %96\'ya çıkardık. Müşterimiz 5 yıllık projeksiyon içerisinde gelirlerini optimize etme fırsatı yakaladı.',
        technologies: ['Tensorflow', 'Python', 'AI/ML', 'Yapay Sinir Ağları', 'Zaman Serisi Analizi'],
        results: [
          { number: '%96', text: 'Tahmin Doğruluk Oranı' },
          { number: '12', text: 'Analiz Edilen Veri Kaynağı' },
          { number: '%38', text: 'Gelir Optimizasyonu' }
        ]
      },
      'project2': {
        title: '102 Milyon Veri Analizi ve Tahminleme',
        image: 'images/projects/project2.jpg',
        description: '102 milyon veriyi analiz ederek, büyük veri işleme ve makine öğrenmesi ile tahminleme algoritması geliştirdik. Dağıtık sistemler üzerinde çalışan algoritmalarımız sayesinde, finansal hizmetler sektöründeki müşterimize gerçek zamanlı iş zekası raporları sunuyoruz.',
        technologies: ['Hadoop', 'Spark', 'BigData', 'Dağıtık Hesaplama', 'Python', 'AI/ML'],
        results: [
          { number: '102M+', text: 'İşlenen Veri Hacmi' },
          { number: '%92', text: 'Tahmin Doğruluğu' },
          { number: '%75', text: 'İşlem Hızı Artışı' }
        ]
      },
      'project3': {
        title: 'Fabrika Güvenlik Ekipmanı Tespit Sistemi',
        image: 'images/projects/project3.jpg',
        description: 'Fabrikadaki çalışanların kask ve yelek takıp takmadığını tespit eden görüntü işleme tabanlı sistem geliştirdik. 20.000 veri ile eğitilen modellerimiz, iş güvenliğini artırarak kaza risklerini %65 azalttı. Sistem 7/24 çalışarak anlık uyarılar üretiyor.',
        technologies: ['OpenCV', 'YOLO', 'Derin Öğrenme', 'Bilgisayarlı Görü', 'Nesne Tespiti', 'Edge Computing'],
        results: [
          { number: '%65', text: 'Kaza Riski Azalması' },
          { number: '20B+', text: 'Eğitim Veri Seti' },
          { number: '%98', text: 'Tespit Doğruluğu' }
        ]
      },
      'project4': {
        title: 'AIVA Toplantı Analiz Asistanı',
        image: 'images/projects/project4.jpg',
        description: 'AIVA ile toplantılara yerleştirilen ses algılayıcılar konuşmaları analiz ederek gerekli çıkarımları yapar ve özetler oluşturur. NLP teknolojileri kullanarak geliştirdiğimiz bu sistem, toplantı notlarını ilgili kişilere otomatik olarak dağıtarak verimlilik artışı sağlar.',
        technologies: ['Doğal Dil İşleme', 'Ses Tanıma', 'AI', 'Konuşma Analizi', 'Otomatik Not Alma'],
        results: [
          { number: '%45', text: 'Verimlilik Artışı' },
          { number: '%94', text: 'Özet Doğruluğu' },
          { number: '2.5 saat', text: 'Haftalık Kazanılan Zaman' }
        ]
      },
      'project5': {
        title: 'AI İK Uzmanı ve Mülakat Sistemi',
        image: 'images/projects/project5.jpg',
        description: 'CV analizini AI ile gerçekleştiren, adaya özel sorular oluşturan ve video mülakat yapan sistem geliştirdik. Yapay zeka destekli İK çözümümüz, adayın bilgilerine göre kapsamlı analizler yaparak yöneticiye detaylı raporlar sunuyor ve işe alım sürecini optimize ediyor.',
        technologies: ['Derin Öğrenme', 'NLP', 'Video Analizi', 'Duygu Analizi', 'CV Tarama Otomasyonu'],
        results: [
          { number: '%70', text: 'İşe Alım Süresi Azalması' },
          { number: '%62', text: 'Maliyet Tasarrufu' },
          { number: '%88', text: 'İşe Alım Doğruluğu' }
        ]
      },
      'project6': {
        title: 'FASTY Su Üstü Tespit Sistemi',
        image: 'images/projects/project6.jpg',
        description: 'FASTY su üstü kurtarma botuna entegre ettiğimiz kamera sistemi, yapay zeka ile su üstündeki kişi ve nesnelerin tespitini gerçek zamanlı yaparak acil durumlarda bildirim gönderiyor, böylece can kurtarma operasyonları daha hızlı ve etkili hale geliyor.',
        technologies: ['Bilgisayarlı Görü', 'Gerçek Zamanlı Analiz', 'Derin Öğrenme', 'Nesne Tespiti', 'Akıllı Alarm Sistemi'],
        results: [
          { number: '%82', text: 'Hızlı Tespit Oranı' },
          { number: '8 sn', text: 'Ortalama Tespit Süresi' },
          { number: '%95', text: 'Zorlu Hava Koşullarında Başarı' }
        ]
      },
      'project7': {
        title: 'AI Destekli ERP Yazılımı',
        image: 'images/projects/project7.jpg',
        description: 'Yapay zeka ile güçlendirilmiş ERP yazılımımız, işletmelerin tüm süreçlerini otomatikleştirerek verimliliği artırır. Geliştirdiğimiz sistem, ileri analitik yetenekleri sayesinde iş süreçlerindeki darboğazları tespit eder ve iyileştirme önerileri sunar.',
        technologies: ['Makine Öğrenmesi', 'Veri Analizi', 'Süreç Optimizasyonu', 'Yazılım Geliştirme', 'İş Zekası'],
        results: [
          { number: '%43', text: 'Süreç Verimliliği' },
          { number: '%35', text: 'Operasyonel Maliyet Düşüşü' },
          { number: '%67', text: 'İş Gücü Tasarrufu' }
        ]
      },
      'project8': {
        title: 'Financial Dashboard',
        image: 'images/projects/project8.jpg',
        description: 'Kullanıcıya özel geliştirilen finansal dashboard, gelir-gider takibi, döviz bilgileri, yatırım portföyü ve nakit akışı projeksiyonları gibi kritik finansal verileri gerçek zamanlı olarak sunar. Yapay zeka destekli tahminleme algoritması ile gelecek dönem finansal öngörüleri yüksek doğrulukla sağlar.',
        technologies: ['Veri Analizi', 'Fintech', 'Dashboard Tasarımı', 'Makine Öğrenmesi', 'Finansal Projeksiyonlar'],
        results: [
          { number: '%92', text: 'Tahmin Doğruluğu' },
          { number: '15+', text: 'Finansal Veri Kaynağı' },
          { number: '%54', text: 'Finansal Planlama İyileştirmesi' }
        ]
      },
      'project9': {
        title: 'Çimento Firması AI Chatbot',
        image: 'images/projects/project9.jpg',
        description: 'Çimento sektöründe faaliyet gösteren firma için müşteri hizmetleri ve teknik destek süreçlerini otomatikleştiren yapay zeka destekli chatbot geliştirdik. Sistem ürün bilgisi, sipariş takibi ve teknik sorunlar konusunda yüksek doğrulukla yanıt vererek müşteri memnuniyetini artırıyor.',
        technologies: ['NLP', 'Chatbot', 'Yapay Zeka', 'Derin Öğrenme', 'Makine Öğrenmesi', 'Konuşma Arayüzleri'],
        results: [
          { number: '%92', text: 'Yanıt Doğruluğu' },
          { number: '%78', text: 'Müşteri Memnuniyeti Artışı' },
          { number: '%60', text: 'Destek Maliyeti Azalması' }
        ]
      },
      'project10': {
        title: 'Otomatik İçerik Oluşturma ve Sosyal Medya Otomasyonu',
        image: 'images/projects/project10.jpg',
        description: 'Şirketler için yapay zeka tabanlı içerik oluşturma ve sosyal medya yönetim sistemi geliştirdik. Platform, otomatik LinkedIn ve diğer sosyal medya paylaşımları, özelleştirilmiş e-mail kampanyaları, ve kişiselleştirilmiş içerik üretimi sağlayarak pazarlama ekiplerinin verimliliğini artırdı.',
        technologies: ['NLP', 'İçerik Oluşturma', 'Sosyal Medya API', 'GPT Modelleri', 'Makine Öğrenmesi', 'Automatik Pazarlama'],
        results: [
          { number: '%78', text: 'Pazarlama Verimliliği Artışı' },
          { number: '%65', text: 'İçerik Üretim Süresi Azalması' },
          { number: '3.5x', text: 'Etkileşim Oranı Artışı' }
        ]
      },
    };
    
    // Devam eden proje verileri
    const ongoingProjectsData = {
      'ongoing-pool': {
        title: 'Havuz Güvenlik Sistemi',
        image: 'images/projects/ongoing-pool.jpg',
        description: 'Havuzlardaki kişilerin düşme ve boğulma tespitini yapan yapay zeka destekli güvenlik sistemi geliştiriyoruz. Sistem, sürekli olarak havuz yüzeyini ve altını izleyerek olağandışı hareketleri tespit ediyor ve tehlike anında anında otomatik bildirim göndererek acil müdahale imkanı sağlıyor. Bu proje, özellikle otel ve kamu havuzlarındaki can güvenliğini artırmayı hedefliyor.',
        technologies: ['Bilgisayarlı Görü', 'Gerçek Zamanlı Analiz', 'Derin Öğrenme', 'Nesne Tespiti', 'Hareket Analizi', 'Su Altı Kamera Sistemleri'],
        results: [
          { number: '%60', text: 'Tamamlanma Oranı' },
          { number: '4 sn', text: 'Tespit Süresi' },
          { number: '%98', text: 'Test Doğruluğu' }
        ]
      },
      'ongoing-call': {
        title: 'AI Call Center',
        image: 'images/projects/ongoing-call.jpg',
        description: 'Gelen aramaları otomatik açan, doğal dilde konuşan ve gerektiğinde arama yapan tamamen otomatik çağrı merkezi çözümü geliştiriyoruz. Kullanıcılar özel bir dashboard üzerinden taleplerini yazabilir ve sistem otomatik olarak gerekli yerleri arayarak randevu oluşturma, bilgi alma ve sorun çözme gibi işlemleri yapay zeka teknolojisi ile gerçekleştirir. Bu sistem, işletmelerin personel maliyetlerini düşürürken müşteri memnuniyetini artırmayı hedefliyor.',
        technologies: ['Doğal Dil İşleme', 'Ses Tanıma', 'Konuşma Sentezi', 'Otomatik Randevu', 'Ses Analizi', 'Duygu Analizi'],
        results: [
          { number: '%75', text: 'Tamamlanma Oranı' },
          { number: '%70', text: 'Maliyet Azalması' },
          { number: '24/7', text: 'Çalışma Süresi' }
        ]
      }
    };
    
    // Proje ID'sine göre veri döndür
    if (projectId.startsWith('ongoing-')) {
      return ongoingProjectsData[projectId];
    }
    
    return projectsData[projectId];
  }

  // Sayfa yüklendiğinde çağrılan başlangıç fonksiyonları
  setTimeout(() => {
    // Otomatik kaydırmayı başlat
    startAutoSlide();
    
    // Proje slider'ına mouse ile gelindiğinde otomatik kaydırmayı durdur
    const projectsSlider = document.querySelector('.projects-slider');
    if (projectsSlider) {
      projectsSlider.addEventListener('mouseenter', function() {
        if (autoSlideInterval) {
          clearInterval(autoSlideInterval);
        }
      });
      
      projectsSlider.addEventListener('mouseleave', function() {
        startAutoSlide();
      });
    }
    
    // Proje navigasyon butonlarını aktif hale getir
    const projectNavButtons = document.querySelectorAll('.project-nav-button');
    projectNavButtons.forEach(button => {
      button.addEventListener('click', function() {
        const direction = this.classList.contains('prev') ? 'prev' : 'next';
        navigateProjects(direction);
      });
    });
    
    // Devam eden projeler için olay dinleyicileri
    document.querySelectorAll('.btn.btn-sm').forEach(button => {
      button.addEventListener('click', function(e) {
        e.stopPropagation(); // Üst elemana tıklamanın önlenmesi
        const projectId = this.closest('div[id]').id.replace('-project', '');
        if (projectId) {
          showProjectDetail(projectId, e);
        }
      });
    });
  }, 1000);

  // Sayfa yüklendiğinde hash'e göre kaydır
  if (window.location.hash) {
    setTimeout(function() {
      const targetSection = document.querySelector(window.location.hash);
      if (targetSection) {
        window.scrollTo({
          top: targetSection.offsetTop - 100,
          behavior: 'smooth'
        });
      }
    }, 100);
  }
  
  // Görüşme Planla butonu için event listener
  const showConsultationFormBtn = document.getElementById('showConsultationForm');
  if (showConsultationFormBtn) {
    showConsultationFormBtn.addEventListener('click', function(e) {
      e.preventDefault();
      showConsultationForm();
    });
  }
  
  // Görüşme formunu kapatma butonu için event listener
  const closeConsultationModalBtn = document.getElementById('closeConsultationModal');
  if (closeConsultationModalBtn) {
    closeConsultationModalBtn.addEventListener('click', closeConsultationForm);
  }
  
  // Modal dışına tıklanınca kapanması için event listener
  window.addEventListener('click', function(e) {
    const consultationModal = document.getElementById('consultation-modal');
    if (e.target === consultationModal) {
      closeConsultationForm();
    }
  });

  // Danışmanlık görüşmesi modalını gösterme - Safari için optimize edilmiş
  function showConsultationForm() {
    const modal = document.getElementById('consultation-modal');
    if (!modal) {
      console.error('Görüşme formu modalı bulunamadı');
      return;
    }
    
    // Modalı göster - Safari için optimize edilmiş
    modal.style.display = 'block';
    
    // iOS için scroll düzeltme
    const scrollY = window.scrollY;
    document.body.style.position = 'fixed';
    document.body.style.width = '100%';
    document.body.style.top = `-${scrollY}px`;
    document.body.dataset.scrollY = scrollY;
  }

  // Görüşme formunu kapatma
  function closeConsultationForm() {
    const modal = document.getElementById('consultation-modal');
    if (modal) {
      modal.style.display = 'none';
      // Body'nin scroll'unu serbest bırak
      document.body.style.overflow = 'auto';
    }
  }
  
  // Çözüm detaylarını gösterme fonksiyonu - Safari için optimize edilmiş
  window.showSolutionDetail = function(solutionId, event) {
    // Event parametresi isteğe bağlı olmalı
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }
    
    const solutionData = getSolutionData(solutionId);
    if (!solutionData) {
      console.error('Çözüm bulunamadı: ' + solutionId);
      return;
    }
    
    const modal = document.getElementById('solution-detail-modal');
    const content = document.getElementById('solution-detail-content');
    
    if (!modal || !content) {
      console.error('Modal veya içerik elementi bulunamadı');
      return;
    }
    
    // Modal içeriğini oluştur - daha zengin bir içerik ve Safari uyumlu
    content.innerHTML = `
      <div class="solution-detail-header">
        <h2>${solutionData.title}</h2>
        <p>${solutionData.description}</p>
      </div>
      <div class="solution-detail-content">
        <div class="solution-detail-description">
          <p>${solutionData.longDescription || solutionData.description}</p>
        </div>
        <div class="solution-detail-benefits">
          <h4>Faydaları</h4>
          <ul>
            ${solutionData.benefits.map(benefit => `<li>${benefit}</li>`).join('')}
          </ul>
        </div>
        <div class="solution-detail-use-cases">
          <h4>Kullanım Alanları</h4>
          <ul>
            ${solutionData.useCases.map(useCase => `<li>${useCase}</li>`).join('')}
          </ul>
        </div>
      </div>
    `;
    
    // Modalı göster - Safari için optimize edilmiş
    modal.style.display = 'block';
    
    // iOS için scroll düzeltme
    const scrollY = window.scrollY;
    document.body.style.position = 'fixed';
    document.body.style.width = '100%';
    document.body.style.top = `-${scrollY}px`;
    document.body.dataset.scrollY = scrollY;
    
    console.log('Çözüm detayı gösteriliyor: ' + solutionId);
  };
  
  // Çözüm detaylarını getir - window nesnesine ekleyelim
  window.getSolutionData = function(solutionId) {
    const solutionsData = {
      'veri-analizi': {
        title: 'Veri Analizi',
        description: 'Büyük veri kümeleri üzerinde ileri analiz ve görselleştirme çözümleri ile iş süreçlerinizi optimize ederiz.',
        longDescription: 'Büyük veri kümeleri üzerinde ileri analiz ve görselleştirme çözümleri ile iş süreçlerinizi optimize ederiz. Verilerinizden anlamlı içgörüler çıkararak karar alma süreçlerinizi güçlendirir ve rekabet avantajı sağlarız. Modern veri analiz araçları ve yapay zeka teknolojileri kullanarak karmaşık verileri anlaşılır ve kullanılabilir bilgilere dönüştürüyoruz.',
        benefits: [
          'İş süreçlerinde optimizasyon ve maliyet tasarrufu',
          'Veri tabanlı karar verme süreçlerinde hız artışı',
          'Trendleri önceden tespit etme ve proaktif aksiyon alma',
          'Müşteri davranışlarında derinlemesine içgörü sağlama',
          'Rekabet avantajı ve stratejik planlama için somut veriler'
        ],
        useCases: [
          'Satış ve pazarlama analizi',
          'Müşteri segmentasyonu',
          'Üretim ve tedarik zinciri optimizasyonu',
          'Finansal analiz ve risk değerlendirmesi',
          'İnsan kaynakları ve performans analizi'
        ]
      },
      'makine-ogrenmesi': {
        title: 'Makine Öğrenmesi',
        description: 'İşletmenize özel makine öğrenmesi çözümleri geliştirerek iş süreçlerinizi otomatikleştirmenize ve optimizasyon sağlamanıza yardımcı oluyoruz.',
        longDescription: 'İşletmenize özel makine öğrenmesi çözümleri geliştirerek iş süreçlerinizi otomatikleştirmenize ve optimizasyon sağlamanıza yardımcı oluyoruz. Hem denetimli öğrenme hem de denetimsiz öğrenme modellerini kullanarak, verilerinizden anlamlı içgörüler çıkarır ve tahminleme yetenekleri geliştiririz. Sürekli öğrenen ve kendini geliştiren algoritmalarımız sayesinde işletmeniz daha akıllı kararlar alır.',
        benefits: [
          'İş süreçlerinde otomatikleştirme ve verimlilik artışı',
          'Tahminleyici analitik ile proaktif karar verme',
          'Veri hacminden bağımsız olarak tutarlı sonuçlar',
          'Zamanla öğrenme ve kendini geliştirme özelliği',
          'Tekrarlayan işlerde insan hatasını azaltma'
        ],
        useCases: [
          'Müşteri kayıp tahminleme ve önleme',
          'Öneri sistemleri ve kişiselleştirme',
          'Bakım gerektiren ekipmanların önceden tespiti',
          'Kalite kontrol ve üretim optimizasyonu',
          'Talep tahminleme ve kaynak planlama'
        ]
      },
      'bilgisayarli-goru': {
        title: 'Bilgisayarlı Görü',
        description: 'Bilgisayarlı görü teknolojilerimiz, makinelerin görüntüleri ve videoları analiz etmesini, nesneleri tanımasını ve sınıflandırmasını sağlar.',
        longDescription: 'Bilgisayarlı görü teknolojilerimiz, makinelerin görüntüleri ve videoları analiz etmesini, nesneleri tanımasını ve sınıflandırmasını sağlar. Derin öğrenme temelli görüntü işleme çözümlerimiz ile güvenlik, kalite kontrol, perakende ve üretim gibi alanlarda işletmenize değer katarız. İnsan gözünün kaçırabileceği detayları yakalama ve 7/24 görsel analiz sağlama kabiliyetlerimizle iş süreçlerinizi dönüştürüyoruz.',
        benefits: [
          'Manuel görsel kontrol süreçlerinde otomasyon',
          'Yüksek doğruluk ve tutarlılık oranları',
          '7/24 kesintisiz izleme ve analiz',
          'Hızlı karar verme ve müdahale imkanı',
          'İnsan gözünün kaçırabileceği detayları yakalama'
        ],
        useCases: [
          'Üretim hatlarında kalite kontrolü ve hata tespiti',
          'Perakendede raf analizi ve stok takibi',
          'Güvenlik kameraları ile tehdit tespiti',
          'İş güvenliği ve ekipman kontrolü',
          'Sağlık alanında tıbbi görüntü analizi'
        ]
      },
      'dogal-dil-isleme': {
        title: 'Doğal Dil İşleme',
        description: 'Doğal dil işleme (NLP) teknolojilerimiz, metinleri ve konuşmaları anlama, analiz etme ve anlamlı içgörüler çıkarma imkanı sunar.',
        longDescription: 'Doğal dil işleme (NLP) teknolojilerimiz, metinleri ve konuşmaları anlama, analiz etme ve anlamlı içgörüler çıkarma imkanı sunar. Gelişmiş NLP algoritmalarımız sayesinde müşteri geri bildirimleri, sosyal medya yorumları ve diğer metin verilerini analiz ederek işletmenize değer katarız. İnsan-makine etkileşimini daha doğal ve verimli hale getirerek müşterilerinize üstün bir deneyim sunmanızı sağlarız.',
        benefits: [
          'Büyük metin verilerinden hızlı içgörü çıkarma',
          'Müşteri deneyimini iyileştirme ve kişiselleştirme',
          'İnsan müdahalesi gerektiren süreçleri otomatikleştirme',
          'Duygu analizi ile müşteri memnuniyetini ölçme',
          'Çok dilli içerik analizi ve çeviri imkanı'
        ],
        useCases: [
          'Akıllı chatbotlar ve sanal asistanlar',
          'Müşteri geri bildirimi ve sosyal medya analizi',
          'Otomatik belge sınıflandırma ve bilgi çıkarma',
          'Sesli asistanlar ve konuşma tanıma sistemleri',
          'Otomatik içerik üretimi ve özetleme'
        ]
      },
      'otomasyon-cozumleri': {
        title: 'Otomasyon Çözümleri',
        description: 'İş süreçlerinizi otomatikleştirerek zaman ve kaynak tasarrufu sağlayan çözümlerimiz, rutin ve tekrarlayan görevleri otomatik hale getirir.',
        longDescription: 'İş süreçlerinizi otomatikleştirerek zaman ve kaynak tasarrufu sağlayan çözümlerimiz, rutin ve tekrarlayan görevleri otomatik hale getirerek çalışanlarınızın daha katma değerli işlere odaklanmasını sağlar. Yapay zeka destekli otomasyon sistemlerimiz ile iş süreçlerinizi daha verimli ve hatasız hale getirirken, operasyonel maliyetlerinizi düşürür ve rekabet avantajı sağlarız.',
        benefits: [
          'Operasyonel maliyetlerde önemli tasarruf',
          'İnsan kaynaklı hataların azalması',
          '7/24 kesintisiz çalışma imkanı',
          'Hızlı ölçeklendirme ve adaptasyon',
          'Süreç standartlaştırma ve kalite artışı'
        ],
        useCases: [
          'Belge işleme ve veri girişi otomasyonu',
          'Müşteri hizmetleri süreçleri otomasyonu',
          'Tedarik zinciri ve lojistik süreç otomasyonu',
          'Finans ve muhasebe süreçleri otomasyonu',
          'İK ve işe alım süreçleri otomasyonu'
        ]
      },
      'ozel-ai-cozumleri': {
        title: 'Özel AI Çözümleri',
        description: 'İşletmenizin benzersiz ihtiyaçlarını karşılamak için özel yapay zeka çözümleri geliştiriyoruz.',
        longDescription: 'İşletmenizin benzersiz ihtiyaçlarını karşılamak için özel yapay zeka çözümleri geliştiriyoruz. Sektörünüze ve iş süreçlerinize özel olarak tasarlanan AI projelerimiz, rekabet avantajı sağlamanız ve inovasyon yapmanız için ideal çözümler sunar. Mevcut sistemlerinizle entegre çalışan ve işletmenizin büyümesiyle birlikte ölçeklenebilen yapay zeka çözümlerimiz uzun vadeli başarınızı destekler.',
        benefits: [
          'İşletmenize özel tasarlanmış çözümler',
          'Rekabet avantajı ve farklılaşma',
          'Mevcut sistemlerle tam entegrasyon',
          'Ölçeklenebilir ve sürdürülebilir yaklaşım',
          'Sürekli iyileştirme ve geliştirme desteği'
        ],
        useCases: [
          'Sektöre özel tahminleme ve optimizasyon modelleri',
          'Özel öneri ve kişiselleştirme sistemleri',
          'Sektöre özel algoritma ve model geliştirme',
          'Mevcut sistemlerin AI ile güçlendirilmesi',
          'Özel veri toplama ve analiz çözümleri'
        ]
      }
    };
    
    return solutionsData[solutionId];
  };

  // Çözümler için olay dinleyicileri
  document.querySelectorAll('.solution-link').forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const solutionId = this.getAttribute('onclick').match(/'([^']+)'/)[1];
      window.showSolutionDetail(solutionId, e);
    });
  });

  // Mobile Menu Toggle
  if (mobileMenuToggle && mobileMenu && closeMenu) {
    mobileMenuToggle.addEventListener('click', function() {
      mobileMenu.classList.add('active');
      document.body.style.overflow = 'hidden'; // Sayfa scrollunu engelle
    });
    
    closeMenu.addEventListener('click', function() {
      mobileMenu.classList.remove('active');
      document.body.style.overflow = 'auto'; // Sayfa scrollunu serbest bırak
    });
    
    // Mobil menüde linklere tıklandığında menüyü kapat
    const mobileNavLinks = mobileMenu.querySelectorAll('.nav-links a');
    mobileNavLinks.forEach(link => {
      link.addEventListener('click', function() {
        mobileMenu.classList.remove('active');
        document.body.style.overflow = 'auto';
      });
    });
  }
  
  // Sayfa scroll olduğunda header'ı güncelle
  window.addEventListener('scroll', function() {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
      scrollTop.classList.add('active');
    } else {
      header.classList.remove('scrolled');
      scrollTop.classList.remove('active');
    }
  });
}); 