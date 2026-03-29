(function () {
  var body = document.body;
  var themeToggle = document.getElementById('theme-toggle');
  var backToTop = document.getElementById('back-to-top');
  var searchInput = document.getElementById('post-search');
  var postItems = Array.prototype.slice.call(document.querySelectorAll('.post-item'));
  var postEmpty = document.getElementById('post-empty');
  var themeKey = 'site-theme';

  function setTheme(theme) {
    if (theme === 'dark') {
      body.classList.add('theme-dark');
      if (themeToggle) themeToggle.textContent = '☀️ 浅色';
    } else {
      body.classList.remove('theme-dark');
      if (themeToggle) themeToggle.textContent = '🌙 深色';
    }
  }

  var savedTheme = localStorage.getItem(themeKey);
  if (savedTheme) {
    setTheme(savedTheme);
  }

  if (themeToggle) {
    themeToggle.addEventListener('click', function () {
      var isDark = body.classList.contains('theme-dark');
      var nextTheme = isDark ? 'light' : 'dark';
      setTheme(nextTheme);
      localStorage.setItem(themeKey, nextTheme);
    });
  }

  function updateBackToTop() {
    if (!backToTop) return;
    if (window.scrollY > 280) {
      backToTop.classList.add('show');
    } else {
      backToTop.classList.remove('show');
    }
  }

  if (backToTop) {
    window.addEventListener('scroll', updateBackToTop);
    backToTop.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
    updateBackToTop();
  }

  function filterPosts() {
    if (!searchInput || postItems.length === 0) return;
    var keyword = searchInput.value.trim().toLowerCase();
    var visibleCount = 0;

    postItems.forEach(function (item) {
      var title = item.getAttribute('data-title') || '';
      var tags = item.getAttribute('data-tags') || '';
      var matched = !keyword || title.indexOf(keyword) !== -1 || tags.indexOf(keyword) !== -1;
      item.hidden = !matched;
      if (matched) visibleCount += 1;
    });

    if (postEmpty) {
      postEmpty.hidden = visibleCount !== 0;
    }
  }

  if (searchInput) {
    searchInput.addEventListener('input', filterPosts);
    filterPosts();
  }
})();
