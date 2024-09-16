import { supabaseClient } from "@/utils/supabase"

export async function fetchCharacters() {
  const { data, error } = await supabaseClient
    .from("characters")
    .select()
    .order("name", { ascending: true })

  if (error) throw new Error(error.message)
  return data
}

export async function fetchCharacterByID(characterID: number) {
  const { data, error } = await supabaseClient
    .from("characters")
    .select()
    .match({ id: characterID })
    .single()

  if (error) throw new Error(error.message)
  return data
}
