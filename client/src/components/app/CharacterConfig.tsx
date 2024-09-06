// Components
import { CharacterArtifacts } from "@/components/app/CharacterArtifacts"
import { CharacterDetails } from "@/components/app/CharacterDetails"
import { CharacterWeapon } from "@/components/app/CharacterWeapon"
import { Loading } from "@/components/Loading"
import { RenderError } from "@/components/RenderError"
import { Separator } from "@/components/ui/Separator"

// Data Types
import type { Character } from "@/types/Character"

// Hooks
import { createContext, useContext } from "react"
import { useQuery } from "@tanstack/react-query"

// Utility Functions
import { fetchData } from "@/utils/fetchData"

type Props = {
  characterConfig: Character
}

const CharacterContext = createContext<Character | undefined>(undefined)

export function CharacterConfig({ characterConfig }: Props) {
  const characterID = characterConfig.id
  const characterInfo = useQuery({
    queryFn: () =>
      fetchData(`http://localhost:3000/api/v1/characters/${characterID}`),
    queryKey: ["characterInfo", characterID],
  })

  if (characterInfo.isError) return <RenderError error={characterInfo.error} />
  if (characterInfo.isLoading) return <Loading />

  return (
    <CharacterContext.Provider value={characterConfig}>
      <div className="border p-3 rounded-md space-y-3 w-72">
        <CharacterDetails id={characterID} attributes={characterInfo.data} />

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
    throw new Error(
      "useCharacterConfig must be used within a CharacterContext.Provider component."
    )

  return characterContext
}
