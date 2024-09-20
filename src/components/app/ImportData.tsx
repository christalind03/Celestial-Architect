// Components
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/Alert"
import { Button } from "@/components/ui/Button"
import { CharacterSummary } from "./CharacterSummary"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/Dialog"
import {
  DownloadIcon,
  ExclamationTriangleIcon,
  UploadIcon,
} from "@radix-ui/react-icons"
import { Fragment } from "react"
import { Image } from "@/components/Image"
import { MultiSelect } from "@/components/MultiSelect"
import { Popover, PopoverContent, PopoverTrigger } from "../ui/Popover"

// Data Types
import {
  isCharacterConfig,
  type CharacterConfig,
} from "@/types/CharacterConfig"

// Hooks
import { useAppConfig } from "@/hooks/AppConfig"
import { useRef, useState } from "react"
import { useToast } from "@/hooks/useToast"
import { useQuery } from "@tanstack/react-query"

// Service Functions
import { fetchCharacters } from "@/services/fetchCharacters"

// Utility Functions
import { useFileConfig } from "@/hooks/FileConfig"

type Props = {
  displaySettings: (value: boolean) => void
}

export function ImportData({ displaySettings }: Props) {
  const { appConfigDispatch } = useAppConfig()
  const { fileConfig, fileConfigDispatch } = useFileConfig()
  const { toast } = useToast()

  const [characterList, setCharacterList] = useState<CharacterConfig[]>([])
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

  const [isImported, setIsImported] = useState<boolean>(false)
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const uploadRef = useRef<HTMLInputElement>(null)

  function displayImage({ id: characterID }: CharacterConfig) {
    return (
      <Image className="size-8" src={`/assets/avatars/${characterID}.png`} />
    )
  }

  function displayLabel({ id: characterID }: CharacterConfig) {
    return <label>{characterNames.data![characterID]}</label>
  }

  function isSelected(characterConfig: CharacterConfig) {
    return fileConfig.includes(characterConfig)
  }

  function onSelect(characterConfig: CharacterConfig) {
    fileConfigDispatch({
      type: isSelected(characterConfig) ? "removeCharacter" : "addCharacter",
      payload: { characterConfig },
    })
  }

  function onUpload(importData: Blob) {
    const fileReader = new FileReader()

    fileReader.onload = async (event) => {
      try {
        const fileContents = event.target?.result

        if (typeof fileContents === "string") {
          const parsedData = JSON.parse(fileContents)

          if (
            Array.isArray(parsedData) &&
            parsedData.every((item: unknown) => isCharacterConfig(item))
          ) {
            fileConfigDispatch({
              type: "setConfig",
              payload: { fileConfig: parsedData },
            })

            setCharacterList(parsedData)
            return
          }
        }

        toast({
          title: "Invalid Configuration File",
          description: "The configuration file is invalid.",
          duration: 2500,
          variant: "destructive",
        })
      } catch (err) {
        toast({
          title: "Invalid JSON File",
          description: "There was an issue parsing the JSON file.",
          duration: 2500,
          variant: "destructive",
        })
      }
    }

    fileReader.readAsText(importData)
  }

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(openState) => {
        setIsOpen(() => {
          if (!openState) {
            setTimeout(() => {
              fileConfigDispatch({
                type: "clearConfig",
                payload: {},
              })

              setCharacterList([])
              setIsImported(false)
            }, 150)
          }

          return openState
        })
      }}
    >
      <DialogContent>
        {isImported ? (
          <Fragment>
            <DialogHeader>
              <DialogTitle>Import Complete!</DialogTitle>
              <DialogDescription>
                Your data has been successfully imported.
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
              <DialogTitle>Import Data</DialogTitle>
              <DialogDescription>???</DialogDescription>
            </DialogHeader>
            <div className="flex flex-col gap-5 items-center mt-3">
              <div className="flex gap-3 items-center">
                {characterList.length !== 0 ? (
                  <MultiSelect<CharacterConfig>
                    error={null}
                    isError={false}
                    isLoading={false}
                    renderButton={
                      <Button className="w-52" variant="outline">
                        Select Characters
                      </Button>
                    }
                    renderGroups={[
                      {
                        heading: "Characters",
                        iterator: characterList,
                        displayImage,
                        displayLabel,
                        isSelected,
                        onSelect,
                      },
                    ]}
                  />
                ) : (
                  <Popover>
                    <PopoverContent className="p-0">
                      <Alert variant="destructive">
                        <ExclamationTriangleIcon className="size-4" />
                        <AlertTitle>Insufficient Characters</AlertTitle>
                        <AlertDescription className="mt-3 text-xs">
                          The import feature requires your to have uploaded a
                          configuration file. <br />
                          <br /> Try uploading one using the upload button on
                          the right.
                        </AlertDescription>
                      </Alert>
                    </PopoverContent>
                    <PopoverTrigger asChild>
                      <Button className="w-52" variant="outline">
                        Select Characters
                      </Button>
                    </PopoverTrigger>
                  </Popover>
                )}
                <Button
                  className="px-2.5"
                  onClick={() => uploadRef.current?.click()}
                  variant="outline"
                >
                  <UploadIcon className="size-4" />
                </Button>
                <input
                  accept=".json"
                  className="hidden"
                  onInput={(event) => {
                    const importedFiles = event.currentTarget.files

                    if (importedFiles && importedFiles[0] instanceof Blob) {
                      onUpload(importedFiles[0])
                    }
                  }}
                  ref={uploadRef}
                  type="file"
                />
              </div>
              {fileConfig.length !== 0 ? (
                <div className="flex flex-col gap-3 hide-scrollbar items-center h-52 overflow-y-scroll">
                  {fileConfig.map((characterConfig) => {
                    return (
                      <CharacterSummary
                        key={characterConfig.id}
                        config={characterConfig}
                      />
                    )
                  })}
                </div>
              ) : (
                <div className="flex items-center justify-center h-52 text-sm text-zinc-500">
                  <p>No Characters Selected.</p>
                </div>
              )}
              <Button
                className="w-64"
                disabled={fileConfig.length === 0}
                onClick={() => {
                  appConfigDispatch({
                    type: "importCharacters",
                    payload: { importedData: fileConfig },
                  })

                  setIsImported(true)
                }}
              >
                <DownloadIcon className="mr-2 size-4" />
                Import
              </Button>
            </div>
          </Fragment>
        )}
      </DialogContent>
      <DialogTrigger asChild>
        <Button className="w-full" variant="ghost">
          <DownloadIcon className="mr-2 size-4" /> Import Data
        </Button>
      </DialogTrigger>
    </Dialog>
  )
}
