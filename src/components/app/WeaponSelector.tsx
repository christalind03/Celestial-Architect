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

// Hooks
import { useAppConfig } from "@/hooks/AppConfig"
import { useCharacterConfig } from "@/components/app/CharacterConfig"

// Utility Functions
import { initWeaponList } from "@/utils/initWeaponList"

export function WeaponSelector() {
  const { id: characterID } = useCharacterConfig()
  const { appConfig, appConfigDispatch } = useAppConfig()
  
  const weaponList = initWeaponList()

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
                  appConfig[characterID].lightCone === weaponData.id

                return (
                  <CommandItem
                    key={weaponData.id}
                    className="flex gap-3 items-center justify-between"
                    onSelect={() =>
                      isSelected
                        ? appConfigDispatch({
                            type: "removeWeapon",
                            payload: {
                              characterID: characterID,
                            },
                          })
                        : appConfigDispatch({
                            type: "addWeapon",
                            payload: {
                              characterID: characterID,
                              weaponID: weaponData.id,
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
