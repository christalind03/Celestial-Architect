// Components
import { Button } from "@/components/ui/Button"
import { MultiSelect } from "@/components/MultiSelect"
import { Pencil1Icon } from "@radix-ui/react-icons"
import { Image } from "@/components/Image"

// Data Types
import { Weapon } from "@/types/Weapon"

// Hooks
import { useAppConfig } from "@/hooks/AppConfig"
import { useCharacter } from "@/components/app/CharacterConfig"
import { useQuery } from "@tanstack/react-query"

// Utility Functions
import { fetchData } from "@/utils/fetchData"

export function WeaponSelector() {
  const { index, config } = useCharacter()
  const { appConfigDispatch } = useAppConfig()

  const weaponList = useQuery({
    queryFn: () => fetchData("http://localhost:3000/api/v1/weapons"),
    queryKey: ["weaponList"],
  })

  function displayImage({ id: weaponID }: Weapon) {
    return <Image className="size-8" src={`/assets/weapons/${weaponID}.png`} />
  }

  function displayLabel({ name: weaponName }: Weapon) {
    return <label className="text-xs">{weaponName}</label>
  }

  function isSelected({ id: weaponID }: Weapon) {
    return config.lightCone === weaponID
  }

  function onSelect(weaponObj: Weapon) {
    appConfigDispatch({
      type: isSelected(weaponObj)
        ? "removeCharacterWeapon"
        : "addCharacterWeapon",
      payload: { weaponID: weaponObj.id, characterIndex: index },
    })
  }

  return (
    <MultiSelect<Weapon>
      error={weaponList.error}
      isError={weaponList.isError}
      isLoading={weaponList.isLoading}
      renderButton={
        <Button size="icon" variant="ghost">
          <Pencil1Icon className="size-4" />
        </Button>
      }
      renderGroups={[
        {
          heading: "Light Cones",
          iterator: weaponList.data,
          displayImage,
          displayLabel,
          isSelected,
          onSelect,
        },
      ]}
    />
  )
}
