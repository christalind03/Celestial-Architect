// Components
import { Image } from "@/components/Image"
import { Loading } from "@/components/Loading"
import { RenderError } from "@/components/RenderError"

// Data Types
import type { Artifact } from "@/types/Artifact"

// Hooks
import { useState } from "react"
import { useQuery } from "@tanstack/react-query"

// Utility Functions
import { fetchData } from "@/utils/fetchData"

type Props = {
  artifactID: number
}

export function Artifact({ artifactID }: Props) {
  const artifactInfo = useQuery({
    queryFn: () =>
      fetchData(`http://localhost:3000/api/v1/artifacts/${artifactID}`),
    queryKey: ["artifactInfo", artifactID],
  })

  const [toggleDetails, setToggleDetails] = useState<boolean>(false)

  if (artifactInfo.isError) return <RenderError error={artifactInfo.error} />
  if (artifactInfo.isLoading) return <Loading />

  return (
    <div className="flex flex-col gap-3 text-xs">
      <div
        className="flex gap-3 items-center p-2 rounded-md hover:bg-secondary"
        onClick={() => setToggleDetails(!toggleDetails)}
      >
        <Image
          className="size-10"
          src={`/assets/artifacts/${artifactInfo.data.id}.png`}
        />
        <div className="flex flex-col gap-1">
          <label className="font-bold">{artifactInfo.data.name}</label>
          <label className="text-zinc-500">
            {toggleDetails ? "Hide" : "Show"} Details
          </label>
        </div>
      </div>
      
      {toggleDetails && (
        <div className="flex flex-col gap-1">
          {artifactInfo.data.baseEffect && (
            <p className="leading-relaxed">
              <b>(2)</b> {artifactInfo.data.baseEffect}
            </p>
          )}

          {artifactInfo.data.completeEffect && (
            <p className="leading-relaxed">
              <b>{artifactInfo.data.type === "Cavern Relic" ? "(4)" : "(2)"}</b>{" "}
              {artifactInfo.data.completeEffect}
            </p>
          )}
        </div>
      )}
    </div>
  )
}
