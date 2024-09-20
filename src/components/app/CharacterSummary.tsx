// Components
import { StarFilledIcon } from "@radix-ui/react-icons"
import { CharacterArtifacts } from "@/components/app/CharacterArtifacts"
import { CharacterDetails } from "@/components/app/CharacterDetails"
import { CharacterWeapon } from "@/components/app/CharacterWeapon"
import { Separator } from "@/components/ui/Separator"

// Data Types
import type { CharacterConfig } from "@/types/CharacterConfig"

// Hooks
import { Fragment, useState } from "react"
import { cn } from "@/utils/shadcn"

type Props = {
  config: CharacterConfig
}

export function CharacterSummary({ config }: Props) {
  const [isOpen, setIsOpen] = useState<boolean>(false)

  return (
    <div
      className={cn(
        "border p-3 rounded-md w-64 md:w-72",
        config.isArchived && "grayscale text-zinc-500",
        isOpen && "flex flex-col gap-3",
      )}
    >
      <div
        className="flex h-full items-center relative"
        onClick={() => setIsOpen(!isOpen)}
      >
        <CharacterDetails characterID={config.id} />
        {config.isFavorite && (
          <div className="absolute bg-white flex items-center justify-center rounded-full size-4 -translate-x-0.5 -translate-y-3">
            <StarFilledIcon className="size-3.5 text-amber-500" />
          </div>
        )}
      </div>
      {isOpen && (
        <Fragment>
          <Separator />
          <div className="flex flex-col gap-5">
            <CharacterArtifacts characterConfig={config} isEditable={false} />
            <CharacterWeapon characterConfig={config} isEditable={false} />
          </div>
        </Fragment>
      )}
    </div>
  )
}
