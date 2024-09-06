const db = require("better-sqlite3")("./api/v1/Celestial-Architect.db")

function fetchArtifacts() {
  return db.prepare("SELECT * FROM artifacts").all()
}

function fetchArtifactByID(id) {
  return db.prepare("SELECT * FROM artifacts WHERE id = ?").get(id)
}

module.exports = {
  fetchArtifacts,
  fetchArtifactByID,
}