// Utility Functions
import { cn } from "@/utils/shadcn"

type Props = {
  className?: string
}

export function Loading({ className = "" }: Props) {
  return (
    <div className={cn("flex items-center justify-center", className)}>
      <div className="animate-spin border-[5px] border-t-[5px] border-t-primary rounded-full size-[35px]" />
    </div>
  )
}
