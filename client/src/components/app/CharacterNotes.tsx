// Components
import { Button } from "@/components/ui/Button"
import { ChevronDownIcon, ChevronUpIcon } from "@radix-ui/react-icons"
import { Textarea } from "@/components/ui/Textarea"

// Hooks
import { useAppConfig } from "@/hooks/AppConfig"
import { useCharacter } from "@/components/app/CharacterConfig"
import { useCallback, useState } from "react"

// Utility Functions
import debounce from "lodash.debounce"

export function CharacterNotes() {
  const { index, config } = useCharacter()
  const { appConfigDispatch } = useAppConfig()
  const [isOpen, setIsOpen] = useState<boolean>(false)

  const debounceNotes = useCallback(
    debounce((noteString: string) => {
      appConfigDispatch({
        type: "updateCharacterNotes",
        payload: { characterIndex: index, characterNotes: noteString },
      })
    }, 1000),
    [appConfigDispatch]
  )

  return (
    <div className="flex flex-col gap-1">
      <div className="flex items-center justify-between cursor-pointer" onClick={() => setIsOpen(!isOpen)} >
        <label className="font-bold font-sm">Notes</label>
        <Button size="icon" variant="ghost">
          {isOpen ? (
            <ChevronUpIcon className="size-4" />
          ) : (
            <ChevronDownIcon className="size-4" />
          )}
        </Button>
      </div>

      {isOpen && (
        <Textarea
          className="border-none p-0 text-xs focus-visible:ring-0"
          defaultValue={config.notes}
          onChange={(event) => {
            debounceNotes(event.currentTarget.value)
          }}
          placeholder="Notes..."
        />
      )}
    </div>
  )
}
