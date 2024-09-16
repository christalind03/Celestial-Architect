// Components
import { Button } from "@/components/ui/Button"
import {
  DownloadIcon,
  GearIcon,
  TrashIcon,
  UploadIcon,
} from "@radix-ui/react-icons"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Separator } from "@/components/ui/Separator"

export function Settings() {
  return (
    <Sheet>
      <SheetContent className="flex flex-col gap-1 items-center w-full">
        <SheetHeader className="flex flex-col gap-1 items-center w-full">
          <SheetTitle>Settings</SheetTitle>
          <Separator className="w-full" />
        </SheetHeader>
        <div className="flex flex-col gap-1 items-center mt-3 w-full">
          <Button className="w-full" variant="ghost">
            <UploadIcon className="mr-2 size-4" /> Import Data
          </Button>
          <Button className="w-full" variant="ghost">
            <DownloadIcon className="mr-2 size-4" /> Export Data
          </Button>
          <Button
            className="text-destructive w-full hover:bg-destructive"
            variant="ghost"
          >
            <TrashIcon className="mr-2 size-4" /> Clear Data
          </Button>
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
