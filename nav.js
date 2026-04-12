/* nav.js — shared navigation logic */
(function() {
  // Mark active nav link based on current page filename
  const page = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(a => {
    const href = a.getAttribute('href');
    if (href === page || (page === '' && href === 'index.html')) {
      a.classList.add('active');
    }
  });

  // Scroll-spy: highlight nav on section enter
  const sections = document.querySelectorAll('section[id]');
  if (sections.length) {
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          document.querySelectorAll('.nav-links a[href^="#"]').forEach(a => {
            a.classList.toggle('active', a.getAttribute('href') === '#' + e.target.id);
          });
        }
      });
    }, { threshold: 0.35 });
    sections.forEach(s => obs.observe(s));
  }
})();
