// Data
import WEAPONS from "@/data/weapons.json"

export function retrieveWeapon(weaponID: number) {
  return WEAPONS[weaponID.toString() as keyof typeof WEAPONS]
}