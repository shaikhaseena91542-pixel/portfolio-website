// ===== Mobile nav toggle =====
const navbar = document.getElementById('navbar');
const burger = document.getElementById('burger');

burger.addEventListener('click', () => {
  const isOpen = navbar.classList.toggle('nav-open');
  burger.setAttribute('aria-expanded', String(isOpen));
});

document.querySelectorAll('.nav__link').forEach(link => {
  link.addEventListener('click', () => {
    navbar.classList.remove('nav-open');
    burger.setAttribute('aria-expanded', 'false');
  });
});

// ===== Active nav link on scroll =====
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav__link');

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.getAttribute('id');
      navLinks.forEach(link => {
        link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
      });
    }
  });
}, { rootMargin: '-40% 0px -55% 0px' });

sections.forEach(section => sectionObserver.observe(section));

// ===== Scroll reveal =====
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// ===== Typewriter effect =====
const roles = ['AI Learner', 'IoT Enthusiast', 'Web Developer', 'Embedded Systems Explorer'];
const typewriterEl = document.getElementById('typewriter');
let roleIndex = 0;
let charIndex = 0;
let deleting = false;

function typeLoop() {
  const current = roles[roleIndex];

  if (!deleting) {
    charIndex++;
    typewriterEl.textContent = current.slice(0, charIndex);
    if (charIndex === current.length) {
      deleting = true;
      setTimeout(typeLoop, 1400);
      return;
    }
  } else {
    charIndex--;
    typewriterEl.textContent = current.slice(0, charIndex);
    if (charIndex === 0) {
      deleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
    }
  }

  setTimeout(typeLoop, deleting ? 40 : 90);
}

typeLoop();

// ===== Contact form (client-side only placeholder) =====
const form = document.getElementById('contact-form');
const status = document.getElementById('form-status');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const name = form.name.value.trim();
  if (!name) return;
  status.textContent = `Thanks ${name}! This form isn't wired to a backend yet — email me directly for now.`;
  form.reset();
});

// ===== Footer year =====
document.getElementById('year').textContent = new Date().getFullYear();
