const express = require("express")
const router = express.Router()

const weaponController = require("../controllers/weaponController")

router.get("/", weaponController.getWeapons)
router.get("/:id", weaponController.getWeaponByID)
router.get("/:id/extras", weaponController.getWeaponExtrasByID)

module.exports = router
