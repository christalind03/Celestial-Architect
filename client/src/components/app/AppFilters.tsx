// Components
import { ArtifactFilter } from "@/components/app/ArtifactFilter"
import { WeaponFilter } from "@/components/app/WeaponFilter"

export function AppFilters() {
  return (
    <div className="font-medium flex gap-5 items-center text-sm">
      <div className="flex flex-col gap-2.5">
        <label>Cavern Relics</label>
        <ArtifactFilter isCavern={true} />
      </div>
      <div className="flex flex-col gap-2.5">
        <label>Planar Ornaments</label>
        <ArtifactFilter isCavern={false} />
      </div>
      <div className="flex flex-col gap-2.5">
        <label>Light Cones</label>
        <WeaponFilter />
      </div>
    </div>
  )
}
