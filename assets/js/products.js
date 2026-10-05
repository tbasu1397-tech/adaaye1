/* =========================================================
   ADAAYE — SHOP
   1) CATEGORIES: the shelves of the shop, in display order.
   2) PRODUCTS:   every piece for sale.

   To add a product, copy one { ... } block in PRODUCTS,
   paste it at the end, and change the details:
     name   – product name
     cat    – one of the category ids below (e.g. 'keychain')
     style  – short style note (e.g. 'Madhubani wall art')
     price  – price in rupees, number only (e.g. 350)
     img    – photo file inside assets/img/ (e.g. 'my-keychain.webp')
     note   – optional extra line about the piece
   A category with no products shows "coming soon" by itself.
   ========================================================= */

window.ADAAYE_CATEGORIES = [
  { id: 'coaster',       name: 'Coaster',             plural: 'Coasters',
    blurb: 'Hand-painted coasters that turn every cup of tea into a small ritual.' },
  { id: 'keychain',      name: 'Key Chain',           plural: 'Key chains',
    blurb: 'Tiny folk motifs to carry a piece of Bengal wherever you go.' },
  { id: 'tissue-box',    name: 'Tissue Box',          plural: 'Tissue boxes',
    blurb: 'Everyday tissue boxes, dressed in Madhubani and folk art.' },
  { id: 'utility-box',   name: 'Utility Box',         plural: 'Utility boxes',
    blurb: 'Keepsake boxes for jewellery, trinkets and the things you treasure.' },
  { id: 'wall-hanging',  name: 'Wall Hanging',        plural: 'Wall hangings',
    blurb: 'Mandalas, deities and line art to bring a wall to life.' },
  { id: 'wall-panel',    name: 'Wall Panel Painting', plural: 'Wall panel paintings',
    blurb: 'Statement panels and canvases, the heart of any room.' },
  { id: 'pen-holder',    name: 'Pen Holder',          plural: 'Pen holders',
    blurb: 'A painted home for pens, brushes and desk-side dreams.' },
  { id: 'fridge-magnet', name: 'Fridge Magnet',       plural: 'Fridge magnets',
    blurb: 'Little painted magnets that make the kitchen smile.' },
  { id: 'other',         name: 'More from the Studio', plural: 'More pieces', short: 'More',
    blurb: "Wearable art, prints and upcycled pieces that don't fit one shelf." }
];

window.ADAAYE_PRODUCTS = [
  // ---- Coaster ----
  { name: 'Fish Coaster & Box Set',     cat: 'coaster',      style: 'Home décor',          price: 650,  img: 'fish-coaster-box.webp' },
  { name: 'Sitar Cat Coaster Duo',      cat: 'coaster',      style: 'Home décor',          price: 700,  img: 'sitar-cat-coasters.webp' },

  // ---- Utility Box ----
  { name: 'Madhubani Jewellery Box',    cat: 'utility-box',  style: 'Home décor',          price: 1100, img: 'madhubani-jewellery-box.webp' },

  // ---- Wall Hanging ----
  { name: 'Lotus-Throne Goddess',       cat: 'wall-hanging', style: 'Madhubani wall art',  price: 2200, img: 'lotus-throne-goddess.webp' },
  { name: 'Peacock Mandala',            cat: 'wall-hanging', style: 'Madhubani mandala',   price: 2500, img: 'peacock-mandala.webp' },
  { name: 'Fish Mandala Line Art',      cat: 'wall-hanging', style: 'Ink line art',        price: 1600, img: 'fish-mandala-line-art.webp' },
  { name: 'Festive Hands & Lotus',      cat: 'wall-hanging', style: 'Deity wall art',      price: 2800, img: 'festive-hands-lotus.webp' },
  { name: 'Framed Durga Portrait',      cat: 'wall-hanging', style: 'Framed portrait',     price: 3500, img: 'framed-durga.webp' },
  { name: 'Twin Fish Line Art',         cat: 'wall-hanging', style: 'Ink line art',        price: 1600, img: 'twin-fish-line-art.webp' },
  { name: 'Terracotta Lotus Plate',     cat: 'wall-hanging', style: 'Home décor',          price: 950,  img: 'terracotta-lotus-plate.webp' },

  // ---- Wall Panel Painting ----
  { name: 'Warli Homestead Panel',      cat: 'wall-panel',   style: 'Warli wall art',      price: 1800, img: 'warli-homestead.webp' },
  { name: 'Garden Bird & Twin Fish',    cat: 'wall-panel',   style: 'Folk wall panel',     price: 3200, img: 'garden-bird-twin-fish.webp' },
  { name: 'Durga & Ganesha',            cat: 'wall-panel',   style: 'Deity canvas',        price: 3800, img: 'durga-ganesha.webp' },
  { name: 'Abstract Mini Canvas Trio',  cat: 'wall-panel',   style: 'Wall art set',        price: 1400, img: 'abstract-canvas-trio.webp' },

  // ---- More from the Studio ----
  { name: 'Hand-Painted Kurta, Indigo', cat: 'other',        style: 'Wearable art',        price: 2600, img: 'kurta-indigo.webp' },
  { name: 'Woman with Tanpura Print',   cat: 'other',        style: 'Art print card',      price: 250,  img: 'tanpura-print.webp' },
  { name: 'Upcycled Lotus Bottle',      cat: 'other',        style: 'Home décor',          price: 850,  img: 'lotus-bottle.webp' }
];
