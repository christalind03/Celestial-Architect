import type { AppConfig } from "@/hooks/AppConfig"

export function retrieveArtifacts(
  appConfig: AppConfig,
  characterKey: number,
  isCavern: boolean
) {
  const artifactKey = isCavern ? "cavernRelics" : "planarOrnaments"
  return appConfig[characterKey][artifactKey]
}
