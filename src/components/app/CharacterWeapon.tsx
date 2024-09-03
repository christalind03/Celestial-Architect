// Components
import { Image } from "@/components/Image"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/Tabs"
import { WeaponDescription } from "@/components/app/WeaponDescription"
import { WeaponSelector } from "@/components/app/WeaponSelector"

// Hooks
import { useCharacterConfig } from "@/components/app/CharacterConfig"
import { useState } from "react"

// Utility Functions
import { retrieveWeapon } from "@/utils/retrieveWeapon"

export function CharacterWeapon() {
  const characterConfig = useCharacterConfig()
  const characterWeapon = characterConfig.lightCone
    ? retrieveWeapon(characterConfig.lightCone)
    : undefined

  const [toggleDetails, setToggleDetails] = useState<boolean>(false)

  return (
    <div className="flex flex-col gap-1">
      <div className="flex items-center justify-between">
        <label className="font-bold">Light Cone</label>
        <WeaponSelector />
      </div>

      {characterWeapon ? (
        <div className="flex flex-col gap-3 text-xs">
          <div
            className="flex gap-3 items-center p-1 rounded-md hover:bg-secondary"
            onClick={() => setToggleDetails(!toggleDetails)}
          >
            <Image
              className="size-12"
              src={`/assets/weapons/${characterWeapon.id}.png`}
            />

            <div className="flex flex-col gap-1">
              <label className="font-bold">{characterWeapon.name}</label>
              <label className="text-zinc-500">
                {toggleDetails ? "Hide" : "Show"} Details
              </label>
            </div>
          </div>

          {toggleDetails && (
            <Tabs defaultValue="0">
              <TabsList className="grid grid-cols-5 h-7">
                {/* Simplify the amount of code written by making a fixed array of 5 elements representing the superimposition levels. */}
                {new Array(5).fill(null).map((_, arrayIndex) => {
                  return (
                    <TabsTrigger
                      key={arrayIndex}
                      className="h-5 text-xs"
                      value={arrayIndex.toString()}
                    >
                      {arrayIndex + 1}
                    </TabsTrigger>
                  )
                })}
              </TabsList>

              {characterWeapon &&
                characterWeapon.parameters.map(
                  (parameterSet, parameterIndex) => {
                    return (
                      <TabsContent
                        key={parameterIndex}
                        value={parameterIndex.toString()}
                      >
                        <WeaponDescription
                          baseDescription={characterWeapon.description}
                          parameters={parameterSet}
                        />
                      </TabsContent>
                    )
                  }
                )}
            </Tabs>
          )}
        </div>
      ) : (
        <p className="text-center text-xs text-zinc-500">
          No Light Cone Equipped.
        </p>
      )}
    </div>
  )
}
