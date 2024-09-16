// Components
import { ArtifactGroup } from "@/components/app/ArtifactGroup"

export function CharacterArtifacts() {
  return (
    <div className="gap-1 grid grid-rows-subgrid row-span-3">
      <label className="font-bold">Relics</label>
      <div className="gap-3 grid grid-rows-subgrid row-span-2 ml-3">
        <ArtifactGroup isCavern={true} />
        <ArtifactGroup isCavern={false} />
      </div>
    </div>
  )
}