// Data Types
import type { Character } from "@/types/Character"

// Hooks
import { createContext, useContext, useReducer } from "react"

type Props = {
  children: React.ReactNode
  storageKey?: string
}

type Config = {
  [id: string]: Character
}

type ConfigDispatch = {
  type: ReducerActions
  payload?: Record<string, any>
}

type ConfigState = {
  config: Config
  configDispatch: React.Dispatch<ConfigDispatch>
}

type ReducerActions = "addCharacter" | "removeCharacter"

const initialState: ConfigState = {
  config: {},
  configDispatch: () => null,
}

const ConfigContext = createContext<ConfigState>(initialState)

function reducerFn(state: Config, action: ConfigDispatch, storageKey: string) {
  const stateCopy = { ...state }

  switch (action.type) {
    case "addCharacter": {
      const { id } = retrievePayload(action)

      // The values of the Config type will be changed later.
      // This is just placeholder information to ensure the useReducer hook is working.
      stateCopy[id] = {
        id,
        tag: "",
        name: "",
        path: "",
        element: "",
        rarity: 0,
      }

      return saveConfig(stateCopy, storageKey)
    }

    case "removeCharacter": {
      const { id } = retrievePayload(action)

      delete stateCopy[id]
      return saveConfig(stateCopy, storageKey)
    }

    default:
      throw new Error(`${action.type} is not a valid action type.`)
  }
}

function retrievePayload(action: ConfigDispatch) {
  if (!action.payload)
    throw new Error(
      `A payload must be provided for the action type: ${action.type}.`
    )

  return action.payload
}

function saveConfig(state: Config, storageKey: string) {
  localStorage.setItem(storageKey, JSON.stringify(state))
  return state
}

export function ConfigProvider({ children, storageKey = "config" }: Props) {
  const [config, configDispatch] = useReducer(
    (state: Config, action: ConfigDispatch) =>
      reducerFn(state, action, storageKey),
    JSON.parse(localStorage.getItem(storageKey) || "{}") as Config
  )

  return (
    <ConfigContext.Provider value={{ config, configDispatch }}>
      {children}
    </ConfigContext.Provider>
  )
}

export function useConfig() {
  const configContext = useContext(ConfigContext)

  if (!configContext)
    throw new Error("useConfig must be used within a ConfigProvider.")

  return configContext
}
