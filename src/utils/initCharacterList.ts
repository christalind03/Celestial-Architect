// Data
import CHARACTERS from "@/data/characters.json"

export function initCharacterList() {
  return Object.values(CHARACTERS).sort((characterOne, characterTwo) =>
    characterOne.name.localeCompare(characterTwo.name)
  )
}
