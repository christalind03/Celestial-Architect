export type Character = {
  id: number
  cavernRelics: number[]
  planarOrnaments: number[]
  lightCone: number | null
}

export type CharacterAttributes = {
  id: number
  tag: string
  name: string
  path: string
  element: string
  rarity: number
}
