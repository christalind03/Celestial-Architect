// Components
import { Image } from "@/components/Image"
import { WeaponSelector } from "@/components/app/WeaponSelector"

// Hooks
import { useCharacterConfig } from "@/components/app/CharacterConfig"

export function CharacterWeapon() {
  const characterConfig = useCharacterConfig()

  return (
    <div className="flex flex-col gap-1">
      <div className="flex items-center justify-between">
        <label className="font-bold">Light Cone</label>
        <WeaponSelector />
      </div>

      {characterConfig.weapon && (
        <div className="flex gap-3 items-center text-xs">
          <Image
            className="size-12"
            src={`/assets/weapons/${characterConfig.weapon.id}.png`}
          />

          <div className="flex flex-col gap-1">
            <label className="font-bold">{characterConfig.weapon.name}</label>
            <label className="text-zinc-500">Placeholder</label>
          </div>
        </div>
      )}
    </div>
  )
}
