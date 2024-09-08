// Components
import { Button } from "@/components/ui/Button"
import { ChevronDownIcon, ChevronUpIcon } from "@radix-ui/react-icons"
import { Textarea } from "@/components/ui/Textarea"

// Hooks
import { useState } from "react"

export function CharacterNotes() {
  const [isOpen, setIsOpen] = useState<boolean>(false)

  return (
    <div className="flex flex-col gap-1">
      <div className="flex items-center justify-between">
        <label className="font-bold font-sm">Notes</label>
        <Button size="icon" onClick={() => setIsOpen(!isOpen)} variant="ghost">
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
          placeholder="Notes..."
        />
      )}
    </div>
  )
}
