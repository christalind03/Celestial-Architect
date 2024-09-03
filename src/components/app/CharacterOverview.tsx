// Components
import { CharacterConfig } from "@/components/app/CharacterConfig"

// Hooks
import { useAppConfig } from "@/hooks/AppConfig"
import { useMemo } from "react"

// Utility Functions
import { retrieveCharacter } from "@/utils/retrieveCharacter"

export function CharacterOverview() {
  const { appConfig } = useAppConfig()
  const characterConfigs = useMemo(
    () =>
      Object.values(appConfig).sort((characterOne, characterTwo) =>
        retrieveCharacter(characterOne.id).name.localeCompare(
          retrieveCharacter(characterTwo.id).name
        )
      ),
    [appConfig]
  )

  return (
    <div className="gap-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {characterConfigs.map((characterConfig) => {
        return (
          <CharacterConfig
            key={characterConfig.id}
            characterConfig={characterConfig}
          />
        )
      })}
    </div>
  )
}
