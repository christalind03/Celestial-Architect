export type CharacterConfig = {
  id: number
  isArchived: boolean
  isFavorite: boolean
  cavernRelics: number[]
  planarOrnaments: number[]
  lightCone: number | null
  notes: string
  lastEdit: number
}

export function isCharacterConfig(obj: any): obj is CharacterConfig {
  return (
    obj &&
    typeof obj === "object" &&
    typeof obj.id === "number" &&
    typeof obj.isArchived === "boolean" &&
    typeof obj.isFavorite === "boolean" &&
    Array.isArray(obj.cavernRelics) && obj.cavernRelics.every((item: unknown) => typeof item === "number") &&
    Array.isArray(obj.planarOrnaments) && obj.planarOrnaments.every((item: unknown) => typeof item === "number") &&
    (obj.lightCone === null || typeof obj.lightCone === "number") &&
    typeof obj.notes === "string" &&
    typeof obj.lastEdit === "number"
  )
}