/* =====================================================
   main.js — Women's Day 8/3 interactive effects
===================================================== */

// ─── Falling Petals (Canvas) ─────────────────────────
const canvas = document.getElementById('petals');
const ctx    = canvas.getContext('2d');

let W, H, petals = [];

const SHAPES  = ['🌸', '🌷', '🌹', '❤️', '✿', '·'];
const COLORS  = ['#f472b6','#e879f9','#c084fc','#fb7185','#f9a8d4'];

function resize() {
  W = canvas.width  = window.innerWidth;
  H = canvas.height = window.innerHeight;
}

function randomPetal() {
  const isEmoji = Math.random() > 0.5;
  return {
    x    : Math.random() * W,
    y    : -20,
    r    : Math.random() * 10 + 8,
    speed: Math.random() * 1.2 + 0.4,
    drift: (Math.random() - 0.5) * 0.6,
    rot  : Math.random() * Math.PI * 2,
    rotS : (Math.random() - 0.5) * 0.04,
    alpha: Math.random() * 0.4 + 0.25,
    shape: isEmoji ? SHAPES[Math.floor(Math.random() * 4)] : null,
    color: COLORS[Math.floor(Math.random() * COLORS.length)],
    size : Math.random() * 14 + 12,
  };
}

function initPetals() {
  petals = [];
  for (let i = 0; i < 55; i++) {
    const p = randomPetal();
    p.y = Math.random() * H; // pre-scatter vertically
    petals.push(p);
  }
}

function animatePetals() {
  ctx.clearRect(0, 0, W, H);

  for (const p of petals) {
    p.y   += p.speed;
    p.x   += p.drift;
    p.rot += p.rotS;

    if (p.y > H + 30) Object.assign(p, randomPetal());

    ctx.save();
    ctx.globalAlpha = p.alpha;
    ctx.translate(p.x, p.y);
    ctx.rotate(p.rot);

    if (p.shape) {
      // emoji petal
      ctx.font = `${p.size}px serif`;
      ctx.fillText(p.shape, -p.size / 2, p.size / 2);
    } else {
      // small circle dot
      ctx.beginPath();
      ctx.arc(0, 0, p.r * 0.35, 0, Math.PI * 2);
      ctx.fillStyle = p.color;
      ctx.fill();
    }
    ctx.restore();
  }

  requestAnimationFrame(animatePetals);
}

window.addEventListener('resize', () => { resize(); initPetals(); });
resize();
initPetals();
animatePetals();


// ─── Intersection Observer — fade-in cards ───────────
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.style.animationDelay = '0s';
      e.target.classList.add('in-view');
      observer.unobserve(e.target);
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll('.card').forEach(c => observer.observe(c));


// ─── Personalised Message Generator ──────────────────
const generateBtn = document.getElementById('generate-btn');
const previewBox  = document.getElementById('preview-box');
const previewName = document.getElementById('preview-name');
const previewText = document.getElementById('preview-text');
const copyBtn     = document.getElementById('copy-btn');
const toInput     = document.getElementById('to-name');
const msgInput    = document.getElementById('custom-msg');

generateBtn.addEventListener('click', () => {
  const name = toInput.value.trim() || 'bạn thân yêu';
  const msg  = msgInput.value.trim() ||
    `Nhân ngày Quốc tế Phụ nữ 8/3, mình gửi đến ${name} những lời chúc chân thành nhất.\n\nChúc ${name} luôn tươi cười, hạnh phúc và rực rỡ như những bông hoa mùa xuân! 🌸`;

  previewName.textContent = name;
  previewText.textContent = msg;
  previewBox.classList.remove('hidden');
  previewBox.scrollIntoView({ behavior: 'smooth', block: 'center' });
});

// Copy to clipboard
copyBtn.addEventListener('click', () => {
  const name = previewName.textContent;
  const msg  = previewText.textContent;
  const full = `Gửi đến ${name},\n\n${msg}\n\n— Với tất cả yêu thương 🌸`;

  navigator.clipboard.writeText(full).then(() => {
    copyBtn.textContent = '✅ Đã sao chép!';
    setTimeout(() => (copyBtn.textContent = '📋 Sao Chép Lời Chúc'), 2000);
  }).catch(() => {
    // Fallback for older browsers
    const ta = document.createElement('textarea');
    ta.value = full;
    document.body.appendChild(ta);
    ta.select();
    document.execCommand('copy');
    document.body.removeChild(ta);
    copyBtn.textContent = '✅ Đã sao chép!';
    setTimeout(() => (copyBtn.textContent = '📋 Sao Chép Lời Chúc'), 2000);
  });
});

// Allow Enter in name input to jump to textarea
toInput.addEventListener('keydown', e => {
  if (e.key === 'Enter') { e.preventDefault(); msgInput.focus(); }
});
