// Components
import { ArtifactGroup } from "@/components/app/ArtifactGroup"

export function CharacterArtifacts() {
  return (
    <div className="flex flex-col gap-1">
      <label className="font-bold">Relics</label>
      <div className="flex flex-col gap-3 ml-3">
        <ArtifactGroup isCavern={true} />
        <ArtifactGroup isCavern={false} />
      </div>
    </div>
  )
}