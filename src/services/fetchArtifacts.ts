import { supabaseClient } from "@/utils/supabase"

export async function fetchArtifacts(cavernOnly: boolean) {
  const { data, error } = await supabaseClient
    .from("artifacts")
    .select()
    .match({ type: cavernOnly ? "Cavern Relic" : "Planar Ornament" })
    .order("name", { ascending: true })

  if (error) throw new Error(error.message)
  return data
}

export async function fetchArtifactByID(artifactID: number) {
  const { data, error } = await supabaseClient
    .from("artifacts")
    .select()
    .match({ id: artifactID })
    .single()

  if (error) throw new Error(error.message)
  return data
}
