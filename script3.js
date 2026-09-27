// ===== Mobile menu toggle =====
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');
if (menuToggle && navLinks) {
  menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('open');
  });
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => navLinks.classList.remove('open'));
  });
}

// ===== Typing effect on hero name =====
const typedEl = document.getElementById('typedName');
if (typedEl) {
  const fullText = typedEl.textContent.trim();
  typedEl.textContent = '';
  let i = 0;
  function typeChar() {
    if (i <= fullText.length) {
      typedEl.textContent = fullText.slice(0, i);
      i++;
      setTimeout(typeChar, 70);
    }
  }
  typeChar();
}

// ===== Live clock in hero status line =====
const clockEl = document.getElementById('clock');
if (clockEl) {
  function updateClock() {
    const now = new Date();
    clockEl.textContent = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
  }
  updateClock();
  setInterval(updateClock, 1000);
}

// ===== Prep skill bars: stash their real text, blank them out =====
// This reuses the existing .bar / data-level markup as-is — no HTML changes.
document.querySelectorAll('.bar').forEach(bar => {
  const fullText = bar.textContent;
  bar.dataset.fullText = fullText;
  bar.textContent = '░'.repeat(fullText.length);
});

// fills a .bar element's characters in left-to-right over ~700ms
function animateBar(bar) {
  const full = bar.dataset.fullText || bar.textContent;
  const len = full.length;
  let step = 0;
  const totalSteps = len;
  const stepTime = 700 / totalSteps;
  const timer = setInterval(() => {
    step++;
    bar.textContent = full.slice(0, step) + '░'.repeat(Math.max(len - step, 0));
    if (step >= totalSteps) clearInterval(timer);
  }, stepTime);
}

// ===== Scroll "pop up" reveal =====
// Targets the existing .project-card, .skill-block and .bar-list li elements
// directly (already present in the HTML) — just toggles a class on them.
const revealTargets = document.querySelectorAll('.project-card, .skill-block, .bar-list li');

if (revealTargets.length && 'IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');

        // if this is a bar-list item, animate its bar fill too
        const bar = entry.target.querySelector('.bar');
        if (bar) {
          setTimeout(() => animateBar(bar), 150);
        }

        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });

  revealTargets.forEach(el => observer.observe(el));
} else {
  // fallback: no IntersectionObserver support, just show everything
  revealTargets.forEach(el => {
    el.classList.add('in-view');
    const bar = el.querySelector('.bar');
    if (bar) bar.textContent = bar.dataset.fullText || bar.textContent;
  });
}

// ===== Footer year =====
const yearEl = document.getElementById('year');
if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}
