(function () {
  const INPUT_ID = 'navbar-search-input';
  const LIST_ID = 'navbar-search-suggestions';
  const WRAP_ID = 'navbar-search';

  let docsIndex = [];
  let initialized = false;

  function norm(v) {
    return (v || '').toLowerCase().trim();
  }

  function score(item, q) {
    const t = norm(item.title);
    const c = norm(item.text);
    if (t === q) return 100;
    if (t.startsWith(q)) return 80;
    if (t.includes(q)) return 60;
    if (c.includes(q)) return 30;
    return 0;
  }

  function search(query) {
    const q = norm(query);
    if (!q) return [];

    return docsIndex
      .map((item) => ({item, score: score(item, q)}))
      .filter((x) => x.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 8)
      .map((x) => x.item);
  }

  function renderSuggestions(list, results) {
    if (!results.length) {
      list.innerHTML = '';
      list.style.display = 'none';
      return;
    }

    list.innerHTML = results
      .map((r) => '<a class="navbar-search-suggestion" href="' + r.url + '">' + r.title + '</a>')
      .join('');
    list.style.display = 'block';
  }

  function init() {
    if (initialized) return true;
    const input = document.getElementById(INPUT_ID);
    const list = document.getElementById(LIST_ID);
    const wrap = document.getElementById(WRAP_ID);
    if (!input || !list || !wrap) return false;

    initialized = true;

    input.addEventListener('input', function () {
      renderSuggestions(list, search(input.value));
    });

    input.addEventListener('focus', function () {
      renderSuggestions(list, search(input.value));
    });

    input.addEventListener('keydown', function (e) {
      if (e.key === 'Enter') {
        const results = search(input.value);
        if (results.length > 0) {
          window.location.href = results[0].url;
        }
      }
    });

    document.addEventListener('click', function (e) {
      if (!e.target.closest('#' + WRAP_ID)) {
        list.style.display = 'none';
      }
    });

    return true;
  }

  function ensureInit() {
    if (init()) return;
    const maxAttempts = 50;
    let attempts = 0;
    const timer = setInterval(function () {
      attempts += 1;
      if (init() || attempts >= maxAttempts) {
        clearInterval(timer);
      }
    }, 100);
  }

  // Docusaurus is a SPA; re-run on client-side navigations.
  const originalPushState = history.pushState;
  history.pushState = function () {
    originalPushState.apply(this, arguments);
    setTimeout(ensureInit, 0);
  };

  const originalReplaceState = history.replaceState;
  history.replaceState = function () {
    originalReplaceState.apply(this, arguments);
    setTimeout(ensureInit, 0);
  };

  window.addEventListener('popstate', ensureInit);
  window.addEventListener('load', ensureInit);
  document.addEventListener('DOMContentLoaded', ensureInit);

  fetch('/search-index.json')
    .then((r) => r.json())
    .then((json) => {
      docsIndex = Array.isArray(json) ? json : [];
      ensureInit();
    })
    .catch(() => {
      ensureInit();
    });
})();
