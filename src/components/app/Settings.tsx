// Components
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/AlertDialog"
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

// Hooks
import { useAppConfig } from "@/hooks/AppConfig"
import { useState } from "react"

export function Settings() {
  const { appConfigDispatch } = useAppConfig()
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
            <UploadIcon className="mr-2 size-4" /> Import Data
          </Button>
          <Button className="w-full" variant="ghost">
            <DownloadIcon className="mr-2 size-4" /> Export Data
          </Button>
          <AlertDialog>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Clear Data?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action is permanent and cannot be undone. <br /> All
                  associated information will be lost.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  className="bg-destructive hover:bg-destructive"
                  onClick={() => {
                    appConfigDispatch({ type: "clearData", payload: {} })
                    setIsOpen(false)
                  }}
                >
                  Continue
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
            <AlertDialogTrigger asChild>
              <Button
                className="text-destructive w-full hover:bg-destructive"
                variant="ghost"
              >
                <TrashIcon className="mr-2 size-4" /> Clear Data
              </Button>
            </AlertDialogTrigger>
          </AlertDialog>
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
