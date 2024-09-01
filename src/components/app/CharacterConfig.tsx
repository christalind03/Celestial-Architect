// Components
import { CharacterDetails } from "@/components/app/CharacterDetails"

// Data Types
import type { Character } from "@/types/Character"
import { Separator } from "../ui/Separator"
import { DisplayArtifacts } from "./DisplayArtifacts"

type Props = {
  characterConfig: Character
}

export function CharacterConfig({ characterConfig }: Props) {
  return (
    <div className="border p-3 rounded-md space-y-3 w-72">
      <CharacterDetails
        id={characterConfig.id}
        attributes={characterConfig.attributes}
      />

      <Separator />

      <div className="flex flex-col gap-1">
        <label className="font-bold text-sm">Relics</label>
        <div className="flex flex-col gap-5 ml-3">
          <DisplayArtifacts
            artifactList={characterConfig.cavernRelics}
            configKey={characterConfig.id}
            isCavern={true}
          />
        </div>
      </div>
    </div>
  )
}
