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

  /* ---------- shop ---------- */
  var shelves = $('#shelves');
  if (shelves) {
    var pills = $('#pills');
    var html = '';
    var pillHtml = '<button class="pill" type="button" data-cat="all" aria-pressed="true">All<b>' + PRODUCTS.length + '</b></button>';

    CATS.forEach(function (cat) {
      var items = PRODUCTS.filter(function (p) { return p.cat === cat.id; });
      if (cat.id === 'other' && !items.length) return;
      pillHtml += '<button class="pill" type="button" data-cat="' + esc(cat.id) + '" aria-pressed="false">' +
        esc(cat.short || cat.name) + '<b>' + items.length + '</b></button>';

      html += '<section class="shelf" data-shelf="' + esc(cat.id) + '" id="shop-' + esc(cat.id) + '">' +
        '<div class="shelf-head"><h3>' + esc(cat.name) + '</h3>' +
        '<span class="shelf-count">' + (items.length ? items.length + (items.length === 1 ? ' piece' : ' pieces') : 'Coming soon') + '</span>' +
        '<p>' + esc(cat.blurb) + '</p></div>';

      if (items.length) {
        html += '<div class="grid">' + items.map(function (p) {
          var i = PRODUCTS.indexOf(p);
          return '<article class="piece">' +
            '<div class="piece-photo"><img src="' + IMG + esc(p.img) + '" alt="' + esc(p.name) + ', hand-painted by Adaaye" loading="lazy" width="600" height="600"></div>' +
            '<h4>' + esc(p.name) + '</h4>' +
            '<p class="piece-style">' + esc(p.style || '') + (p.note ? '. ' + esc(p.note) : '') + '</p>' +
            '<div class="piece-foot"><span class="price" data-inr="' + p.price + '">' + shown(p.price) + '</span>' +
            '<button class="add" type="button" data-add="' + i + '">Add to cart</button></div>' +
            '</article>';
        }).join('') + '</div>';
      } else {
        html += '<div class="soon"><strong>' + esc(cat.plural || cat.name) + ' are on the easel.</strong>' +
          'Want one made for you? <a class="link" data-soon="' + esc(cat.name) + '" href="' + igUrl + '" target="_blank" rel="noopener">Message us to order</a>.</div>';
      }
      html += '</section>';
    });

    shelves.innerHTML = html;
    pills.innerHTML = pillHtml;

    // "coming soon" links go to WhatsApp when it is set up, otherwise Instagram
    if (hasWa) {
      $$('[data-soon]', shelves).forEach(function (a) {
        a.href = waLink("Hi Adaaye! I'd like to order a hand-painted " + a.getAttribute('data-soon').toLowerCase() + '.');
      });
    }

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

    shelves.addEventListener('click', function (e) {
      var btn = e.target.closest('[data-add]');
      if (!btn) return;
      var p = PRODUCTS[+btn.getAttribute('data-add')];
      addToCart(p);
      btn.textContent = 'Added';
      btn.classList.add('is-added');
      setTimeout(function () { btn.textContent = 'Add to cart'; btn.classList.remove('is-added'); }, 1400);
    });
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

  /* =======================================================
     CART
     ======================================================= */
  var cart = [];
  try { cart = JSON.parse(localStorage.getItem('adaaye-cart') || '[]') || []; } catch (e) { cart = []; }
  if (!Array.isArray(cart)) cart = [];
  function save() { try { localStorage.setItem('adaaye-cart', JSON.stringify(cart)); } catch (e) {} }
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
          '<div><p class="line-name">' + esc(item.name) + '</p><p class="line-price">' + rupees(item.price) + '</p>' +
          '<div class="qty"><button type="button" data-dec="' + i + '" aria-label="One less">&minus;</button><span>' + item.qty + '</span>' +
          '<button type="button" data-inc="' + i + '" aria-label="One more">+</button>' +
          '<button type="button" class="remove" data-rm="' + i + '">Remove</button></div></div></div>';
      }).join('');
    }
    $('#cartTotal').textContent = rupees(total());
    $('#toDetails').disabled = !cart.length;
    save();
  }
  function addToCart(p) {
    var found = cart.filter(function (i) { return i.name === p.name; })[0];
    if (found) found.qty += 1;
    else cart.push({ name: p.name, price: p.price, img: IMG + p.img, qty: 1 });
    renderCart();
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
    var items = cart.map(function (i) { return '- ' + i.name + ' x' + i.qty + ' (' + rupees(i.price * i.qty) + ')'; }).join('\n');
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
      return '<li><span>' + esc(i.name) + ' &times; ' + i.qty + '</span><span>' + rupees(i.price * i.qty) + '</span></li>';
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
