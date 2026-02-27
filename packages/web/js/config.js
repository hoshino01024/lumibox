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

// 滚动淡入效果（Intersection Observer）
function initScrollAnimation() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        // 添加延迟，让同一批元素依次出现
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, index * 100);
        
        // 已经显示的元素不再观察
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1, // 元素 10% 可见时触发
    rootMargin: '0px 0px -50px 0px' // 提前 50px 触发
  });

  // 观察所有需要淡入的元素
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
