// Components
import { CharacterArtifacts } from "@/components/app/CharacterArtifacts"
import { CharacterDetails } from "@/components/app/CharacterDetails"
import { CharacterWeapon } from "@/components/app/CharacterWeapon"
import { Separator } from "@/components/ui/Separator"

// Data Types
import type { Character } from "@/types/Character"

// Hooks
import { createContext, useContext } from "react"

type Props = {
  characterConfig: Character
}

const CharacterContext = createContext<Character | undefined>(undefined)

export function CharacterConfig({ characterConfig }: Props) {
  return (
    <CharacterContext.Provider value={characterConfig}>
      <div className="border p-3 rounded-md space-y-3 w-72">
        <CharacterDetails
          id={characterConfig.id}
          attributes={characterConfig.attributes}
        />

        <Separator />

        <div className="flex flex-col gap-5">
          <CharacterArtifacts />
          <CharacterWeapon />
        </div>
      </div>
    </CharacterContext.Provider>
  )
}

export function useCharacterConfig() {
  const characterContext = useContext(CharacterContext)

  if (!characterContext)
    throw new Error("useCharacterConfig must be used within a CharacterContext.Provider component.")

  return characterContext
}
