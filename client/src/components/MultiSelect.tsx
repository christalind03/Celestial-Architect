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
import { Loading } from "@/components/Loading"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/Popover"
import { RenderError } from "@/components/RenderError"

type Props<CustomType> = {
  error: Error | null
  isError: boolean
  isLoading: boolean
  renderButton: React.ReactNode
  renderGroups: {
    heading: string
    iterator: CustomType[]
    displayImage: (groupItem: CustomType) => React.ReactNode
    displayLabel: (groupItem: CustomType) => React.ReactNode
    isSelected: (groupItem: CustomType) => boolean
    onSelect: (groupItem: CustomType) => void
  }[]
}

export function MultiSelect<CustomType>({
  error,
  isError,
  isLoading,
  renderButton,
  renderGroups,
}: Props<CustomType>) {
  return (
    <Popover>
      <PopoverContent className="p-0">
        {isError ? (
          <RenderError error={error} />
        ) : isLoading ? (
          <Loading className="py-5" />
        ) : (
          <Command>
            <CommandInput placeholder="Search..." />
            <CommandList>
              <CommandEmpty>No results found.</CommandEmpty>
              {renderGroups.map(
                (
                  {
                    heading,
                    iterator,
                    displayImage,
                    displayLabel,
                    isSelected,
                    onSelect,
                  },
                  groupIndex
                ) => {
                  return (
                    <CommandGroup key={groupIndex} heading={heading}>
                      {iterator.map((groupItem, itemIndex) => {
                        return (
                          <CommandItem
                            key={`${heading}${itemIndex}`}
                            className="flex gap-3 items-center justify-between"
                            onSelect={() => onSelect(groupItem)}
                          >
                            <div className="flex gap-3 items-center">
                              {displayImage(groupItem)}
                              {displayLabel(groupItem)}
                            </div>
                            {isSelected(groupItem) && (
                              <CheckIcon className="size-5" />
                            )}
                          </CommandItem>
                        )
                      })}
                    </CommandGroup>
                  )
                }
              )}
            </CommandList>
          </Command>
        )}
      </PopoverContent>
      <PopoverTrigger asChild>{renderButton}</PopoverTrigger>
    </Popover>
  )
}
