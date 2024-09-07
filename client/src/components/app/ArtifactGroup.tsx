// Components
import { Artifact } from "@/components/app/Artifact"
import { ArtifactSelector } from "@/components/app/ArtifactSelector"

// Hooks
import { useCharacter } from "@/components/app/CharacterConfig"

type Props = {
  isCavern: boolean
}

export function ArtifactGroup({ isCavern }: Props) {
  const { config } = useCharacter()
  
  const artifactList = isCavern
    ? config.cavernRelics
    : config.planarOrnaments

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
                artifactID={artifactSet}
              />
            )
          })
        ) : (
          <p className="py-3 text-center text-xs text-zinc-500">
            No Relics Equipped.
          </p>
        )}
      </div>
    </div>
  )
}
