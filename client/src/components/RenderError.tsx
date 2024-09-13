import { Alert, AlertDescription, AlertTitle } from "@/components/ui/Alert"
import { ExclamationTriangleIcon } from "@radix-ui/react-icons"

type Props = {
  error: Error | null
}

export function RenderError({ error }: Props) {
  return (
    <Alert className="max-w-96 mx-auto" variant="destructive">
      <ExclamationTriangleIcon className="size-4" />

      {/* @ts-ignore */}
      <AlertTitle>ERROR {error.code}</AlertTitle>
      <AlertDescription className="overflow-wrap whitespace-pre">
        {(error && error.message) || "Undefined"}
      </AlertDescription>
    </Alert>
  )
}
