import type { Config } from "@/hooks/ConfigProvider"

export function retrieveArtifacts(
  characterConfigs: Config,
  characterKey: number,
  isCavern: boolean
) {
  const artifactKey = isCavern ? "cavernRelics" : "planarOrnaments"
  return characterConfigs[characterKey][artifactKey]
}
