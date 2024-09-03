export type Character = {
  id: number
  cavernRelics: number[]
  planarOrnaments: number[]
  lightCone: number | null
}

export type CharacterAttributes = {
  tag: string
  name: string
  path: string
  element: string
  rarity: number
}
