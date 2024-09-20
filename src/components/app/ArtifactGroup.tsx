// Components
import { Artifact } from "@/components/app/Artifact"
import { ArtifactSelector } from "@/components/app/ArtifactSelector"

// Data Types
import type { CharacterConfig } from "@/types/CharacterConfig"

type Props = {
  characterConfig: CharacterConfig
  isCavern: boolean
  isEditable: boolean
}

export function ArtifactGroup({
  characterConfig,
  isCavern,
  isEditable,
}: Props) {
  const artifactList = isCavern
    ? characterConfig.cavernRelics
    : characterConfig.planarOrnaments

  return (
    <div className="flex flex-col gap-1">
      <div className="flex items-center justify-between">
        <label className="font-bold text-sm">
          {isCavern ? "Cavern Relics" : "Planar Ornaments"}
        </label>
        {isEditable && <ArtifactSelector isCavern={isCavern} />}
      </div>
      {artifactList.length !== 0 ? (
        <div className="flex flex-col gap-3">
          {artifactList.map((artifactSet) => {
            return <Artifact key={artifactSet} artifactID={artifactSet} />
          })}
        </div>
      ) : (
        <p className="flex h-full items-center justify-center py-3 text-xs text-zinc-500">
          No Relics Equipped.
        </p>
      )}
    </div>
  )
}
