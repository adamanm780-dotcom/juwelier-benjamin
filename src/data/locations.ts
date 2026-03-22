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
    id: 'wiesbaden-wellritz',
    name: 'Juwelier Benjamin Wiesbaden',
    city: 'Wiesbaden',
    street: 'Wellritzstr. 35',
    zip: '65183',
    specialty: ['Schmuck & Juwelen', 'Uhren', 'Reparaturen'],
    description:
      'Unser Ursprungsstandort in Wiesbaden – seit 1995 ein verlässlicher Partner für feinsten Schmuck, Uhren und professionelle Reparaturen.',
    goldankauf: false,
    mapQuery: 'Wellritzstraße 35, 65183 Wiesbaden',
    phone: '', // <- Telefonnummer hier eintragen
  },
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
  {
    id: 'mainz-lothar',
    name: 'Goldankauf Mainz – Juwelier Benjamin',
    city: 'Mainz',
    street: 'Lotharstr. 15',
    zip: '55116',
    specialty: ['Goldankauf', 'Silberankauf', 'Luxusuhren', 'Juwelen', 'Kommissionsverkauf'],
    description:
      'Unser Mainzer Kompetenzzentrum für Goldankauf auf 130 m² – professionelle Bewertung, faire Preise, diskreter Service. Gebrauchte Luxusuhren und edler Schmuck auf höchstem Niveau.',
    goldankauf: true,
    mapQuery: 'Lotharstraße 15, 55116 Mainz',
    phone: '', // <- Telefonnummer hier eintragen
  },
]
