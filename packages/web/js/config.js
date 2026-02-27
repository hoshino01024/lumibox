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
  }
}

function closeDomainTip() {
  const domainTip = document.getElementById('domainTip');
  if (domainTip) {
    domainTip.style.display = 'none';
    localStorage.setItem('hideDomainTip', 'true');
  }
}

// 滚动淡入效果
function initScrollAnimation() {
  if (!('IntersectionObserver' in window)) {
    document.querySelectorAll('.fade-in-up').forEach(el => {
      el.classList.add('visible');
    });
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -80px 0px'
  });

  const elements = document.querySelectorAll('.fade-in-up');
  elements.forEach(el => observer.observe(el));
}

// 初始化
document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initSearch();
  checkDomain();
  initScrollAnimation();
  
  const themeBtn = document.getElementById('themeToggle');
  if (themeBtn) {
    themeBtn.addEventListener('click', toggleTheme);
  }
});
