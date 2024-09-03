// Components
import { Artifact } from "@/components/app/Artifact"
import { ArtifactSelector } from "@/components/app/ArtifactSelector"

// Hooks
import { useCharacterConfig } from "@/components/app/CharacterConfig"
import { useMemo } from "react"

// Utility Functions
import { retrieveArtifact } from "@/utils/retrieveArtifact"

type Props = {
  isCavern: boolean
}

export function ArtifactGroup({ isCavern }: Props) {
  const characterConfig = useCharacterConfig()
  const characterArtifacts = isCavern
    ? [...characterConfig.cavernRelics]
    : [...characterConfig.planarOrnaments]

  const artifactList = useMemo(
    () =>
      characterArtifacts.sort((artifactOne, artifactTwo) =>
        retrieveArtifact(artifactOne).name.localeCompare(
          retrieveArtifact(artifactTwo).name
        )
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
                key={artifactSet}
                artifactSet={retrieveArtifact(artifactSet)}
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
