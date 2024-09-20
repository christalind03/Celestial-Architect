// Components
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/Alert"
import { Button } from "@/components/ui/Button"
import { CharacterSummary } from "@/components/app/CharacterSummary"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/Dialog"
import { ExclamationTriangleIcon, UploadIcon } from "@radix-ui/react-icons"
import { Fragment } from "react"
import { Image } from "@/components/Image"
import { Loading } from "@/components/Loading"
import { MultiSelect } from "@/components/MultiSelect"
import { RenderError } from "@/components/RenderError"

// Data Types
import type { CharacterConfig } from "@/types/CharacterConfig"

// Hooks
import { useAppConfig } from "@/hooks/AppConfig"
import { useMemo, useState } from "react"
import { useQuery } from "@tanstack/react-query"

// Service Functions
import { fetchCharacters } from "@/services/fetchCharacters"

// Utility Functions
import { useFileConfig } from "@/hooks/FileConfig"

type Props = {
  displaySettings: (value: boolean) => void
}

export function ExportData({ displaySettings }: Props) {
  const { appConfig } = useAppConfig()
  const { fileConfig, fileConfigDispatch } = useFileConfig()

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

  const sortedConfig = useMemo(() => {
    return fileConfig.sort(({ id: configOne }, { id: configTwo }) => {
      const nameOne = characterNames.data?.[configOne]
        ? characterNames.data[configOne].toLowerCase()
        : ""

      const nameTwo = characterNames.data?.[configTwo]
        ? characterNames.data[configTwo].toLowerCase()
        : ""

      return nameOne.localeCompare(nameTwo)
    })
  }, [fileConfig])

  const [isExported, setIsExported] = useState<boolean>(false)
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
    return fileConfig.includes(characterConfig)
  }

  function onSelect(characterConfig: CharacterConfig) {
    fileConfigDispatch({
      type: isSelected(characterConfig) ? "removeCharacter" : "addCharacter",
      payload: { characterConfig },
    })
  }

  function onDownload() {
    // Create the file.
    const fileName = `Celestial-Architect-${Date.now()}.json`
    const fileContent = JSON.stringify(fileConfig)
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

    setIsExported(true)
  }

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(openState) => {
        setIsOpen(() => {
          if (!openState) {
            setTimeout(() => {
              setIsExported(false)
            }, 150)
          }

          return openState
        })
      }}
    >
      <DialogContent>
        {isExported ? (
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
                    <Button className="w-64" variant="outline">
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
                {sortedConfig.length !== 0 ? (
                  <div className="flex flex-col gap-3 hide-scrollbar items-center h-52 overflow-y-scroll">
                    {sortedConfig.map((characterConfig) => {
                      return (
                        <CharacterSummary
                          key={characterConfig.id}
                          config={characterConfig}
                        />
                      )
                    })}
                  </div>
                ) : (
                  <div className="flex items-center justify-center h-32 text-sm text-zinc-500">
                    <p>No Characters Selected.</p>
                  </div>
                )}
                <Button
                  className="flex items-center w-64"
                  disabled={fileConfig.length === 0}
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
