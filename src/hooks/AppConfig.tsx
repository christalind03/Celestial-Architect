// Data Types
import type { Character } from "@/types/Character"

// Hooks
import { createContext, useContext, useReducer } from "react"

// Utility Functions
import { retrieveArtifacts } from "@/utils/retrieveArtifacts"

type Props = {
  children: React.ReactNode
  storageKey?: string
}

export type AppConfig = {
  [id: string]: Character
}

type AppConfigDispatch = {
  type: ReducerActions
  payload?: Record<string, any>
}

type AppConfigState = {
  appConfig: AppConfig
  appConfigDispatch: React.Dispatch<AppConfigDispatch>
}

type ReducerActions =
  | "addArtifact"
  | "addCharacter"
  | "addWeapon"
  | "removeArtifact"
  | "removeCharacter"
  | "removeWeapon"

const initialState: AppConfigState = {
  appConfig: {},
  appConfigDispatch: () => null,
}

const AppContext = createContext<AppConfigState>(initialState)

function reducerFn(
  state: AppConfig,
  action: AppConfigDispatch,
  storageKey: string
) {
  const stateCopy = { ...state }

  switch (action.type) {
    case "addArtifact": {
      const {
        artifactSet: { id, ...artifactDetails },
        characterKey,
        isCavern,
      } = retrievePayload(action)

      const artifactKey = isCavern ? "cavernRelics" : "planarOrnaments"
      const updatedArtifacts = {
        [id]: {
          id,
          ...artifactDetails,
        },
        ...stateCopy[characterKey][artifactKey],
      }

      stateCopy[characterKey] = {
        ...stateCopy[characterKey],
        [artifactKey]: updatedArtifacts,
      }

      return saveConfig(stateCopy, storageKey)
    }

    case "addCharacter": {
      const { id, ...attributes } = retrievePayload(action)

      stateCopy[id] = {
        id,
        attributes: {
          tag: attributes.tag,
          name: attributes.name,
          path: attributes.path,
          element: attributes.element,
          rarity: attributes.rarity,
        },
        cavernRelics: {},
        planarOrnaments: {},
        weapon: null,
      }

      return saveConfig(stateCopy, storageKey)
    }

    case "addWeapon": {
      const { id, weaponData } = retrievePayload(action)

      stateCopy[id].weapon = weaponData
      return saveConfig(stateCopy, storageKey)
    }

    case "removeArtifact": {
      const { id, characterKey, isCavern } = retrievePayload(action)

      delete retrieveArtifacts(stateCopy, characterKey, isCavern)[id]
      return saveConfig(stateCopy, storageKey)
    }

    case "removeCharacter": {
      const { id } = retrievePayload(action)

      delete stateCopy[id]
      return saveConfig(stateCopy, storageKey)
    }

    case "removeWeapon": {
      const { id } = retrievePayload(action)

      stateCopy[id].weapon = null
      return saveConfig(stateCopy, storageKey)
    }

    default:
      throw new Error(`${action.type} is not a valid action type.`)
  }
}

function retrievePayload(action: AppConfigDispatch) {
  if (!action.payload)
    throw new Error(
      `A payload must be provided for the action type: ${action.type}.`
    )

  return action.payload
}

function saveConfig(state: AppConfig, storageKey: string) {
  localStorage.setItem(storageKey, JSON.stringify(state))
  return state
}

export function AppConfig({ children, storageKey = "app-config" }: Props) {
  const [appConfig, appConfigDispatch] = useReducer(
    (state: AppConfig, action: AppConfigDispatch) => reducerFn(state, action, storageKey),
    JSON.parse(localStorage.getItem(storageKey) || "{}") as AppConfig
  )

  return (
    <AppContext.Provider value={{ appConfig, appConfigDispatch }}>
      {children}
    </AppContext.Provider>
  )
}

export function useAppConfig() {
  const configContext = useContext(AppContext)

  if (!configContext)
    throw new Error("useAppConfig must be used within a AppConfig.Provider component.")

  return configContext
}
