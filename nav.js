/* nav.js — RMB-FinIntel sidebar navigation v2.0 */
(function () {

  /* ── Collapsible group toggle ── */
  window.sbToggle = function (trigger) {
    const itemsId = trigger.id.replace('trigger', 'items');
    const items = document.getElementById(itemsId);
    if (!items) return;
    const isOpen = items.classList.contains('open');
    items.classList.toggle('open', !isOpen);
    trigger.classList.toggle('open', !isOpen);
  };

  /* ── Mobile: open sidebar drawer ── */
  window.sbMobileToggle = function () {
    const sidebar = document.getElementById('rmb-sidebar');
    const overlay = document.getElementById('sb-overlay');
    const hbg     = document.getElementById('sb-hbg');
    if (!sidebar) return;
    const isOpen = sidebar.classList.toggle('mob-open');
    if (overlay) overlay.classList.toggle('open', isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';
    if (hbg) {
      const spans = hbg.querySelectorAll('span');
      if (isOpen) {
        if (spans[0]) spans[0].style.transform = 'rotate(45deg) translate(4px,4px)';
        if (spans[1]) spans[1].style.opacity   = '0';
        if (spans[2]) spans[2].style.transform = 'rotate(-45deg) translate(4px,-4px)';
      } else {
        spans.forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
      }
    }
  };

  /* ── Mobile: close sidebar ── */
  window.sbMobileClose = function () {
    const sidebar = document.getElementById('rmb-sidebar');
    const overlay = document.getElementById('sb-overlay');
    const hbg     = document.getElementById('sb-hbg');
    if (!sidebar) return;
    sidebar.classList.remove('mob-open');
    if (overlay) overlay.classList.remove('open');
    document.body.style.overflow = '';
    if (hbg) hbg.querySelectorAll('span').forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
  };

  document.addEventListener('DOMContentLoaded', function () {

    /* Close mobile sidebar when a nav link is clicked */
    const sidebar = document.getElementById('rmb-sidebar');
    if (sidebar) {
      sidebar.querySelectorAll('a').forEach(function (a) {
        a.addEventListener('click', function () { setTimeout(sbMobileClose, 80); });
      });
    }

    /* Active link highlight (fallback for pages without inline active class) */
    const page = location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.sb-nav a[href]').forEach(function (a) {
      const href = a.getAttribute('href');
      if (href === page || (page === '' && href === 'index.html')) {
        a.classList.add('active');
      }
    });

    /* Auto-open CSM group on sub-pages */
    const csmPages = ['architecture.html', 'energy.html', 'demo.html'];
    if (csmPages.includes(page)) {
      const trigger = document.getElementById('sb-csm-trigger');
      const items   = document.getElementById('sb-csm-items');
      if (trigger) trigger.classList.add('open', 'active');
      if (items)   items.classList.add('open');
    }
  });

})();
