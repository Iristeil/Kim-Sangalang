// Theme toggle with persistence
const root = document.documentElement;
const themeBtn = document.getElementById('theme-btn');
const themeLabel = document.getElementById('theme-label');

function applyTheme(theme) {
  root.setAttribute('data-theme', theme);
  themeLabel.textContent = theme === 'dark' ? 'Light' : 'Dark';
  try { localStorage.setItem('theme', theme); } catch (e) {}
}

(function initTheme() {
  let saved = null;
  try { saved = localStorage.getItem('theme'); } catch (e) {}
  if (saved === 'dark' || saved === 'light') {
    applyTheme(saved);
  } else {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    applyTheme(prefersDark ? 'dark' : 'light');
  }
})();

themeBtn.addEventListener('click', () => {
  const current = root.getAttribute('data-theme');
  applyTheme(current === 'dark' ? 'light' : 'dark');
});

// Typewriter hero effect (runs once)
const codeLines = [
  { text: 'const engineer = {' },
  { text: '  name: "Kim Francis H. Sangalang",' },
  { text: '  title: "Telecommunications Engineer",' },
  { text: '  license: "Electronics Technician",' },
  { text: '  focus: "Railway telecom compliance",' },
  { text: '  status: "open to opportunities"' },
  { text: '};' },
  { text: '' },
  { text: 'console.log(engineer.status);' }
];

const twEl = document.getElementById('typewriter');
let li = 0, ci = 0;
const speed = 18;

function typeNext() {
  if (li >= codeLines.length) {
    twEl.innerHTML += '<span class="caret"></span>';
    return;
  }
  const current = codeLines[li];
  const partial = current.text.slice(0, ci);
  const rendered = codeLines.slice(0, li).map(l => escapeHtml(l.text)).join('\n');
  twEl.innerHTML = (rendered ? rendered + '\n' : '') + escapeHtml(partial) + '<span class="caret"></span>';

  if (ci < current.text.length) {
    ci++;
    setTimeout(typeNext, speed);
  } else {
    li++;
    ci = 0;
    setTimeout(typeNext, 120);
  }
}

function escapeHtml(str) {
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

window.addEventListener('DOMContentLoaded', () => setTimeout(typeNext, 300));
if (document.readyState !== 'loading') setTimeout(typeNext, 300);

// Copy email
const copyBtn = document.getElementById('copy-btn');
const copyMsg = document.getElementById('copy-email');
copyBtn.addEventListener('click', async () => {
  const email = 'francissangalang16@gmail.com';
  try {
    await navigator.clipboard.writeText(email);
    copyMsg.textContent = 'Copied "' + email + '" to clipboard.';
  } catch (e) {
    copyMsg.textContent = email;
  }
});
