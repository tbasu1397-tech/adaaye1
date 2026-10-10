/* =========================================================
   ADAAYE — SETTINGS
   Fill these in once. Everything on the site (order buttons,
   payment scanner, contact links) reads from here.
   Leave a value as '' if you don't have it yet — the site
   will quietly fall back to Instagram for that part.
   ========================================================= */
window.ADAAYE = {

  // Instagram handle, without the @
  instagram: '_adaaye',

  // WhatsApp number that receives orders.
  // Country code + number, digits only. Example: '919876543210'
  whatsapp: '',

  // Email address that receives orders. Example: 'orders@adaaye.in'
  email: 'adaaye.business@gmail.com',

  // ---- Enquiry box ----
  // Every enquiry from the website is emailed here.
  enquiryEmail: 'adaaye.business@gmail.com',

  // OPTIONAL but recommended: a free Web3Forms access key.
  // Get it at web3forms.com (enter the email above, the key arrives
  // by email), then paste it here, e.g. 'a1b2c3d4-....'.
  // Left empty, the site uses FormSubmit instead: the very first
  // enquiry sends an "Activate" email to the address above. Click it
  // once and every enquiry after that arrives normally.
  web3formsKey: '',

  // ---- Payment scanner (UPI) ----
  // Your UPI ID. Example: 'titas@okhdfcbank'
  // When this is filled, the cart shows a scanner (QR code)
  // with the order amount already entered.
  upiId: '',

  // The name people will see in their UPI app when they scan.
  upiName: 'Adaaye',

  // OPTIONAL: if you'd rather show the scanner image from your
  // GPay / PhonePe / Paytm app, save it as assets/img/upi-qr.png
  // and write 'assets/img/upi-qr.png' here. It is used instead
  // of the generated scanner.
  upiQrImage: '',

  // ---- Price reveal ----
  // Until this moment (Indian time), prices are hidden behind a countdown
  // and products can't be added to the cart. At this moment prices appear
  // by themselves. Set to '' to show prices straight away.
  priceRevealAt: '2026-10-13T14:14:00+05:30',
  priceRevealLabel: '13 Oct, 14:14',

  // Indicative currency rates (1 INR = ...). Billing is always in INR.
  rates:   { INR: 1, USD: 0.010486, GBP: 0.007757, EUR: 0.009088, RUB: 0.865 },
  symbols: { INR: '₹', USD: '$', GBP: '£', EUR: '€', RUB: '₽' }
};
