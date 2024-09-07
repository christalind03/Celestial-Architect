// Components
import { Button } from "@/components/ui/Button"
import { CheckIcon } from "@radix-ui/react-icons"
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
import type { Character } from "@/types/Character"

// Hooks
import { useAppConfig } from "@/hooks/AppConfig"
import { useQuery } from "@tanstack/react-query"

// Utility Functions
import { fetchData } from "@/utils/fetchData"

export function CharacterSelector() {
  const { appConfig, appConfigDispatch } = useAppConfig()
  const characterList = useQuery({
    queryFn: () => fetchData("http://localhost:3000/api/v1/characters"),
    queryKey: ["characterList"],
  })

  function handleSelect(
    characterID: number,
    characterIndex: number,
    isSelected: boolean
  ) {
    appConfigDispatch({
      type: isSelected ? "removeCharacter" : "addCharacter",
      payload: isSelected ? { characterID, characterIndex } : { characterID },
    })
  }

  return (
    <Popover>
      <PopoverContent className="p-0">
        {characterList.isError ? (
          <RenderError error={characterList.error} />
        ) : characterList.isLoading ? (
          <Loading className="py-5" />
        ) : (
          <Command>
            <CommandInput placeholder="Search..." />
            <CommandList>
              <CommandEmpty>No results found.</CommandEmpty>
              <CommandGroup>
                {characterList.data.map(({ id, name }: Character) => {
                  const appIndex = appConfig.findIndex(
                    ({ id: configID }) => configID === id
                  )
                  const isSelected = appIndex !== -1

                  return (
                    <CommandItem
                      key={id}
                      className="flex gap-3 items-center justify-between"
                      onSelect={() => handleSelect(id, appIndex, isSelected)}
                    >
                      <div className="flex gap-3 items-center">
                        <Image
                          className="size-8"
                          src={`/assets/avatars/${id}.png`}
                        />
                        <label>{name}</label>
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
        <Button className="w-72" variant="outline">
          Select Characters
        </Button>
      </PopoverTrigger>
    </Popover>
  )
}
