// Components
import { Image } from "@/components/Image"
import { Separator } from "@/components/ui/Separator"

// Data Types
import type { Character } from "@/types/Character"

type Props = {
  attributes: Character
}

export function CharacterDetails({ attributes }: Props) {
  return (
    <div className="flex gap-3 items-center">
      <Image className="size-12" src={`/assets/avatars/${attributes.id}.png`} />
      <div className="flex flex-col gap-1 items-start">
        <label className="font-bold text-pretty">{attributes.name}</label>
        <div className="flex gap-1 items-center">
          <Image
            className="h-4"
            src={`/assets/rarity/${attributes.rarity}.png`}
          />
          <Separator className="h-4 mx-1 w-0.5" orientation="vertical" />
          <Image
            className="h-4"
            src={`/assets/elements/${attributes.element}.png`}
          />
          <Image className="h-4" src={`/assets/paths/${attributes.path}.png`} />
        </div>
      </div>
    </div>
  )
}
