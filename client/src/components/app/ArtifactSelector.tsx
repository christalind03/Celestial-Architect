// Components
import { Button } from "@/components/ui/Button"
import { CheckIcon, Pencil1Icon } from "@radix-ui/react-icons"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/Command"
import { Image } from "@/components/Image"
import { Loading } from "@/components/Loading"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/Popover"
import { RenderError } from "@/components/RenderError"

// Data Types
import type { Artifact } from "@/types/Artifact"

// Hooks
import { useAppConfig } from "@/hooks/AppConfig"
import { useCharacter } from "@/components/app/CharacterConfig"
import { useQuery } from "@tanstack/react-query"

// Utility Functions
import { fetchData } from "@/utils/fetchData"
import { useMemo } from "react"

type Props = {
  isCavern: boolean
}

export function ArtifactSelector({ isCavern }: Props) {
  const { index, config } = useCharacter()
  const { appConfigDispatch } = useAppConfig()

  const artifactGroup = isCavern ? "cavernRelics" : "planarOrnaments"
  const artifactList = useQuery({
    queryFn: () => fetchData("http://localhost:3000/api/v1/artifacts"),
    queryKey: ["artifactList"],
  })

  const filteredArtifacts = useMemo(() => {
    if (artifactList.data) {
      return artifactList.data.filter(
        (artifactSet: Artifact) =>
          artifactSet.type === (isCavern ? "Cavern Relic" : "Planar Ornament")
      )
    }
  }, [artifactList.data])

  function handleSelect(artifactID: number, isSelected: boolean) {
    appConfigDispatch({
      type: isSelected ? "removeCharacterArtifact" : "addCharacterArtifact",
      payload: { artifactID, characterIndex: index, isCavern },
    })
  }

  return (
    <Popover>
      <PopoverContent align="end" className="p-0">
        {artifactList.isError ? (
          <RenderError error={artifactList.error} />
        ) : artifactList.isLoading ? (
          <Loading className="py-5" />
        ) : (
          <Command>
            <CommandInput placeholder="Search..." />
            <CommandList>
              <CommandEmpty>No results found.</CommandEmpty>
              <CommandGroup>
                {filteredArtifacts.map(({ id, name }: Artifact) => {
                  const isSelected = config[artifactGroup].includes(id)

                  return (
                    <CommandItem
                      key={id}
                      className="flex gap-3 items-center justify-between"
                      onSelect={() => handleSelect(id, isSelected)}
                    >
                      <div className="flex gap-3 items-center">
                        <Image
                          className="size-8"
                          src={`/assets/artifacts/${id}.png`}
                        />
                        <label className="text-xs">{name}</label>
                      </div>
                      {isSelected && <CheckIcon className="size-5" />}
                    </CommandItem>
                  )
                })}
              </CommandGroup>
            </CommandList>
          </Command>
        )}
      </PopoverContent>
      <PopoverTrigger asChild>
        <Button size="icon" variant="ghost">
          <Pencil1Icon className="size-4" />
        </Button>
      </PopoverTrigger>
    </Popover>
  )
}
