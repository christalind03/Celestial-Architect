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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/Popover"

// Data
import weapons from "@/data/weapons.json"

// Hooks
import { useConfig } from "@/hooks/ConfigProvider"
import { useMemo } from "react"

type Props = {
  characterKey: number
}

export function WeaponSelector({ characterKey }: Props) {
  const { config, configDispatch } = useConfig()
  const weaponList = useMemo(
    () => Object.values(weapons).sort((a, b) => a.name.localeCompare(b.name)),
    [weapons]
  )

  return (
    <Popover>
      <PopoverContent align="end" className="p-0">
        <Command>
          <CommandInput placeholder="Search..." />
          <CommandList>
            <CommandEmpty>No results round.</CommandEmpty>
            <CommandGroup>
              {weaponList.map((weaponData) => {
                const isSelected =
                  config[characterKey].weapon &&
                  config[characterKey].weapon.id === weaponData.id

                return (
                  <CommandItem
                    key={weaponData.id}
                    className="flex gap-3 items-center justify-between"
                    onSelect={() =>
                      isSelected
                        ? configDispatch({
                            type: "removeWeapon",
                            payload: {
                              id: characterKey,
                            },
                          })
                        : configDispatch({
                            type: "addWeapon",
                            payload: {
                              id: characterKey,
                              weaponData,
                            },
                          })
                    }
                  >
                    <div className="flex gap-3 items-center">
                      <Image
                        className="size-8"
                        src={`/assets/weapons/${weaponData.id}.png`}
                      />

                      <label className="text-xs">{weaponData.name}</label>
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
        <Button size="icon" variant="ghost">
          <Pencil1Icon className="size-4" />
        </Button>
      </PopoverTrigger>
    </Popover>
  )
}
