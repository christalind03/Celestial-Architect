// Components
import { Artifact } from "@/components/app/Artifact"
import { ArtifactSelector } from "@/components/app/ArtifactSelector"

// Hooks
import { useCharacterConfig } from "@/components/app/CharacterConfig"

type Props = {
  isCavern: boolean
}

export function ArtifactGroup({ isCavern }: Props) {
  const characterConfig = useCharacterConfig()
  const characterArtifacts = isCavern
    ? [...characterConfig.cavernRelics]
    : [...characterConfig.planarOrnaments]

  return (
    <div className="flex flex-col gap-1">
      <div className="flex items-center justify-between">
        <label className="font-bold text-sm">
          {isCavern ? "Cavern Relics" : "Planar Ornaments"}
        </label>

        <ArtifactSelector isCavern={isCavern} />
      </div>

      <div className="flex flex-col gap-3">
        {characterArtifacts.length !== 0 ? (
          characterArtifacts.map((artifactSet) => {
            return (
              <Artifact
                key={artifactSet}
                artifactID={artifactSet}
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
