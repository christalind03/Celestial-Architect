// Components
import { ArtifactGroup } from "@/components/app/ArtifactGroup"

// Data Types
import type { CharacterConfig } from "@/types/CharacterConfig"

type Props = {
  characterConfig: CharacterConfig,
  isEditable: boolean
}

export function CharacterArtifacts({ characterConfig, isEditable }: Props) {
  return (
    <div className="gap-1 grid grid-rows-subgrid row-span-3">
      <label className="font-bold">Relics</label>
      <div className="gap-3 grid grid-rows-subgrid row-span-2 ml-3">
        <ArtifactGroup characterConfig={characterConfig} isCavern={true} isEditable={isEditable} />
        <ArtifactGroup characterConfig={characterConfig} isCavern={false} isEditable={isEditable} />
      </div>
    </div>
  )
}