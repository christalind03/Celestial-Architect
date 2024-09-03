// Components
import { Artifact } from "@/components/app/Artifact"
import { ArtifactSelector } from "@/components/app/ArtifactSelector"

// Hooks
import { useCharacterConfig } from "@/components/app/CharacterConfig"
import { useMemo } from "react"

type Props = {
  isCavern: boolean
}

export function ArtifactGroup({ isCavern }: Props) {
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
    <div className="flex flex-col gap-1">
      <div className="flex items-center justify-between">
        <label className="font-bold text-sm">
          {isCavern ? "Cavern Relics" : "Planar Ornaments"}
        </label>

        <ArtifactSelector isCavern={isCavern} />
      </div>

      <div className="flex flex-col gap-3">
        {artifactList.length !== 0 ? (
          artifactList.map((artifactSet) => {
            return (
              <Artifact
                key={artifactSet.id}
                artifactSet={artifactSet}
                isCavern={isCavern}
              />
            )
          })
        ) : (
          <p className="text-center text-xs text-zinc-500">
            No Relics Equipped.
          </p>
        )}
      </div>
    </div>
  )
}
