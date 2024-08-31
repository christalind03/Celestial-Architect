// Components
import { CharacterConfig } from "@/components/app/CharacterConfig"

// Hooks
import { useConfig } from "@/hooks/ConfigProvider"
import { useMemo } from "react"

export function CharacterOverview() {
  const { config } = useConfig()
  const characterConfigs = useMemo(
    () => Object.values(config).sort((a, b) => a.name.localeCompare(b.name)),
    [config]
  )

  return (
    <div className="gap-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {characterConfigs.map((characterConfig) => {
        return (
          <CharacterConfig
            key={characterConfig.id}
            attributes={characterConfig}
          />
        )
      })}
    </div>
  )
}
