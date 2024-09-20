// Components
import { Image } from "@/components/Image"
import { Loading } from "@/components/Loading"
import { RenderError } from "@/components/RenderError"
import { Separator } from "@/components/ui/Separator"

// Hooks
import { useQuery } from "@tanstack/react-query"

// Service Functions
import { fetchCharacterByID } from "@/services/fetchCharacters"

type Props = {
  characterID: number
}

export function CharacterDetails({ characterID }: Props) {
  const characterInfo = useQuery({
    queryFn: () => fetchCharacterByID(characterID),
    queryKey: ["characterInfo", characterID],
  })

  if (characterInfo.isError) return <RenderError error={characterInfo.error} />
  if (characterInfo.isLoading) return <Loading />

  return (
    <div className="flex gap-3 items-center">
      <Image
        className="size-12"
        src={`/assets/avatars/${characterInfo.data.id}.png`}
      />
      <div className="flex flex-col gap-1 items-start">
        <label className="font-bold text-pretty">
          {characterInfo.data.name}
        </label>
        <div className="flex gap-1 items-center">
          <Image
            className="h-4"
            src={`/assets/rarity/${characterInfo.data.rarity}.png`}
          />
          <Separator className="h-4 mx-1 w-0.5" orientation="vertical" />
          <Image
            className="h-4"
            src={`/assets/elements/${characterInfo.data.element}.png`}
          />
          <Image
            className="h-4"
            src={`/assets/paths/${characterInfo.data.path}.png`}
          />
        </div>
      </div>
    </div>
  )
}
