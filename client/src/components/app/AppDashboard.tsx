// Components
import { AppFilters } from "@/components/app/AppFilters"
import {
  ArchiveIcon,
  MixerHorizontalIcon,
  StarIcon,
  TrashIcon,
} from "@radix-ui/react-icons"
import { Button } from "@/components/ui/Button"
import { CharacterConfig } from "@/components/app/CharacterConfig"
import { CharacterSelector } from "@/components/app/CharacterSelector"
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuTrigger,
} from "@/components/ui/ContextMenu"

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
  const { appConfig, appConfigDispatch } = useAppConfig()
  const [filterOptions, filterOptionsDispatch] = useReducer(
    reducerFn,
    defaultFilterOptions
  )

  const [filterEnabled, setFilterEnabled] = useState<boolean>(false)
  const [showFilter, setShowFilter] = useState<boolean>()

  const filteredCharacters = useMemo(() => {
    const characterList = Object.values(appConfig).sort(
      (characterOne, characterTwo) => {
        // Prioritize by the "isFavorite" property.
        if (characterOne.isFavorite !== characterTwo.isFavorite) {
          return characterOne.isFavorite ? -1 : 1
        }
        
        // Prioritize by the "isArchived" property.
        if (characterOne.isArchived !== characterTwo.isArchived) {
          return characterOne.isArchived ? 1 : -1
        }

        // If they are the same, maintain the original order.
        return 0;
      }
    )

    if (
      filterOptions.cavernRelics.length === 0 ||
      filterOptions.planarOrnaments.length === 0 ||
      filterOptions.lightCones.length === 0
    ) {
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
          filteredCharacters.map((config) => {
            const characterIndex = appConfig.findIndex(
              (characterConfig) => characterConfig === config
            )

            return (
              <ContextMenu key={config.id}>
                <ContextMenuContent>
                  <ContextMenuItem
                    className="flex gap-3 items-center"
                    onSelect={() =>
                      appConfigDispatch({
                        type: "updateCharacterArchive",
                        payload: {
                          characterIndex,
                          archiveState: !config.isArchived,
                        },
                      })
                    }
                  >
                    <ArchiveIcon className="size-4 text-zinc-500" />
                    <label>Archive</label>
                  </ContextMenuItem>
                  <ContextMenuItem
                    className="flex gap-3 items-center"
                    onSelect={() =>
                      appConfigDispatch({
                        type: "updateCharacterFavorite",
                        payload: {
                          characterIndex,
                          favoriteState: !config.isFavorite,
                        },
                      })
                    }
                  >
                    <StarIcon className="size-4 text-zinc-500" />
                    <label>Favorite</label>
                  </ContextMenuItem>
                  <ContextMenuSeparator />
                  <ContextMenuItem
                    className="flex gap-3 items-center text-destructive"
                    onSelect={() =>
                      appConfigDispatch({
                        type: "removeCharacter",
                        payload: { characterIndex },
                      })
                    }
                  >
                    <TrashIcon className="size-4" />
                    <label>Delete</label>
                  </ContextMenuItem>
                </ContextMenuContent>
                <ContextMenuTrigger>
                  <CharacterConfig {...{ index: characterIndex, config }} />
                </ContextMenuTrigger>
              </ContextMenu>
            )
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
