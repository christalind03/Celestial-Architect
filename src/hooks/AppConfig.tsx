// Data Types
import type { Character } from "@/types/Character"

// Hooks
import { createContext, useContext, useReducer } from "react"

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
      const { artifactID, characterID, isCavern } = retrievePayload(action)
      const artifactType = isCavern ? "cavernRelics" : "planarOrnaments"

      if (isCavern) {
        const artifactList = stateCopy[characterID][artifactType]

        if (artifactList.length < 2) {
          stateCopy[characterID] = {
            ...stateCopy[characterID],
            [artifactType]: [artifactID, ...artifactList],
          }
        }
      } else {
        stateCopy[characterID] = {
          ...stateCopy[characterID],
          [artifactType]: [artifactID],
        }
      }

      return saveConfig(stateCopy, storageKey)
    }

    case "addCharacter": {
      const { characterID } = retrievePayload(action)

      stateCopy[characterID] = {
        id: characterID,
        cavernRelics: [],
        planarOrnaments: [],
        lightCone: null,
      }

      return saveConfig(stateCopy, storageKey)
    }

    case "addWeapon": {
      const { characterID, weaponID } = retrievePayload(action)

      stateCopy[characterID].lightCone = weaponID
      return saveConfig(stateCopy, storageKey)
    }

    case "removeArtifact": {
      const { artifactID, characterID, isCavern } = retrievePayload(action)
      const artifactType = isCavern ? "cavernRelics" : "planarOrnaments"
      const artifactList = stateCopy[characterID][artifactType]

      stateCopy[characterID] = {
        ...stateCopy[characterID],
        [artifactType]: artifactList.filter((a) => a !== artifactID),
      }

      return saveConfig(stateCopy, storageKey)
    }

    case "removeCharacter": {
      const { characterID } = retrievePayload(action)

      delete stateCopy[characterID]
      return saveConfig(stateCopy, storageKey)
    }

    case "removeWeapon": {
      const { characterID } = retrievePayload(action)

      stateCopy[characterID].lightCone = null
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
    throw new Error(
      "useAppConfig must be used within a AppConfig.Provider component."
    )

  return configContext
}
