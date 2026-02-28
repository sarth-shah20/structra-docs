(function () {
  const WRAP_ID = 'sidebar-search-wrap';
  const INPUT_ID = 'sidebar-search-input';
  const COLLAPSED_CLASS = 'menu__list-item--collapsed';

  let preSearchCollapseState = null;
  let searchActive = false;
  let snapshotRootList = null;

  function norm(v) {
    return (v || '').toLowerCase().trim();
  }

  function getSidebar() {
    return document.querySelector('.theme-doc-sidebar-container nav.menu');
  }

  function getDirectLabel(li) {
    const link = li.querySelector(':scope > a.menu__link');
    if (link) return (link.textContent || '').trim();

    const collapsibleLink = li.querySelector(':scope > div.menu__list-item-collapsible > a.menu__link');
    if (collapsibleLink) return (collapsibleLink.textContent || '').trim();

    return '';
  }

  function getDirectChildListItem(parent) {
    return Array.from(parent.children).filter((el) => el.classList.contains('menu__list-item'));
  }

  function getDirectChildMenuList(li) {
    return li.querySelector(':scope > ul.menu__list');
  }

  function getCategoryCaret(li) {
    return li.querySelector(':scope > div.menu__list-item-collapsible > button.menu__caret');
  }

  function isCategoryItem(li) {
    const collapsible = li.querySelector(':scope > div.menu__list-item-collapsible');
    const childList = getDirectChildMenuList(li);
    return !!(collapsible && childList);
  }

  function setCategoryExpanded(li, expanded) {
    if (!isCategoryItem(li)) return;
    li.classList.toggle(COLLAPSED_CLASS, !expanded);
    const caret = getCategoryCaret(li);
    if (caret) {
      caret.setAttribute('aria-expanded', expanded ? 'true' : 'false');
      const label = getDirectLabel(li);
      caret.setAttribute('aria-label', (expanded ? 'Collapse' : 'Expand') + " sidebar category '" + label + "'");
    }
  }

  function makeCategoryPath(pathParts, label) {
    return pathParts.concat([label]).join(' > ');
  }

  function snapshotCollapseState(rootList) {
    const map = {};

    function walk(ul, pathParts) {
      const items = getDirectChildListItem(ul);
      items.forEach((li) => {
        const label = getDirectLabel(li);
        if (!label) return;
        if (isCategoryItem(li)) {
          const key = makeCategoryPath(pathParts, label);
          map[key] = li.classList.contains(COLLAPSED_CLASS);
          const childUl = getDirectChildMenuList(li);
          if (childUl) {
            walk(childUl, pathParts.concat([label]));
          }
        }
      });
    }

    walk(rootList, []);
    preSearchCollapseState = map;
    snapshotRootList = rootList;
  }

  function restoreCollapseState(rootList) {
    if (!preSearchCollapseState) return;

    function walk(ul, pathParts) {
      const items = getDirectChildListItem(ul);
      items.forEach((li) => {
        const label = getDirectLabel(li);
        if (!label) return;
        if (!isCategoryItem(li)) return;

        const key = makeCategoryPath(pathParts, label);
        if (Object.prototype.hasOwnProperty.call(preSearchCollapseState, key)) {
          const wasCollapsed = preSearchCollapseState[key];
          setCategoryExpanded(li, !wasCollapsed);
        }

        const childUl = getDirectChildMenuList(li);
        if (childUl) {
          walk(childUl, pathParts.concat([label]));
        }
      });
    }

    walk(rootList, []);
    preSearchCollapseState = null;
    snapshotRootList = null;
  }

  function clearDisplayOverrides(ul) {
    const items = getDirectChildListItem(ul);
    items.forEach((li) => {
      li.style.display = '';
      const childUl = getDirectChildMenuList(li);
      if (childUl) {
        clearDisplayOverrides(childUl);
      }
    });
  }

  function filterList(ul, query, pathParts) {
    let hasMatchInSubtree = false;
    const items = Array.from(ul.children).filter((el) => el.classList.contains('menu__list-item'));

    items.forEach((li) => {
      const label = norm(getDirectLabel(li));
      const selfMatches = !query || label.includes(query);
      const childUl = getDirectChildMenuList(li);
      const childResult = childUl
        ? filterList(childUl, query, pathParts.concat([getDirectLabel(li)]))
        : {hasMatchInSubtree: false, selfMatches: false};
      const visible = selfMatches || childResult.hasMatchInSubtree;
      li.style.display = visible ? '' : 'none';

      if (query && isCategoryItem(li)) {
        setCategoryExpanded(li, childResult.hasMatchInSubtree);
      }

      if (visible) hasMatchInSubtree = true;
    });

    return {hasMatchInSubtree, selfMatches: false};
  }

  function applyFilter(input) {
    const menu = getSidebar();
    if (!menu) return;
    const rootList = menu.querySelector(':scope > ul.menu__list');
    if (!rootList) return;

    const q = norm(input.value);
    if (q && !searchActive) {
      snapshotCollapseState(rootList);
      searchActive = true;
    }

    if (!q && searchActive) {
      clearDisplayOverrides(rootList);
      restoreCollapseState(rootList);
      searchActive = false;
      return;
    }

    if (!q) {
      clearDisplayOverrides(rootList);
      return;
    }

    // If sidebar tree root changed across route updates, refresh the snapshot.
    if (snapshotRootList && snapshotRootList !== rootList) {
      preSearchCollapseState = null;
      snapshotRootList = null;
      snapshotCollapseState(rootList);
    }

    filterList(rootList, q, []);
  }

  function mountSearch() {
    const menu = getSidebar();
    if (!menu) return false;

    let wrap = document.getElementById(WRAP_ID);
    let input = document.getElementById(INPUT_ID);

    if (!wrap || !input) {
      wrap = document.createElement('div');
      wrap.id = WRAP_ID;
      wrap.className = 'sidebar-search-wrap';

      input = document.createElement('input');
      input.id = INPUT_ID;
      input.className = 'sidebar-search-input';
      input.type = 'search';
      input.placeholder = 'Search sidebar...';
      input.setAttribute('aria-label', 'Search sidebar navigation');

      wrap.appendChild(input);
      menu.prepend(wrap);

      input.addEventListener('input', function () {
        applyFilter(input);
      });
    } else if (!menu.contains(wrap)) {
      menu.prepend(wrap);
    }

    if (input.value && input.value.trim()) {
      applyFilter(input);
    }

    return true;
  }

  function ensureMounted() {
    if (mountSearch()) return;

    let attempts = 0;
    const timer = setInterval(function () {
      attempts += 1;
      if (mountSearch() || attempts > 60) {
        clearInterval(timer);
      }
    }, 100);
  }

  const push = history.pushState;
  history.pushState = function () {
    push.apply(this, arguments);
    setTimeout(ensureMounted, 0);
    setTimeout(ensureMounted, 80);
  };

  const replace = history.replaceState;
  history.replaceState = function () {
    replace.apply(this, arguments);
    setTimeout(ensureMounted, 0);
    setTimeout(ensureMounted, 80);
  };

  window.addEventListener('popstate', ensureMounted);
  window.addEventListener('load', ensureMounted);
  document.addEventListener('DOMContentLoaded', ensureMounted);
})();
