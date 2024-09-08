// Data Types
import type { CharacterConfig } from "@/types/CharacterConfig"

// Hooks
import { createContext, useContext, useReducer } from "react"

type Props = {
  children: React.ReactNode
  storageKey?: string
}

export type AppConfig = CharacterConfig[]

type AppConfigDispatch = {
  type: ReducerActions
  payload?: Record<string, any>
}

type AppConfigState = {
  appConfig: AppConfig
  appConfigDispatch: React.Dispatch<AppConfigDispatch>
}

type ReducerActions =
  | "addCharacter"
  | "addCharacterArtifact"
  | "addCharacterWeapon"
  | "removeCharacter"
  | "removeCharacterArtifact"
  | "removeCharacterWeapon"
  | "updateCharacterNotes"

const initialState: AppConfigState = {
  appConfig: [],
  appConfigDispatch: () => null,
}

const AppContext = createContext<AppConfigState>(initialState)

function reducerFn(storageKey: string) {
  return (state: AppConfig, action: AppConfigDispatch) => {
    const stateCopy = [...state]

    switch (action.type) {
      case "addCharacter": {
        const { characterID } = retrievePayload(action)

        stateCopy.push({
          id: characterID,
          cavernRelics: [],
          planarOrnaments: [],
          lightCone: null,
          notes: "",
        })

        return saveConfig(stateCopy, storageKey)
      }

      case "addCharacterArtifact": {
        const { artifactID, characterIndex, isCavern } = retrievePayload(action)

        const artifactGroup = isCavern ? "cavernRelics" : "planarOrnaments"
        const artifactList = stateCopy[characterIndex][artifactGroup]

        stateCopy[characterIndex][artifactGroup] = isCavern
          ? artifactList.length < 2 && !artifactList.includes(artifactID)
            ? [...artifactList, artifactID]
            : artifactList
          : [artifactID]

        return saveConfig(stateCopy, storageKey)
      }

      case "addCharacterWeapon": {
        const { weaponID, characterIndex } = retrievePayload(action)

        stateCopy[characterIndex].lightCone = weaponID

        return saveConfig(stateCopy, storageKey)
      }

      case "removeCharacter": {
        const { characterIndex } = retrievePayload(action)

        stateCopy.splice(characterIndex, 1)

        return saveConfig(stateCopy, storageKey)
      }

      case "removeCharacterArtifact": {
        const { artifactID, characterIndex, isCavern } = retrievePayload(action)

        const artifactGroup = isCavern ? "cavernRelics" : "planarOrnaments"
        const artifactList = stateCopy[characterIndex][artifactGroup]

        stateCopy[characterIndex][artifactGroup] = artifactList.filter(
          (artifactSet) => artifactSet !== artifactID
        )

        return saveConfig(stateCopy, storageKey)
      }

      case "removeCharacterWeapon": {
        const { characterIndex } = retrievePayload(action)

        stateCopy[characterIndex].lightCone = null

        return saveConfig(stateCopy, storageKey)
      }
      
      case "updateCharacterNotes": {
        const { characterIndex, characterNotes } = retrievePayload(action)
        
        stateCopy[characterIndex].notes = characterNotes

        return saveConfig(stateCopy, storageKey)
      }

      default:
        throw new Error(`${action.type} is not a valid action type.`)
    }
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
    reducerFn(storageKey),
    JSON.parse(localStorage.getItem(storageKey) || "[]") as AppConfig
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
