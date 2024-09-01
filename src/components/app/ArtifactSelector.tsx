// Components
import { Button } from "@/components/ui/Button"
import { CheckIcon, PlusIcon } from "@radix-ui/react-icons"
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
import artifacts from "@/data/artifacts.json"

// Hooks
import { useConfig } from "@/hooks/ConfigProvider"
import { useMemo } from "react"

type Props = {
  configKey: number
  isCavern: boolean
}

export function ArtifactSelector({ configKey, isCavern }: Props) {
  const artifactType = isCavern ? "Cavern Relic" : "Planar Ornament"
  const artifactList = useMemo(
    () =>
      Object.values(artifacts)
        .filter((a) => a.type === artifactType)
        .sort((a, b) => a.name.localeCompare(b.name)),
    [artifacts]
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
                return (
                  <CommandItem
                    key={artifactSet.id}
                    className="flex gap-3 items-center justify-between"
                  >
                    <div className="flex gap-3 items-center">
                      <Image
                        className="size-8"
                        src={`/assets/artifacts/${artifactSet.id}.png`}
                      />

                      <label className="text-xs">{artifactSet.name}</label>
                    </div>
                  </CommandItem>
                )
              })}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>

      <PopoverTrigger asChild>
        <Button size="icon" variant="ghost">
          <PlusIcon className="size-4" />
        </Button>
      </PopoverTrigger>
    </Popover>
  )
}
