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
import { fetchData } from "@/utils/fetchData"
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
  const characterInfo = useQuery({
    queryFn: () =>
      fetchData(`http://localhost:3000/api/v1/characters/${config.id}`),
    queryKey: ["characterInfo", config.id],
  })

  if (characterInfo.isError) return <RenderError error={characterInfo.error} />
  if (characterInfo.isLoading) return <Loading />

  return (
    <CharacterContext.Provider value={{ index, config }}>
      <div
        className={cn(
          "border p-3 rounded-md space-y-3 w-72",
          config.isArchived && "grayscale text-zinc-500"
        )}
      >
        <div className="flex">
          <CharacterDetails attributes={characterInfo.data} />
          {config.isFavorite && (
            <div className="absolute bg-white flex items-center justify-center rounded-full size-4 -translate-x-0.5">
              <StarFilledIcon className="size-3.5 text-amber-500" />
            </div>
          )}
        </div>
        <Separator />
        <div className="flex flex-col gap-5">
          <CharacterArtifacts />
          <CharacterWeapon characterPath={characterInfo.data.path} />
          <CharacterNotes />
          <label className="text-[10px] text-zinc-500">Last Edit: {generateTimestamp(config.lastEdit)}</label>
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
