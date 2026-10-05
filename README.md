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

There is no online payment gateway. You confirm payments in your own UPI app.

## 3. Add, change or remove a product (`assets/js/products.js`)

Copy one line in `ADAAYE_PRODUCTS`, paste it, and change the details:

```js
{ name: 'Fish Key Chain', cat: 'keychain', style: 'Madhubani', price: 350, img: 'fish-keychain.webp' },
```

- `cat` must be one of: `coaster`, `keychain`, `tissue-box`, `utility-box`,
  `wall-hanging`, `wall-panel`, `pen-holder`, `fridge-magnet`, `other`.
- `price` is in rupees, number only.
- Put the photo in `assets/img/` and write its file name in `img`.
  Square photos look best. JPG, PNG or WebP all work.
- A category with no products shows "coming soon" automatically, and the
  counts on the filter buttons update by themselves.

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
