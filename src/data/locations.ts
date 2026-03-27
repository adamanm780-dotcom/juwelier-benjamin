export interface Location {
  id: string
  name: string
  city: string
  street: string
  zip: string
  specialty: string[]
  description: string
  goldankauf: boolean
  mapQuery: string // Google Maps search query
  phone?: string
}

// ─── Standorte von Juwelier Benjamin ─────────────────────
// Hier können Telefonnummern, Öffnungszeiten etc. ergänzt werden
export const locations: Location[] = [
  {
    id: 'wiesbaden-langgasse',
    name: 'Juwelier Benjamin Altstadt',
    city: 'Wiesbaden',
    street: 'Langgasse 26',
    zip: '65183',
    specialty: ['Trauringe', 'Sonderanfertigungen', 'Goldankauf', 'Handwerkliche Kunst'],
    description:
      'In der Wiesbadener Altstadt spezialisiert auf Trauringe, handgefertigte Einzelstücke und kompetenten Goldankauf. Ihr Ort für besondere Momente.',
    goldankauf: true,
    mapQuery: 'Langgasse 26, 65183 Wiesbaden',
    phone: '', // <- Telefonnummer hier eintragen
  },
]
