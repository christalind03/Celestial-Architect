// Components
import { DisplayArtifacts } from "@/components/app/DisplayArtifacts"

export function CharacterArtifacts() {
  return (
    <div className="flex flex-col gap-1">
      <label className="font-bold">Relics</label>
      <div className="flex flex-col gap-3 ml-3">
        <DisplayArtifacts isCavern={true} />
        <DisplayArtifacts isCavern={false} />
      </div>
    </div>
  )
}