// Components
import { Button } from "@/components/ui/Button"
import { Image } from "@/components/Image"
import { MultiSelect } from "@/components/MultiSelect"
import { Pencil1Icon } from "@radix-ui/react-icons"

// Data Types
import type { Artifact } from "@/types/Artifact"

// Hooks
import { useAppConfig } from "@/hooks/AppConfig"
import { useCharacter } from "@/components/app/CharacterConfig"
import { useQuery } from "@tanstack/react-query"

// Service Functions
import { fetchArtifacts } from "@/services/fetchArtifacts"

type Props = {
  isCavern: boolean
}

export function ArtifactSelector({ isCavern }: Props) {
  const { index, config } = useCharacter()
  const { appConfigDispatch } = useAppConfig()

  const artifactGroup = isCavern ? "cavernRelics" : "planarOrnaments"
  const artifactList = useQuery({
    queryFn: () => fetchArtifacts(isCavern),
    queryKey: [artifactGroup],
  })

  function displayImage({ id: artifactID }: Artifact) {
    return (
      <Image className="size-8" src={`/assets/artifacts/${artifactID}.png`} />
    )
  }

  function displayLabel({ name: artifactName }: Artifact) {
    return <label className="text-xs">{artifactName}</label>
  }

  function isSelected({ id: artifactID }: Artifact) {
    return config[artifactGroup].includes(artifactID)
  }

  function onSelect(artifactObj: Artifact) {
    appConfigDispatch({
      type: isSelected(artifactObj)
        ? "removeCharacterArtifact"
        : "addCharacterArtifact",
      payload: { artifactID: artifactObj.id, characterIndex: index, isCavern },
    })
  }

  return (
    <MultiSelect<Artifact>
      error={artifactList.error}
      isError={artifactList.isError}
      isLoading={artifactList.isLoading}
      renderButton={
        <Button size="icon" variant="ghost">
          <Pencil1Icon className="size-4" />
        </Button>
      }
      renderGroups={[
        {
          heading: `${isCavern ? "Cavern Relic" : "Planar Ornament"}s`,
          iterator: artifactList.data || [],
          displayImage,
          displayLabel,
          isSelected,
          onSelect,
        },
      ]}
    />
  )
}
