// Components
import { ArtifactSelector } from "@/components/app/ArtifactSelector"
import { Image } from "@/components/Image"

// Data Types
import type { Artifact } from "@/types/Artifact"

// Hooks
import { useMemo } from "react"

type Props = {
  characterArtifacts: { [id: string]: Artifact }
  characterKey: number
  isCavern: boolean
}

export function DisplayArtifacts({
  characterArtifacts,
  characterKey,
  isCavern,
}: Props) {
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

        <ArtifactSelector characterKey={characterKey} isCavern={isCavern} />
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
              <label className="text-zinc-500">
                {isCavern && artifactList.length === 1 ? "4pc" : "2pc"}
              </label>
            </div>
          </div>
        )
      })}
    </div>
  )
}
