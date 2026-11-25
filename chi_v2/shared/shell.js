/*
 * CHI 2027 merged site — shell
 * - Injects the one sidebar every page uses (and a mobile top bar).
 * - window.CHIStore: the localStorage keys shared by all pages (same keys as Program's lib/store.ts).
 * - Loads Ask CHI on every page except Program (which renders it itself).
 * Include it as the first thing in <body data-page="…">.
 */
(function () {
  'use strict';
  var script = document.currentScript;
  var ROOT = new URL('../', script.src).href; // site root, works on any host or sub-path
  var body = document.body;
  var page = body.getAttribute('data-page') || '';

  /* ---------------- store ---------------- */
  var KEYS = { plan: 'chi-plan', papers: 'chi-saved-papers', interests: 'chi-user-interests', awards: 'chi-award-plan', people: 'chi-people-saves' };
  var DEFAULTS = {
    plan: ['access-beyond-compliance', 'learning-together'],
    papers: ['ai-shared-control-paper-2', 'access-beyond-compliance-paper-2', 'creative-tools-paper-1', 'learning-together-paper-2', 'privacy-practice-paper-1'],
    awards: [],
    people: {},
    interests: { primary: 'Human-AI Interaction', explore: ['Accessibility', 'Design Tools', 'Critical Design'] }
  };
  function read(name) {
    try {
      var raw = localStorage.getItem(KEYS[name]);
      if (raw !== null) return JSON.parse(raw);
    } catch (e) { /* ignore */ }
    return JSON.parse(JSON.stringify(DEFAULTS[name]));
  }
  function write(name, value) {
    try { localStorage.setItem(KEYS[name], JSON.stringify(value)); } catch (e) { /* ignore */ }
    window.dispatchEvent(new CustomEvent('chi-store', { detail: { key: KEYS[name] } }));
  }
  function toggle(name, id) {
    var list = read(name);
    var i = list.indexOf(id);
    if (i >= 0) list.splice(i, 1); else list.push(id);
    write(name, list);
    return i < 0;
  }
  function interests() {
    var v = read('interests');
    if (!v || !v.primary) v = DEFAULTS.interests;
    var list = [v.primary].concat(v.explore || []).map(function (s) { return String(s).replace(/–/g, '-').trim(); });
    return list.filter(function (s, i) { return s && list.indexOf(s) === i; });
  }
  function myCount() {
    return read('plan').length + read('papers').length + read('awards').length + Object.keys(read('people') || {}).length;
  }
  window.CHIStore = { KEYS: KEYS, read: read, write: write, toggle: toggle, interests: interests, myCount: myCount, root: ROOT };

  /* ---------------- sidebar ---------------- */
  var I = {
    program: '<rect x="3" y="4.5" width="18" height="16" rx="2.5"/><path d="M3 9.5h18M8 2.5v4M16 2.5v4"/>',
    map: '<path d="M9 4 3 6v14l6-2 6 2 6-2V4l-6 2-6-2z"/><path d="M9 4v14M15 6v14"/>',
    people: '<circle cx="9" cy="8" r="3.5"/><path d="M3 20c0-3.5 2.7-6 6-6s6 2.5 6 6"/><path d="M16 4.5a3.5 3.5 0 0 1 0 7"/><path d="M18 14c2 .7 3 2.8 3 6"/>',
    recommendations: '<path d="M12 3l2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1-4.4-4.3 6.1-.9z"/>',
    awards: '<path d="M8 4h8v5a4 4 0 0 1-8 0z"/><path d="M8 6H5a3 3 0 0 0 3 4M16 6h3a3 3 0 0 1-3 4M12 13v4M9 20h6"/>',
    accessibility: '<circle cx="12" cy="4.5" r="1.6"/><path d="M5 8l7 1.5L19 8M12 9.5V14l-3 6M12 14l3 6"/>',
    my: '<path d="M7 4h10v16l-5-3.5L7 20z"/>'
  };
  var ITEMS = [
    ['program', 'Program', 'program/'],
    ['map', 'Map', 'map/'],
    ['people', 'People', 'people/'],
    ['recommendations', 'Recommendations', 'people/#recommendations'],
    ['awards', 'Awards', 'awards/'],
    ['accessibility', 'Accessibility', 'accessibility/']
  ];
  function link(item, badge) {
    return '<li><a href="' + ROOT + item[2] + '" data-nav="' + item[0] + '">' +
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + I[item[0]] + '</svg>' +
      '<span>' + item[1] + '</span>' + (badge ? '<span class="chi-badge" id="chiMyCount">0</span>' : '') + '</a></li>';
  }
  var brand = '<a class="chi-brand" href="' + ROOT + 'program/"><span class="chi-brand-mark" aria-hidden="true">CHI</span><span><b>CHI 2027</b><small>Pittsburgh · May 10–14</small></span></a>';
  var side = document.createElement('nav');
  side.className = 'chi-side';
  side.id = 'chiSide';
  side.setAttribute('aria-label', 'Site');
  side.innerHTML = brand +
    '<ul class="chi-nav">' + ITEMS.map(function (it) { return link(it); }).join('') + '</ul>' +
    '<div class="chi-sep"></div>' +
    '<ul class="chi-nav">' + link(['my', 'My', 'my/'], true) + '</ul>';

  var skip = document.createElement('a');
  skip.className = 'chi-skip';
  skip.href = '#main';
  skip.textContent = 'Skip to content';

  var top = document.createElement('div');
  top.className = 'chi-topbar';
  top.innerHTML = brand + '<button class="chi-menu" type="button" aria-controls="chiSide" aria-expanded="false">Menu</button>';

  body.classList.add('chi-shell-body');
  body.insertBefore(side, body.firstChild);
  body.insertBefore(top, body.firstChild);
  body.insertBefore(skip, body.firstChild);

  var menu = top.querySelector('.chi-menu');
  var scrim = null;
  function setMenu(open) {
    body.classList.toggle('chi-nav-open', open);
    menu.setAttribute('aria-expanded', String(open));
    menu.textContent = open ? 'Close' : 'Menu';
    if (open && !scrim) { scrim = document.createElement('div'); scrim.className = 'chi-scrim'; scrim.onclick = function () { setMenu(false); }; body.appendChild(scrim); }
    if (!open && scrim) { scrim.remove(); scrim = null; }
  }
  menu.addEventListener('click', function () { setMenu(!body.classList.contains('chi-nav-open')); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && body.classList.contains('chi-nav-open')) setMenu(false); });
  side.addEventListener('click', function (e) { if (e.target.closest('a')) setMenu(false); });

  function setActive(id) {
    side.querySelectorAll('[data-nav]').forEach(function (a) {
      if (a.getAttribute('data-nav') === id) a.setAttribute('aria-current', 'page'); else a.removeAttribute('aria-current');
    });
  }
  setActive(page === 'people' && location.hash === '#recommendations' ? 'recommendations' : page);

  function refreshCount() { var el = document.getElementById('chiMyCount'); if (el) el.textContent = String(myCount()); }
  refreshCount();
  window.addEventListener('chi-store', refreshCount);
  window.addEventListener('storage', refreshCount);
  window.addEventListener('pageshow', refreshCount);

  /* ---------------- toast ---------------- */
  var toastEl = null, toastTimer = null;
  function toast(message) {
    if (!toastEl) { toastEl = document.createElement('div'); toastEl.className = 'chi-toast'; toastEl.setAttribute('role', 'status'); body.appendChild(toastEl); }
    toastEl.textContent = message; toastEl.classList.add('show');
    clearTimeout(toastTimer); toastTimer = setTimeout(function () { toastEl.classList.remove('show'); }, 2600);
  }

  window.CHIShell = { root: ROOT, page: page, setActive: setActive, toast: toast, refreshCount: refreshCount };

  /* ---------------- Ask CHI ---------------- */
  if (page !== 'program') {
    var s = document.createElement('script');
    s.src = ROOT + 'shared/askchi.js';
    s.defer = true;
    document.head.appendChild(s);
  }
})();
