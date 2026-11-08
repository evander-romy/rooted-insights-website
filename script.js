(function () {
  var body = document.body;
  var saved = null;
  try { saved = localStorage.getItem('ri-lang'); } catch (e) {}
  var lang = saved || ((navigator.language || 'en').toLowerCase().indexOf('nl') === 0 ? 'nl' : 'en');

  function apply(l) {
    lang = l;
    body.classList.toggle('lang-nl', l === 'nl');
    document.documentElement.lang = l;
    document.querySelectorAll('[data-ph-en]').forEach(function (el) {
      el.placeholder = el.getAttribute(l === 'nl' ? 'data-ph-nl' : 'data-ph-en');
    });
    document.querySelectorAll('.lang-toggle').forEach(function (b) {
      b.textContent = l === 'nl' ? 'EN' : 'NL';
      b.setAttribute('aria-label', l === 'nl' ? 'Switch to English' : 'Schakel naar Nederlands');
    });
    try { localStorage.setItem('ri-lang', l); } catch (e) {}
  }

  document.querySelectorAll('.lang-toggle').forEach(function (b) {
    b.addEventListener('click', function () { apply(lang === 'nl' ? 'en' : 'nl'); });
  });

  var y = document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();

  apply(lang);
})();
