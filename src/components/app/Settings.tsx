// Components
import { Button } from "@/components/ui/Button"
import { ClearData } from "@/components/app/ClearData"
import { ExportData } from "@/components/app/ExportData"
import { GearIcon } from "@radix-ui/react-icons"
import { ImportData } from "@/components/app/ImportData"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Separator } from "@/components/ui/Separator"
import { FileConfig } from "@/hooks/FileConfig"

// Hooks
import { useAppConfig } from "@/hooks/AppConfig"
import { useState } from "react"

export function Settings() {
  const { appConfig } = useAppConfig()
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
          <FileConfig defaultValue={[]}>
            <ImportData displaySettings={setIsOpen} />
          </FileConfig>
          <FileConfig defaultValue={appConfig}>
            <ExportData displaySettings={setIsOpen} />
          </FileConfig>
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
