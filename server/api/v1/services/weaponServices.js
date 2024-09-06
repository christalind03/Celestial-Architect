const db = require("better-sqlite3")("./api/v1/Celestial-Architect.db")

function fetchWeapons() {
  return db.prepare("SELECT * FROM weapons").all()
}

function fetchWeaponByID(id) {
  return db.prepare("SELECT * FROM weapons WHERE id = ?").get(id)
}

function fetchWeaponExtrasByID(id) {
  return db.prepare("SELECT * FROM weapons_extra WHERE id = ?").get(id)
}

module.exports = {
  fetchWeapons,
  fetchWeaponByID,
  fetchWeaponExtrasByID,
}