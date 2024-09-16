// Components
import { Button } from "@/components/ui/Button"
import { Image } from "@/components/Image"
import { MultiSelect } from "@/components/MultiSelect"

// Data Types
import type { Character } from "@/types/Character"

// Hooks
import { useAppConfig } from "@/hooks/AppConfig"
import { useQuery } from "@tanstack/react-query"

// Service Functions
import { fetchCharacters } from "@/services/fetchCharacters"

export function CharacterSelector() {
  const { appConfig, appConfigDispatch } = useAppConfig()
  const characterList = useQuery({
    queryFn: fetchCharacters,
    queryKey: ["characterList"],
  })

  function displayImage({ id: characterID }: Character) {
    return (
      <Image className="size-8" src={`/assets/avatars/${characterID}.png`} />
    )
  }

  function displayLabel({ name: characterName }: Character) {
    return <label>{characterName}</label>
  }

  function isSelected({ id: characterID }: Character) {
    return (
      appConfig.findIndex(({ id: configID }) => configID === characterID) !== -1
    )
  }

  function onSelect({ id: characterID }: Character) {
    const characterIndex = appConfig.findIndex(
      ({ id: configID }) => configID === characterID
    )

    const isSelected = characterIndex !== -1

    appConfigDispatch({
      type: isSelected ? "removeCharacter" : "addCharacter",
      payload: { characterID, characterIndex },
    })
  }

  return (
    <MultiSelect<Character>
      error={characterList.error}
      isError={characterList.isError}
      isLoading={characterList.isLoading}
      renderButton={
        <Button className="w-60" variant="outline">
          Select Characters
        </Button>
      }
      renderGroups={[
        {
          heading: "Characters",
          iterator: characterList.data || [],
          displayImage,
          displayLabel,
          isSelected,
          onSelect,
        },
      ]}
    />
  )
}
