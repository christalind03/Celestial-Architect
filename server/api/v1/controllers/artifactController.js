const artifactServices = require("../services/artifactServices")

function getArtifacts(request, response) {
  try {
    const artifacts = artifactServices.fetchArtifacts()
    const sortedArtifacts = artifacts.sort((artifactOne, artifactTwo) =>
      artifactOne.name.localeCompare(artifactTwo.name)
    )

    response.json(sortedArtifacts)
  } catch (err) {
    response.status(500).json({
      error: "Internal Server Error",
      message: `An unexpected error occurred: ${err.message}`,
    })
  }
}

function getArtifactByID(request, response) {
  try {
    const id = request.params.id
    const maybeArtifact = artifactServices.fetchArtifactByID(id)

    if (maybeArtifact) {
      return response.json(maybeArtifact)
    }

    response.status(404).json({
      error: "Unknown Artifact",
      message: `The artifact associated with the ID ${id} does not exist in our records.\nPlease check the ID and try again.`,
    })
  } catch (err) {
    response.status(500).json({
      error: "Internal Server Error",
      message: `An unexpected error occurred: ${err.message}`,
    })
  }
}

module.exports = {
  getArtifacts,
  getArtifactByID,
}