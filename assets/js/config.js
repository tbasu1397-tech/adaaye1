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
  email: '',

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

  // Indicative currency rates (1 INR = ...). Billing is always in INR.
  rates:   { INR: 1, USD: 0.010486, GBP: 0.007757, EUR: 0.009088, RUB: 0.865 },
  symbols: { INR: '₹', USD: '$', GBP: '£', EUR: '€', RUB: '₽' }
};
