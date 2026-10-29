/* =========================================================
   ADAAYE — petal door
   Clicking Collection, Favourites, Shop or Hampers sends a
   flow of marigold, rose and shiuli petals across the screen.
   Behind the petals the page moves to that section, then the
   petals drift down and away.
   ========================================================= */
(function () {
  'use strict';
  var TARGETS = ['#collection', '#favourites', '#shop', '#hampers'];
  var still = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (still) return;

  var cv = document.createElement('canvas'), cx = cv.getContext('2d');
  cv.setAttribute('aria-hidden', 'true');
  cv.style.cssText = 'position:fixed;inset:0;z-index:400;pointer-events:none;display:none';
  var veil = document.createElement('div');
  veil.style.cssText = 'position:fixed;inset:0;z-index:399;pointer-events:none;opacity:0;' +
    'background:radial-gradient(60% 55% at 50% 50%,rgba(251,247,236,.92),rgba(244,238,224,.97))';
  document.addEventListener('DOMContentLoaded', function () { document.body.appendChild(veil); document.body.appendChild(cv); });

  var W, H, DPR = Math.min(2, window.devicePixelRatio || 1);
  function size() { W = innerWidth; H = innerHeight; cv.width = W * DPR; cv.height = H * DPR; cv.style.width = W + 'px'; cv.style.height = H + 'px'; cx.setTransform(DPR, 0, 0, DPR, 0, 0); }

  var KINDS = ['marigold', 'marigold', 'marigold', 'rose', 'rose', 'shiuli', 'shiuli', 'leaf'];
  function pick() { return KINDS[Math.floor(Math.random() * KINDS.length)]; }
  function petal(p, a) {
    var s = p.s, g;
    cx.save(); cx.translate(p.x, p.y); cx.rotate(p.r); cx.scale(1, .55 + .45 * Math.abs(Math.cos(p.flip))); cx.globalAlpha = a;
    if (p.k === 'marigold') {
      g = cx.createLinearGradient(0, -10 * s, 0, 10 * s); g.addColorStop(0, '#F7B32B'); g.addColorStop(1, '#E8771A'); cx.fillStyle = g;
      cx.beginPath(); cx.moveTo(0, -11 * s); cx.bezierCurveTo(8 * s, -9 * s, 8 * s, 7 * s, 0, 11 * s); cx.bezierCurveTo(-8 * s, 7 * s, -8 * s, -9 * s, 0, -11 * s); cx.fill();
    } else if (p.k === 'rose') {
      g = cx.createRadialGradient(-3 * s, -3 * s, 1, 0, 0, 13 * s); g.addColorStop(0, '#D8434A'); g.addColorStop(1, '#9E1F2A'); cx.fillStyle = g;
      cx.beginPath(); cx.moveTo(0, -12 * s); cx.bezierCurveTo(12 * s, -12 * s, 12 * s, 8 * s, 0, 12 * s); cx.bezierCurveTo(-12 * s, 8 * s, -12 * s, -12 * s, 0, -12 * s); cx.fill();
    } else if (p.k === 'shiuli') {
      cx.fillStyle = '#FFFDF6';
      for (var j = 0; j < 6; j++) { cx.save(); cx.rotate(j * Math.PI / 3); cx.beginPath(); cx.ellipse(0, -6 * s, 3 * s, 6 * s, 0, 0, 6.28); cx.fill(); cx.restore(); }
      cx.fillStyle = '#F07A1A'; cx.beginPath(); cx.arc(0, 0, 2.6 * s, 0, 6.28); cx.fill(); cx.fillRect(-1 * s, 0, 2 * s, 9 * s);
    } else {
      cx.fillStyle = '#6E8B3D'; cx.beginPath(); cx.moveTo(0, -11 * s); cx.quadraticCurveTo(9 * s, 0, 0, 11 * s); cx.quadraticCurveTo(-9 * s, 0, 0, -11 * s); cx.fill();
    }
    cx.restore();
  }

  var P = [], running = false, t0 = 0, jumped = false, target = null, last = 0;
  var SWAP = .5, END = 2.0;   // seconds: page moves at SWAP, everything is gone by END

  function launch(ox, oy) {
    P = [];
    var mobile = W < 600;
    // 1) a burst from the button that was clicked
    for (var i = 0; i < (mobile ? 26 : 38); i++) {
      var a = Math.random() * 6.28, sp = 260 + Math.random() * 520;
      P.push({ k: pick(), x: ox, y: oy, vx: Math.cos(a) * sp, vy: Math.sin(a) * sp * .8 + 60, s: .7 + Math.random() * .9,
        r: Math.random() * 6.28, vr: (Math.random() - .5) * 9, flip: Math.random() * 6.28, vf: 3 + Math.random() * 5, d: 0, drag: 1.9 });
    }
    // 2) a river of petals sweeping across the screen from the left
    for (var j = 0; j < (mobile ? 70 : 120); j++) {
      P.push({ k: pick(), x: -60 - Math.random() * W * .9, y: Math.random() * H * 1.1 - H * .1, vx: W * (1.15 + Math.random() * .6), vy: -40 + Math.random() * 120,
        s: .6 + Math.random() * 1.0, r: Math.random() * 6.28, vr: (Math.random() - .5) * 6, flip: Math.random() * 6.28, vf: 2 + Math.random() * 4,
        d: Math.random() * .25, drag: .55, sw: Math.random() * 6.28 });
    }
  }

  function frame(now) {
    var t = (now - t0) / 1000, dt = Math.min(.05, (now - last) / 1000); last = now;
    // the ivory veil hides the jump between sections
    var v = t < SWAP ? Math.min(1, t / SWAP) : Math.max(0, 1 - (t - SWAP) / .55);
    veil.style.opacity = (v * v * (3 - 2 * v) * .9).toFixed(3);
    if (!jumped && t >= SWAP) {
      jumped = true;
      var y = target.getBoundingClientRect().top + scrollY - (parseFloat(getComputedStyle(document.documentElement).scrollPaddingTop) || 0);
      document.documentElement.style.scrollBehavior = 'auto'; scrollTo(0, y); document.documentElement.style.scrollBehavior = '';
      var head = target.querySelector('h2');
      if (head && head.animate) head.animate([{ opacity: 0, transform: 'translateY(14px)' }, { opacity: 1, transform: 'none' }], { duration: 700, delay: 120, easing: 'cubic-bezier(.22,1,.36,1)', fill: 'backwards' });
    }
    cx.clearRect(0, 0, W, H);
    var fade = 1 - Math.max(0, (t - (END - .6)) / .6);
    for (var i = 0; i < P.length; i++) {
      var p = P[i]; if (t < p.d) continue;
      var k = Math.exp(-p.drag * dt);
      p.vx *= k; p.vy = p.vy * k + 380 * dt * (t > SWAP ? 1 : .35);   // gravity grows after the swap: petals settle down
      if (p.sw !== undefined) p.vy += Math.sin(t * 3 + p.sw) * 40 * dt;
      p.x += p.vx * dt; p.y += p.vy * dt; p.r += p.vr * dt; p.flip += p.vf * dt;
      petal(p, Math.min(1, (t - p.d) / .12) * fade * .96);
    }
    if (t < END) requestAnimationFrame(frame);
    else { running = false; cv.style.display = 'none'; veil.style.opacity = 0; cx.clearRect(0, 0, W, H); }
  }

  document.addEventListener('click', function (e) {
    var a = e.target.closest && e.target.closest('a[href^="#"]');
    if (!a || TARGETS.indexOf(a.getAttribute('href')) < 0 || running) return;
    var el = document.querySelector(a.getAttribute('href')); if (!el) return;
    e.preventDefault();
    history.replaceState(null, '', a.getAttribute('href'));
    size(); cv.style.display = 'block';
    var b = a.getBoundingClientRect();
    target = el; jumped = false; running = true;
    launch(b.left + b.width / 2, b.top + b.height / 2);
    t0 = last = performance.now(); requestAnimationFrame(frame);
  }, true);
})();
