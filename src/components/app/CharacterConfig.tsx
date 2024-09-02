// Components
import { CharacterDetails } from "@/components/app/CharacterDetails"
import { DisplayArtifacts } from "@/components/app/DisplayArtifacts"
import { Image } from "@/components/Image"
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
            <WeaponSelector characterKey={characterConfig.id} />
          </div>

          {characterConfig.weapon && (
            <div className="flex gap-3 items-center text-xs">
              <Image
                className="size-12"
                src={`/assets/weapons/${characterConfig.weapon.id}.png`}
              />

              <div className="flex flex-col gap-1">
                <label className="font-bold">
                  {characterConfig.weapon.name}
                </label>
                <label className="text-zinc-500">Placeholder</label>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
