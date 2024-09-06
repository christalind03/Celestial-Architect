const weaponServices = require("../services/weaponServices")

function getWeapons(request, response) {
  try {
    const weapons = weaponServices.fetchWeapons()
    const sortedWeapons = weapons.sort((weaponOne, weaponTwo) =>
      weaponOne.name.localeCompare(weaponTwo.name)
    )

    response.json(weapons)
  } catch (err) {
    response.status(500).json({
      error: "Internal Server Error",
      message: `An unexpected error occurred: ${err.message}`,
    })
  }
}

function getWeaponByID(request, response) {
  try {
    const id = request.params.id
    const maybeWeapon = weaponServices.fetchWeaponByID(id)

    if (maybeWeapon) {
      return response.json(maybeWeapon)
    }

    response.status(404).json({
      error: "Unknown Weapon",
      message: `The weapon associated with the ID ${id} does not exist in our records.\nPlease check the ID and try again.`,
    })
  } catch (err) {
    response.status(500).json({
      error: "Internal Server Error",
      message: `An unexpected error occurred: ${err.message}`,
    })
  }
}

function getWeaponExtrasByID(request, response) {
  try {
    const id = request.params.id
    const maybeWeaponExtras = weaponServices.fetchWeaponExtrasByID(id)

    if (maybeWeaponExtras) {
      return response.json(maybeWeaponExtras)
    }

    response.status(404).json({
      error: "Unknown Weapon",
      message: `The weapon associated with the ID ${id} does not exist in our records.\nPlease check the ID and try again.`,
    })
  } catch (err) {
    response.status(500).json({
      error: "Internal Server Error",
      message: `An unexpected error occurred: ${err.message}`,
    })
  }
}

module.exports = {
  getWeapons,
  getWeaponByID,
  getWeaponExtrasByID,
}
