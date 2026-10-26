/* =========================================================
   ADAAYE — welcome intro (home page only)
   Petals flow while the logo builds, then burst away and
   reveal the site. Shows once per visit; "Skip" ends it.
   To turn it off, delete the welcome.js line in index.html.
   ========================================================= */
(function () {
  'use strict';
  var seen = false;
  try { seen = sessionStorage.getItem('adaaye-welcome') === '1'; } catch (e) {}
  var still = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (seen || still || location.hash) return;
  try { sessionStorage.setItem('adaaye-welcome', '1'); } catch (e) {}

  var IMG = 'assets/img/welcome/';
  var css =
    '.aw{position:fixed;inset:0;z-index:300;display:flex;flex-direction:column;align-items:center;justify-content:center;background:#F4EEE0;overflow:hidden;transition:none}' +
    '.aw::before{content:"";position:absolute;inset:0;background:radial-gradient(50% 45% at 50% 46%,rgba(193,137,47,.16),transparent 70%)}' +
    '.aw-stage{position:relative;width:182px;height:306px;z-index:2;flex:0 0 auto}' +
    '.aw-stage img{position:absolute;display:block;opacity:0}' +
    '.aw-txt{position:relative;margin-top:30px;padding:0 16px;text-align:center;z-index:2}' +
    '.aw-word{display:block;margin:0 auto;width:min(290px,68vw);height:auto;opacity:0}' +
    '.aw-line{font-family:var(--display);font-style:italic;font-size:clamp(1rem,3.6vw,1.15rem);color:#5b4a3a;margin-top:1.4rem;opacity:0}' +
    '.aw-skip{position:absolute;right:20px;top:18px;z-index:3;background:none;border:1px solid rgba(46,42,38,.3);border-radius:99px;padding:.35rem .9rem;font:inherit;font-size:.85rem;color:#5b4a3a;cursor:pointer}' +
    '.aw-pet{position:fixed;inset:0;z-index:301;pointer-events:none}' +
    '@media (max-height:640px){.aw-stage{transform:scale(.72);margin:-43px 0}.aw-txt{margin-top:14px}}';
  var st = document.createElement('style'); st.textContent = css; document.head.appendChild(st);

  var wel = document.createElement('div');
  wel.className = 'aw'; wel.setAttribute('role', 'dialog'); wel.setAttribute('aria-label', 'Welcome to Adaaye');
  wel.innerHTML =
    '<button class="aw-skip" type="button">Skip</button>' +
    '<div class="aw-stage">' +
      '<img id="aw-s3" src="' + IMG + 'stone-3.webp" alt="" style="left:29.5px;top:205px;width:151.5px">' +
      '<img id="aw-s2" src="' + IMG + 'stone-2.webp" alt="" style="left:1.5px;top:149.5px;width:157.5px">' +
      '<img id="aw-s1" src="' + IMG + 'stone-1.webp" alt="" style="left:19px;top:53px;width:134px">' +
      '<img id="aw-d2" src="' + IMG + 'dot-2.webp" alt="" style="left:87.5px;top:159px;width:43.5px">' +
      '<img id="aw-d1" src="' + IMG + 'dot-1.webp" alt="" style="left:81px;top:85px;width:49px">' +
      '<img id="aw-d0" src="' + IMG + 'dot-0.webp" alt="" style="left:88.5px;top:4.5px;width:49.5px">' +
    '</div>' +
    '<div class="aw-txt"><img class="aw-word" id="aw-wn" src="assets/img/logo-wordmark-v3.webp" alt="ADAAYE, Artistically Indian">' +
    '<div class="aw-line" id="aw-wl">Every piece begins with a single dot of colour.</div></div>';
  var cv = document.createElement('canvas'); cv.className = 'aw-pet'; cv.setAttribute('aria-hidden', 'true');
  document.body.appendChild(wel); document.body.appendChild(cv);
  var prevOverflow = document.documentElement.style.overflow;
  document.documentElement.style.overflow = 'hidden';

  function $(id) { return document.getElementById(id); }
  function cl(x) { return Math.max(0, Math.min(1, x)); }
  function ease(x) { return 1 - Math.pow(1 - x, 3); }
  function inout(x) { return x < .5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2; }
  function bounce(x) { x = cl(x); return 1 - Math.pow(1 - x, 3) * Math.cos(x * Math.PI * 1.5); }

  var cx = cv.getContext('2d'), W, H, DPR = Math.min(2, window.devicePixelRatio || 1);
  function size() { W = innerWidth; H = innerHeight; cv.width = W * DPR; cv.height = H * DPR; cv.style.width = W + 'px'; cv.style.height = H + 'px'; cx.setTransform(DPR, 0, 0, DPR, 0, 0); }
  size(); window.addEventListener('resize', size);

  var KINDS = ['marigold', 'marigold', 'marigold', 'rose', 'rose', 'shiuli', 'shiuli', 'leaf'];
  var COUNT = W < 600 ? 55 : 90, P = [];
  for (var i = 0; i < COUNT; i++) {
    P.push({ k: KINDS[Math.floor(Math.random() * KINDS.length)], x0: Math.random(), y0: Math.random(), s: .6 + Math.random() * .9,
      sp: .05 + Math.random() * .07, sw: Math.random() * 6.28, swA: 20 + Math.random() * 40, rot: Math.random() * 6.28,
      vr: (Math.random() - .5) * 2.4, ph: Math.random(), ang: Math.random() * 6.28, bv: .35 + Math.random() * .9, delay: Math.random() * .35 });
  }
  function petal(p, x, y, r, a) {
    cx.save(); cx.translate(x, y); cx.rotate(r); cx.globalAlpha = a; var s = p.s, g;
    if (p.k === 'marigold') {
      g = cx.createLinearGradient(0, -10 * s, 0, 10 * s); g.addColorStop(0, '#F7B32B'); g.addColorStop(1, '#E8771A'); cx.fillStyle = g;
      cx.beginPath(); cx.moveTo(0, -11 * s); cx.bezierCurveTo(8 * s, -9 * s, 8 * s, 7 * s, 0, 11 * s); cx.bezierCurveTo(-8 * s, 7 * s, -8 * s, -9 * s, 0, -11 * s); cx.fill();
      cx.strokeStyle = 'rgba(180,80,10,.35)'; cx.lineWidth = .6; cx.beginPath(); cx.moveTo(0, -8 * s); cx.lineTo(0, 9 * s); cx.stroke();
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

  var GO = 2.1, END = GO + 2.0, done = false, t0 = null, goAt = GO;
  function frame(t) {
    var drop = function (id, a0, from, rot) { var k = cl((t - a0) / .55), e = bounce(k), el = $(id); el.style.transform = 'translateY(' + (-from * (1 - e)) + 'px) rotate(' + (rot * (1 - e)) + 'deg)'; el.style.opacity = k > 0 ? 1 : 0; };
    drop('aw-s3', .08, 260, -8); drop('aw-s2', .28, 260, 10); drop('aw-s1', .48, 260, -12);
    var pop = function (id, a0) { var k = cl((t - a0) / .3), el = $(id); el.style.transform = 'scale(' + ease(k) * (1 + .25 * Math.sin(k * Math.PI)) + ')'; el.style.opacity = k > 0 ? 1 : 0; };
    pop('aw-d2', .85); pop('aw-d1', .96); pop('aw-d0', 1.07);
    ['aw-wn', 'aw-wl'].forEach(function (id, i) { var k = cl((t - 1.1 - i * .2) / .45), el = $(id); el.style.opacity = k; el.style.transform = 'translateY(' + (8 * (1 - ease(k))) + 'px)'; });

    cx.clearRect(0, 0, W, H);
    var lr = wel.querySelector('.aw-stage').getBoundingClientRect(), ox = lr.left + lr.width / 2, oy = lr.top + lr.height / 2, go = goAt;
    P.forEach(function (p) {
      var tt = t - p.delay; if (tt < 0) return;
      var prog = (p.ph + tt * p.sp) % 1;
      var x = -80 + prog * (W + 160) + Math.sin(tt * 1.3 + p.sw) * p.swA, y = (p.y0 * H * 1.1 - 60) + prog * H * .35 + Math.cos(tt * .9 + p.sw) * 14;
      var a = Math.min(1, tt / .4) * .95, r = p.rot + tt * p.vr;
      if (t > go) {
        var ge = ease(cl((t - go) / .35)), gx = x + (ox - x) * ge * .55, gy = y + (oy - y) * ge * .55;
        var bk = cl((t - go - .2) / 1.4), be = ease(bk), dist = be * Math.hypot(W, H) * .75 * p.bv, ang = p.ang + be * 1.6;
        x = gx + Math.cos(ang) * dist; y = gy + Math.sin(ang) * dist - be * 60; r += be * 8 * p.vr; a *= 1 - cl((bk - .6) / .4);
      }
      petal(p, x, y, r, a);
    });
    var re = inout(cl((t - go - .25) / .8));
    wel.style.opacity = 1 - re; wel.style.transform = 'scale(' + (1 + re * .06) + ')';
    if (re > 0) { wel.style.pointerEvents = 'none'; document.documentElement.style.overflow = prevOverflow; }
    if (t > go + .35) {
      var fk = t - go - .35;
      for (var j = 0; j < Math.min(34, P.length); j++) {
        var q = P[j], fy = -30 + ((fk * (90 + q.bv * 80) + q.y0 * 200) % (H + 60)), fx = q.x0 * W + Math.sin(fk * 1.4 + q.sw) * 30,
            fa = cl(fk / .3) * (1 - cl((fk - .9) / .7));
        if (fa > 0) petal(q, fx, fy, q.rot + fk * q.vr, fa * .95);
      }
    }
  }
  function finish() {
    if (done) return; done = true;
    window.removeEventListener('resize', size);
    document.documentElement.style.overflow = prevOverflow;
    if (wel.parentNode) wel.parentNode.removeChild(wel);
    if (cv.parentNode) cv.parentNode.removeChild(cv);
  }
  wel.querySelector('.aw-skip').addEventListener('click', function () {
    var t = t0 === null ? 0 : (performance.now() - t0) / 1000;
    if (t < goAt) { goAt = Math.max(t, 0); END = goAt + 2.0; }
  });
  document.addEventListener('keydown', function esc(e) { if (e.key === 'Escape') { finish(); document.removeEventListener('keydown', esc); } });
  function loop(now) {
    if (done) return;
    if (t0 === null) t0 = now;
    var t = (now - t0) / 1000;
    frame(t);
    if (t >= END) finish(); else requestAnimationFrame(loop);
  }
  requestAnimationFrame(loop);
})();
