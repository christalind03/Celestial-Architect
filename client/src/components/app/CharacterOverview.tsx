// Components
import { CharacterConfig } from "@/components/app/CharacterConfig"

// Hooks
import { useAppConfig } from "@/hooks/AppConfig"

export function CharacterOverview() {
  const { appConfig } = useAppConfig()

  return (
    <div className="gap-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {Object.values(appConfig).map((config, index) => {
        return <CharacterConfig key={config.id} {...{ index, config }} />
      })}
    </div>
  )
}
