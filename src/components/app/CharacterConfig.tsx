// Components
import { CharacterDetails } from "@/components/app/CharacterDetails"

// Data Types
import type { Character } from "@/types/Character"

type Props = {
  attributes: Character
}

export function CharacterConfig({ attributes }: Props) {
  return (
    <div className="border flex items-center p-3 rounded-md space-y-3 w-72">
      <CharacterDetails attributes={attributes} />
    </div>
  )
}