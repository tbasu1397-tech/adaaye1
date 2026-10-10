# Adaaye — Artistically Indian

The Adaaye website, rebuilt from scratch. Plain HTML, CSS and JavaScript.
No build step, no install. Upload the files and it works.

## What's in the folder

| File / folder | What it is |
|---|---|
| `index.html` | Home page: Story, Journey, Craft, Collection, Favourites, Shop, How to order, Testimonials, Hampers |
| `meet.html` | Meet Us (Titas, Gupi the studio cat, the studio) |
| `artisans.html` | Support an Artisan (8 craft districts of West Bengal) |
| `assets/js/config.js` | **Your settings**: WhatsApp number, order email, UPI ID for the payment scanner |
| `assets/js/products.js` | **Your shop**: categories and every product |
| `assets/img/` | All photos and the logo |
| `assets/css/styles.css` | The design (colours, type, layout) |
| `assets/js/site.js` | Cart, filters, ordering. No need to edit |
| `assets/js/qrcode.js` | Draws the payment scanner. No need to edit |
| `assets/fonts/` | The fonts, bundled with the site |

## 1. Fill in your settings first (`assets/js/config.js`)

Until you do, every order button falls back to Instagram.

| Setting | What to write | Example |
|---|---|---|
| `whatsapp` | Number that receives orders. Country code + number, digits only | `'919876543210'` |
| `email` | Email that receives orders | `'orders@adaaye.in'` |
| `upiId` | Your UPI ID. Turns on the payment scanner in the cart | `'yourname@okhdfcbank'` |
| `upiName` | Name shown in the customer's UPI app | `'Adaaye'` |
| `upiQrImage` | Optional. Use your own scanner image from GPay / PhonePe instead | `'assets/img/upi-qr.png'` |

Check the UPI ID twice. Payments go to whatever is written there.

## 2. How ordering works for a customer

1. They add pieces to the cart.
2. They enter name, phone and address.
3. The cart shows the payment scanner with the amount already filled in
   (on a phone there is also a "Pay in your UPI app" button).
4. They press **Send order on WhatsApp** or **Send order by email**. The full
   order and address are already written out in the message.
   **Copy order** copies the same text, so they can paste it anywhere.

There is no online payment gateway. You confirm payments in your own UPI app.

## 3. Prices, options and products (`assets/js/products.js`)

The shop holds all 22 products. Each one is a block like this:

```js
{ no: 1, name: 'Peacock Coasters', cat: 'table', style: 'Madhubani peacock on wood',
  price: 0,
  photos: ['coaster-1', 'coaster-2', 'coaster-3'],
  options: [
    { label: 'Shape', values: ['Round', 'Square'] },
    { label: 'Set', values: [ { v: 'Set of 2', price: 400 }, { v: 'Set of 4', price: 750 } ] }
  ] },
```

**Setting prices (do this before 13 Oct, 14:14):**
- `price: 0` means no price yet. After the reveal the card shows
  "Price on request" and an "Ask to order" button instead of "Add to cart".
- Write the price in rupees, number only: `price: 450`.
- If a choice changes the price (a set, a size, a design), put the price on
  that choice: `{ v: 'Set of 4', price: 750 }`. That price replaces the main price.

**Other things you can change:**
- `cat` is the shelf: `table`, `home`, `wall`, `wear` or `gifts`.
- `photos` are files inside `assets/img/shop/`, written without `.webp`.
  The first is the cover; people swipe or tap the arrows to see the rest.
  Portrait photos (4:5) look best.
- `photo: 6` on a choice jumps the slider to photo 6 when that choice is picked.
- `ask: 'Name to paint'` adds a text box (used for the key chain and wall hanging).
- `status: 'soon'` shows the product as "In progress". When it is ready, delete
  that line and add `price`, `photos` and any `options`.
- Kurta colours: add `{ label: 'Colour', values: ['Royal blue', 'Maroon'] }`
  inside the kurta's `options` (there's a note showing where).

To change currency rates, edit `rates` in `config.js`.

## 4. Put it on GitHub

1. github.com → **+** → **New repository** → name it (e.g. `adaaye-website`) → **Create repository**.
2. On the new repo page click **uploading an existing file**.
3. Open this folder on your computer, select **everything inside it**
   (the three `.html` files, `README.md` and the `assets` folder) and drag it all in.
   Use Chrome or Edge so the `assets` folder uploads with its sub-folders.
4. Click **Commit changes**.

## 5. Deploy on Vercel

1. vercel.com → **Add New… → Project**.
2. **Import** the new repository. If it isn't listed, click
   **Adjust GitHub App Permissions** and allow it.
3. Framework Preset: **Other**. Leave everything else empty.
4. Click **Deploy**.

After that, every change you commit on GitHub goes live by itself.

## Design notes

- Colours (Adaaye's original palette): Ivory `#F4EEE0`, Charcoal `#2E2A26`, Sindoor `#A4312A`,
  Indigo `#26364C`, Turmeric `#C1892F`, Clay `#8A6142`. They are set once at the top of
  `assets/css/styles.css`.
- Paper texture: the faint alpona swirls and grain behind the pages, set on `body` in `styles.css`.
- Type: Eczar (headings) and Anek Latin (text).
- The painted border down the left side and between sections is drawn in
  `styles.css` (`--border-v` and `--border-h`).

## Before you launch

- Fill in `config.js` and place a test order to yourself.
- The Support an Artisan page still carries the note that its crafts and prices
  are indicative and not yet tied to named artisan partners. Keep that note until they are.
