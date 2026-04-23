const navToggle = document.querySelector('[data-nav-toggle]');
const navMenu = document.querySelector('[data-nav-menu]');
if (navToggle && navMenu) {
  navToggle.addEventListener('click', () => navMenu.classList.toggle('is-open'));
}

document.querySelectorAll('[data-before-after]').forEach((wrap) => {
  const range = wrap.querySelector('input[type="range"]');
  const before = wrap.querySelector('.before-after__before');
  const setSize = () => wrap.style.setProperty('--ba-width', `${wrap.clientWidth}px`);
  const update = () => before.style.width = `${range.value}%`;
  setSize();
  update();
  window.addEventListener('resize', setSize);
  range.addEventListener('input', update);
});

const observer = 'IntersectionObserver' in window ? new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: .12 }) : null;

document.querySelectorAll('.reveal').forEach((el) => {
  if (observer) observer.observe(el);
  else el.classList.add('is-visible');
});

document.querySelectorAll('[data-filter]').forEach((button) => {
  button.addEventListener('click', () => {
    const filter = button.dataset.filter;
    document.querySelectorAll('[data-filter]').forEach((b) => b.classList.remove('is-active'));
    button.classList.add('is-active');
    document.querySelectorAll('[data-project]').forEach((card) => {
      card.hidden = filter !== 'all' && card.dataset.project !== filter;
    });
  });
});

document.querySelectorAll('[data-lead-form]').forEach((form) => {
  form.addEventListener('submit', () => {});
});
