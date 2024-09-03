// Data
import ARTIFACTS from "@/data/artifacts.json"

export function initArtifactList() {
  return Object.values(ARTIFACTS).sort((artifactOne, artifactTwo) =>
    artifactOne.name.localeCompare(artifactTwo.name)
  )
}
