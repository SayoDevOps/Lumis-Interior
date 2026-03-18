/* ─── NAV SMOOTH SCROLL WITH OFFSET ─── */
document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', e => {
        const target = document.querySelector(link.getAttribute('href'));
        if (!target) return;
        e.preventDefault();
        closeMobileMenu();
        const offset = 80;
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
    });
});

/* ─── NAV SCROLL ─── */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    if (navbar) navbar.classList.toggle('scrolled', window.scrollY > 60);
});

/* ─── SCROLL REVEAL ─── */
const revealEls = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window) {
    document.body.classList.add('js-ready');
    const io = new IntersectionObserver((entries) => {
        entries.forEach(e => {
            if (e.isIntersecting) {
                e.target.classList.add('visible');
                io.unobserve(e.target);
            }
        });
    }, { threshold: 0, rootMargin: '0px 0px 0px 0px' });
    revealEls.forEach(el => io.observe(el));
    setTimeout(() => {
        revealEls.forEach(el => el.classList.add('visible'));
    }, 2000);
}