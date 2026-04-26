// Main interactivity for Iran News
document.addEventListener('DOMContentLoaded', () => {
  console.log('Iran News Home Loaded');

  // Initialize Lucide icons
  if (window.lucide) {
    window.lucide.createIcons();
  }

  // Dark Mode Toggle
  const darkModeToggle = document.getElementById('dark-mode-toggle');
  const darkModeToggleMobile = document.getElementById('dark-mode-toggle-mobile');
  const htmlElement = document.documentElement;
  
  const toggleTheme = () => {
    htmlElement.classList.toggle('dark');
    const isDark = htmlElement.classList.contains('dark');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  };

  darkModeToggle?.addEventListener('click', toggleTheme);
  darkModeToggleMobile?.addEventListener('click', toggleTheme);

  // Check for saved theme (Default to light if not set)
  if (localStorage.getItem('theme') === 'dark') {
    htmlElement.classList.add('dark');
  }

  // Mobile Menu Toggle
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenuTrigger = document.getElementById('mobile-menu-trigger');
  const mobileMenu = document.getElementById('mobile-menu');
  const closeMenuBtn = document.getElementById('close-menu-btn');

  const openMenu = () => mobileMenu?.classList.remove('translate-x-full');
  const closeMenu = () => mobileMenu?.classList.add('translate-x-full');

  mobileMenuBtn?.addEventListener('click', openMenu);
  mobileMenuTrigger?.addEventListener('click', openMenu);
  closeMenuBtn?.addEventListener('click', closeMenu);

  // Mobile Submenu Toggle
  const mobileSubmenuContainers = document.querySelectorAll('.mobile-submenu-container');
  mobileSubmenuContainers.forEach(container => {
    const btn = container.querySelector('button');
    const submenu = container.querySelector('.mobile-submenu');
    
    btn?.addEventListener('click', () => {
      const isActive = container.classList.contains('active');
      
      // Close others
      mobileSubmenuContainers.forEach(c => {
        c.classList.remove('active');
        c.querySelector('.mobile-submenu')?.classList.add('hidden');
      });

      if (!isActive) {
        container.classList.add('active');
        submenu?.classList.remove('hidden');
      }
    });
  });

  // Helper: Convert to Persian Digits
  const toPersianDigits = (n) => {
    const farsiDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
    return n.toString().replace(/\d/g, x => farsiDigits[x]);
  };

  // Persian Clock & Date
  const updatePersianDateTime = () => {
    const now = new Date();
    const optionsDate = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', calendar: 'persian', locale: 'fa-IR' };
    const optionsTime = { hour: '2-digit', minute: '2-digit', second: '2-digit', locale: 'fa-IR' };
    
    const dateStr = now.toLocaleDateString('fa-IR', optionsDate);
    const timeStr = now.toLocaleTimeString('fa-IR', optionsTime);

    const dateEl = document.getElementById('current-date');
    const timeEl = document.getElementById('current-time');
    
    if (dateEl) dateEl.innerText = dateStr;
    if (timeEl) timeEl.innerText = timeStr;
  };

  updatePersianDateTime();
  setInterval(updatePersianDateTime, 1000);

  // Spotlight Functions
  const spotlightSearch = document.getElementById('spotlight-search');
  const spotlightInput = document.getElementById('spotlight-input');
  const closeSpotlight = document.getElementById('close-spotlight');

  const openSpotlight = () => {
    spotlightSearch?.classList.add('active');
    setTimeout(() => spotlightInput?.focus(), 100);
  };

  const closeSpotlightFn = () => spotlightSearch?.classList.remove('active');

  // Search Buttons (Header & Mobile)
  const searchBtn = document.getElementById('search-btn');
  const searchBtnMobile = document.getElementById('search-btn-mobile');
  const mobileSearchBtn = document.getElementById('mobile-search-btn-nav');

  searchBtn?.addEventListener('click', openSpotlight);
  searchBtnMobile?.addEventListener('click', openSpotlight);
  mobileSearchBtn?.addEventListener('click', openSpotlight);
  closeSpotlight?.addEventListener('click', closeSpotlightFn);

  // Close on Escape or Overlay click
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeSpotlightFn();
  });
  spotlightSearch?.addEventListener('click', (e) => {
    if (e.target === spotlightSearch) closeSpotlightFn();
  });


  // Data Generation
  const categories = ['سیاست', 'اقتصاد', 'ورزش', 'فرهنگ', 'تکنولوژی', 'بین‌الملل', 'علمی', 'هنری', 'سلامت', 'حوادث'];
  const localImages = [
    'images/1098088_909.jpg',
    'images/1120656_861.jpg',
    'images/1209524_671-450x280.jpg',
    'images/341597_363.jpg',
    'images/61454146-450x280.jpg',
    'images/6153667011684035b64ed31a97980ad4-450x280.png',
    'images/6977ab1834760dc842d1cc42-450x280.webp',
    'images/976398_818.jpg',
    'images/986865_992.jpg',
    'images/ca57c22ea5b54010a33b2c30117bf34f.jpg',
    'images/بورس.webp',
    'images/حقوق-بازنشستگان-780x470-1.jpg',
    'images/دلارریال-e1740294924291.jpg',
    'images/زغالسنگ.jpg',
    'images/صادراتبهروسیه.jpg',
    'images/صنعت-خودرو-850x530.jpg',
    'images/صیدیبورس.jpg',
    'images/قیمتطلا.jpg',
    'images/وزارتاقتصاد.jpg',
    'images/پتروشیمی-مارون-02-1.webp'
  ];

  const newsData = [];
  for (let i = 1; i <= 100; i++) {
    const cat = categories[Math.floor(Math.random() * categories.length)];
    const randomImg = localImages[Math.floor(Math.random() * localImages.length)];
    newsData.push({
      id: i,
      kicker: `گزارش اختصاصی از حوزه ${cat}:`,
      title: `خبر شماره ${i}: تحولات جدید در حوزه ${cat} و بررسی ابعاد مختلف آن در سال جدید`,
      summary: `در این گزارش به بررسی دقیق آخرین رویدادهای ${cat} و تاثیرات بلندمدت آن بر بازارهای داخلی و خارجی می‌پردازیم.`,
      category: cat,
      time: `${Math.floor(Math.random() * 23) + 1} ساعت پیش`,
      image: randomImg
    });
  }

  const mostVisitedData = [
    "چگونه در سال جدید سرمایه‌گذاری هوشمندانه‌ای داشته باشیم؟",
    "۱۰ مقصد گردشگری برتر ایران برای ایام نوروز",
    "بررسی تخصصی جدیدترین گوشی‌های هوشمند بازار",
    "تغییرات جدید در قوانین راهنمایی و رانندگی",
    "گزارش تصویری از حیات وحش مناطق حفاظت شده ایران",
    "تاثیر تکنولوژی بر آینده مشاغل در دهه آینده",
    "بهترین کتاب‌های سال از نگاه منتقدان",
    "نتایج مسابقات لیگ برتر در هفته بیست و پنجم",
    "پیشرفت‌های جدید در درمان بیماری‌های خاص",
    "مصاحبه اختصاصی با کارآفرین برتر سال"
  ];

  // Render Functions
  const newsContainer = document.getElementById('latest-news-container');
  const mostVisitedContainer = document.getElementById('most-visited-container');

  const renderNews = (data, append = false) => {
    if (!newsContainer) return;
    if (!append) {
      newsContainer.innerHTML = '';
      newsContainer.classList.add('opacity-0');
      newsContainer.classList.add('divide-[#e0e0e0]');
      setTimeout(() => newsContainer.classList.remove('opacity-0'), 50);
    }

    data.forEach(news => {
      const newsCard = document.createElement('div');
      newsCard.className = 'flex gap-3 py-6 px-0 hover:bg-gray-50 dark:hover:bg-gray-900 transition-all group cursor-pointer animate-fade-in';
      // Image on the right (first child in RTL)
      newsCard.innerHTML = `
        <div class="w-24 h-24 sm:w-32 sm:h-32 overflow-hidden rounded-lg shrink-0">
          <img src="${news.image}" alt="${news.title}" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" referrerPolicy="no-referrer">
        </div>
        <div class="flex-1">
          <div class="text-[10px]  text-gray-400 mb-1">${news.kicker}</div>
          <h3 class="text-[16px] lg:text-xl font-normal group-hover:text-brand transition-colors line-clamp-3 lg:line-clamp-2 leading-[1.6]">${news.title}</h3>
          <p class="text-xs text-gray-500 mt-2 line-clamp-2 leading-relaxed hidden lg:block">${news.summary}</p>
        </div>
      `;
      newsContainer.appendChild(newsCard);
    });
  };

  const renderMostVisited = () => {
    if (!mostVisitedContainer) return;
    mostVisitedContainer.innerHTML = '';
    
    // Using newsData for mock most visited content with images
    newsData.slice(10, 15).forEach((news) => {
      const item = document.createElement('a');
      item.href = 'post.html';
      item.className = 'group block py-4 border-b border-gray-100 dark:border-gray-800 last:border-0';
      item.innerHTML = `
        <div class="flex items-center gap-4 text-right">
          <div class="w-24 h-16 shrink-0 overflow-hidden rounded-lg">
            <img src="${news.image}" alt="${news.title}" 
                 class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500">
          </div>
          <div class="flex-1">
            <h3 class="text-sm font-bold leading-snug group-hover:text-brand transition-colors line-clamp-2">
              ${news.title}</h3>
          </div>
        </div>
      `;
      mostVisitedContainer.appendChild(item);
    });
  };

  const renderSidebarLatest = () => {
    const sidebarLatestContainer = document.getElementById('sidebar-latest-news');
    if (!sidebarLatestContainer) return;
    sidebarLatestContainer.innerHTML = '';
    
    newsData.slice(0, 15).forEach(news => {
      const item = document.createElement('a');
      item.href = '#';
      item.className = 'group flex items-start gap-2 py-1.5 last:pb-0';
      item.innerHTML = `
        <span class="w-1.5 h-1.5 rounded-full bg-brand/30 group-hover:bg-brand mt-2 shrink-0 transition-colors"></span>
        <h4 class="text-[13px] font-normal text-gray-600 dark:text-gray-400 leading-relaxed group-hover:text-brand transition-colors">${news.title}</h4>
      `;
      sidebarLatestContainer.appendChild(item);
    });
  };

  // Initial Render (20 news items)
  renderNews(newsData.slice(0, 20));
  renderMostVisited();
  renderSidebarLatest();

  // Load More Button
  let currentNewsCount = 20;
  const loadMoreBtn = document.getElementById('load-more-btn');
  loadMoreBtn?.addEventListener('click', () => {
    const nextBatch = newsData.slice(currentNewsCount, currentNewsCount + 10);
    if (nextBatch.length > 0) {
      renderNews(nextBatch, true);
      currentNewsCount += 10;
    }
    if (currentNewsCount >= newsData.length) {
      loadMoreBtn.classList.add('hidden');
    }
  });

  // Back to Top Logic
  const backToTop = document.getElementById('back-to-top');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
      backToTop?.classList.remove('opacity-0', 'translate-y-10');
    } else {
      backToTop?.classList.add('opacity-0', 'translate-y-10');
    }
  });
  backToTop?.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // --- Post Page Specific Logic ---
  
  // Copy Short Link
  const copyLinkBtn = document.getElementById('copy-link-btn');
  const shortLinkText = document.getElementById('short-link-text');
  
  copyLinkBtn?.addEventListener('click', () => {
    if (shortLinkText) {
      navigator.clipboard.writeText(shortLinkText.innerText).then(() => {
        const originalText = copyLinkBtn.innerHTML;
        copyLinkBtn.innerHTML = '<i data-lucide="check" class="w-4 h-4"></i><span>کپی شد!</span>';
        if (window.lucide) window.lucide.createIcons();
        copyLinkBtn.classList.replace('bg-brand', 'bg-green-600');
        
        setTimeout(() => {
          copyLinkBtn.innerHTML = originalText;
          if (window.lucide) window.lucide.createIcons();
          copyLinkBtn.classList.replace('bg-green-600', 'bg-brand');
        }, 2000);
      });
    }
  });

  // Print Post
   const printBtn = document.getElementById('print-post');
   const printBtnTop = document.getElementById('print-post-btn');
   
   const handlePrint = () => window.print();
   printBtn?.addEventListener('click', handlePrint);
   printBtnTop?.addEventListener('click', handlePrint);

   // Copy Link Top
   const copyLinkBtnTop = document.getElementById('copy-link-btn-top');
   copyLinkBtnTop?.addEventListener('click', () => {
     if (shortLinkText) {
       navigator.clipboard.writeText(shortLinkText.innerText).then(() => {
         copyLinkBtnTop.innerHTML = '<i data-lucide="check" class="w-4 h-4"></i>';
         if (window.lucide) window.lucide.createIcons();
         setTimeout(() => {
           copyLinkBtnTop.innerHTML = '<i data-lucide="link" class="w-4 h-4"></i>';
           if (window.lucide) window.lucide.createIcons();
         }, 2000);
       });
     }
   });

  // Text Size Adjustment
   const postContentEl = document.querySelector('.post-content');
   const increaseFontBtn = document.getElementById('increase-font');
   const decreaseFontBtn = document.getElementById('decrease-font');
   
   let currentFontSize = 18; // Default font size in px (from text-lg)
   
   increaseFontBtn?.addEventListener('click', () => {
     if (currentFontSize < 26) {
       currentFontSize += 2;
       if (postContentEl) postContentEl.style.fontSize = `${currentFontSize}px`;
     }
   });
   
   decreaseFontBtn?.addEventListener('click', () => {
     if (currentFontSize > 14) {
       currentFontSize -= 2;
       if (postContentEl) postContentEl.style.fontSize = `${currentFontSize}px`;
     }
   });
 });
