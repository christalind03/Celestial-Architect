// Components
import { CharacterDetails } from "@/components/app/CharacterDetails"
import { DisplayArtifacts } from "@/components/app/DisplayArtifacts"
import { Separator } from "@/components/ui/Separator"

// Data Types
import type { Character } from "@/types/Character"
import { WeaponSelector } from "./WeaponSelector"

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

      <div className="flex flex-col gap-5">
        <div className="flex flex-col gap-1">
          <label className="font-bold">Relics</label>
          <div className="flex flex-col gap-3 ml-3">
            <DisplayArtifacts
              characterArtifacts={{ ...characterConfig.cavernRelics }}
              characterKey={characterConfig.id}
              isCavern={true}
            />

            <DisplayArtifacts
              characterArtifacts={{ ...characterConfig.planarOrnaments }}
              characterKey={characterConfig.id}
              isCavern={false}
            />
          </div>
        </div>

        <div className="flex flex-col gap-1">
          <div className="flex items-center justify-between">
            <label className="font-bold">Light Cone</label>
            <WeaponSelector />
          </div>
        </div>
      </div>
    </div>
  )
}
