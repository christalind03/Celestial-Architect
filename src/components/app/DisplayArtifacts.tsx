// Components
import { ArtifactSelector } from "@/components/app/ArtifactSelector"
import { Image } from "@/components/Image"

// Hooks
import { useCharacterConfig } from "@/components/app/CharacterConfig"
import { useMemo } from "react"

type Props = {
  isCavern: boolean
}

export function DisplayArtifacts({ isCavern }: Props) {
  const characterConfig = useCharacterConfig()
  const characterArtifacts = isCavern
    ? { ...characterConfig.cavernRelics }
    : { ...characterConfig.planarOrnaments }

  const artifactList = useMemo(
    () =>
      Object.values(characterArtifacts).sort((a, b) =>
        a.name.localeCompare(b.name)
      ),
    [characterArtifacts]
  )

  return (
    <div className="flex flex-col gap-1 justify-center">
      <div className="flex items-center justify-between">
        <label className="font-bold text-sm">
          {isCavern ? "Cavern Relics" : "Planar Ornaments"}
        </label>

        <ArtifactSelector isCavern={isCavern} />
      </div>

      {artifactList.map((artifactSet) => {
        return (
          <div key={artifactSet.id} className="flex gap-3 items-center text-xs">
            <Image
              className="size-10"
              src={`/assets/artifacts/${artifactSet.id}.png`}
            />

            <div className="flex flex-col gap-1">
              <label className="font-bold">{artifactSet.name}</label>
              <label className="text-zinc-500">Placeholder</label>
            </div>
          </div>
        )
      })}
    </div>
  )
}
