// Components
import { Button } from "@/components/ui/Button"
import { ClearData } from "@/components/app/ClearData"
import { DownloadIcon, GearIcon } from "@radix-ui/react-icons"
import { ExportData } from "@/components/app/ExportData"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Separator } from "@/components/ui/Separator"

// Hooks
import { useState } from "react"


export function Settings() {
  const [isOpen, setIsOpen] = useState<boolean>(false)

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetContent
        aria-describedby={undefined}
        className="flex flex-col gap-1 items-center w-full"
      >
        <SheetHeader className="flex flex-col gap-1 items-center w-full">
          <SheetTitle>Settings</SheetTitle>
          <Separator className="w-full" />
        </SheetHeader>
        <div className="flex flex-col gap-1 items-center mt-3 w-full">
          <Button className="w-full" variant="ghost">
            <DownloadIcon className="mr-2 size-4" /> Import Data
          </Button>
          <ExportData displaySettings={setIsOpen} />
          <ClearData displaySettings={setIsOpen} />
        </div>
      </SheetContent>
      <SheetTrigger asChild>
        <Button size="icon" variant="ghost">
          <GearIcon className="size-4" />
        </Button>
      </SheetTrigger>
    </Sheet>
  )
}
