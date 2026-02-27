// 主题切换
function initTheme() {
  const theme = localStorage.getItem('theme') || 'light';
  document.documentElement.setAttribute('data-theme', theme);
  updateThemeIcon(theme);
}

function toggleTheme() {
  const current = document.documentElement.getAttribute('data-theme');
  const next = current === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', next);
  localStorage.setItem('theme', next);
  updateThemeIcon(next);
}

function updateThemeIcon(theme) {
  const icon = document.querySelector('#themeToggle i');
  if (icon) {
    icon.className = theme === 'dark' ? 'ri-sun-line' : 'ri-moon-line';
  }
}

// 搜索功能
function initSearch() {
  const searchInput = document.getElementById('searchInput');
  if (!searchInput) return;

  searchInput.addEventListener('input', (e) => {
    const keyword = e.target.value.toLowerCase();
    const toolCards = document.querySelectorAll('.tool-card');
    
    toolCards.forEach(card => {
      const title = card.querySelector('h3').textContent.toLowerCase();
      const desc = card.querySelector('p').textContent.toLowerCase();
      
      if (title.includes(keyword) || desc.includes(keyword)) {
        card.style.display = 'block';
      } else {
        card.style.display = 'none';
      }
    });
  });
}

// 域名跳转提示
function checkDomain() {
  const hostname = window.location.hostname;
  const domainTip = document.getElementById('domainTip');
  
  if (!domainTip) return;
  
  if (hostname.includes('pages.dev') && !localStorage.getItem('hideDomainTip')) {
    domainTip.style.display = 'block';
    setTimeout(() => {
      domainTip.classList.add('visible');
    }, 100);
  }
}

function closeDomainTip() {
  const domainTip = document.getElementById('domainTip');
  if (domainTip) {
    domainTip.classList.remove('visible');
    setTimeout(() => {
      domainTip.style.display = 'none';
    }, 500);
    localStorage.setItem('hideDomainTip', 'true');
  }
}

// 淡入动画
function initFadeIn() {
  // Hero 区域立即显示
  const hero = document.querySelector('.hero');
  if (hero) {
    setTimeout(() => {
      hero.classList.add('visible');
    }, 100);
  }

  // 分类卡片依次淡入
  const categoryCards = document.querySelectorAll('.category-card');
  categoryCards.forEach((card, index) => {
    setTimeout(() => {
      card.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
      card.classList.add('visible');
    }, 300 + index * 100);
  });

  // 热门工具标题
  const sectionTitle = document.querySelector('.section-title');
  if (sectionTitle) {
    sectionTitle.style.opacity = '0';
    sectionTitle.style.transform = 'translateY(20px)';
    sectionTitle.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
    setTimeout(() => {
      sectionTitle.style.opacity = '1';
      sectionTitle.style.transform = 'translateY(0)';
    }, 800);
  }

  // 工具卡片依次淡入
  const toolCards = document.querySelectorAll('.tool-card');
  toolCards.forEach((card, index) => {
    setTimeout(() => {
      card.style.transition = 'opacity 0.5s ease-out, transform 0.5s ease-out';
      card.classList.add('visible');
    }, 1000 + index * 80);
  });

  // 页脚
  const footer = document.querySelector('.footer');
  if (footer) {
    setTimeout(() => {
      footer.classList.add('visible');
    }, 1500);
  }
}

// 初始化
document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initSearch();
  checkDomain();
  initFadeIn();
  
  const themeBtn = document.getElementById('themeToggle');
  if (themeBtn) {
    themeBtn.addEventListener('click', toggleTheme);
  }
});
