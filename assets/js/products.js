/* =========================================================
   ADAAYE — SHOP
   1) CATEGORIES: the shelves of the shop, in display order.
   2) PRODUCTS:   every piece, numbered 1 to 22.

   HOW TO SET A PRICE
     price: 450          price in rupees, number only.
     price: 0            no price yet. The card shows "Ask for price"
                         and people order by WhatsApp / Instagram.

   OPTIONS (sizes, sets, designs ...)
     options: [
       { label: 'Size', values: ['S', 'M', 'L', 'XL'] }
     ]
     If a choice costs a different amount, write it like this:
       { v: 'Set of 4', price: 900 }
     That price replaces the main price when the choice is picked.
     (price: 0 on a choice means "use the main price".)
     photo: 3   jumps the photo slider to photo number 3 when
                the choice is picked (handy for "Design A / B").

   PHOTOS
     photos: list of files inside assets/img/shop/ (without .webp).
     The first photo is the cover. People swipe to see the rest.

   COMING SOON
     status: 'soon'   shows the piece as "In progress" with no cart
                      button. Delete that line when it's ready.

   ask: 'Name to paint'   adds a small text box to the card
                          (for personalised pieces).
   ========================================================= */

window.ADAAYE_CATEGORIES = [
  { id: 'table', name: 'Table & Kitchen', short: 'Table & Kitchen',
    blurb: 'Coasters, tea trays and earthen plates that turn every cup of tea into a small ritual.' },
  { id: 'home',  name: 'Home Décor', short: 'Home Décor',
    blurb: 'Keepsake boxes, lamps and desk pieces, painted to brighten an everyday corner.' },
  { id: 'wall',  name: 'Wall Art', short: 'Wall Art',
    blurb: 'Hand-painted canvases, fluid art and personalised wall hangings.' },
  { id: 'wear',  name: 'Wearable Art', short: 'Wearables',
    blurb: 'Kurtas and T-shirts painted by hand. No two are exactly alike.' },
  { id: 'gifts', name: 'Gifts & Stationery', short: 'Gifts',
    blurb: 'Bookmarks, key chains and greeting cards: small things that carry a lot of love.' }
];

var SIZES = ['S', 'M', 'L', 'XL'];

window.ADAAYE_PRODUCTS = [

  /* ---------------- 1. Coaster ---------------- */
  { no: 1, name: 'Peacock Coasters', cat: 'table', style: 'Madhubani peacock on wood',
    price: 0,
    photos: ['coaster-1', 'coaster-2', 'coaster-3', 'coaster-4', 'coaster-5', 'coaster-6'],
    options: [
      { label: 'Shape', values: ['Round', 'Square'] },
      { label: 'Set', values: [
        { v: 'Set of 2', price: 0 },
        { v: 'Set of 4', price: 0 },
        { v: 'Set of 6', price: 0 },
        { v: 'Set of 8', price: 0 } ] }
    ] },

  /* ---------------- 2. Bookmarks ---------------- */
  { no: 2, name: 'Hand-Painted Bookmarks', cat: 'gifts', style: 'Folk florals on card',
    price: 0,
    photos: ['bookmark-1', 'bookmark-2', 'bookmark-3', 'bookmark-4', 'bookmark-5', 'bookmark-6'],
    options: [
      { label: 'Design', values: [
        { v: 'Mint wildflower', photo: 4 },
        { v: 'Marigold vine', photo: 3 },
        { v: 'Pair of both', photo: 1 } ] }
    ] },

  /* ---------------- 3. Key chain ---------------- */
  { no: 3, name: 'Personalised Key Chain', cat: 'gifts', style: 'Your name, painted by hand',
    price: 0,
    photos: ['keychain-1', 'keychain-2', 'keychain-3', 'keychain-4', 'keychain-5', 'keychain-6'],
    options: [
      { label: 'Shape', values: [
        { v: 'Square', photo: 3 },
        { v: 'Round', photo: 4 } ] }
    ],
    ask: 'Name to paint' },

  /* ---------------- 4. Utility box ---------------- */
  { no: 4, name: 'Mirror-Work Utility Box', cat: 'home', style: 'Hand-painted wooden keepsake box',
    price: 0, note: 'Available in different sizes.',
    photos: ['utility-box-1', 'utility-box-2', 'utility-box-3', 'utility-box-4', 'utility-box-5', 'utility-box-6'],
    options: [
      { label: 'Size', values: [
        { v: 'Small', price: 0 },
        { v: 'Medium', price: 0 },
        { v: 'Large', price: 0 } ] }
    ] },

  /* ---------------- 5. Bottle lamp ---------------- */
  { no: 5, name: 'Lotus Bottle Lamp', cat: 'home', style: 'Upcycled glass, painted by hand',
    price: 0, note: 'Available in different sizes.', fit: 'contain',
    photos: ['bottle-lamp-1', 'bottle-lamp-2', 'bottle-lamp-3', 'bottle-lamp-4'],
    options: [
      { label: 'Size', values: [
        { v: 'Small', price: 0 },
        { v: 'Medium', price: 0 },
        { v: 'Large', price: 0 } ] }
    ] },

  /* ---------------- 6. Greeting cards ---------------- */
  { no: 6, name: 'Hand-Painted Greeting Card', cat: 'gifts', style: 'One of a kind, painted on card',
    price: 0,
    photos: ['card-tanpura-1', 'card-tanpura-2', 'card-tanpura-3', 'card-tanpura-4', 'card-tanpura-5',
             'card-floral-1', 'card-floral-2', 'card-floral-3', 'card-floral-4', 'card-floral-5'],
    options: [
      { label: 'Design', values: [
        { v: 'Woman with tanpura', photo: 1, price: 0 },
        { v: 'Floral gatefold', photo: 6, price: 0 } ] }
    ] },

  /* ---------------- 7. MDF wall hanging ---------------- */
  { no: 7, name: '"Our Forever" Wall Hanging', cat: 'wall', style: 'Personalised couple art on MDF',
    price: 0, note: 'Painted with your initials.',
    photos: ['wall-hanging-1', 'wall-hanging-2', 'wall-hanging-3', 'wall-hanging-4', 'wall-hanging-5'],
    ask: 'Initials or names' },

  /* ---------------- 8. Tea tray ---------------- */
  { no: 8, name: 'Hand-Painted Tea Tray', cat: 'table', style: 'Wooden serving tray',
    price: 0, note: 'Available in different sizes.',
    photos: ['tray-lotus-1', 'tray-lotus-2', 'tray-lotus-3', 'tray-lotus-4', 'tray-lotus-5',
             'tray-fish-1', 'tray-fish-2', 'tray-fish-3', 'tray-fish-4'],
    options: [
      { label: 'Design', values: [
        { v: 'Yellow lotus', photo: 1 },
        { v: 'Madhubani fish', photo: 6 } ] },
      { label: 'Size', values: [
        { v: 'Small', price: 0 },
        { v: 'Medium', price: 0 },
        { v: 'Large', price: 0 } ] }
    ] },

  /* ---------------- 9. Fluid art canvas ---------------- */
  { no: 9, name: 'Fluid Art Mini Canvas', cat: 'wall', style: 'Acrylic pour on canvas, with stand',
    price: 0, fit: 'contain',
    photos: ['fluid-canvas-1', 'fluid-canvas-2', 'fluid-canvas-3', 'fluid-canvas-4', 'fluid-canvas-5', 'fluid-canvas-6'],
    options: [
      { label: 'Choose', values: [
        { v: 'Set of 3', photo: 1, price: 0 },
        { v: 'Single: Crimson', photo: 3, price: 0 },
        { v: 'Single: Ocean blue', photo: 4, price: 0 },
        { v: 'Single: Black & gold', photo: 5, price: 0 } ] }
    ] },

  /* ---------------- 10. T-shirt ---------------- */
  { no: 10, name: 'Fish Story T-Shirt', cat: 'wear', style: 'Black cotton tee, folk fish motif',
    price: 0,
    photos: ['tshirt-1', 'tshirt-2', 'tshirt-3', 'tshirt-4', 'tshirt-5', 'tshirt-6'],
    options: [
      { label: 'Size', values: SIZES },
      { label: 'Finish', values: ['Hand-painted', 'Embroidery'] }
    ] },

  /* ---------------- 11. Hand-painted art ---------------- */
  { no: 11, name: 'Hand-Painted Art', cat: 'wall', style: 'Original paintings, one of each',
    price: 0,
    photos: ['art-durga-ganesha-1', 'art-durga-ganesha-2', 'art-durga-hands-1', 'art-durga-hands-2', 'art-ganesha-1', 'art-ganesha-2'],
    options: [
      { label: 'Painting', values: [
        { v: 'Maa Durga with Ganesha', photo: 1, price: 0 },
        { v: 'Durga hands with lotus', photo: 3, price: 0 },
        { v: 'Red abstract Ganesha', photo: 5, price: 0 } ] }
    ] },

  /* ---------------- 12. Kurta ---------------- */
  { no: 12, name: 'Hand-Painted Kurta', cat: 'wear', style: 'Royal blue cotton, painted yoke',
    price: 0, note: 'More colours coming soon.',
    photos: ['kurta-1', 'kurta-2', 'kurta-3', 'kurta-4', 'kurta-5', 'kurta-6'],
    options: [
      { label: 'For', values: ['Male', 'Female'] },
      { label: 'Size', values: SIZES }
      // colour choice will be added here, for example:
      // , { label: 'Colour', values: ['Royal blue', 'Maroon'] }
    ] },

  /* ---------------- 13. Small earthen plates ---------------- */
  { no: 13, name: 'Lotus Earthen Plate', cat: 'table', style: 'Small clay plate, painted lotus',
    price: 0,
    photos: ['earthen-plate-1', 'earthen-plate-2', 'earthen-plate-3', 'earthen-plate-4', 'earthen-plate-5', 'earthen-plate-6'],
    options: [
      { label: 'Design', values: [
        { v: 'Red', photo: 2 },
        { v: 'Orange', photo: 3 } ] },
      { label: 'Pack', values: [
        { v: 'Single', price: 0 },
        { v: 'Set of 2 (red + orange)', photo: 1, price: 0 } ] }
    ] },

  /* ---------------- 22. Pen stand / cutlery stand ---------------- */
  { no: 22, name: 'Leaf Pen & Cutlery Stand', cat: 'home', style: 'Hand-painted wooden stand',
    price: 0,
    photos: ['pen-stand-1', 'pen-stand-2', 'pen-stand-3', 'pen-stand-4', 'pen-stand-5', 'pen-stand-6'] },

  /* ---------------- In progress (no photos yet) ---------------- */
  { no: 14, name: 'Earthen Planters', cat: 'home', style: 'Painted clay planters', status: 'soon' },
  { no: 15, name: 'Earthen Lunch Set', cat: 'table', style: 'For weddings and special occasions', status: 'soon' },
  { no: 16, name: 'Tissue Box', cat: 'home', style: 'Hand-painted tissue box', status: 'soon' },
  { no: 17, name: 'Name Plate', cat: 'home', style: 'Personalised, for your door', status: 'soon' },
  { no: 18, name: 'Wooden Kitchen Décor', cat: 'table', style: 'Painted wood for the kitchen', status: 'soon' },
  { no: 19, name: 'Table Runner', cat: 'table', style: 'Single runner, painted by hand', status: 'soon' },
  { no: 20, name: 'Table Runner & Mats', cat: 'table', style: 'Runner with matching mats', status: 'soon' },
  { no: 21, name: 'Cloth Bangles', cat: 'wear', style: 'Fabric-wrapped, painted bangles', status: 'soon' }
];
