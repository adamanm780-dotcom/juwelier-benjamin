// ─── Produkt-Daten ─────────────────────────────────────────────────────────────
// Quelle: Screenshots des bestehenden WooCommerce-Shops (juwelier-benjamin.eu)
// Fehlende Produktbilder: `image`-Feld leer lassen → Gradient-Placeholder wird angezeigt
// Echte Bilder können später per `image: '/assets/products/<slug>.jpg'` ergänzt werden

export type CategoryId =
  | 'ringe'
  | 'trauringe'
  | 'ohrringe'
  | 'anhaenger'
  | 'armbänder'
  | 'halsketten'
  | 'uhren'

export interface Product {
  id:            string
  slug:          string
  name:          string
  category:      CategoryId
  subcategory?:  string
  price:         number
  originalPrice?: number       // Streichpreis (z.B. UVP)
  material?:     string
  carat?:        string        // z.B. "0.45 ct CVD-LG-Diamant"
  description:   string
  details?:      string[]
  badge?:        'NEU' | 'SALE' | 'EXKLUSIV'
  image?:        string        // Pfad zum echten Bild, wenn vorhanden
  available:     boolean
}

export const CATEGORY_LABELS: Record<CategoryId, string> = {
  ringe:      'Ringe',
  trauringe:  'Trauringe',
  ohrringe:   'Ohrringe',
  anhaenger:  'Anhänger',
  'armbänder': 'Armbänder',
  halsketten: 'Halsketten',
  uhren:      'Uhren',
}

// ─── Hilfsfunktionen ──────────────────────────────────────────────────────────

export function formatPrice(price: number): string {
  return new Intl.NumberFormat('de-DE', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 2,
  }).format(price)
}

export function getProductBySlug(slug: string): Product | undefined {
  return PRODUCTS.find(p => p.slug === slug)
}

export function getProductsByCategory(category: CategoryId): Product[] {
  return PRODUCTS.filter(p => p.category === category)
}

// ─── Produktdaten ─────────────────────────────────────────────────────────────
// TODO: Ersetze oder ergänze Einträge wenn das echte Bildmaterial vorliegt.
// Das `image`-Feld akzeptiert absolute Pfade (/assets/products/…) oder externe URLs.

export const PRODUCTS: Product[] = [

  // ── Solitärringe ─────────────────────────────────────────────────────────────

  {
    id: 'sr-001', slug: 'solitaerring-012ct-weissgold',
    name: 'Solitärring 0,12 ct Brillant Weißgold',
    category: 'ringe', subcategory: 'Solitärringe',
    price: 399, material: 'Weißgold', carat: '0,12 ct CVD-LG-Diamant',
    description: 'Klassischer Solitärring mit laborgezüchtetem Brillanten in Weißgold-Fassung. Zeitlos elegant, ideal als Verlobungsring.',
    details: ['CVD-LG-Diamant zertifiziert', 'Weißgold 585', 'Brillantschliff'],
    available: true,
  },
  {
    id: 'sr-002', slug: 'solitaerring-026ct-weissgold',
    name: 'Solitärring 0,26 ct Brillant Weißgold',
    category: 'ringe', subcategory: 'Solitärringe',
    price: 799, material: 'Weißgold', carat: '0,26 ct CVD-LG-Diamant',
    description: 'Feiner Solitärring mit funkelndem Brillanten. Handgefasst in edlem Weißgold.',
    details: ['CVD-LG-Diamant zertifiziert', 'Weißgold 585', 'Brillantschliff', '0,26 ct'],
    available: true,
  },
  {
    id: 'sr-003', slug: 'solitaerring-029ct-princess-weissgold',
    name: 'Solitärring 0,29 ct Princess-Schliff Weißgold',
    category: 'ringe', subcategory: 'Solitärringe',
    price: 849, material: 'Weißgold', carat: '0,29 ct CVD-LG-Diamant',
    description: 'Moderner Solitärring mit Diamant im Princess-Schliff – für Liebhaber klarer Linien.',
    details: ['CVD-LG-Diamant zertifiziert', 'Weißgold 585', 'Princess-Schliff', '0,29 ct'],
    available: true,
  },
  {
    id: 'sr-004', slug: 'solitaerring-045ct-weissgold',
    name: 'Solitärring 0,45 ct Brillant Weißgold',
    category: 'ringe', subcategory: 'Solitärringe',
    price: 1199, material: 'Weißgold', carat: '0,45 ct CVD-LG-Diamant',
    description: 'Hochkarätiger Solitärring mit außergewöhnlicher Brillanz. Elegante Weißgold-Krappenfassung.',
    details: ['CVD-LG-Diamant zertifiziert', 'Weißgold 585', 'Brillantschliff', '0,45 ct'],
    available: true,
  },
  {
    id: 'sr-005', slug: 'solitaerring-055ct-princess-gelbgold',
    name: 'Solitärring 0,55 ct Princess-Schliff Gelbgold',
    category: 'ringe', subcategory: 'Solitärringe',
    price: 1399, material: 'Gelbgold', carat: '0,55 ct CVD-LG-Diamant',
    description: 'Warmes Gelbgold trifft auf den geometrischen Princess-Schliff – ein moderner Klassiker.',
    details: ['CVD-LG-Diamant zertifiziert', 'Gelbgold 585', 'Princess-Schliff', '0,55 ct'],
    available: true,
  },
  {
    id: 'sr-006', slug: 'solitaerring-055ct-weissgold',
    name: 'Solitärring 0,55 ct Brillant Weißgold',
    category: 'ringe', subcategory: 'Solitärringe',
    price: 1390, material: 'Weißgold', carat: '0,55 ct CVD-LG-Diamant',
    description: 'Außergewöhnliche Brillanz in zeitloser Weißgold-Fassung.',
    details: ['CVD-LG-Diamant zertifiziert', 'Weißgold 585', 'Brillantschliff', '0,55 ct'],
    available: true,
  },
  {
    id: 'sr-007', slug: 'solitaerring-059ct-weissgold',
    name: 'Solitärring 0,59 ct Brillant Weißgold',
    category: 'ringe', subcategory: 'Solitärringe',
    price: 1449, material: 'Weißgold', carat: '0,59 ct CVD-LG-Diamant',
    description: 'Meisterhaft gefasster Brillant – ein Statement für die Ewigkeit.',
    details: ['CVD-LG-Diamant zertifiziert', 'Weißgold 585', 'Brillantschliff', '0,59 ct'],
    available: true,
  },
  {
    id: 'sr-008', slug: 'solitaerring-070ct-princess-gelbgold',
    name: 'Solitärring 0,70 ct Princess-Schliff Gelbgold',
    category: 'ringe', subcategory: 'Solitärringe',
    price: 1649, material: 'Gelbgold', carat: '0,70 ct CVD-LG-Diamant',
    description: 'Imposanter Solitärring mit 0,70 Karat im Princess-Schliff, handgefasst in Gelbgold.',
    details: ['CVD-LG-Diamant zertifiziert', 'Gelbgold 585', 'Princess-Schliff', '0,70 ct'],
    available: true,
  },
  {
    id: 'sr-009', slug: 'solitaerring-080ct-princess-weissgold',
    name: 'Solitärring 0,80 ct Princess-Schliff Weißgold',
    category: 'ringe', subcategory: 'Solitärringe',
    price: 1749, material: 'Weißgold', carat: '0,80 ct CVD-LG-Diamant',
    description: 'Fast ein ganzes Karat – strahlend und elegant im Princess-Schliff.',
    details: ['CVD-LG-Diamant zertifiziert', 'Weißgold 585', 'Princess-Schliff', '0,80 ct'],
    available: true,
  },
  {
    id: 'sr-010', slug: 'solitaerring-101ct-princess-gelbgold',
    name: 'Solitärring 1,01 ct Princess-Schliff Gelbgold',
    category: 'ringe', subcategory: 'Solitärringe',
    price: 1990, material: 'Gelbgold', carat: '1,01 ct CVD-LG-Diamant',
    description: 'Über ein Karat funkelnder Diamant in warmem Gelbgold – ein unvergessliches Stück.',
    details: ['CVD-LG-Diamant zertifiziert', 'Gelbgold 585', 'Princess-Schliff', '1,01 ct'],
    badge: 'EXKLUSIV', available: true,
  },
  {
    id: 'sr-011', slug: 'solitaerring-102ct-princess-weissgold',
    name: 'Solitärring 1,02 ct Princess-Schliff Weißgold',
    category: 'ringe', subcategory: 'Solitärringe',
    price: 1990, material: 'Weißgold', carat: '1,02 ct CVD-LG-Diamant',
    description: 'Beeindruckender 1-Karat-Solitär in Weißgold – Luxus pur.',
    details: ['CVD-LG-Diamant zertifiziert', 'Weißgold 585', 'Princess-Schliff', '1,02 ct'],
    badge: 'EXKLUSIV', available: true,
  },
  {
    id: 'sr-012', slug: 'solitaerring-203ct-princess-weissgold',
    name: 'Solitärring 2,03 ct Princess-Schliff Weißgold',
    category: 'ringe', subcategory: 'Solitärringe',
    price: 3590, material: 'Weißgold', carat: '2,03 ct CVD-LG-Diamant',
    description: 'Außergewöhnliches Einzelstück: 2 Karat laborgezüchteter Diamant im Princess-Schliff, gefasst in Weißgold.',
    details: ['CVD-LG-Diamant zertifiziert', 'Weißgold 585', 'Princess-Schliff', '2,03 ct'],
    badge: 'EXKLUSIV', available: true,
  },
  {
    id: 'sr-013', slug: 'solitaerring-brillanten-weissgold-1',
    name: 'Solitärring mit Brillanten Weißgold',
    category: 'ringe', subcategory: 'Solitärringe',
    price: 399, material: 'Weißgold',
    description: 'Klassischer Solitärring in Weißgold mit funkelndem Brillanten.',
    available: true,
  },
  {
    id: 'sr-014', slug: 'solitaerring-brillanten-weissgold-2',
    name: 'Solitärring mit Brillanten Weißgold – Premium',
    category: 'ringe', subcategory: 'Solitärringe',
    price: 1690, material: 'Weißgold',
    description: 'Hochkarätiger Solitärring mit Brillanten, gefasst in feinstem Weißgold.',
    available: true,
  },
  {
    id: 'sr-015', slug: 'solitaerring-diamant-gelbgold',
    name: 'Solitärring mit Diamant Gelbgold',
    category: 'ringe', subcategory: 'Solitärringe',
    price: 1490, material: 'Gelbgold',
    description: 'Traditioneller Solitärring mit Diamant in warmem Gelbgold.',
    available: true,
  },
  {
    id: 'sr-016', slug: 'solitaerring-diamanten-baguette-weissgold',
    name: 'Solitärring Baguetteschliff Weißgold',
    category: 'ringe', subcategory: 'Solitärringe',
    price: 490, material: 'Weißgold',
    description: 'Moderner Solitärring mit Diamant im Baguetteschliff – klar, geometrisch, zeitlos.',
    available: true,
  },

  // ── Spannringe ───────────────────────────────────────────────────────────────

  {
    id: 'sp-001', slug: 'spannring-brillant-gelbgold-1',
    name: 'Spannring mit Brillant Gelbgold',
    category: 'ringe', subcategory: 'Spannringe',
    price: 799, material: 'Gelbgold',
    description: 'Eleganter Spannring: Der Brillant scheint schwebend in der Gelbgold-Schiene zu sitzen.',
    details: ['Gelbgold 585', 'Brillantschliff', 'Spannfassung'],
    available: true,
  },
  {
    id: 'sp-002', slug: 'spannring-brillant-gelbgold-2',
    name: 'Spannring mit Brillant Gelbgold – Schlank',
    category: 'ringe', subcategory: 'Spannringe',
    price: 790, material: 'Gelbgold',
    description: 'Schlanker Spannring in Gelbgold – minimalistisch und ausdrucksstark.',
    available: true,
  },
  {
    id: 'sp-003', slug: 'spannring-brillant-gelbgold-3',
    name: 'Spannring mit Brillant Gelbgold – Klassik',
    category: 'ringe', subcategory: 'Spannringe',
    price: 399, material: 'Gelbgold',
    description: 'Einstieg in die Welt der Spannringe – klassisch und zeitlos.',
    available: true,
  },
  {
    id: 'sp-004', slug: 'spannring-brillant-platin',
    name: 'Spannring mit Brillant Platin',
    category: 'ringe', subcategory: 'Spannringe',
    price: 2490, material: 'Platin',
    description: 'Seltenes Platin verleiht diesem Spannring eine besondere Schwere und Wertigkeit.',
    details: ['Platin 950', 'Brillantschliff', 'Spannfassung', 'Maßanpassung möglich'],
    badge: 'EXKLUSIV', available: true,
  },
  {
    id: 'sp-005', slug: 'spannring-brillant-weissgold',
    name: 'Spannring mit Brillant Weißgold',
    category: 'ringe', subcategory: 'Spannringe',
    price: 1990, material: 'Weißgold',
    description: 'Eleganter Weißgold-Spannring mit schwebend wirkender Brillantfassung.',
    details: ['Weißgold 585', 'Brillantschliff', 'Spannfassung'],
    available: true,
  },
  {
    id: 'sp-006', slug: 'spannring-brillant-standard',
    name: 'Spannring mit Brillant',
    category: 'ringe', subcategory: 'Spannringe',
    price: 1390, material: 'Weißgold',
    description: 'Klassischer Spannring mit Brillant – handgefertigt in unserer Werkstatt.',
    available: true,
  },

  // ── Antragsringe ─────────────────────────────────────────────────────────────

  {
    id: 'ar-001', slug: 'antragsring-weissgold-1',
    name: 'Antragsring mit Brillanten und Beisteinen Weißgold',
    category: 'ringe', subcategory: 'Antragsringe',
    price: 1390, material: 'Weißgold',
    description: 'Romantischer Antragsring mit mittigem Brillanten und Beisteinen – für den perfekten Moment.',
    details: ['Weißgold 585', 'Brillantschliff', 'Beisteine besetzt'],
    available: true,
  },
  {
    id: 'ar-002', slug: 'antragsring-weissgold-2',
    name: 'Antragsring mit Brillanten Weißgold – Grande',
    category: 'ringe', subcategory: 'Antragsringe',
    price: 1890, material: 'Weißgold',
    description: 'Großzügiger Antragsring mit zentralem Brillanten und seitlichen Beisteinen in Pavé-Fassung.',
    details: ['Weißgold 585', 'Brillantschliff', 'Pavé-Beisteine'],
    badge: 'EXKLUSIV', available: true,
  },

  // ── Morellato Ringe ───────────────────────────────────────────────────────────

  {
    id: 'mo-r-001', slug: 'morellato-ring-zirkonia-1',
    name: 'Morellato Ring mit Zirkonia',
    category: 'ringe', subcategory: 'Morellato',
    price: 69, material: 'Silber',
    description: 'Eleganter Morellato-Ring mit funkelnden Zirkonia-Steinen. Perfekt für den Alltag.',
    available: true,
  },
  {
    id: 'mo-r-002', slug: 'morellato-ring-zirkonia-2',
    name: 'Morellato Ring mit Zirkonia – Schlicht',
    category: 'ringe', subcategory: 'Morellato',
    price: 69, material: 'Silber',
    description: 'Schlichter Morellato-Ring mit Zirkonia – zeitlos und tragbar.',
    available: true,
  },
  {
    id: 'mo-r-003', slug: 'morellato-ring-zirkonia-opal',
    name: 'Morellato Ring mit Zirkonia und Opaloptik',
    category: 'ringe', subcategory: 'Morellato',
    price: 69, material: 'Silber',
    description: 'Besonderer Morellato-Ring mit Zirkonia und schimmernder Opaloptik.',
    badge: 'NEU', available: true,
  },
  {
    id: 'mo-r-004', slug: 'morellato-solitaerring',
    name: 'Morellato Solitärring',
    category: 'ringe', subcategory: 'Morellato',
    price: 69, material: 'Silber',
    description: 'Klassischer Morellato-Solitärring – perfekte Ergänzung für jede Kollektion.',
    available: true,
  },

  // ── Trauringe ─────────────────────────────────────────────────────────────────

  {
    id: 'tr-001', slug: 'trauring-weissgold-mainz',
    name: 'Weißgold Trauring Mainz',
    category: 'trauringe',
    price: 890, material: 'Weißgold',
    description: 'Klassischer Weißgold-Trauring aus unserer Mainzer Kollektion. Zeitlos schön und dauerhaft wertvoll.',
    details: ['Weißgold 585', 'Poliert', 'Maßanpassung im Haus möglich', 'Als Paar erhältlich'],
    available: true,
  },
  {
    id: 'tr-002', slug: 'trauring-weissgold-mainz-2',
    name: 'Weißgold Trauring Mainz 2',
    category: 'trauringe',
    price: 890, material: 'Weißgold',
    description: 'Zweites Modell unserer Mainzer Trauring-Kollektion – leicht strukturiert für besonderen Charakter.',
    details: ['Weißgold 585', 'Satiniert/Poliert', 'Maßanpassung möglich'],
    available: true,
  },
  {
    id: 'tr-003', slug: 'trauring-weissgold-wiesbaden-1',
    name: 'Weißgold Trauring Wiesbaden 1',
    category: 'trauringe',
    price: 890, material: 'Weißgold',
    description: 'Erster Trauring aus unserer Wiesbadener Kollektion – schlicht und edel.',
    details: ['Weißgold 585', 'Poliert', 'Als Paar erhältlich'],
    available: true,
  },
  {
    id: 'tr-004', slug: 'trauring-weissgold-wiesbaden-2',
    name: 'Weißgold Trauring Wiesbaden 2',
    category: 'trauringe',
    price: 890, material: 'Weißgold',
    description: 'Leicht strukturierter Trauring aus Weißgold für ein modernes Hochzeitspaar.',
    available: true,
  },
  {
    id: 'tr-005', slug: 'trauring-weissgold-wiesbaden-3',
    name: 'Weißgold Trauring Wiesbaden 3',
    category: 'trauringe',
    price: 890, material: 'Weißgold',
    description: 'Trauring Wiesbaden 3 – mit dezentem Brillantbesatz auf Wunsch.',
    available: true,
  },
  {
    id: 'tr-006', slug: 'trauring-weissgold-wiesbaden-4',
    name: 'Weißgold Trauring Wiesbaden 4',
    category: 'trauringe',
    price: 890, material: 'Weißgold',
    description: 'Edles Trauring-Modell mit angenehm abgerundeter Innenform.',
    available: true,
  },
  {
    id: 'tr-007', slug: 'trauring-weissgold-wiesbaden-5',
    name: 'Weißgold Trauring Wiesbaden 5',
    category: 'trauringe',
    price: 890, material: 'Weißgold',
    description: 'Fünftes Modell unserer Wiesbadener Kollektion – minimalistisch und stark.',
    available: true,
  },

  // ── Ohrstecker (Brillanten) ───────────────────────────────────────────────────

  {
    id: 'os-001', slug: 'ohrstecker-045ct-weissgold-1',
    name: 'Ohrstecker 0,45 ct Brillanten Weißgold',
    category: 'ohrringe', subcategory: 'Diamant-Ohrstecker',
    price: 1399, material: 'Weißgold', carat: '0,45 ct CVD-LG-Diamant',
    description: 'Klassische Brillant-Ohrstecker in Weißgold – für jeden Anlass die perfekte Wahl.',
    details: ['CVD-LG-Diamant zertifiziert', 'Weißgold 585', 'Brillantschliff', 'Paar'],
    available: true,
  },
  {
    id: 'os-002', slug: 'ohrstecker-048ct-princess-weissgold',
    name: 'Ohrstecker 0,48 ct Princess-Schliff Weißgold',
    category: 'ohrringe', subcategory: 'Diamant-Ohrstecker',
    price: 1399, material: 'Weißgold', carat: '0,48 ct CVD-LG-Diamant',
    description: 'Geometrische Eleganz: Ohrstecker mit Princess-Schliff in Weißgold.',
    details: ['CVD-LG-Diamant zertifiziert', 'Weißgold 585', 'Princess-Schliff', 'Paar'],
    available: true,
  },
  {
    id: 'os-003', slug: 'ohrstecker-054ct-gelbgold',
    name: 'Ohrstecker 0,54 ct Brillanten Gelbgold',
    category: 'ohrringe', subcategory: 'Diamant-Ohrstecker',
    price: 1399, material: 'Gelbgold', carat: '0,54 ct CVD-LG-Diamant',
    description: 'Warmes Gelbgold umrahmt diese strahlenden Brillant-Ohrstecker.',
    details: ['CVD-LG-Diamant zertifiziert', 'Gelbgold 585', 'Brillantschliff', 'Paar'],
    available: true,
  },
  {
    id: 'os-004', slug: 'ohrstecker-106ct-princess-weissgold',
    name: 'Ohrstecker 1,06 ct Princess-Schliff Weißgold',
    category: 'ohrringe', subcategory: 'Diamant-Ohrstecker',
    price: 2299, material: 'Weißgold', carat: '1,06 ct CVD-LG-Diamant',
    description: 'Statement-Ohrstecker mit über einem Karat im Princess-Schliff.',
    details: ['CVD-LG-Diamant zertifiziert', 'Weißgold 585', 'Princess-Schliff', '1,06 ct', 'Paar'],
    badge: 'EXKLUSIV', available: true,
  },
  {
    id: 'os-005', slug: 'ohrstecker-116ct-gelbgold',
    name: 'Ohrstecker 1,16 ct Brillanten Gelbgold',
    category: 'ohrringe', subcategory: 'Diamant-Ohrstecker',
    price: 2299, material: 'Gelbgold', carat: '1,16 ct CVD-LG-Diamant',
    description: 'Imposante Brillant-Ohrstecker in strahlendem Gelbgold.',
    details: ['CVD-LG-Diamant zertifiziert', 'Gelbgold 585', 'Brillantschliff', '1,16 ct', 'Paar'],
    badge: 'EXKLUSIV', available: true,
  },
  {
    id: 'os-006', slug: 'ohrstecker-116ct-weissgold',
    name: 'Ohrstecker 1,16 ct Brillanten Weißgold',
    category: 'ohrringe', subcategory: 'Diamant-Ohrstecker',
    price: 2299, material: 'Weißgold', carat: '1,16 ct CVD-LG-Diamant',
    description: 'Klassische Brillant-Ohrstecker mit 1,16 Karat in weißem Gold.',
    details: ['CVD-LG-Diamant zertifiziert', 'Weißgold 585', 'Brillantschliff', '1,16 ct', 'Paar'],
    badge: 'EXKLUSIV', available: true,
  },
  {
    id: 'os-007', slug: 'ohrstecker-144ct-gelbgold',
    name: 'Ohrstecker 1,44 ct Brillanten Gelbgold',
    category: 'ohrringe', subcategory: 'Diamant-Ohrstecker',
    price: 2799, material: 'Gelbgold', carat: '1,44 ct CVD-LG-Diamant',
    description: 'Außergewöhnliche Größe, außergewöhnliche Wirkung – 1,44 Karat in Gelbgold.',
    details: ['CVD-LG-Diamant zertifiziert', 'Gelbgold 585', 'Brillantschliff', '1,44 ct', 'Paar'],
    badge: 'EXKLUSIV', available: true,
  },
  {
    id: 'os-008', slug: 'ohrstecker-145ct-weissgold',
    name: 'Ohrstecker 1,45 ct Brillanten Weißgold',
    category: 'ohrringe', subcategory: 'Diamant-Ohrstecker',
    price: 2799, material: 'Weißgold', carat: '1,45 ct CVD-LG-Diamant',
    description: 'Luxuriöse Brillant-Ohrstecker mit 1,45 Karat in reinweißem Gold.',
    badge: 'EXKLUSIV', available: true,
  },
  {
    id: 'os-009', slug: 'ohrstecker-203ct-weissgold',
    name: 'Ohrstecker 2,03 ct Brillanten Weißgold',
    category: 'ohrringe', subcategory: 'Diamant-Ohrstecker',
    price: 3980, material: 'Weißgold', carat: '2,03 ct CVD-LG-Diamant',
    description: 'Absolute Rarität: Ohrstecker mit je über 1 Karat in meisterhafter Weißgold-Fassung.',
    details: ['CVD-LG-Diamant zertifiziert', 'Weißgold 585', 'Brillantschliff', '2,03 ct gesamt', 'Paar'],
    badge: 'EXKLUSIV', available: true,
  },
  {
    id: 'os-010', slug: 'ohrstecker-204ct-gelbgold',
    name: 'Ohrstecker 2,04 ct Brillanten Gelbgold',
    category: 'ohrringe', subcategory: 'Diamant-Ohrstecker',
    price: 3980, material: 'Gelbgold', carat: '2,04 ct CVD-LG-Diamant',
    description: 'Majestätische Ohrstecker – 2,04 Karat in warmem Gelbgold gefasst.',
    badge: 'EXKLUSIV', available: true,
  },
  {
    id: 'os-011', slug: 'ohrstecker-204ct-princess-weissgold',
    name: 'Ohrstecker 2,04 ct Princess-Schliff Weißgold',
    category: 'ohrringe', subcategory: 'Diamant-Ohrstecker',
    price: 3980, material: 'Weißgold', carat: '2,04 ct CVD-LG-Diamant',
    description: 'Princess-Schliff trifft auf absoluten Luxus – 2,04 Karat in Weißgold.',
    badge: 'EXKLUSIV', available: true,
  },

  // ── Morellato Ohrringe ────────────────────────────────────────────────────────

  {
    id: 'mo-o-001', slug: 'morellato-ohrhaenger',
    name: 'Morellato Ohrhänger',
    category: 'ohrringe', subcategory: 'Morellato',
    price: 88, material: 'Silber',
    description: 'Elegante Morellato-Ohrhänger für den täglichen Glamour.',
    available: true,
  },
  {
    id: 'mo-o-002', slug: 'morellato-ohrhaenger-perlen-1',
    name: 'Morellato Ohrhänger Perlen',
    category: 'ohrringe', subcategory: 'Morellato',
    price: 79, material: 'Silber/Perlen',
    description: 'Zarte Ohrhänger mit Perlen-Element – feminin und zeitlos.',
    available: true,
  },
  {
    id: 'mo-o-003', slug: 'morellato-ohrhaenger-perlen-2',
    name: 'Morellato Ohrhänger Perlen – Deluxe',
    category: 'ohrringe', subcategory: 'Morellato',
    price: 98, material: 'Silber/Perlen',
    description: 'Aufwendigere Perlen-Ohrhänger der Morellato-Kollektion.',
    available: true,
  },
  {
    id: 'mo-o-004', slug: 'morellato-ohrhaenger-rose',
    name: 'Morellato Ohrhänger Rosé',
    category: 'ohrringe', subcategory: 'Morellato',
    price: 108, material: 'Rosévergoldet',
    description: 'Romantische Rosé-Ohrhänger aus der Morellato-Kollektion.',
    badge: 'NEU', available: true,
  },

  // ── Brillantanhänger ──────────────────────────────────────────────────────────

  {
    id: 'ba-001', slug: 'brillantanhaenger-026ct-weissgold',
    name: 'Brillantanhänger 0,26 ct Weißgold',
    category: 'anhaenger', subcategory: 'Brillantanhänger',
    price: 849, material: 'Weißgold', carat: '0,26 ct CVD-LG-Diamant',
    description: 'Schwebender Brillant in feiner Weißgold-Fassung – der perfekte Alltagsbegleiter.',
    details: ['CVD-LG-Diamant zertifiziert', 'Weißgold 585', 'Brillantschliff', 'ohne Kette'],
    available: true,
  },
  {
    id: 'ba-002', slug: 'brillantanhaenger-027ct-gelbgold',
    name: 'Brillantanhänger 0,27 ct Gelbgold',
    category: 'anhaenger', subcategory: 'Brillantanhänger',
    price: 849, material: 'Gelbgold', carat: '0,27 ct CVD-LG-Diamant',
    description: 'Warmes Gelbgold umfasst einen strahlenden Brillanten – schlicht und ausdrucksstark.',
    details: ['CVD-LG-Diamant zertifiziert', 'Gelbgold 585', 'Brillantschliff', 'ohne Kette'],
    available: true,
  },
  {
    id: 'ba-003', slug: 'brillantanhaenger-057ct-weissgold',
    name: 'Brillantanhänger 0,57 ct Weißgold',
    category: 'anhaenger', subcategory: 'Brillantanhänger',
    price: 1449, material: 'Weißgold', carat: '0,57 ct CVD-LG-Diamant',
    description: 'Imposanter Brillantanhänger mit 0,57 Karat – ideal für besondere Anlässe.',
    details: ['CVD-LG-Diamant zertifiziert', 'Weißgold 585', 'Brillantschliff'],
    available: true,
  },
  {
    id: 'ba-004', slug: 'brillantanhaenger-055ct-weissgold',
    name: 'Brillantanhänger 0,55 ct Weißgold',
    category: 'anhaenger', subcategory: 'Brillantanhänger',
    price: 1390, material: 'Weißgold', carat: '0,55 ct CVD-LG-Diamant',
    description: 'Eleganter Brillantanhänger mit hochwertiger Weißgold-Fassung.',
    available: true,
  },
  {
    id: 'ba-005', slug: 'brillantanhaenger-061ct-weissgold',
    name: 'Brillantanhänger 0,61 ct Weißgold',
    category: 'anhaenger', subcategory: 'Brillantanhänger',
    price: 1449, material: 'Weißgold', carat: '0,61 ct CVD-LG-Diamant',
    description: 'Außergewöhnlicher Brillantanhänger über einem halben Karat.',
    available: true,
  },
  {
    id: 'ba-006', slug: 'brillantanhaenger-071ct-gelbgold',
    name: 'Brillantanhänger 0,71 ct Gelbgold',
    category: 'anhaenger', subcategory: 'Brillantanhänger',
    price: 1599, material: 'Gelbgold', carat: '0,71 ct CVD-LG-Diamant',
    description: 'Imposanter Brillantanhänger in warmem Gelbgold – fast drei Viertel Karat.',
    badge: 'EXKLUSIV', available: true,
  },
  {
    id: 'ba-007', slug: 'brillantanhaenger-073ct-weissgold',
    name: 'Brillantanhänger 0,73 ct Weißgold',
    category: 'anhaenger', subcategory: 'Brillantanhänger',
    price: 1599, material: 'Weißgold', carat: '0,73 ct CVD-LG-Diamant',
    description: 'Fast drei Viertel Karat brillanter Schönheit in feinem Weißgold.',
    badge: 'EXKLUSIV', available: true,
  },
  {
    id: 'ba-008', slug: 'brillantanhaenger-076ct-weissgold',
    name: 'Brillantanhänger 0,76 ct Weißgold',
    category: 'anhaenger', subcategory: 'Brillantanhänger',
    price: 1649, material: 'Weißgold', carat: '0,76 ct CVD-LG-Diamant',
    description: 'Beeindruckender Brillantanhänger mit großem Ausstrahlungsvermögen.',
    badge: 'EXKLUSIV', available: true,
  },
  {
    id: 'ba-009', slug: 'tahiti-perlenanhaenger-gelbgold',
    name: 'Zucht-Tahitiperlenanhänger Gelbgold',
    category: 'anhaenger', subcategory: 'Perlenanhänger',
    price: 469, material: 'Gelbgold/Tahitiperle',
    description: 'Seltene Tahitiperle in Gelbgold-Fassung – die Magie des Ozeans als Schmuckstück.',
    details: ['Tahitiperle A-Qualität', 'Gelbgold 585', 'Unikat'],
    available: true,
  },
  {
    id: 'ba-010', slug: 'anhaenger-silber-adler',
    name: 'Anhänger Silber Adler',
    category: 'anhaenger', subcategory: 'Silberanhänger',
    price: 69, originalPrice: 79,
    material: 'Silber',
    description: 'Detailreicher Silberanhänger in Adler-Form – ein Statement-Stück mit Charakter.',
    badge: 'SALE', available: true,
  },

  // ── Armbänder (Morellato) ─────────────────────────────────────────────────────

  {
    id: 'mo-a-001', slug: 'morellato-armband-1',
    name: 'Morellato Armband',
    category: 'armbänder', subcategory: 'Morellato',
    price: 49, material: 'Stahl/Silber',
    description: 'Schlichtes Morellato-Armband – ideal für den Alltag.',
    available: true,
  },
  {
    id: 'mo-a-002', slug: 'morellato-armband-2',
    name: 'Morellato Armband – Rosé',
    category: 'armbänder', subcategory: 'Morellato',
    price: 79, material: 'Rosévergoldet',
    description: 'Zierliches Morellato-Armband in Rosé-Vergoldung.',
    badge: 'NEU', available: true,
  },
  {
    id: 'mo-a-003', slug: 'morellato-armband-3',
    name: 'Morellato Armband – Premium',
    category: 'armbänder', subcategory: 'Morellato',
    price: 98, material: 'Stahl',
    description: 'Hochwertiges Morellato-Armband mit dezentem Design.',
    available: true,
  },
  {
    id: 'mo-a-004', slug: 'morellato-armband-4',
    name: 'Morellato Armband – Grande',
    category: 'armbänder', subcategory: 'Morellato',
    price: 108, material: 'Stahl',
    description: 'Breites Morellato-Armband mit besonderem Tragekomfort.',
    available: true,
  },
  {
    id: 'mo-a-005', slug: 'morellato-armband-5',
    name: 'Morellato Armband – Exklusiv',
    category: 'armbänder', subcategory: 'Morellato',
    price: 118, material: 'Stahl/Vergoldet',
    description: 'Das exklusivste Modell der Morellato-Armband-Kollektion.',
    badge: 'EXKLUSIV', available: true,
  },
  {
    id: 'mo-a-006', slug: 'morellato-armband-6',
    name: 'Morellato Armband – Klassik',
    category: 'armbänder', subcategory: 'Morellato',
    price: 69, material: 'Stahl',
    description: 'Klassisches Morellato-Armband für jeden Anlass.',
    available: true,
  },

  // ── Halsketten (Morellato) ────────────────────────────────────────────────────

  {
    id: 'mo-c-001', slug: 'morellato-collier-1',
    name: 'Morellato Collier',
    category: 'halsketten', subcategory: 'Morellato',
    price: 74, material: 'Silber',
    description: 'Zierliches Morellato-Collier für den eleganten Alltag.',
    available: true,
  },
  {
    id: 'mo-c-002', slug: 'morellato-collier-2',
    name: 'Morellato Collier – Mittel',
    category: 'halsketten', subcategory: 'Morellato',
    price: 88, material: 'Silber',
    description: 'Klassisches Morellato-Collier mit mittigem Anhänger.',
    available: true,
  },
  {
    id: 'mo-c-003', slug: 'morellato-collier-3',
    name: 'Morellato Collier – Premium',
    category: 'halsketten', subcategory: 'Morellato',
    price: 128, material: 'Silber',
    description: 'Hochwertiges Morellato-Collier mit feinen Details.',
    available: true,
  },
  {
    id: 'mo-c-004', slug: 'morellato-collier-4',
    name: 'Morellato Collier – Grande',
    category: 'halsketten', subcategory: 'Morellato',
    price: 118, material: 'Silber/Vergoldet',
    description: 'Großzügiges Morellato-Collier – ideales Geschenk.',
    available: true,
  },
  {
    id: 'mo-c-005', slug: 'morellato-collier-rose',
    name: 'Morellato Collier Rosé',
    category: 'halsketten', subcategory: 'Morellato',
    price: 139, material: 'Rosévergoldet',
    description: 'Romantisches Morellato-Collier in Rosé-Vergoldung.',
    badge: 'NEU', available: true,
  },
  {
    id: 'mo-c-006', slug: 'morellato-collier-herz',
    name: 'Morellato Collier Herz',
    category: 'halsketten', subcategory: 'Morellato',
    price: 59, material: 'Silber',
    description: 'Herzförmiges Morellato-Collier – das perfekte Geschenk für besondere Menschen.',
    available: true,
  },
  {
    id: 'mo-c-007', slug: 'morellato-collier-5',
    name: 'Morellato Collier – Deluxe',
    category: 'halsketten', subcategory: 'Morellato',
    price: 68, material: 'Silber',
    description: 'Elegantes Morellato-Collier in dezenter Ausführung.',
    available: true,
  },
  {
    id: 'kh-001', slug: 'tahiti-perlen-weissgold',
    name: 'Tahitiperlen Collier Weißgold mit Brillanten',
    category: 'halsketten', subcategory: 'Exklusiv',
    price: 1399, material: 'Weißgold/Tahitiperlen',
    description: 'Außergewöhnliches Collier aus Tahitiperlen mit Weißgold-Verschluss und Brillanten-Besatz.',
    details: ['Tahitiperlen A-Qualität', 'Weißgold 585', 'Brillantbesatz am Verschluss', 'Unikat'],
    badge: 'EXKLUSIV', available: true,
  },

  // ── Uhren ──────────────────────────────────────────────────────────────────────

  {
    id: 'uh-001', slug: 'cartier-solo-ronde-stahl',
    name: 'Cartier Solo Ronde Stahl',
    category: 'uhren', subcategory: 'Luxusuhren',
    price: 1990, originalPrice: 7340,
    material: 'Edelstahl',
    description: 'Ikone der feinen Uhrmacherkunst – die Cartier Ronde Solo in poliertem Edelstahl. Elegant, zeitlos, begehrenswert.',
    details: ['Quartzwerk', 'Edelstahlgehäuse', 'Saphirglas', 'Lederarmband', 'Original-Papiere vorhanden'],
    badge: 'SALE', available: true,
  },
  {
    id: 'uh-002', slug: 'chronoswiss-tora',
    name: 'Chronoswiss Tora',
    category: 'uhren', subcategory: 'Luxusuhren',
    price: 2390, originalPrice: 5600,
    material: 'Edelstahl',
    description: 'Die Chronoswiss Tora vereint Schweizer Präzision mit sportlicher Eleganz. Ein seltenes Stück für Kenner.',
    details: ['Automatikwerk', 'Edelstahlgehäuse', 'Saphirglas', 'Originalzustand'],
    badge: 'SALE', available: true,
  },
  {
    id: 'uh-003', slug: 'iwc-pilot-mark-xv',
    name: 'IWC Pilot Mark XV Automatik',
    category: 'uhren', subcategory: 'Luxusuhren',
    price: 3900, originalPrice: 5600,
    material: 'Edelstahl',
    description: 'Legendäre IWC Pilot-Uhr – die Mark XV in Originalzustand. Präzision und Geschichte am Handgelenk.',
    details: ['IWC Kaliber 37524', 'Automatikwerk', 'Edelstahlgehäuse', 'Saphirglas', 'Fliegerband'],
    badge: 'EXKLUSIV', available: true,
  },
  {
    id: 'uh-004', slug: 'longines-grande-classique',
    name: 'Longines La Grande Classique',
    category: 'uhren', subcategory: 'Luxusuhren',
    price: 1450, originalPrice: 7340,
    material: 'Edelstahl/Vergoldet',
    description: 'Zeitlose Eleganz: Die Longines Grande Classique – eine Ikone des klassischen Schweizer Designs.',
    details: ['Quartzwerk', 'Edelstahlgehäuse', 'Saphirglas', 'Lederarmband'],
    badge: 'SALE', available: true,
  },
  {
    id: 'uh-005', slug: 'morellato-damenuhr-pink',
    name: 'Morellato Damenuhr Pink',
    category: 'uhren', subcategory: 'Damenuhren',
    price: 39, material: 'Stahl/Pink',
    description: 'Verspielte Damenuhr von Morellato in leuchtendem Pink – für Frauen mit Stil.',
    available: true,
  },
  {
    id: 'uh-006', slug: 'morellato-damenuhr-rose',
    name: 'Morellato Damenuhr Rosé',
    category: 'uhren', subcategory: 'Damenuhren',
    price: 198, material: 'Edelstahl/Rosévergoldet',
    description: 'Elegante Damenuhr in Rosé-Vergoldung von Morellato – feminin und zeitlos.',
    available: true,
  },
]
