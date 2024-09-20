// Components
import { CharacterArtifacts } from "@/components/app/CharacterArtifacts"
import { CharacterDetails } from "@/components/app/CharacterDetails"
import { CharacterNotes } from "@/components/app/CharacterNotes"
import { CharacterWeapon } from "@/components/app/CharacterWeapon"
import { Loading } from "@/components/Loading"
import { RenderError } from "@/components/RenderError"
import { Separator } from "@/components/ui/Separator"
import { StarFilledIcon } from "@radix-ui/react-icons"

// Data Types
import type { CharacterConfig } from "@/types/CharacterConfig"

// Hooks
import { createContext, useContext } from "react"
import { useQuery } from "@tanstack/react-query"

// Utility Functions
import { cn } from "@/utils/shadcn"
import { generateTimestamp } from "@/utils/generateTimestamp"

type Props = {
  index: number
  config: CharacterConfig
}

type Character = {
  index: number
  config: CharacterConfig
}

const CharacterContext = createContext<Character | undefined>(undefined)

export function CharacterConfig({ index, config }: Props) {
  return (
    <CharacterContext.Provider value={{ index, config }}>
      <div
        className={cn(
          "border gap-3 grid grid-rows-subgrid p-3 row-span-9 rounded-md w-72",
          config.isArchived && "grayscale text-zinc-500"
        )}
      >
        <div className="flex h-full items-center relative">
          <CharacterDetails characterID={config.id} />
          {config.isFavorite && (
            <div className="absolute bg-white flex items-center justify-center rounded-full size-4 -translate-x-0.5 -translate-y-3">
              <StarFilledIcon className="size-3.5 text-amber-500" />
            </div>
          )}
        </div>
        <Separator />
        <div className="gap-5 grid grid-rows-subgrid row-span-7">
          <CharacterArtifacts characterConfig={config} isEditable={true} />
          <CharacterWeapon characterConfig={config} isEditable={true} />
          <CharacterNotes />
          <label className="mt-3 text-[10px] text-zinc-500">
            Last Edit: {generateTimestamp(config.lastEdit)}
          </label>
        </div>
      </div>
    </CharacterContext.Provider>
  )
}

export function useCharacter() {
  const characterContext = useContext(CharacterContext)

  if (!characterContext)
    throw new Error(
      "useCharacter must be used within a CharacterContext.Provider component."
    )

  return characterContext
}
