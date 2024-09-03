// Data
import WEAPONS from "@/data/weapons.json"

export function initWeaponList() {
  return Object.values(WEAPONS).sort((weaponOne, weaponTwo) =>
    weaponOne.name.localeCompare(weaponTwo.name)
  )
}
