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
  TrashIcon
} from "@radix-ui/react-icons"

// Hooks
import { useAppConfig } from "@/hooks/AppConfig"

type Props = {
  displaySettings: (value: boolean) => void
}

export function ClearData({ displaySettings }: Props) {
  const { appConfigDispatch } = useAppConfig()

  return (
    <AlertDialog>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Clear Data?</AlertDialogTitle>
          <AlertDialogDescription>
            This action is permanent and cannot be undone. <br /> All associated
            information will be lost.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            className="bg-destructive hover:bg-destructive"
            onClick={() => {
              appConfigDispatch({ type: "clearData", payload: {} })
              displaySettings(false)
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
  )
}
