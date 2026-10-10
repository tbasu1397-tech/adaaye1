/* =========================================================
   ADAAYE — site behaviour (shared by all pages)
   Settings live in config.js, products in products.js.
   You should not need to edit this file.
   ========================================================= */
(function () {
  'use strict';

  var C = window.ADAAYE || {};
  var CATS = window.ADAAYE_CATEGORIES || [];
  var PRODUCTS = window.ADAAYE_PRODUCTS || [];
  var IMG = 'assets/img/';

  function $(s, r) { return (r || document).querySelector(s); }
  function $$(s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); }
  function esc(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }

  /* ---------- contact channels ---------- */
  var handle = (C.instagram || '_adaaye').replace(/^@/, '');
  var igUrl = 'https://instagram.com/' + handle;
  var waNumber = String(C.whatsapp || '').replace(/\D/g, '');
  var hasWa = waNumber.length >= 8 && waNumber.length <= 15;
  var hasMail = /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(C.email || '');
  var upiId = String(C.upiId || '').trim();
  var hasUpi = /^[\w.\-]{2,}@[\w.\-]{2,}$/.test(upiId);
  var qrImage = String(C.upiQrImage || '').trim();

  function waLink(text) { return 'https://wa.me/' + waNumber + '?text=' + encodeURIComponent(text); }
  function mailLink(subject, body) {
    return 'mailto:' + C.email + '?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(body || '');
  }
  function hideEl(el) {
    var target = el.hasAttribute('data-hide-parent') ? el.parentElement : el;
    target.hidden = true;
  }

  $$('[data-ig]').forEach(function (a) { a.href = igUrl; a.target = '_blank'; a.rel = 'noopener'; });
  $$('[data-ig-handle]').forEach(function (el) { el.textContent = '@' + handle; });
  $$('[data-wa]').forEach(function (a) {
    if (!hasWa) { hideEl(a); return; }
    a.href = waLink(a.getAttribute('data-wa') || 'Hi Adaaye!');
    a.target = '_blank'; a.rel = 'noopener';
  });
  $$('[data-mail]').forEach(function (a) {
    if (!hasMail) { hideEl(a); return; }
    a.href = mailLink(a.getAttribute('data-mail') || 'Hello Adaaye');
    if (a.hasAttribute('data-mail-text')) a.textContent = C.email;
  });

  /* ---------- mobile menu ---------- */
  var navbar = $('.navbar'), menuBtn = $('.menu-btn');
  if (navbar && menuBtn) {
    menuBtn.addEventListener('click', function () {
      var open = navbar.classList.toggle('is-open');
      menuBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
      menuBtn.textContent = open ? 'Close' : 'Menu';
    });
    $$('.nav-links a', navbar).forEach(function (a) {
      a.addEventListener('click', function () {
        navbar.classList.remove('is-open');
        menuBtn.setAttribute('aria-expanded', 'false');
        menuBtn.textContent = 'Menu';
      });
    });
  }

  /* ---------- money ---------- */
  var rates = C.rates || { INR: 1 };
  var symbols = C.symbols || { INR: '₹' };
  var currency = 'INR';
  function rupees(n) { return '₹' + Math.round(n).toLocaleString('en-IN'); }
  function shown(inr) {
    var v = inr * (rates[currency] || 1);
    var whole = currency === 'INR' || currency === 'RUB';
    return (symbols[currency] || '') + (whole ? Math.round(v).toLocaleString('en-IN') : v.toFixed(2));
  }

  /* ---------- price reveal ---------- */
  var revealAt = Date.parse(C.priceRevealAt || '') || 0;
  var revealLabel = C.priceRevealLabel || '';
  function pricesLive() { return !revealAt || Date.now() >= revealAt; }
  var lockedText = 'Coming ' + revealLabel;

  /* ---------- shop ---------- */
  var SHOP_IMG = IMG + 'shop/';
  function valuesOf(o) {
    return (o.values || []).map(function (v) { return typeof v === 'object' ? v : { v: String(v) }; });
  }
  function photoUrl(name) { return SHOP_IMG + name + '.webp'; }
  var state = PRODUCTS.map(function (p) {
    return { sel: (p.options || []).map(function () { return 0; }), ask: '' };
  });
  function chosen(i) {
    var p = PRODUCTS[i];
    return (p.options || []).map(function (o, k) { return { label: o.label, val: valuesOf(o)[state[i].sel[k]] || {} }; });
  }
  function priceOf(i) {
    var price = +PRODUCTS[i].price || 0;
    chosen(i).forEach(function (c) { if (+c.val.price > 0) price = +c.val.price; });
    return price;
  }
  function optsText(i) {
    return chosen(i).map(function (c) { return c.val.v; }).filter(Boolean).join(', ');
  }
  function askLine(i) {
    var p = PRODUCTS[i], t = state[i].ask.trim();
    return p.ask && t ? p.ask + ': ' + t : '';
  }
  function askLink(i, soon) {
    var p = PRODUCTS[i], o = optsText(i), a = askLine(i);
    var text = soon
      ? "Hi Adaaye! I'd love to know when the " + p.name + ' is ready.'
      : "Hi Adaaye! I'd like to order the " + p.name + (o ? ' (' + o + ')' : '') + '.' + (a ? ' ' + a + '.' : '') + ' Could you share the price?';
    if (hasWa) return waLink(text);
    if (hasMail) return mailLink((soon ? 'About the ' : 'Order: ') + p.name, text);
    return igUrl;
  }

  var shelves = $('#shelves');
  if (shelves) {
    var pills = $('#pills');
    var html = '';
    var pillHtml = '<button class="pill" type="button" data-cat="all" aria-pressed="true">All<b>' + PRODUCTS.length + '</b></button>';

    var card = function (p) {
      var i = PRODUCTS.indexOf(p);
      var soon = p.status === 'soon' || !(p.photos && p.photos.length);
      var out = '<article class="piece' + (soon ? ' piece--soon' : '') + '" data-i="' + i + '">';
      if (soon) {
        out += '<div class="piece-photo piece-easel"><span class="badge">In progress</span>' +
          '<p>On the easel</p></div>';
      } else {
        var n = p.photos.length;
        out += '<div class="gal' + (p.fit === 'contain' ? ' gal--contain' : '') + '">' +
          '<div class="gal-track" tabindex="0" role="group" aria-roledescription="carousel" aria-label="Photos of ' + esc(p.name) + '">' +
          p.photos.map(function (ph, k) {
            return '<div class="gal-slide" role="group" aria-label="Photo ' + (k + 1) + ' of ' + n + '">' +
              '<img src="' + photoUrl(ph) + '" alt="' + (k === 0 ? esc(p.name) + ', hand-painted by Adaaye' : '') + '" loading="lazy" decoding="async" width="880" height="1100" draggable="false"></div>';
          }).join('') + '</div>';
        if (n > 1) {
          out += '<button class="gal-btn gal-prev" type="button" aria-label="Previous photo" disabled>&#8249;</button>' +
            '<button class="gal-btn gal-next" type="button" aria-label="Next photo">&#8250;</button>' +
            '<div class="gal-dots" aria-hidden="true">' + p.photos.map(function (x, k) { return '<span' + (k === 0 ? ' class="on"' : '') + '></span>'; }).join('') + '</div>' +
            '<span class="gal-count" aria-live="polite">1 / ' + n + '</span>';
        }
        out += '</div>';
      }
      out += '<h4>' + esc(p.name) + '</h4>' +
        '<p class="piece-style">' + esc(p.style || '') + (p.note ? '. ' + esc(p.note) : '') + '</p>';
      if (!soon) {
        (p.options || []).forEach(function (o, k) {
          out += '<div class="opt" role="group" aria-label="' + esc(o.label) + '"><span class="opt-label">' + esc(o.label) + '</span><div class="chips">' +
            valuesOf(o).map(function (v, j) {
              return '<button class="chip" type="button" data-opt="' + k + '" data-val="' + j + '" aria-pressed="' + (j === 0 ? 'true' : 'false') + '">' + esc(v.v) + '</button>';
            }).join('') + '</div></div>';
        });
        if (p.ask) out += '<label class="ask"><span class="opt-label">' + esc(p.ask) + '</span><input type="text" maxlength="40" data-ask placeholder="Type here"></label>';
      }
      out += '<div class="piece-foot"></div></article>';
      return out;
    };

    CATS.forEach(function (cat) {
      var items = PRODUCTS.filter(function (p) { return p.cat === cat.id; });
      if (!items.length) return;
      var ready = items.filter(function (p) { return p.status !== 'soon'; }).length;
      pillHtml += '<button class="pill" type="button" data-cat="' + esc(cat.id) + '" aria-pressed="false">' +
        esc(cat.short || cat.name) + '<b>' + items.length + '</b></button>';
      html += '<section class="shelf" data-shelf="' + esc(cat.id) + '" id="shop-' + esc(cat.id) + '">' +
        '<div class="shelf-head"><h3>' + esc(cat.name) + '</h3>' +
        '<span class="shelf-count">' + (ready ? ready + (ready === 1 ? ' piece' : ' pieces') : 'Coming soon') +
        (items.length > ready ? ' · ' + (items.length - ready) + ' in progress' : '') + '</span>' +
        '<p>' + esc(cat.blurb) + '</p></div>' +
        '<div class="grid">' + items.map(card).join('') + '</div></section>';
    });

    shelves.innerHTML = html;
    pills.innerHTML = pillHtml;

    var foot = function (i) {
      var el = $('.piece[data-i="' + i + '"] .piece-foot', shelves);
      if (!el) return;
      var p = PRODUCTS[i];
      if (p.status === 'soon' || !(p.photos && p.photos.length)) {
        el.innerHTML = '<span class="price price--soon">Coming soon</span>' +
          '<a class="add" target="_blank" rel="noopener" href="' + esc(askLink(i, true)) + '">Notify me</a>';
        return;
      }
      var price = priceOf(i);
      if (!pricesLive()) {
        el.innerHTML = '<span class="price price--locked" aria-label="Price revealed ' + esc(revealLabel) + '">₹ · · ·</span>' +
          '<button class="add" type="button" disabled>' + esc(lockedText) + '</button>';
      } else if (price > 0) {
        el.innerHTML = '<span class="price" data-inr="' + price + '">' + shown(price) + '</span>' +
          '<button class="add" type="button" data-add="' + i + '">Add to cart</button>';
      } else {
        el.innerHTML = '<span class="price price--ask">Price on request</span>' +
          '<a class="add" target="_blank" rel="noopener" data-askbtn="' + i + '" href="' + esc(askLink(i)) + '">Ask to order</a>';
      }
    };
    var allFeet = function () { PRODUCTS.forEach(function (p, i) { foot(i); }); };
    allFeet();

    /* swipe galleries */
    $$('.gal', shelves).forEach(function (g) {
      var track = $('.gal-track', g), dots = $$('.gal-dots span', g), count = $('.gal-count', g);
      var prev = $('.gal-prev', g), next = $('.gal-next', g);
      var n = $$('.gal-slide', g).length;
      if (n < 2) return;
      var at = function () { return Math.round(track.scrollLeft / Math.max(1, track.clientWidth)); };
      var go = function (k) {
        k = Math.max(0, Math.min(n - 1, k));
        track.scrollTo({ left: k * track.clientWidth, behavior: 'smooth' });
      };
      g.goTo = go;
      var sync = function () {
        var k = at();
        dots.forEach(function (d, j) { d.className = j === k ? 'on' : ''; });
        if (count) count.textContent = (k + 1) + ' / ' + n;
        prev.disabled = k === 0; next.disabled = k === n - 1;
      };
      var raf = 0;
      track.addEventListener('scroll', function () { cancelAnimationFrame(raf); raf = requestAnimationFrame(sync); }, { passive: true });
      prev.addEventListener('click', function () { go(at() - 1); });
      next.addEventListener('click', function () { go(at() + 1); });
      track.addEventListener('keydown', function (e) {
        if (e.key === 'ArrowRight') { e.preventDefault(); go(at() + 1); }
        if (e.key === 'ArrowLeft') { e.preventDefault(); go(at() - 1); }
      });
      // drag with the mouse on desktop
      var down = false, startX = 0, startLeft = 0, moved = false;
      track.addEventListener('mousedown', function (e) { down = true; moved = false; startX = e.pageX; startLeft = track.scrollLeft; track.classList.add('is-drag'); });
      window.addEventListener('mousemove', function (e) {
        if (!down) return;
        var dx = e.pageX - startX;
        if (Math.abs(dx) > 4) moved = true;
        track.scrollLeft = startLeft - dx;
      });
      window.addEventListener('mouseup', function (e) {
        if (!down) return;
        down = false; track.classList.remove('is-drag');
        var dx = e.pageX - startX, k = Math.round(startLeft / Math.max(1, track.clientWidth));
        go(Math.abs(dx) > track.clientWidth * 0.15 ? k + (dx < 0 ? 1 : -1) : k);
      });
      window.addEventListener('resize', function () { track.scrollLeft = at() * track.clientWidth; });
    });

    /* option chips, personal text */
    shelves.addEventListener('click', function (e) {
      var chip = e.target.closest('.chip');
      if (chip) {
        var pc = chip.closest('.piece'), i = +pc.getAttribute('data-i');
        var k = +chip.getAttribute('data-opt'), j = +chip.getAttribute('data-val');
        state[i].sel[k] = j;
        $$('.chip[data-opt="' + k + '"]', pc).forEach(function (c) { c.setAttribute('aria-pressed', c === chip ? 'true' : 'false'); });
        var v = valuesOf(PRODUCTS[i].options[k])[j];
        var g = $('.gal', pc);
        if (v && v.photo && g && g.goTo) g.goTo(v.photo - 1);
        foot(i);
        return;
      }
      var btn = e.target.closest('[data-add]');
      if (!btn || btn.disabled || !pricesLive()) return;
      var idx = +btn.getAttribute('data-add'), p = PRODUCTS[idx];
      if (p.ask && !state[idx].ask.trim()) {
        var inp = $('.piece[data-i="' + idx + '"] [data-ask]', shelves);
        inp.setAttribute('aria-invalid', 'true'); inp.focus();
        inp.placeholder = 'Please fill this in';
        return;
      }
      addToCart(idx);
      btn.textContent = 'Added';
      btn.classList.add('is-added');
      setTimeout(function () { btn.textContent = 'Add to cart'; btn.classList.remove('is-added'); }, 1400);
    });
    shelves.addEventListener('input', function (e) {
      if (!e.target.hasAttribute('data-ask')) return;
      var i = +e.target.closest('.piece').getAttribute('data-i');
      state[i].ask = e.target.value;
      e.target.removeAttribute('aria-invalid');
      var a = $('.piece[data-i="' + i + '"] [data-askbtn]', shelves);
      if (a) a.href = askLink(i);
    });

    pills.addEventListener('click', function (e) {
      var btn = e.target.closest('.pill');
      if (!btn) return;
      var cat = btn.getAttribute('data-cat');
      $$('.pill', pills).forEach(function (b) { b.setAttribute('aria-pressed', b === btn ? 'true' : 'false'); });
      $$('.shelf', shelves).forEach(function (s) { s.hidden = !(cat === 'all' || s.getAttribute('data-shelf') === cat); });
    });

    var sel = $('#currency');
    if (sel) {
      sel.addEventListener('change', function () {
        currency = sel.value;
        $$('.price[data-inr]').forEach(function (el) { el.textContent = shown(parseFloat(el.getAttribute('data-inr'))); });
      });
    }

    // countdown bar above the shop until prices are revealed
    var tools = $('.shop-tools');
    var currencyLabel = sel ? sel.closest('label') : null;
    if (!pricesLive() && tools) {
      tools.insertAdjacentHTML('beforebegin',
        '<div class="reveal-bar" id="revealBar" role="timer" aria-live="off">' +
          '<p>Prices unveil on <b>' + esc(revealLabel) + '</b></p>' +
          '<p class="reveal-count" id="revealCount"></p>' +
        '</div>');
      if (currencyLabel) currencyLabel.hidden = true;
      var pad = function (n) { return (n < 10 ? '0' : '') + n; };
      var tick = function () {
        var left = revealAt - Date.now();
        if (left <= 0) { unlockPrices(); return; }
        var d = Math.floor(left / 864e5), h = Math.floor(left / 36e5) % 24,
            m = Math.floor(left / 6e4) % 60, sec = Math.floor(left / 1e3) % 60;
        $('#revealCount').innerHTML =
          '<span><b>' + d + '</b>days</span><span><b>' + pad(h) + '</b>hours</span>' +
          '<span><b>' + pad(m) + '</b>minutes</span><span><b>' + pad(sec) + '</b>seconds</span>';
      };
      var timer = setInterval(tick, 1000);
      tick();
      function unlockPrices() {
        clearInterval(timer);
        var bar = $('#revealBar'); if (bar) bar.remove();
        if (currencyLabel) currencyLabel.hidden = false;
        allFeet();
      }
    }
  }

  /* ---------- favourites: a hand of cards ---------- */
  var deck = $('#fanDeck');
  if (deck) {
    var cards = $$('.fan-card', deck), label = $('#fanName');
    var mid = (cards.length - 1) / 2, active = null;
    var narrow = function () { return window.innerWidth <= 640; };
    var layout = function () {
      cards.forEach(function (card, i) {
        var d = i - mid, ad = Math.abs(d), spread = narrow() ? 0.5 : 1;
        var x = d * 4.6 * spread, y = ad * ad * 0.5, rot = d * 9, scale = 1 - 0.055 * ad * ad, z = 10 - Math.round(ad);
        if (active !== null) {
          if (i === active) { y -= narrow() ? 1.2 : 2.2; scale = scale * 1.14 + 0.05; rot = 0; z = 20; }
          else { var k = i - active; x += (k > 0 ? 1 : -1) * (narrow() ? 1 : 2.2) / Math.abs(k); z = 10 - Math.abs(k); }
        }
        card.style.transform = 'translate(' + x + 'rem,' + y + 'rem) rotate(' + rot + 'deg) scale(' + scale + ')';
        card.style.zIndex = z;
        card.setAttribute('aria-pressed', i === active ? 'true' : 'false');
      });
      if (label) label.textContent = active === null ? '' : cards[active].getAttribute('data-name');
    };
    cards.forEach(function (card, i) {
      card.addEventListener('mouseenter', function () { active = i; layout(); });
      card.addEventListener('focus', function () { active = i; layout(); });
      card.addEventListener('click', function (e) { e.stopPropagation(); active = (active === i && narrow()) ? null : i; layout(); });
    });
    deck.addEventListener('mouseleave', function () { active = null; layout(); });
    document.addEventListener('click', function (e) { if (!deck.contains(e.target)) { active = null; layout(); } });
    window.addEventListener('resize', layout);
    layout();
  }

  /* ---------- drop list ---------- */
  var dropForm = $('#dropForm');
  if (dropForm) {
    dropForm.addEventListener('submit', function (e) {
      e.preventDefault();
      var email = $('#dropEmail').value.trim();
      var msg = $('#dropMsg');
      if (!email) return;
      var text = 'Hi Adaaye! Please add me to your list for limited-edition drops. My email is ' + email + '.';
      if (hasMail) {
        window.location.href = mailLink('Add me to the drop list', text);
        msg.textContent = "Your email app is opening. Press send and you're on the list.";
      } else if (hasWa) {
        window.open(waLink(text), '_blank', 'noopener');
        msg.textContent = "WhatsApp is opening. Press send and you're on the list.";
      } else {
        window.open(igUrl, '_blank', 'noopener');
        msg.textContent = 'Follow @' + handle + ' on Instagram. Every new drop is announced there first.';
      }
    });
  }

  /* ---------- enquiry box ---------- */
  var enq = $('#enqForm');
  if (enq) {
    var enqTo = String(C.enquiryEmail || C.email || '').trim();
    var w3Key = String(C.web3formsKey || '').trim();
    var topicBox = $('#eTopic'), pieceSel = $('#ePiece');
    var done = $('#enqDone'), sendBtn = $('#eSend'), errBox = $('#enqError');

    PRODUCTS.forEach(function (p) {
      var o = document.createElement('option');
      o.value = o.textContent = p.name + (p.status === 'soon' ? ' (in progress)' : '');
      pieceSel.appendChild(o);
    });
    topicBox.addEventListener('click', function (e) {
      var c = e.target.closest('.chip'); if (!c) return;
      $$('.chip', topicBox).forEach(function (b) { b.setAttribute('aria-pressed', b === c ? 'true' : 'false'); });
    });
    enq.addEventListener('input', function (e) {
      if (e.target.getAttribute('aria-invalid') === 'true') e.target.setAttribute('aria-invalid', 'false');
      errBox.hidden = true;
    });
    var topic = function () { var c = $('.chip[aria-pressed="true"]', topicBox); return c ? c.textContent : ''; };
    var v = function (id) { return $('#' + id).value.trim(); };

    var showDone = function (name, viaMail) {
      enq.hidden = true; done.hidden = false;
      $('#enqThanks').textContent = 'Thank you' + (name ? ', ' + name.split(' ')[0] : '') + '.';
      $('#enqDoneText').textContent = viaMail
        ? 'Your email app has opened with your message ready. Press send and it goes straight to Titas.'
        : 'Your message is on its way to Titas. You will hear back on ' + v('eEmail') + ' within 24 hours.';
      $('#enqThanks').focus();
    };
    $('#enqAgain').addEventListener('click', function () {
      enq.reset(); $$('.chip', topicBox).forEach(function (b, i) { b.setAttribute('aria-pressed', i === 0 ? 'true' : 'false'); });
      done.hidden = true; enq.hidden = false; $('#eName').focus();
    });

    enq.addEventListener('submit', function (e) {
      e.preventDefault();
      if ($('#eBot').checked) return;
      var checks = [
        ['eName', function (x) { return x.length > 1; }, 'Please enter your name.'],
        ['eEmail', function (x) { return /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(x); }, 'Please enter a valid email address so we can reply.'],
        ['eMsg', function (x) { return x.length > 4; }, 'Please write your message.']
      ];
      var bad = null, problem = '';
      checks.forEach(function (c) {
        var el = $('#' + c[0]), ok = c[1](el.value.trim());
        el.setAttribute('aria-invalid', ok ? 'false' : 'true');
        if (!ok && !bad) { bad = el; problem = c[2]; }
      });
      if (bad) { errBox.textContent = problem; errBox.hidden = false; bad.focus(); return; }
      errBox.hidden = true;

      var name = v('eName'), subject = 'Website enquiry: ' + topic() + ' from ' + name;
      var data = {
        Name: name, Email: v('eEmail'), Phone: v('ePhone') || '-',
        Topic: topic(), Piece: pieceSel.value || '-', Message: v('eMsg')
      };
      var asText = Object.keys(data).map(function (k) { return k + ': ' + data[k]; }).join('\n');
      var mailFallback = function () {
        if (!enqTo) { errBox.textContent = 'Sorry, the message could not be sent. Please message us on Instagram @' + handle + '.'; errBox.hidden = false; return; }
        window.location.href = 'mailto:' + enqTo + '?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(asText);
        showDone(name, true);
      };

      var url, body;
      if (w3Key) {
        url = 'https://api.web3forms.com/submit';
        body = { access_key: w3Key, subject: subject, from_name: 'Adaaye website', replyto: data.Email };
      } else if (enqTo) {
        url = 'https://formsubmit.co/ajax/' + encodeURIComponent(enqTo);
        body = { _subject: subject, _template: 'table', _captcha: 'false', _replyto: data.Email };
      } else { mailFallback(); return; }
      Object.keys(data).forEach(function (k) { body[k] = data[k]; });

      sendBtn.disabled = true; sendBtn.textContent = 'Sending...';
      fetch(url, { method: 'POST', headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' }, body: JSON.stringify(body) })
        .then(function (r) { return r.json().then(function (j) { return { ok: r.ok, j: j }; }); })
        .then(function (res) {
          var ok = res.ok && (res.j.success === true || res.j.success === 'true');
          if (ok) showDone(name, false); else mailFallback();
        })
        .catch(mailFallback)
        .then(function () { sendBtn.disabled = false; sendBtn.textContent = 'Send enquiry'; });
    });
  }

  /* =======================================================
     CART
     ======================================================= */
  var cart = [];
  try { cart = JSON.parse(localStorage.getItem('adaaye-cart-v2') || '[]') || []; } catch (e) { cart = []; }
  if (!Array.isArray(cart)) cart = [];
  function save() { try { localStorage.setItem('adaaye-cart-v2', JSON.stringify(cart)); } catch (e) {} }
  function count() { return cart.reduce(function (s, i) { return s + i.qty; }, 0); }
  function total() { return cart.reduce(function (s, i) { return s + i.price * i.qty; }, 0); }

  // build the drawer once, on every page
  var holder = document.createElement('div');
  holder.innerHTML =
    '<div class="veil" id="veil"></div>' +
    '<aside class="drawer" id="drawer" role="dialog" aria-modal="true" aria-labelledby="drawerTitle" aria-hidden="true">' +
      '<div class="drawer-head"><h2 id="drawerTitle">Your cart</h2><button class="drawer-close" id="drawerClose" type="button" aria-label="Close cart">&times;</button></div>' +
      '<div class="drawer-body">' +

        '<div id="stepCart">' +
          '<div id="cartLines"></div>' +
          '<div class="total"><span>Total</span><span id="cartTotal">₹0</span></div>' +
          '<button class="btn" id="toDetails" type="button">Continue to your details</button>' +
          '<p class="fine">Orders are always billed in Indian Rupees. We ship across India.</p>' +
        '</div>' +

        '<form id="stepDetails" hidden novalidate>' +
          '<button class="back" type="button" data-back="stepCart">Back to cart</button>' +
          '<h3>Where should we send it?</h3>' +
          '<p class="form-error" id="formError" role="alert" hidden></p>' +
          '<label class="field">Full name<input type="text" id="cName" autocomplete="name" required></label>' +
          '<label class="field">Phone number<input type="tel" id="cPhone" autocomplete="tel" inputmode="tel" placeholder="10-digit mobile" required></label>' +
          '<label class="field">Email, for order updates (optional)<input type="email" id="cEmail" autocomplete="email"></label>' +
          '<label class="field">Address<input type="text" id="cAddress" autocomplete="street-address" required></label>' +
          '<div class="field-row">' +
            '<label class="field">City<input type="text" id="cCity" autocomplete="address-level2" required></label>' +
            '<label class="field">PIN code<input type="text" id="cPin" autocomplete="postal-code" inputmode="numeric" required></label>' +
          '</div>' +
          '<label class="check"><input type="checkbox" id="cOffers" checked><span>Tell me about limited-edition drops and offers</span></label>' +
          '<button class="btn" type="submit">Continue to payment</button>' +
        '</form>' +

        '<div id="stepPay" hidden>' +
          '<button class="back" type="button" data-back="stepDetails">Back to your details</button>' +
          '<h3>Pay and send your order</h3>' +
          '<ul class="summary" id="summary"></ul>' +
          '<div class="pay" id="payBox"></div>' +
          '<div id="sendBox"></div>' +
          '<p class="fine" id="sendNote"></p>' +
        '</div>' +

      '</div>' +
    '</aside>';
  while (holder.firstChild) document.body.appendChild(holder.firstChild);

  var veil = $('#veil'), drawer = $('#drawer');
  var steps = { stepCart: $('#stepCart'), stepDetails: $('#stepDetails'), stepPay: $('#stepPay') };
  var lastFocus = null;

  function show(step) {
    Object.keys(steps).forEach(function (k) { steps[k].hidden = k !== step; });
    $('.drawer-body', drawer).scrollTop = 0;
  }
  function openDrawer() {
    lastFocus = document.activeElement;
    drawer.classList.add('is-open'); veil.classList.add('is-open');
    drawer.setAttribute('aria-hidden', 'false');
    $('#drawerClose').focus();
  }
  function closeDrawer() {
    drawer.classList.remove('is-open'); veil.classList.remove('is-open');
    drawer.setAttribute('aria-hidden', 'true');
    if (lastFocus && lastFocus.focus) lastFocus.focus();
  }
  $$('[data-cart-open]').forEach(function (b) { b.addEventListener('click', function () { show('stepCart'); openDrawer(); }); });
  $('#drawerClose').addEventListener('click', closeDrawer);
  veil.addEventListener('click', closeDrawer);
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && drawer.classList.contains('is-open')) closeDrawer(); });
  $$('[data-back]', drawer).forEach(function (b) { b.addEventListener('click', function () { show(b.getAttribute('data-back')); }); });

  function renderCart() {
    var n = count();
    $$('[data-cart-count]').forEach(function (el) { el.textContent = n; el.hidden = n === 0; });
    var lines = $('#cartLines');
    if (!cart.length) {
      lines.innerHTML = '<p class="cart-empty">Your cart is empty. Add a piece from the shop and it will wait for you here.</p>';
    } else {
      lines.innerHTML = cart.map(function (item, i) {
        return '<div class="line"><img src="' + esc(item.img) + '" alt="">' +
          '<div><p class="line-name">' + esc(item.name) + '</p>' +
          (item.opts || item.extra ? '<p class="line-opts">' + esc([item.opts, item.extra].filter(Boolean).join(' · ')) + '</p>' : '') +
          '<p class="line-price">' + rupees(item.price) + '</p>' +
          '<div class="qty"><button type="button" data-dec="' + i + '" aria-label="One less">&minus;</button><span>' + item.qty + '</span>' +
          '<button type="button" data-inc="' + i + '" aria-label="One more">+</button>' +
          '<button type="button" class="remove" data-rm="' + i + '">Remove</button></div></div></div>';
      }).join('');
    }
    $('#cartTotal').textContent = rupees(total());
    $('#toDetails').disabled = !cart.length;
    save();
  }
  function addToCart(i) {
    var p = PRODUCTS[i], opts = optsText(i), extra = askLine(i);
    var key = p.name + '|' + opts + '|' + extra;
    var found = cart.filter(function (c) { return c.key === key; })[0];
    if (found) found.qty += 1;
    else cart.push({ key: key, name: p.name, opts: opts, extra: extra, price: priceOf(i), img: photoUrl(p.photos[0]), qty: 1 });
    renderCart();
  }
  function lineName(item) {
    return item.name + (item.opts ? ' (' + item.opts + ')' : '') + (item.extra ? ', ' + item.extra : '');
  }
  $('#cartLines').addEventListener('click', function (e) {
    var b = e.target.closest('button');
    if (!b) return;
    if (b.hasAttribute('data-inc')) cart[+b.getAttribute('data-inc')].qty++;
    else if (b.hasAttribute('data-dec')) { var i = +b.getAttribute('data-dec'); cart[i].qty--; if (cart[i].qty <= 0) cart.splice(i, 1); }
    else if (b.hasAttribute('data-rm')) cart.splice(+b.getAttribute('data-rm'), 1);
    renderCart();
  });
  $('#toDetails').addEventListener('click', function () { if (cart.length) show('stepDetails'); });

  /* ---------- details ---------- */
  function val(id) { return $('#' + id).value.trim(); }
  steps.stepDetails.addEventListener('submit', function (e) {
    e.preventDefault();
    var err = $('#formError'), problem = '', bad = null;
    var checks = [
      ['cName', function (v) { return v.length > 1; }, 'Please enter your full name.'],
      ['cPhone', function (v) { return v.replace(/\D/g, '').length >= 10; }, 'Please enter a phone number with at least 10 digits.'],
      ['cAddress', function (v) { return v.length > 4; }, 'Please enter your delivery address.'],
      ['cCity', function (v) { return v.length > 1; }, 'Please enter your city.'],
      ['cPin', function (v) { return /^\d{6}$/.test(v.replace(/\s/g, '')); }, 'Please enter a 6-digit PIN code.']
    ];
    checks.forEach(function (c) {
      var el = $('#' + c[0]), ok = c[1](el.value.trim());
      el.setAttribute('aria-invalid', ok ? 'false' : 'true');
      if (!ok && !bad) { bad = el; problem = c[2]; }
    });
    if (bad) { err.textContent = problem; err.hidden = false; bad.focus(); return; }
    err.hidden = true;
    renderPay();
    show('stepPay');
  });

  /* ---------- order text ---------- */
  function orderText() {
    var items = cart.map(function (i) { return '- ' + lineName(i) + ' x' + i.qty + ' (' + rupees(i.price * i.qty) + ')'; }).join('\n');
    var email = val('cEmail');
    return "Hi Adaaye! I'd like to place this order:\n\n" + items +
      '\n\nTotal: ' + rupees(total()) +
      '\n\nName: ' + val('cName') +
      '\nPhone: ' + val('cPhone') +
      (email ? '\nEmail: ' + email : '') +
      '\nAddress: ' + val('cAddress') + ', ' + val('cCity') + ' - ' + val('cPin') +
      ($('#cOffers').checked ? '\n\nYes, please tell me about future drops.' : '');
  }

  /* ---------- payment scanner + send buttons ---------- */
  function renderPay() {
    var amount = Math.round(total());
    $('#summary').innerHTML = cart.map(function (i) {
      return '<li><span>' + esc(lineName(i)) + ' &times; ' + i.qty + '</span><span>' + rupees(i.price * i.qty) + '</span></li>';
    }).join('') + '<li><span>Total</span><span>' + rupees(amount) + '</span></li>';

    var pay = $('#payBox');
    var upiUrl = hasUpi ? 'upi://pay?pa=' + encodeURIComponent(upiId) + '&pn=' + encodeURIComponent(C.upiName || 'Adaaye') +
      '&am=' + amount + '&cu=INR&tn=' + encodeURIComponent('Adaaye order') : '';
    var idLine = hasUpi ? '<p class="upi-line">UPI ID <code>' + esc(upiId) + '</code><button class="copy" type="button" id="copyUpi">Copy</button></p>' : '';

    if (qrImage) {
      pay.innerHTML = '<h4>Scan to pay ' + rupees(amount) + '</h4>' +
        '<div class="pay-qr"><img src="' + esc(qrImage) + '" alt="Adaaye UPI payment scanner"></div>' +
        '<p class="fine" style="margin:0 0 .6rem">Enter ' + rupees(amount) + ' in your payment app after scanning.</p>' + idLine;
    } else if (hasUpi && typeof window.qrcode === 'function') {
      var qr = window.qrcode(0, 'M'); qr.addData(upiUrl); qr.make();
      pay.innerHTML = '<h4>Scan to pay ' + rupees(amount) + '</h4>' +
        '<div class="pay-qr"><img src="' + qr.createDataURL(6, 0) + '" alt="UPI scanner for ' + rupees(amount) + '"></div>' + idLine;
    } else if (hasUpi) {
      pay.innerHTML = '<h4>Pay ' + rupees(amount) + ' by UPI</h4>' + idLine;
    } else {
      pay.innerHTML = '<h4>Payment</h4><p style="margin:0">Send your order below. We will confirm the piece is available and share the payment scanner with you.</p>';
    }
    if (hasUpi && window.matchMedia && window.matchMedia('(pointer:coarse)').matches) {
      pay.insertAdjacentHTML('beforeend', '<a class="btn btn--line btn--small" style="margin-top:.9rem" href="' + upiUrl + '">Pay in your UPI app</a>');
    }
    var copy = $('#copyUpi');
    if (copy) copy.addEventListener('click', function () {
      var done = function () { copy.textContent = 'Copied'; setTimeout(function () { copy.textContent = 'Copy'; }, 1400); };
      if (navigator.clipboard) navigator.clipboard.writeText(upiId).then(done, function () {});
    });

    var send = $('#sendBox'), text = orderText(), buttons = '';
    if (hasWa) buttons += '<a class="btn" id="sendWa" target="_blank" rel="noopener" href="' + esc(waLink(text)) + '">Send order on WhatsApp</a>';
    if (hasMail) buttons += '<a class="btn' + (hasWa ? ' btn--line' : '') + '" id="sendMail" href="' +
      esc(mailLink('New order from ' + val('cName') + ', ' + rupees(amount), text)) + '">Send order by email</a>';
    buttons += '<button class="btn btn--line" type="button" id="copyOrder">Copy order</button>';
    if (!hasWa && !hasMail) buttons += '<a class="btn btn--line" target="_blank" rel="noopener" href="' + igUrl + '">Message us on Instagram</a>';
    send.innerHTML = buttons;

    // where a copied order can be pasted and sent
    var places = [];
    if (hasWa) places.push('WhatsApp +' + waNumber);
    if (hasMail) places.push(C.email);
    places.push('Instagram @' + handle);
    var note = $('#sendNote');
    var baseNote = ((hasWa || hasMail)
      ? 'Your order and address are already written out. Press a send button, or copy the order and paste it to us yourself. '
      : 'Copy your order and paste it in a message to us. ') + 'You can reach us on ' + places.join(', ') + '.';
    note.textContent = baseNote;

    var copyBtn = $('#copyOrder');
    copyBtn.addEventListener('click', function () {
      copyText(text, function (ok) {
        copyBtn.textContent = ok ? 'Order copied' : 'Could not copy';
        if (!ok) note.textContent = 'Your browser blocked copying. Use a send button instead, or message us on ' + places.join(', ') + '.';
        setTimeout(function () { copyBtn.textContent = 'Copy order'; }, 1800);
      });
    });
  }

  // copy text to the clipboard, with a fallback for older browsers
  function copyText(text, done) {
    var fallback = function () {
      var ok = false;
      try {
        var ta = document.createElement('textarea');
        ta.value = text; ta.setAttribute('readonly', '');
        ta.style.position = 'fixed'; ta.style.top = '-1000px';
        document.body.appendChild(ta); ta.select();
        ok = document.execCommand('copy');
        document.body.removeChild(ta);
      } catch (e) { ok = false; }
      done(ok);
    };
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(function () { done(true); }, fallback);
    } else { fallback(); }
  }

  renderCart();
})();
