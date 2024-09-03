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
import { initArtifactList } from "@/utils/initArtifactList"

type Props = {
  isCavern: boolean
}

export function ArtifactSelector({ isCavern }: Props) {
  const { id: characterID } = useCharacterConfig()
  const { appConfig, appConfigDispatch } = useAppConfig()

  const artifactList = initArtifactList().filter(
    (artifactSet) =>
      artifactSet.type === (isCavern ? "Cavern Relic" : "Planar Ornament")
  )

  return (
    <Popover>
      <PopoverContent align="end" className="p-0">
        <Command>
          <CommandInput placeholder="Search..." />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup>
              {artifactList.map((artifactSet) => {
                const isSelected = appConfig[characterID][
                  isCavern ? "cavernRelics" : "planarOrnaments"
                ].includes(artifactSet.id)

                return (
                  <CommandItem
                    key={artifactSet.id}
                    className="flex gap-3 items-center justify-between"
                    onSelect={() =>
                      appConfigDispatch({
                        type: isSelected ? "removeArtifact" : "addArtifact",
                        payload: {
                          artifactID: artifactSet.id,
                          characterID: characterID,
                          isCavern,
                        },
                      })
                    }
                  >
                    <div className="flex gap-3 items-center">
                      <Image
                        className="size-8"
                        src={`/assets/artifacts/${artifactSet.id}.png`}
                      />

                      <label className="text-xs">{artifactSet.name}</label>
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
