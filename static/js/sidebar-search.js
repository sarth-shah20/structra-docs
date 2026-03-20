(function () {
  const WRAP_ID = 'sidebar-search-wrap';
  const INPUT_ID = 'sidebar-search-input';
  const DROPDOWN_ID = 'sidebar-search-dropdown';
  const COLLAPSED_CLASS = 'menu__list-item--collapsed';
  const MOBILE_BREAKPOINT = 996;
  const SUGGESTION_LIMIT = 6;

  let preSearchCollapseState = null;
  let searchActive = false;
  let snapshotRootList = null;
  let activeSuggestionIndex = -1;

  function norm(v) {
    return (v || '').toLowerCase().trim();
  }

  function getSidebar() {
    return document.querySelector('.theme-doc-sidebar-container nav.menu');
  }

  function isMobileView() {
    return window.innerWidth <= MOBILE_BREAKPOINT;
  }

  function getNavbarDesktopTarget() {
    const navbarInner = document.querySelector('.navbar .navbar__inner');
    const rightItems = navbarInner && navbarInner.querySelector('.navbar__items--right');
    if (!navbarInner || !rightItems) return null;

    let slot = document.getElementById('navbar-search-slot');
    if (!slot) {
      slot = document.createElement('div');
      slot.id = 'navbar-search-slot';
      slot.className = 'navbar-search-slot';
    }

    if (!navbarInner.contains(slot)) {
      navbarInner.insertBefore(slot, rightItems);
    }

    return slot;
  }

  function getSuggestionDropdown() {
    return document.getElementById(DROPDOWN_ID);
  }

  function closeSuggestions() {
    const dropdown = getSuggestionDropdown();
    if (!dropdown) return;
    dropdown.hidden = true;
    dropdown.innerHTML = '';
    activeSuggestionIndex = -1;
  }

  function collectSuggestionCandidates() {
    const menu = getSidebar();
    if (!menu) return [];

    const links = Array.from(menu.querySelectorAll('a.menu__link[href]'));
    const seen = new Set();

    return links
      .map((link) => {
        const href = link.getAttribute('href') || '';
        const label = (link.textContent || '').trim();
        if (!href || !label || href.startsWith('#')) return null;

        const absHref = new URL(href, window.location.origin).pathname + new URL(href, window.location.origin).hash;
        if (seen.has(absHref)) return null;
        seen.add(absHref);

        const pathParts = [];
        let currentItem = link.closest('.menu__list-item');
        while (currentItem) {
          const parentItem = currentItem.parentElement && currentItem.parentElement.closest('.menu__list-item');
          if (!parentItem) break;
          const parentLabel = getDirectLabel(parentItem);
          if (parentLabel) pathParts.unshift(parentLabel);
          currentItem = parentItem;
        }

        return {
          href: absHref,
          label,
          pathLabel: pathParts.join(' / '),
        };
      })
      .filter(Boolean);
  }

  function scoreCandidate(candidate, query) {
    const label = norm(candidate.label);
    const pathLabel = norm(candidate.pathLabel);
    if (!query) return 0;
    if (label === query) return 100;
    if (label.startsWith(query)) return 80;
    if (label.includes(query)) return 60;
    if (pathLabel.includes(query)) return 35;

    const queryParts = query.split(/\s+/).filter(Boolean);
    const labelWords = label.split(/\s+/);
    const pathWords = pathLabel.split(/\s+/);
    const allWords = labelWords.concat(pathWords);
    const allPartsMatch = queryParts.every((part) => allWords.some((word) => word.startsWith(part) || word.includes(part)));
    return allPartsMatch ? 25 : -1;
  }

  function getSuggestions(query) {
    const normalizedQuery = norm(query);
    if (!normalizedQuery) return [];

    return collectSuggestionCandidates()
      .map((candidate) => ({
        candidate,
        score: scoreCandidate(candidate, normalizedQuery),
      }))
      .filter((entry) => entry.score >= 0)
      .sort((a, b) => {
        if (b.score !== a.score) return b.score - a.score;
        return a.candidate.label.localeCompare(b.candidate.label);
      })
      .slice(0, SUGGESTION_LIMIT)
      .map((entry) => entry.candidate);
  }

  function goToSuggestion(href) {
    if (!href) return;
    closeSuggestions();
    window.location.assign(href);
  }

  function renderSuggestions(input) {
    const dropdown = getSuggestionDropdown();
    if (!dropdown) return;

    const query = input.value || '';
    const suggestions = getSuggestions(query);

    if (!norm(query)) {
      closeSuggestions();
      return;
    }

    if (suggestions.length === 0) {
      dropdown.hidden = false;
      dropdown.innerHTML = '<div class="sidebar-search-empty">No matching docs pages.</div>';
      activeSuggestionIndex = -1;
      return;
    }

    activeSuggestionIndex = 0;
    dropdown.hidden = false;
    dropdown.innerHTML = '';

    const list = document.createElement('div');
    list.className = 'sidebar-search-suggestion-list';

    suggestions.forEach((suggestion, index) => {
      const item = document.createElement('button');
      item.type = 'button';
      item.className = 'sidebar-search-suggestion-item';
      if (index === activeSuggestionIndex) {
        item.classList.add('is-active');
      }
      item.setAttribute('data-href', suggestion.href);
      item.setAttribute('data-index', String(index));

      const title = document.createElement('div');
      title.className = 'sidebar-search-suggestion-title';
      title.textContent = suggestion.label;

      const meta = document.createElement('div');
      meta.className = 'sidebar-search-suggestion-meta';
      meta.textContent = suggestion.pathLabel || 'Documentation';

      item.appendChild(title);
      item.appendChild(meta);
      item.addEventListener('mousedown', function (event) {
        event.preventDefault();
        goToSuggestion(suggestion.href);
      });

      list.appendChild(item);
    });

    dropdown.appendChild(list);
  }

  function updateActiveSuggestion(nextIndex) {
    const dropdown = getSuggestionDropdown();
    if (!dropdown || dropdown.hidden) return;
    const items = Array.from(dropdown.querySelectorAll('.sidebar-search-suggestion-item'));
    if (!items.length) return;

    activeSuggestionIndex = ((nextIndex % items.length) + items.length) % items.length;
    items.forEach((item, index) => {
      item.classList.toggle('is-active', index === activeSuggestionIndex);
    });
    items[activeSuggestionIndex].scrollIntoView({block: 'nearest'});
  }

  function commitActiveSuggestion() {
    const dropdown = getSuggestionDropdown();
    if (!dropdown || dropdown.hidden) return false;
    const items = Array.from(dropdown.querySelectorAll('.sidebar-search-suggestion-item'));
    const activeItem = items[activeSuggestionIndex];
    if (!activeItem) return false;
    goToSuggestion(activeItem.getAttribute('data-href'));
    return true;
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
    const mountTarget = isMobileView() ? menu : getNavbarDesktopTarget();
    if (!menu || !mountTarget) return false;

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
      input.placeholder = 'Search docs...';
      input.setAttribute('aria-label', 'Search documentation navigation');

      wrap.appendChild(input);

      const dropdown = document.createElement('div');
      dropdown.id = DROPDOWN_ID;
      dropdown.className = 'sidebar-search-dropdown';
      dropdown.hidden = true;
      wrap.appendChild(dropdown);

      input.addEventListener('input', function () {
        applyFilter(input);
        renderSuggestions(input);
      });

      input.addEventListener('focus', function () {
        renderSuggestions(input);
      });

      input.addEventListener('keydown', function (event) {
        const dropdownEl = getSuggestionDropdown();
        const dropdownOpen = dropdownEl && !dropdownEl.hidden;

        if (event.key === 'ArrowDown' && dropdownOpen) {
          event.preventDefault();
          updateActiveSuggestion(activeSuggestionIndex + 1);
          return;
        }

        if (event.key === 'ArrowUp' && dropdownOpen) {
          event.preventDefault();
          updateActiveSuggestion(activeSuggestionIndex - 1);
          return;
        }

        if (event.key === 'Enter' && dropdownOpen && commitActiveSuggestion()) {
          event.preventDefault();
          return;
        }

        if (event.key === 'Escape') {
          closeSuggestions();
        }
      });
    }

    if (!mountTarget.contains(wrap)) {
      if (isMobileView()) {
        mountTarget.prepend(wrap);
      } else {
        mountTarget.appendChild(wrap);
      }
    }

    if (input.value && input.value.trim()) {
      applyFilter(input);
      renderSuggestions(input);
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
  window.addEventListener('resize', ensureMounted);
  document.addEventListener('mousedown', function (event) {
    const wrap = document.getElementById(WRAP_ID);
    if (wrap && !wrap.contains(event.target)) {
      closeSuggestions();
    }
  });
})();
