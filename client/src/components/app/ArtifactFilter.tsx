// Components
import { Button } from "@/components/ui/Button"
import { CaretSortIcon, Cross2Icon } from "@radix-ui/react-icons"
import { Image } from "@/components/Image"
import { MultiSelect } from "@/components/MultiSelect"

// Data Types
import type { Artifact } from "@/types/Artifact"

// Hooks
import { useFilter } from "@/components/app/AppDashboard"
import { useMemo } from "react"
import { useQuery } from "@tanstack/react-query"

// Utility Functions
import { fetchData } from "@/utils/fetchData"

type Props = {
  isCavern: boolean
}

export function ArtifactFilter({ isCavern }: Props) {
  const { filterOptions, filterOptionsDispatch } = useFilter()
  const allArtifacts = useQuery({
    queryFn: () => fetchData("http://localhost:3000/api/v1/artifacts"),
    queryKey: ["artifactList"],
  })

  const artifactGroup = isCavern ? "cavernRelics" : "planarOrnaments"
  const artifactList = useMemo(() => {
    if (allArtifacts.data) {
      return allArtifacts.data.filter(
        (artifactSet: Artifact) =>
          artifactSet.type === (isCavern ? "Cavern Relic" : "Planar Ornament")
      )
    }
  }, [allArtifacts.data])

  function displayImage({ id: artifactID }: Artifact) {
    return (
      <Image className="size-8" src={`/assets/artifacts/${artifactID}.png`} />
    )
  }

  function displayLabel({ name: artifactName }: Artifact) {
    return <label className="text-xs">{artifactName}</label>
  }

  function isSelected({ id: artifactID }: Artifact) {
    return filterOptions[artifactGroup].includes(artifactID)
  }

  function onSelect(artifactObj: Artifact) {
    filterOptionsDispatch({
      type: isSelected(artifactObj) ? "removeArtifact" : "addArtifact",
      payload: { artifactID: artifactObj.id, isCavern },
    })
  }

  return (
    <MultiSelect<Artifact>
      error={allArtifacts.error}
      isError={allArtifacts.isError}
      isLoading={allArtifacts.isLoading}
      renderButton={
        <Button
          className="flex items-center justify-between w-72"
          variant="outline"
        >
          <label>{filterOptions[artifactGroup].length} Selected</label>
          {filterOptions[artifactGroup].length === 0 ? (
            <CaretSortIcon className="size-4" />
          ) : (
            <Cross2Icon
              className="size-4"
              onClick={(event) => {
                event.stopPropagation()
                filterOptionsDispatch({
                  type: "clearArtifacts",
                  payload: { isCavern },
                })
              }}
            />
          )}
        </Button>
      }
      renderGroups={[
        {
          heading: `${isCavern ? "Cavern Relic" : "Planar Ornament"}s`,
          iterator: artifactList,
          displayImage,
          displayLabel,
          isSelected,
          onSelect,
        },
      ]}
    />
  )
}
