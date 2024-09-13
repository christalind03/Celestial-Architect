// Components
import { AppFilters } from "@/components/app/AppFilters"
import { Button } from "@/components/ui/Button"
import { CharacterConfig } from "@/components/app/CharacterConfig"
import { CharacterSelector } from "@/components/app/CharacterSelector"
import { MixerHorizontalIcon } from "@radix-ui/react-icons"

// Hooks
import { createContext, useContext, useMemo, useReducer, useState } from "react"
import { useAppConfig } from "@/hooks/AppConfig"

type FilterOptions = {
  cavernRelics: number[]
  planarOrnaments: number[]
  lightCones: number[]
}

type FilterOptionsDispatch = {
  type: ReducerActions
  payload?: Record<string, any>
}

type FilterOptionsState = {
  filterOptions: FilterOptions
  filterOptionsDispatch: React.Dispatch<FilterOptionsDispatch>
}

type ReducerActions =
  | "addArtifact"
  | "addWeapon"
  | "clearArtifacts"
  | "clearWeapons"
  | "removeArtifact"
  | "removeWeapon"

const defaultFilterOptions: FilterOptions = {
  cavernRelics: [],
  planarOrnaments: [],
  lightCones: [],
}

const FilterContext = createContext<FilterOptionsState>({
  filterOptions: defaultFilterOptions,
  filterOptionsDispatch: () => null,
})

function reducerFn(state: FilterOptions, action: FilterOptionsDispatch) {
  const stateCopy = { ...state }

  switch (action.type) {
    case "addArtifact": {
      const { artifactID, isCavern } = retrievePayload(action)
      const artifactGroup = isCavern ? "cavernRelics" : "planarOrnaments"

      if (!stateCopy[artifactGroup].includes(artifactID)) {
        stateCopy[artifactGroup].push(artifactID)
      }

      return stateCopy
    }

    case "addWeapon": {
      const { weaponID } = retrievePayload(action)

      if (!stateCopy.lightCones.includes(weaponID)) {
        stateCopy.lightCones.push(weaponID)
      }

      return stateCopy
    }

    case "clearArtifacts": {
      const { isCavern } = retrievePayload(action)
      const artifactGroup = isCavern ? "cavernRelics" : "planarOrnaments"
      
      stateCopy[artifactGroup] = []

      return stateCopy
    }

    case "clearWeapons": {
      stateCopy.lightCones = []

      return stateCopy
    }

    case "removeArtifact": {
      const { artifactID, isCavern } = retrievePayload(action)
      const artifactGroup = isCavern ? "cavernRelics" : "planarOrnaments"

      stateCopy[artifactGroup] = stateCopy[artifactGroup].filter(
        (currArtifact) => currArtifact !== artifactID
      )

      return stateCopy
    }

    case "removeWeapon": {
      const { weaponID } = retrievePayload(action)

      stateCopy.lightCones = stateCopy.lightCones.filter(
        (currWeapon) => currWeapon !== weaponID
      )

      return stateCopy
    }

    default:
      throw new Error(`${action.type} is not a valid action type.`)
  }
}

function retrievePayload(action: FilterOptionsDispatch) {
  if (!action.payload)
    throw new Error(
      `A payload must be provided for the action type: ${action.type}.`
    )

  return action.payload
}

export function AppDashboard() {
  const { appConfig } = useAppConfig()
  const [filterOptions, filterOptionsDispatch] = useReducer(
    reducerFn,
    defaultFilterOptions
  )

  const [filterEnabled, setFilterEnabled] = useState<boolean>(false)
  const [showFilter, setShowFilter] = useState<boolean>()

  const filteredCharacters = useMemo(() => {
    const characterList = Object.values(appConfig)

    const filterKeys = ["cavernRelics", "planarOrnaments", "lightCones"]
    const isFilterEmpty = filterKeys.every(
      (filterKey) =>
        filterOptions[filterKey as keyof typeof filterOptions].length === 0
    )

    if (isFilterEmpty) {
      setFilterEnabled(false)
      return characterList
    }

    setFilterEnabled(true)
    return characterList.filter(
      ({ cavernRelics, planarOrnaments, lightCone }) => {
        const containsCavernRelics = cavernRelics.some((artifactID) =>
          filterOptions.cavernRelics.includes(artifactID)
        )

        const containsPlanarOrnaments = planarOrnaments.some((artifactID) =>
          filterOptions.planarOrnaments.includes(artifactID)
        )

        const containsLightCone =
          lightCone && filterOptions.lightCones.includes(lightCone)

        return (
          containsCavernRelics || containsPlanarOrnaments || containsLightCone
        )
      }
    )
  }, [appConfig, filterOptions])

  return (
    <div className="flex flex-col gap-5 items-center">
      <div className="flex gap-3 items-center">
        <CharacterSelector />
        <Button
          size="icon"
          onClick={() => setShowFilter(!showFilter)}
          variant={filterEnabled ? "default" : "outline"}
        >
          <MixerHorizontalIcon className="size-4" />
        </Button>
      </div>
      {showFilter && (
        <FilterContext.Provider
          value={{ filterOptions, filterOptionsDispatch }}
        >
          <AppFilters />
        </FilterContext.Provider>
      )}
      <div className="gap-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filteredCharacters.length !== 0 ? (
          filteredCharacters.map((config, index) => {
            return <CharacterConfig key={config.id} {...{ index, config }} />
          })
        ) : (
          <label className="col-span-4 mt-20 text-center text-zinc-500">
            No Characters Found
          </label>
        )}
      </div>
    </div>
  )
}

export function useFilter() {
  const filterContext = useContext(FilterContext)

  if (!filterContext)
    throw new Error(
      "useFilter must be used within a FilterContext.Provider component."
    )

  return filterContext
}
