// ─── Shared Collision Rectangle Registry ─────────────────────────────────────
// Ermöglicht beliebigen DOM-Elementen, sich als Kollisionsfläche für die
// Bubble-Physics zu registrieren — ohne Props oder Context.
//
// Koordinaten sind immer in Viewport-Space (wie getBoundingClientRect()),
// da der Canvas ebenfalls `position: fixed` nutzt.

export interface CollisionRect {
  x: number
  y: number
  w: number
  h: number
}

const registry = new Map<string, CollisionRect>()

export function registerCollisionRect(id: string, rect: CollisionRect) {
  registry.set(id, rect)
}

export function unregisterCollisionRect(id: string) {
  registry.delete(id)
}

export function getCollisionRects(): CollisionRect[] {
  return Array.from(registry.values())
}
