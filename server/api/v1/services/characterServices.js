const db = require("better-sqlite3")("./api/v1/Celestial-Architect.db")

function fetchCharacters() {
  return db.prepare("SELECT * FROM characters").all()
}

function fetchCharacterByID(id) {
  return db.prepare("SELECT * FROM characters WHERE id = ?").get(id)
}

module.exports = {
  fetchCharacters,
  fetchCharacterByID,
}