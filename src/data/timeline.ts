export interface TimelineEntry {
  year: string
  title: string
  content: string
  detail?: string
  location?: string
  highlight?: boolean
}

export const timelineEntries: TimelineEntry[] = [
  {
    year: '1965',
    title: 'Die Anfänge einer Familientradition',
    content:
      'Im Ausland beginnt die Familie Benjamin ihr Handwerk im Gold- und Silberbereich. Was als Leidenschaft für edles Metall und feinste Verarbeitung entstand, legte den Grundstein für eine generationsübergreifende Tradition.',
    detail: 'Familienhandwerk im Gold- & Silberbereich',
  },
  {
    year: '1995',
    title: 'Die erste Filiale in Deutschland',
    content:
      'Martin Benjamin, dessen Hingabe zum Handwerk schon früh erkennbar war, eröffnet gemeinsam mit seinem Bruder Eduard Benjamin die erste deutsche Juwelier-Benjamin-Filiale in Wiesbaden. In herausfordernder Zeit entwickelt sich das Haus Benjamin zu einem der führenden familiengeführten Juweliere der Region.',
    location: 'Wellritzstr. 35, Wiesbaden',
    highlight: true,
  },
  {
    year: '2008',
    title: 'Expansion nach Mainz',
    content:
      'Im August 2008 eröffnen Martin Benjamin, Aydin Benjamin und Binno Benjamin eine zweite Filiale in Mainz. Auf ca. 130 m² werden Juwelen und Uhren auf hohem Qualitätsniveau präsentiert. Gebrauchter Schmuck und Luxusuhren werden aufbereitet und angeboten.',
    location: 'Lotharstr. 15, Mainz',
  },
  {
    year: '2010',
    title: 'Dritter Standort & Neustrukturierung',
    content:
      'Aydin Benjamin eröffnet die Filiale in der Mainzer Altstadt mit Fokus auf Trauringe, handwerkliche Kunst, Sonderanfertigungen und Goldankauf. Seit 2010 werden Kommissionsverkäufe angenommen. Im Dezember übernimmt Aydin Benjamin zudem die Lotharstraße.',
    location: 'Fischtorstr. 7, Mainz Altstadt',
  },
  {
    year: '2013',
    title: 'Vierter Standort & Konsolidierung',
    content:
      'Martin Benjamin eröffnet die Filiale in der Langgasse 26 in der Wiesbadener Altstadt. Gemeinsam mit seinen Brüdern Binno und Daniyel führt Aydin Benjamin die Mainzer Filiale in der Lotharstraße. Die Familie Benjamin blickt dank qualitativ hochwertigem Service in eine aussichtsreiche Zukunft.',
    location: 'Langgasse 26, Wiesbaden',
    highlight: true,
  },
  {
    year: 'Heute',
    title: 'Tradition trifft Zukunft',
    content:
      'Mit drei Standorten in Wiesbaden und Mainz verbindet Juwelier Benjamin Jahrzehnte handwerklicher Tradition mit dem Anspruch an höchste Qualität. Die Familie Benjamin steht für Vertrauen, Beständigkeit und exklusive Juwelierkunst.',
    detail: 'Drei Standorte · Seit 1965 im Handwerk · Familiengeführt',
  },
]
