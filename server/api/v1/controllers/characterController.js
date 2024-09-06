const characterServices = require("../services/characterServices")

function getCharacters(request, response) {
  try {
    const characters = characterServices.fetchCharacters()
    const sortedCharacters = characters.sort((characterOne, characterTwo) =>
      characterOne.name.localeCompare(characterTwo.name)
    )

    response.json(sortedCharacters)
  } catch (err) {
    response.status(500).json({
      error: "Internal Server Error",
      message: `An unexpected error occurred: ${err.message}`,
    })
  }
}

function getCharacterByID(request, response) {
  try {
    const id = request.params.id
    const maybeCharacter = characterServices.fetchCharacterByID(id)

    if (maybeCharacter) {
      return response.json(maybeCharacter)
    }

    response.status(404).json({
      error: "Unknown Character",
      message: `The character associated with the ID ${id} does not exist in our records.\nPlease check the ID and try again.`,
    })
  } catch (err) {
    response.status(500).json({
      error: "Internal Server Error",
      message: `An unexpected error occurred: ${err.message}`,
    })
  }
}

module.exports = {
  getCharacters,
  getCharacterByID,
}
