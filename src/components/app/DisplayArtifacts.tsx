// Components
import { ArtifactSelector } from "@/components/app/ArtifactSelector"

// Data Types
import type { Artifact } from "@/types/Artifact"

type Props = {
  artifactList: { [id: string]: Artifact }
  configKey: number
  isCavern: boolean
}

export function DisplayArtifacts({ artifactList, configKey, isCavern }: Props) {
  return (
    <div className="flex flex-col gap-3 justify-center">
      <div className="flex items-center justify-between">
        <label className="font-bold text-sm">
          {isCavern ? "Cavern Relics" : "Planar Ornaments"}
        </label>

        <ArtifactSelector configKey={configKey} isCavern={isCavern} />
      </div>
    </div>
  )
}
