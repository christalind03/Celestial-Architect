// Data Types
import type { AppConfig } from "@/hooks/AppConfig"
import type { CharacterConfig } from "@/types/CharacterConfig"

// Hooks
import { createContext, useContext, useReducer } from "react"

type Props = {
  children: React.ReactNode
  defaultValue?: CharacterConfig[]
}

type FileConfigDispatch = {
  type: ReducerActions
  payload?: Record<string, any>
}

type FileConfigState = {
  fileConfig: AppConfig,
  fileConfigDispatch: React.Dispatch<FileConfigDispatch>
}

type ReducerActions = "addCharacter" | "clearConfig" | "removeCharacter" | "setConfig"

const initialState: FileConfigState = {
  fileConfig: [],
  fileConfigDispatch: () => null
}

const FileContext = createContext<FileConfigState>(initialState)

function reducerFn(state: AppConfig, action: FileConfigDispatch) {
  let stateCopy = [...state]
  const { characterConfig, fileConfig } = retrievePayload(action)

  switch (action.type) {
    case "addCharacter": {
      stateCopy.push(characterConfig)
      break
    }

    case "clearConfig": {
      stateCopy = []
      break
    }

    case "removeCharacter": {
      const characterIndex = stateCopy.indexOf(characterConfig)

      stateCopy.splice(characterIndex, 1)
      break
    }

    case "setConfig": {
      stateCopy = [...fileConfig]
      break
    }

    default:
      throw new Error(`${action.type} is not a valid action type.`)
  }

  return stateCopy
}

function retrievePayload(action: FileConfigDispatch) {
  if (!action.payload)
    throw new Error(
      `A payload must be provided for the action type: ${action.type}.`
    )

  return action.payload
}

export function FileConfig({ children, defaultValue = [] }: Props) {
  const [fileConfig, fileConfigDispatch] = useReducer(reducerFn, defaultValue)

  return (
    <FileContext.Provider value={{ fileConfig, fileConfigDispatch }}>
      {children}
    </FileContext.Provider>
  )
}

export function useFileConfig() {
  const configContext = useContext(FileContext)

  if (!configContext)
    throw new Error(
      "useFileConfig must be used within a FileConfig component."
    )

  return configContext
}