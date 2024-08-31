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
import { useConfig } from "@/hooks/ConfigProvider"
import { useMemo } from "react"

export function CharacterSelector() {
  const { config, configDispatch } = useConfig()
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
              {characterList.map(({ id, name }) => {
                const isSelected = config[id] !== undefined

                return (
                  <CommandItem
                    key={id}
                    className="flex gap-3 items-center justify-between"
                    onSelect={() =>
                      configDispatch(
                        isSelected
                          ? { type: "removeCharacter", payload: { id } }
                          : { type: "addCharacter", payload: { id } }
                      )
                    }
                  >
                    <div className="flex gap-3 items-center justify-between">
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
      </PopoverContent>

      <PopoverTrigger asChild>
        <Button className="w-72" type="button" variant="outline">
          Select Characters
        </Button>
      </PopoverTrigger>
    </Popover>
  )
}
