/* =====================================================
   main.js — Gift 8/3 — Personal Card Logic
===================================================== */

// ─── 1. Read URL param (?to=key) ─────────────────────
const params = new URLSearchParams(window.location.search);
const key = (params.get('to') || DEFAULT_KEY).toLowerCase();
const data = MESSAGES[key];

// ─── 2. Falling petals (canvas) ──────────────────────
const petalCanvas = document.getElementById('petals');
const pCtx = petalCanvas.getContext('2d');

let W, H, petals = [];

const EMOJIS = ['🌸', '🌷', '🌹', '🌺', '✿', '·', '❤️'];
const COLORS = ['#f472b6', '#e879f9', '#c084fc', '#fb7185', '#f9a8d4', '#fda4af'];

function resize() {
  W = petalCanvas.width = window.innerWidth;
  H = petalCanvas.height = window.innerHeight;
}
function mkPetal() {
  const useEmoji = Math.random() > .45;
  return {
    x: Math.random() * W,
    y: -(Math.random() * 40),
    spd: Math.random() * .9 + .35,
    drift: (Math.random() - .5) * .5,
    rot: Math.random() * Math.PI * 2,
    rotS: (Math.random() - .5) * .03,
    alpha: Math.random() * .35 + .2,
    emoji: useEmoji ? EMOJIS[~~(Math.random() * EMOJIS.length)] : null,
    color: COLORS[~~(Math.random() * COLORS.length)],
    r: Math.random() * 5 + 3,
    size: Math.random() * 12 + 11,
  };
}
function initPetals() {
  petals = Array.from({ length: 50 }, () => { const p = mkPetal(); p.y = Math.random() * H; return p; });
}
function animatePetals() {
  pCtx.clearRect(0, 0, W, H);
  for (const p of petals) {
    p.y += p.spd; p.x += p.drift; p.rot += p.rotS;
    if (p.y > H + 30) Object.assign(p, mkPetal());
    pCtx.save();
    pCtx.globalAlpha = p.alpha;
    pCtx.translate(p.x, p.y);
    pCtx.rotate(p.rot);
    if (p.emoji) {
      pCtx.font = `${p.size}px serif`;
      pCtx.fillText(p.emoji, -p.size / 2, p.size / 2);
    } else {
      pCtx.beginPath();
      pCtx.arc(0, 0, p.r, 0, Math.PI * 2);
      pCtx.fillStyle = p.color;
      pCtx.fill();
    }
    pCtx.restore();
  }
  requestAnimationFrame(animatePetals);
}
window.addEventListener('resize', () => { resize(); initPetals(); });
resize(); initPetals(); animatePetals();


// ─── 3. Populate card (or show not-found) ─────────────
function populateCard(d) {
  document.getElementById('gc-icon').textContent = d.emoji || '🌸';
  document.getElementById('gc-relation').textContent = d.relation || '';
  document.getElementById('gc-name').textContent = d.name || '';
  document.getElementById('gc-message').textContent = d.message || '';
  document.getElementById('gc-signature').textContent = '— ' + (d.signature || 'Với tất cả yêu thương 🌸') + ' —';

  // Apply colour theme
  const theme = d.color || 'pink';
  document.body.classList.add(`theme-${theme}`);

  // Glow colour
  const glowColors = {
    pink: 'rgba(244,114,182,.3)',
    purple: 'rgba(168,85,247,.3)',
    red: 'rgba(244,63,94,.3)',
    gold: 'rgba(245,158,11,.25)',
    rose: 'rgba(251,207,232,.25)',
    sky: 'rgba(125,211,252,.25)',
  };
  document.getElementById('card-glow').style.background =
    `radial-gradient(ellipse 70% 70% at 50% 40%, ${glowColors[theme] || glowColors.pink} 0%, transparent 70%)`;

  // Handle Scratch Card UI display
  if (d.luckyMoney) {
    document.getElementById('scratch-container').classList.remove('hidden');
    document.getElementById('scratch-reward').textContent = d.luckyMoney;
  }
}

if (data) {
  populateCard(data);
} else {
  // Key not found → show not-found screen immediately, skip envelope
  document.getElementById('envelope-screen').classList.add('closing');
  document.getElementById('not-found').classList.remove('hidden');
}


// ─── 4. Envelope click → open → show card ────────────
const envelopeScreen = document.getElementById('envelope-screen');
const envelopeEl = document.getElementById('envelope');
const cardScreen = document.getElementById('card-screen');

envelopeEl.addEventListener('click', () => {
  if (!data) return; // safety

  // Flap opens
  envelopeEl.classList.add('open');

  // Small delay → close envelope screen → reveal card
  setTimeout(() => {
    envelopeScreen.classList.add('closing');
    setTimeout(() => {
      envelopeScreen.style.display = 'none';
      document.body.style.overflow = 'auto'; // allow scroll on card
      cardScreen.classList.remove('hidden');
      cardScreen.style.opacity = '0';
      requestAnimationFrame(() => {
        cardScreen.style.transition = 'opacity .6s ease';
        cardScreen.style.opacity = '1';

        // Now that the card is visible, initialize the scratch card
        // ensuring canvas gets proper width/height!
        if (data && data.luckyMoney) {
          initScratchCard();
        }
      });
      // Confetti party!
      launchConfetti();
    }, 600);
  }, 500);
});


// ─── 5. Confetti 🎉 ──────────────────────────────────
function launchConfetti() {
  const cc = document.getElementById('confetti');
  const cCtx = cc.getContext('2d');
  cc.width = window.innerWidth;
  cc.height = window.innerHeight;

  const accents = {
    pink: ['#f472b6', '#fbcfe8', '#f9a8d4', '#ffffff'],
    purple: ['#a855f7', '#d8b4fe', '#e879f9', '#ffffff'],
    red: ['#f43f5e', '#fda4af', '#fb7185', '#ffffff'],
    gold: ['#f59e0b', '#fcd34d', '#fbbf24', '#ffffff'],
    rose: ['#fbcfe8', '#fce7f3', '#f9a8d4', '#ffffff'],
    sky: ['#7dd3fc', '#bae6fd', '#38bdf8', '#ffffff'],
  };
  const palette = accents[data?.color || 'pink'];

  const pieces = Array.from({ length: 120 }, () => ({
    x: Math.random() * cc.width,
    y: Math.random() * cc.height - cc.height,
    w: Math.random() * 8 + 4,
    h: Math.random() * 4 + 2,
    rot: Math.random() * Math.PI,
    rotS: (Math.random() - .5) * .15,
    spd: Math.random() * 3 + 2,
    col: palette[~~(Math.random() * palette.length)],
  }));

  let frames = 0;
  function drawConfetti() {
    cCtx.clearRect(0, 0, cc.width, cc.height);
    for (const p of pieces) {
      p.y += p.spd;
      p.rot += p.rotS;
      cCtx.save();
      cCtx.globalAlpha = Math.max(0, 1 - frames / 160);
      cCtx.translate(p.x, p.y);
      cCtx.rotate(p.rot);
      cCtx.fillStyle = p.col;
      cCtx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
      cCtx.restore();
    }
    frames++;
    if (frames < 180) requestAnimationFrame(drawConfetti);
    else cCtx.clearRect(0, 0, cc.width, cc.height);
  }
  drawConfetti();
}

// ─── 6. Scratch Card Logic 🎰 ────────────────────────
function initScratchCard() {
  const canvas = document.getElementById('scratch-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  // Set real canvas size resolving DPI blurriness
  const rect = canvas.parentElement.getBoundingClientRect();
  const dpr = window.devicePixelRatio || 1;

  canvas.width = rect.width * dpr;
  canvas.height = rect.height * dpr;

  // Scale down the canvas element via CSS so it fits the wrapper, while having high-res drawing buffer
  canvas.style.width = `${rect.width}px`;
  canvas.style.height = `${rect.height}px`;

  ctx.scale(dpr, dpr);

  // Fill with silver scratch layer
  ctx.fillStyle = '#b0b0b0';
  ctx.fillRect(0, 0, rect.width, rect.height);

  // Add some scratch pattern/text overlay
  ctx.font = 'bold 16px Nunito, sans-serif';
  ctx.fillStyle = '#ffffff';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.shadowColor = 'rgba(0,0,0,0.3)';
  ctx.shadowBlur = 4;
  ctx.fillText('Cào thẻ nhận quà 🪙', rect.width / 2, rect.height / 2);

  ctx.shadowBlur = 0; // reset

  let isDragging = false;
  let isRevealed = false;

  function getMousePos(e) {
    const r = canvas.getBoundingClientRect();
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    return {
      x: clientX - r.left,
      y: clientY - r.top
    };
  }

  function scratch(e) {
    if (!isDragging || isRevealed) return;
    e.preventDefault();
    const pos = getMousePos(e);

    ctx.globalCompositeOperation = 'destination-out';
    ctx.beginPath();
    ctx.arc(pos.x, pos.y, 20, 0, Math.PI * 2);
    ctx.fill();
    ctx.globalCompositeOperation = 'source-over'; // restore

    checkReveal();
  }

  function checkReveal() {
    // Check how much is scratched off
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const pixels = imageData.data;
    let transparentCount = 0;

    for (let i = 3; i < pixels.length; i += 4) {
      if (pixels[i] === 0) transparentCount++;
    }

    // If ~40% scratched, reveal the rest
    if (transparentCount > (pixels.length / 4) * 0.4) {
      isRevealed = true;
      canvas.style.transition = 'opacity 0.6s ease';
      canvas.style.opacity = '0';
      setTimeout(() => { canvas.style.display = 'none'; }, 600);

      // Fire confetti again as celebration!
      setTimeout(launchConfetti, 300);
    }
  }

  // Events
  canvas.addEventListener('mousedown', (e) => { isDragging = true; scratch(e); });
  canvas.addEventListener('mousemove', scratch);
  window.addEventListener('mouseup', () => { isDragging = false; });

  canvas.addEventListener('touchstart', (e) => { isDragging = true; scratch(e); }, { passive: false });
  canvas.addEventListener('touchmove', scratch, { passive: false });
  window.addEventListener('touchend', () => { isDragging = false; });
}
