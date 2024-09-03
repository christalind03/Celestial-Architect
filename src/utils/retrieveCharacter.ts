// Data
import CHARACTERS from "@/data/characters.json"

export function retrieveCharacter(characterID: number) {
  return CHARACTERS[characterID.toString() as keyof typeof CHARACTERS]
}