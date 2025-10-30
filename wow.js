document.addEventListener('DOMContentLoaded', () => {
  const navLinks = document.querySelectorAll('.nav-links a');

  // Obtenir la page actuelle
  function getCurrentPage() {
    let page = window.location.pathname.split('/').pop().toLowerCase();
    if (page === '' || page === '/') return 'index.html';
    return page;
  }

  const currentPage = getCurrentPage();

  navLinks.forEach(link => {
    let linkHref = link.getAttribute('href').split('#')[0].toLowerCase();
    if (linkHref === '' || linkHref === '/') linkHref = 'index.html';

    if (linkHref === currentPage) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }

    link.addEventListener('click', () => {
      navLinks.forEach(l => l.classList.remove('active'));
      link.classList.add('active');
    });
  });
});
