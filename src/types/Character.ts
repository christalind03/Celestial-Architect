// Data Types
import type { Artifact } from "@/types/Artifact"
import type { Weapon } from "@/types/Weapon"

export type Character = {
  id: number
  attributes: {
    tag: string
    name: string
    path: string
    element: string
    rarity: number
  }
  cavernRelics: { [id: string]: Artifact }
  planarOrnaments: { [id: string]: Artifact }
  weapon: Weapon | null
}
