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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/Popover"

// Data
import characters from "@/data/characters.json"

// Hooks
import { useAppConfig } from "@/hooks/AppConfig"
import { useMemo } from "react"

export function CharacterSelector() {
  const { appConfig, appConfigDispatch } = useAppConfig()
  const characterList = useMemo(
    () =>
      Object.values(characters).sort((a, b) => a.name.localeCompare(b.name)),
    [characters]
  )

  return (
    <Popover>
      <PopoverContent className="p-0">
        <Command>
          <CommandInput placeholder="Search..." />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup>
              {characterList.map((characterAttributes) => {
                const isSelected = appConfig[characterAttributes.id] !== undefined

                return (
                  <CommandItem
                    key={characterAttributes.id}
                    className="flex gap-3 items-center justify-between"
                    onSelect={() =>
                      isSelected
                        ? appConfigDispatch({
                            type: "removeCharacter",
                            payload: { id: characterAttributes.id },
                          })
                        : appConfigDispatch({
                            type: "addCharacter",
                            payload: { ...characterAttributes },
                          })
                    }
                  >
                    <div className="flex gap-3 items-center">
                      <Image
                        className="size-8"
                        src={`/assets/avatars/${characterAttributes.id}.png`}
                      />

                      <label>{characterAttributes.name}</label>
                    </div>

                    {isSelected && <CheckIcon className="size-5" />}
                  </CommandItem>
                )
              })}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>

      <PopoverTrigger asChild>
        <Button className="w-72" variant="outline">
          Select Characters
        </Button>
      </PopoverTrigger>
    </Popover>
  )
}
