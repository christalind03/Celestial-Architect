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
  | "clearData"
  | "importCharacters"
  | "removeCharacter"
  | "removeCharacterArtifact"
  | "removeCharacterWeapon"
  | "updateCharacterArchive"
  | "updateCharacterFavorite"
  | "updateCharacterNotes"

const initialState: AppConfigState = {
  appConfig: [],
  appConfigDispatch: () => null,
}

const AppContext = createContext<AppConfigState>(initialState)

function reducerFn(storageKey: string) {
  return (state: AppConfig, action: AppConfigDispatch) => {
    let stateCopy = [...state]
    let { characterIndex, ...payloadData } = retrievePayload(action)

    switch (action.type) {
      case "addCharacter": {
        stateCopy = [
          ...stateCopy,
          {
            id: payloadData.characterID,
            isArchived: false,
            isFavorite: false,
            cavernRelics: [],
            planarOrnaments: [],
            lightCone: null,
            notes: "",
            lastEdit: Date.now(),
          },
        ]

        characterIndex = stateCopy.length - 1
        break
      }

      case "addCharacterArtifact": {
        const { artifactID, isCavern } = payloadData

        const artifactGroup = isCavern ? "cavernRelics" : "planarOrnaments"
        const artifactList = stateCopy[characterIndex][artifactGroup]

        stateCopy[characterIndex][artifactGroup] = isCavern
          ? artifactList.length < 2 && !artifactList.includes(artifactID)
            ? [...artifactList, artifactID]
            : artifactList
          : [artifactID]

        break
      }

      case "addCharacterWeapon": {
        stateCopy[characterIndex].lightCone = payloadData.weaponID
        break
      }

      case "clearData": {
        return saveConfig([], storageKey)
      }

      case "importCharacters": {
        const { importedData } = payloadData
        const importedIDs = importedData.map(
          (characterConfig: CharacterConfig) => characterConfig.id
        )

        // Loop through the array in reverse order to prevent index shifting when deleting items.
        for (let i = stateCopy.length - 1; i >= 0; i--) {
          const characterID = stateCopy[i].id

          if (importedIDs.includes(characterID)) {
            stateCopy.splice(i, 1)
          }
        }

        stateCopy = [...stateCopy, ...importedData]
        return saveConfig(stateCopy, storageKey)
      }

      case "removeCharacter": {
        stateCopy.splice(characterIndex, 1)
        return saveConfig(stateCopy, storageKey)
      }

      case "removeCharacterArtifact": {
        const { artifactID, isCavern } = payloadData

        const artifactGroup = isCavern ? "cavernRelics" : "planarOrnaments"
        const artifactList = stateCopy[characterIndex][artifactGroup]

        stateCopy[characterIndex][artifactGroup] = artifactList.filter(
          (artifactSet) => artifactSet !== artifactID
        )

        break
      }

      case "removeCharacterWeapon": {
        stateCopy[characterIndex].lightCone = null
        break
      }

      case "updateCharacterArchive": {
        stateCopy[characterIndex].isArchived = payloadData.archiveState
        stateCopy[characterIndex].isFavorite = false
        break
      }

      case "updateCharacterFavorite": {
        stateCopy[characterIndex].isArchived = false
        stateCopy[characterIndex].isFavorite = payloadData.favoriteState
        break
      }

      case "updateCharacterNotes": {
        const { characterIndex, characterNotes } = retrievePayload(action)

        stateCopy[characterIndex].notes = characterNotes
        break
      }

      default:
        throw new Error(`${action.type} is not a valid action type.`)
    }

    stateCopy[characterIndex].lastEdit = Date.now()
    return saveConfig(stateCopy, storageKey)
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
    throw new Error("useAppConfig must be used within a AppConfig component.")

  return configContext
}
