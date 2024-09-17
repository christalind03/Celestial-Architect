// Components
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/Alert"
import { Button } from "@/components/ui/Button"
import {
  Cross2Icon,
  ExclamationTriangleIcon,
  UploadIcon,
} from "@radix-ui/react-icons"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/Dialog"
import { Fragment } from "react"
import { Image } from "@/components/Image"
import { Loading } from "@/components/Loading"
import { MultiSelect } from "@/components/MultiSelect"
import { RenderError } from "@/components/RenderError"

// Data Types
import type { AppConfig } from "@/hooks/AppConfig"
import type { CharacterConfig } from "@/types/CharacterConfig"

// Hooks
import { useAppConfig } from "@/hooks/AppConfig"
import { useMemo, useReducer, useState } from "react"
import { useQuery } from "@tanstack/react-query"

// Service Functions
import { fetchCharacters } from "@/services/fetchCharacters"

// Utility Functions
import { cn } from "@/utils/shadcn"

type Props = {
  displaySettings: (value: boolean) => void
}

type ExportConfigDispatch = {
  type: ReducerActions
  payload?: Record<string, any>
}

type ReducerActions = "addCharacter" | "removeCharacter"

function reducerFn(state: AppConfig, action: ExportConfigDispatch) {
  let stateCopy = [...state]
  const { characterConfig } = retrievePayload(action)

  switch (action.type) {
    case "addCharacter": {
      stateCopy.push(characterConfig)
      break
    }

    case "removeCharacter": {
      const characterIndex = stateCopy.indexOf(characterConfig)

      stateCopy.splice(characterIndex, 1)
      break
    }

    default:
      throw new Error(`${action.type} is not a valid action type.`)
  }

  return stateCopy
}

function retrievePayload(action: ExportConfigDispatch) {
  if (!action.payload)
    throw new Error(
      `A payload must be provided for the action type: ${action.type}.`
    )

  return action.payload
}

export function ExportData({ displaySettings }: Props) {
  const { appConfig } = useAppConfig()
  const characterNames = useQuery({
    queryFn: async () => {
      const allCharacters = await fetchCharacters()
      const nameDict: { [id: number]: string } = {}

      for (const { id, name } of allCharacters) {
        nameDict[id] = name
      }

      return nameDict
    },
    queryKey: ["characterNames"],
  })

  const [exportConfig, exportConfigDispatch] = useReducer(reducerFn, appConfig)
  const exportList = useMemo(() => {
    return exportConfig.sort(({ id: configOne }, { id: configTwo }) => {
      const nameOne = characterNames.data?.[configOne]
        ? characterNames.data[configOne].toLowerCase()
        : ""

      const nameTwo = characterNames.data?.[configTwo]
        ? characterNames.data[configTwo].toLowerCase()
        : ""

      return nameOne.localeCompare(nameTwo)
    })
  }, [exportConfig])

  const [finishedExport, setFinishedExport] = useState<boolean>(false)
  const [isOpen, setIsOpen] = useState<boolean>(false)

  if (characterNames.isError)
    return <RenderError error={characterNames.error} />
  if (characterNames.isLoading) return <Loading />

  function displayImage({ id: characterID }: CharacterConfig) {
    return (
      <Image className="size-8" src={`/assets/avatars/${characterID}.png`} />
    )
  }

  function displayLabel({ id: characterID }: CharacterConfig) {
    return <label>{characterNames.data![characterID]}</label>
  }

  function isSelected(characterConfig: CharacterConfig) {
    return exportConfig.includes(characterConfig)
  }

  function onSelect(characterConfig: CharacterConfig) {
    exportConfigDispatch({
      type: isSelected(characterConfig) ? "removeCharacter" : "addCharacter",
      payload: { characterConfig },
    })
  }

  function onDownload() {
    // Create the file.
    const fileName = `Celestial-Architect-${Date.now()}.txt`
    const fileContent = JSON.stringify(exportConfig)
    const downloadableFile = new Blob([fileContent], { type: "text/plain" })
    const tempURL = window.URL.createObjectURL(downloadableFile)

    // Create a link element to trigger the download.
    const tempLink = document.createElement("a")
    tempLink.href = tempURL
    tempLink.download = fileName

    document.body.appendChild(tempLink)
    tempLink.click()

    // Remove the link from the document and revoke the object URL.
    setTimeout(() => {
      document.body.removeChild(tempLink)
      window.URL.revokeObjectURL(tempURL)
    }, 0)

    setFinishedExport(true)
  }

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(openState) => {
        setIsOpen(() => {
          if (!openState) {
            setTimeout(() => {
              setFinishedExport(false)
            }, 150)
          }

          return openState
        })
      }}
    >
      <DialogContent className="max-h-[45rem] overflow-y-scroll">
        {finishedExport ? (
          <Fragment>
            <DialogHeader>
              <DialogTitle>Export Complete!</DialogTitle>
              <DialogDescription>
                Your data has been successfully exported.
              </DialogDescription>
            </DialogHeader>
            <Button
              className="mt-3"
              onClick={() => {
                displaySettings(false)
                setIsOpen(false)
              }}
            >
              Done
            </Button>
          </Fragment>
        ) : (
          <Fragment>
            <DialogHeader>
              <DialogTitle>Export Data</DialogTitle>
              <DialogDescription>
                Please select the characters you want to include in the export.
              </DialogDescription>
            </DialogHeader>
            {appConfig.length !== 0 ? (
              <div className="flex flex-col gap-5 items-center mt-3">
                <MultiSelect<CharacterConfig>
                  error={null}
                  isError={false}
                  isLoading={false}
                  renderButton={
                    <Button className="w-60" variant="outline">
                      Select Characters
                    </Button>
                  }
                  renderGroups={[
                    {
                      heading: "Characters",
                      iterator: appConfig,
                      displayImage,
                      displayLabel,
                      isSelected,
                      onSelect,
                    },
                  ]}
                />
                <div
                  className={cn(
                    "flex flex-wrap gap-3 items-center justify-center max-sm:hidden",
                    exportConfig.length === 0 && "hidden"
                  )}
                >
                  {exportList.map((characterConfig) => {
                    return (
                      <button
                        key={characterConfig.id}
                        className="border flex items-center gap-3 px-3 py-1.5 rounded-md hover:bg-opacity-35 hover:bg-red-500 hover:border-red-500"
                        onClick={() =>
                          exportConfigDispatch({
                            type: "removeCharacter",
                            payload: { characterConfig },
                          })
                        }
                      >
                        {displayImage(characterConfig)}
                        {displayLabel(characterConfig)}
                        <Cross2Icon className="size-3.5" />
                      </button>
                    )
                  })}
                </div>
                <Button
                  className="flex items-center w-60"
                  disabled={exportConfig.length === 0}
                  onClick={() => onDownload()}
                >
                  <UploadIcon className="mr-2 size-4" />
                  Export
                </Button>
              </div>
            ) : (
              <Alert variant="destructive">
                <ExclamationTriangleIcon className="size-4" />
                <AlertTitle>Insufficient Characters</AlertTitle>
                <AlertDescription className="text-xs">
                  The export feature requires you to have at least one character
                  selected in the main application. <br />
                  <br />
                  Please add characters to proceed.
                </AlertDescription>
              </Alert>
            )}
          </Fragment>
        )}
      </DialogContent>
      <DialogTrigger asChild>
        <Button className="w-full" variant="ghost">
          <UploadIcon className="mr-2 size-4" /> Export Data
        </Button>
      </DialogTrigger>
    </Dialog>
  )
}
