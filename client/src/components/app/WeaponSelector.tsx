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
import { Weapon } from "@/types/Weapon"

// Hooks
import { useAppConfig } from "@/hooks/AppConfig"
import { useCharacterConfig } from "@/components/app/CharacterConfig"
import { useQuery } from "@tanstack/react-query"

// Utility Functions
import { fetchData } from "@/utils/fetchData"

export function WeaponSelector() {
  const { id: characterID } = useCharacterConfig()
  const { appConfig, appConfigDispatch } = useAppConfig()

  const weaponList = useQuery({
    queryFn: () => fetchData("http://localhost:3000/api/v1/weapons"),
    queryKey: ["weaponList"],
  })

  return (
    <Popover>
      <PopoverContent align="end" className="p-0">
        {weaponList.isError ? (
          <RenderError error={weaponList.error} />
        ) : weaponList.isLoading ? (
          <Loading className="py-5" />
        ) : (
          <Command>
            <CommandInput placeholder="Search..." />
            <CommandList>
              <CommandEmpty>No results round.</CommandEmpty>
              <CommandGroup>
                {weaponList.data.map((weaponData: Weapon) => {
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
