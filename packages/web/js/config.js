// 主题
function initTheme() {
  const theme = localStorage.getItem('theme') || 'light';
  document.documentElement.setAttribute('data-theme', theme);
}

function toggleTheme() {
  const html = document.documentElement;
  const current = html.getAttribute('data-theme');
  const next = current === 'dark' ? 'light' : 'dark';
  html.setAttribute('data-theme', next);
  localStorage.setItem('theme', next);
}

// 搜索
function initSearch() {
  const input = document.getElementById('searchInput');
  if (!input) return;
  
  input.addEventListener('input', (e) => {
    const keyword = e.target.value.toLowerCase();
    document.querySelectorAll('.tool-card').forEach(card => {
      const text = card.textContent.toLowerCase();
      card.style.display = text.includes(keyword) ? 'block' : 'none';
    });
  });
}

// 域名提示
function checkDomain() {
  const tip = document.getElementById('domainTip');
  if (!tip) return;
  
  if (location.hostname.includes('pages.dev') && !localStorage.getItem('hideTip')) {
    tip.style.display = 'block';
  }
}

function closeDomainTip() {
  const tip = document.getElementById('domainTip');
  if (tip) {
    tip.style.display = 'none';
    localStorage.setItem('hideTip', '1');
  }
}

// 滚动淡入
function initScrollAnimation() {
  const elements = document.querySelectorAll('.fade-up');
  
  if (!('IntersectionObserver' in window)) {
    elements.forEach(el => el.classList.add('show'));
    return;
  }
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('show');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.15,
    rootMargin: '0px 0px -60px 0px'
  });
  
  elements.forEach(el => observer.observe(el));
}

// 初始化
document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initSearch();
  checkDomain();
  initScrollAnimation();
  
  document.getElementById('themeToggle')?.addEventListener('click', toggleTheme);
});
