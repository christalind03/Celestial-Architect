// Data
import ARTIFACTS from "@/data/artifacts.json"

export function retrieveArtifact(artifactID: number) {
  return ARTIFACTS[artifactID.toString() as keyof typeof ARTIFACTS]
}
