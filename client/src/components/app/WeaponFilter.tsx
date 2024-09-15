// Components
import { Button } from "@/components/ui/Button"
import { CaretSortIcon, Cross2Icon } from "@radix-ui/react-icons"
import { MultiSelect } from "@/components/MultiSelect"
import { Image } from "@/components/Image"

// Data Types
import { Weapon } from "@/types/Weapon"

// Hooks
import { useFilter } from "@/components/app/AppDashboard"
import { useQuery } from "@tanstack/react-query"

// Utility Functions
import { fetchData } from "@/utils/fetchData"

export function WeaponFilter() {
  const { filterOptions, filterOptionsDispatch } = useFilter()
  const weaponList = useQuery({
    queryFn: () => fetchData(`${import.meta.env.VITE_API_URL}/api/v1/weapons`),
    queryKey: ["weaponList"],
  })

  function displayImage({ id: weaponID }: Weapon) {
    return <Image className="size-8" src={`/assets/weapons/${weaponID}.png`} />
  }

  function displayLabel({ name: weaponName }: Weapon) {
    return <label className="text-xs">{weaponName}</label>
  }

  function isSelected({ id: weaponID }: Weapon) {
    return filterOptions.lightCones.includes(weaponID)
  }

  function onSelect(weaponObj: Weapon) {
    filterOptionsDispatch({
      type: isSelected(weaponObj) ? "removeWeapon" : "addWeapon",
      payload: { weaponID: weaponObj.id },
    })
  }

  return (
    <MultiSelect<Weapon>
      error={weaponList.error}
      isError={weaponList.isError}
      isLoading={weaponList.isLoading}
      renderButton={
        <Button
          className="flex items-center justify-between w-72"
          variant="outline"
        >
          <label>{filterOptions.lightCones.length} Selected</label>
          {filterOptions.lightCones.length === 0 ? (
            <CaretSortIcon className="size-4" />
          ) : (
            <Cross2Icon
              className="size-4"
              onClick={(event) => {
                event.stopPropagation()
                filterOptionsDispatch({
                  type: "clearWeapons",
                })
              }}
            />
          )}
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
