// Data Types
import type { Artifact } from "@/types/Artifact"

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
}
