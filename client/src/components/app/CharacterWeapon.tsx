// Components
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/Alert"
import { ExclamationTriangleIcon } from "@radix-ui/react-icons"
import { Image } from "@/components/Image"
import { Loading } from "@/components/Loading"
import { RenderError } from "@/components/RenderError"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/Tabs"
import { WeaponDescription } from "@/components/app/WeaponDescription"
import { WeaponSelector } from "@/components/app/WeaponSelector"

// Hooks
import { useCharacter } from "@/components/app/CharacterConfig"
import { useState } from "react"
import { useQuery } from "@tanstack/react-query"

// Utility Functions
import { cn } from "@/utils/shadcn"
import { fetchData } from "@/utils/fetchData"

type Props = {
  characterPath: string
}

export function CharacterWeapon({ characterPath }: Props) {
  const { config } = useCharacter()

  const weaponInfo = useQuery({
    queryFn: () =>
      fetchData(`${import.meta.env.VITE_API_URL}/api/v1/weapons/${config.lightCone}`),
    queryKey: ["weaponInfo", config.lightCone],
    enabled: !!config.lightCone,
  })

  const weaponExtras = useQuery({
    queryFn: () =>
      fetchData(
        `${import.meta.env.VITE_API_URL}/api/v1/weapons/${config.lightCone}/extras`
      ),
    queryKey: ["weaponExtras", config.lightCone],
    enabled: !!config.lightCone,
  })

  const [toggleDetails, setToggleDetails] = useState<boolean>(false)

  return (
    <div className="gap-1 grid grid-rows-subgrid row-span-2">
      <div className="flex items-center justify-between">
        <label className="font-bold">Light Cone</label>
        <WeaponSelector />
      </div>
      {weaponInfo.isError ? (
        <RenderError error={weaponInfo.error} />
      ) : weaponExtras.isError ? (
        <RenderError error={weaponExtras.error} />
      ) : weaponInfo.isLoading || weaponExtras.isLoading ? (
        <Loading />
      ) : weaponInfo.data && weaponExtras.data ? (
        <div className="flex flex-col gap-3 text-xs">
          <div
            className="flex gap-3 items-center p-1 rounded-md hover:bg-secondary"
            onClick={() => setToggleDetails(!toggleDetails)}
          >
            <Image
              className="size-12"
              src={`/assets/weapons/${weaponInfo.data.id}.png`}
            />
            <div className="flex flex-col gap-1">
              <label
                className={cn(
                  "font-bold",
                  weaponInfo.data.rarity === 5 && "text-amber-500",
                  weaponInfo.data.rarity === 4 && "text-purple-500",
                  weaponInfo.data.rarity === 3 && "text-blue-500"
                )}
              >
                {weaponInfo.data.name}
              </label>
              <label className="text-zinc-500">
                {toggleDetails ? "Hide" : "Show"} Details
              </label>
            </div>
          </div>
          {toggleDetails ? (
            characterPath === weaponInfo.data.path ? (
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

                {JSON.parse(weaponExtras.data.parameters).map(
                  (parameterSet: number[], parameterIndex: number) => {
                    return (
                      <TabsContent
                        key={parameterIndex}
                        value={parameterIndex.toString()}
                      >
                        <WeaponDescription
                          title={weaponExtras.data.title}
                          baseDescription={weaponExtras.data.description}
                          parameters={parameterSet}
                        />
                      </TabsContent>
                    )
                  }
                )}
              </Tabs>
            ) : (
              <Alert variant="destructive">
                <ExclamationTriangleIcon className="size-4" />
                <AlertTitle>Incompatible Light Cone</AlertTitle>
                <AlertDescription className="mt-3 text-xs">
                  Character is not of the <b>Path of {weaponInfo.data.path}</b>.
                  Effects cannot be activated.
                </AlertDescription>
              </Alert>
            )
          ) : null}
        </div>
      ) : (
        <p className="flex h-full items-center justify-center py-3 text-xs text-zinc-500">
          No Light Cone Equipped.
        </p>
      )}
    </div>
  )
}
