// Components
import { Image } from "@/components/Image"

// Data Types
import type { Artifact } from "@/types/Artifact"

// Hooks
import { useState } from "react"

type Props = {
  artifactSet: Artifact
  isCavern: boolean
}

export function Artifact({ artifactSet, isCavern }: Props) {
  const [toggleDetails, setToggleDetails] = useState<boolean>(false)

  return (
    <div className="flex flex-col gap-3 text-xs">
      <div
        className="flex gap-3 items-center p-2 rounded-md hover:bg-secondary"
        onClick={() => setToggleDetails(!toggleDetails)}
      >
        <Image
          className="size-10"
          src={`/assets/artifacts/${artifactSet.id}.png`}
        />

        <div className="flex flex-col gap-1">
          <label className="font-bold">{artifactSet.name}</label>
          <label className="text-zinc-500">
            {toggleDetails ? "Hide" : "Show"} Details
          </label>
        </div>
      </div>

      {toggleDetails && (
        <div className="flex flex-col gap-1">
          {artifactSet.baseEffect && (
            <p className="leading-relaxed">
              <b>(2)</b> {artifactSet.baseEffect}
            </p>
          )}

          {artifactSet.completeEffect && (
            <p className="leading-relaxed">
              <b>{isCavern ? "(4)" : "(2)"}</b> {artifactSet.completeEffect}
            </p>
          )}
        </div>
      )}
    </div>
  )
}
