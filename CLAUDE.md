# Juwelier Benjamin – Projektübersicht

Luxury-Website für Juwelier Benjamin. Schwarzes Schwarz-Gold-Ästhetik-Design mit interaktiven goldenen Bubbles, Multi-Page-Routing, Preischart und Scroll-Animationen.

## Stack

- **Framework:** Next.js 14.2.5 (App Router)
- **Sprache:** TypeScript
- **Styling:** Tailwind CSS + globales CSS (`src/app/globals.css`)
- **Animation:** Framer Motion 11
- **3D:** React Three Fiber v8 + Drei v9 + Three 0.170 (MUSS so bleiben – v9 R3F ist inkompatibel mit React 18)
- **Charts:** Recharts 2
- **Dev-Server:** `npm run dev` → http://localhost:3000

## Design-System

### Farben (CSS Custom Properties)
```
--gold:          #C9A84C
--gold-light:    #F0D678
--gold-dark:     #8A6D14
--black:         #080808   ← Hintergrundfarbe überall
--cream:         #F2EDE4   ← Haupttextfarbe
--surface-1..3:  #161616 / #1E1E1E / #262626
```

### Schriften (Google Fonts, geladen in layout.tsx)
- **Cormorant Garamond** → `font-cormorant` / `var(--font-cormorant)` → Headlines, Display
- **Jost** → `font-jost` / `var(--font-jost)` → Fließtext, Labels

### Utility-Klassen (in globals.css)
- `.text-gold-gradient` – goldener Farbverlaufstext
- `.gold-line` – horizontale goldene Trennlinie
- `.luxury-card` – dunkle Karte mit goldenem Border
- `.section-label` – Overline (winzige goldene Versalien)
- `.section-py` – Standard-Sektions-Padding
- `.btn-gold` / `.btn-ghost` – CTA-Buttons

## Routing (App Router)

| Route | Seite |
|---|---|
| `/` | Startseite (Hero + TrustBar + TeaserGrid) |
| `/ueber-uns` | Geschichte & Timeline |
| `/kollektionen` | Schmuck, Trauringe, Uhren |
| `/goldankauf` | Goldpreischart + 3D-Modell + Ankaufsinfo |
| `/reparaturen` | Scroll-Frame-Animation + Leistungen |
| `/standorte` | 3 Standorte mit Karte |
| `/kontakt` | Kontaktformular |
| `/impressum` | Impressum |
| `/datenschutz` | Datenschutzerklärung |
| `/api/goldprice` | Server-Route, cached 24h, goldapi.io |
| `/api/silberprice` | Server-Route, cached 24h, edelmetalle.de |

## Architektur

### Layout (`src/app/layout.tsx`)
Alle Seiten teilen sich:
- `BubbleBackground` (dynamic, ssr:false) – fixed Canvas, z-index:0
- `Header` – sticky, z-50
- `<main className="relative z-[1]">` – **wichtig:** z-[1] damit Inhalte über dem Canvas liegen
- `Footer`

### Stacking-Kontext (wichtig!)
```
Canvas (position:fixed, z-index:0)
  < main (position:relative, z-index:1)   ← schirmt Canvas ab
      < SubPageHeader (z-[10], bg opak)   ← Hero-Bereich komplett schwarz
      < Sektionen (z-10, verschiedene bg)
```
Sektionen mit semitransparentem Hintergrund lassen Bubbles durchscheinen. Sektionen mit `bg-[#080808]` sind opak.

### BubbleBackground (`src/components/ui/BubbleBackground.tsx`)
- Canvas-basierte Physik: Spring-Kräfte, Maus-Attraktion, Bubble-Bubble-Kollision, Rechteck-Kollision
- Bubbles **folgen dem Mauszeiger** (Attraktion, kein Abstoßen)
- Kollisionsrechtecke werden über `src/lib/collisionRects.ts` registriert
- Physics-Konstanten: `MOUSE_ATTRACT: 3600`, `MOUSE_RADIUS: 280`

### CollisionRect-Registry (`src/lib/collisionRects.ts`)
Modul-Level Map, kein React Context nötig:
```ts
registerCollisionRect(id, { x, y, w, h })  // Viewport-Koordinaten
unregisterCollisionRect(id)
getCollisionRects()
```
`HeroSection` registriert das Hero-Video via ResizeObserver.

### GoldPriceChart (`src/components/ui/GoldPriceChart.tsx`)
- Zeigt nur 7-Tage-Chart (30d und 1y wurden entfernt)
- Tabs: Gold / Silber umschaltbar
- Datenquelle: `/api/goldprice` + `/api/silberprice` (intern, gecacht)
- Legierungspreise (24k/22k/21k/18k) werden vom Basispreis abgeleitet
- Silber: 2 Dezimalstellen (nicht 3 – sonst sieht es wie Tausenderbetrag aus)

### API-Keys (`src/app/api/`)
- **goldapi.io** Key: in `.env.local` als `GOLDAPI_KEY`
- **edelmetalle.de**: kein Key nötig, öffentliche API
- Cache: In-Memory + Next.js fetch-Cache, 24h TTL → max. ~30 Anfragen/Monat

### ScrollFramePlayer (`src/components/ui/ScrollFramePlayer.tsx`)
- Scroll-gesteuerte Frame-Animation auf `/reparaturen`
- 40 WebP-Frames mit transparentem Hintergrund (`/public/assets/frames/repairs/`)
- Frames: `frame_001.webp` bis `frame_040.webp`, 540×721px
- Nutzt `requestAnimationFrame`-Loop statt scroll-Events (zuverlässiger)
- Props: `frames`, `className`, `style`, `startOffset`, `speed`

### UmbroViewer (`src/components/ui/UmbroViewer.tsx`)
- React Three Fiber v8 (NICHT v9 – inkompatibel mit React 18)
- Lädt `/public/assets/3d/umbro.glb`
- Dynamic import mit `{ ssr: false }` in GoldankaufSection
- Auto-Rotation + Float-Animation, OrbitControls ohne Pan/Zoom

### RippleCard (`src/components/ui/RippleCard.tsx`)
- Goldene Wasserring-Animation beim Hover (wie Wassertropfen)
- `RINGS = 4`, `RING_DELAY_MS = 520`, `ANIM_MS = 1700`
- Cooldown: verhindert zu häufiges Auslösen
- Wird in TimelineSection für Geschichte-Karten genutzt

### SubPageHeader (`src/components/ui/SubPageHeader.tsx`)
- Wiederverwendbarer Hero für alle Unterseiten
- Props: `overline`, `title`, `subtitle`
- Enthält: Zurück-Link, Logo (64px), Overline, H1, Subtitle, goldene Linie
- Hintergrund: `bg-[#080808]` + `isolation: isolate` → komplett schwarz, keine Bubbles

## Assets (`/public/assets/`)

```
images/
  wunderbaum.png         ← Logo (PNG mit Transparenz)
video/
  hero.webm              ← Hero-Video (WebM VP9, yuva420p, transparent)
  hero.mp4               ← Fallback
3d/
  umbro.glb              ← 3D-Modell für Goldankauf-Seite
frames/repairs/
  frame_001.webp         ← 40 Frames, RGBA WebP (transparenter Hintergrund)
  ...
  frame_040.webp
```

## Standorte

| Standort | Adresse | Goldankauf |
|---|---|---|
| Wiesbaden Wellritzstr. | Wellritzstr. 35, 65183 | Nein |
| Wiesbaden Altstadt | Langgasse 26, 65183 | Ja |
| Mainz | Lotharstr. 15, 55116 | Ja |

Telefonnummern sind noch **leer** in `src/data/locations.ts` (müssen noch eingetragen werden).

## Bekannte Eigenheiten & Fallstricke

- **R3F Version:** `@react-three/fiber` muss auf v8 bleiben (v9 crasht mit React 18)
- **`new Image()` vs `next/image`:** Wenn `Image from 'next/image'` in einer Datei fehlt, greift JSX auf den Browser-DOM-Konstruktor zurück → `TypeError: Failed to construct 'Image'`
- **Canvas z-index:** BubbleBackground-Canvas hat `z-index:0`. `<main>` braucht `z-[1]` damit Seiteninhalte darüber liegen
- **Silberpreise:** immer 2 Dezimalstellen (`toFixed(2)`), nie 3 – sonst wirkt `1.893` wie `1893 €` auf deutschen Nutzern
- **WebP-Frames:** Wurden via Python/Pillow konvertiert (ffmpeg libwebp strip Alpha) – NICHT mit ffmpeg direkt zu WebP konvertieren
- **ScrollFramePlayer:** Nutzt RAF-Loop, kein scroll-Event-Listener (scroll-Events waren auf dieser Seite unzuverlässig)
