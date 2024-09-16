import { supabaseClient } from "@/utils/supabase"

export async function fetchWeapons() {
  const { data, error } = await supabaseClient
    .from("weapons")
    .select()
    .order("name", { ascending: true })

  if (error) throw new Error(error.message)
  return data
}

export async function fetchWeaponByID(weaponID: number) {
  const { data, error } = await supabaseClient
    .from("weapons")
    .select()
    .match({ id: weaponID })
    .single()

  if (error) throw new Error(error.message)
  return data
}

export async function fetchWeaponDetailsByID(weaponID: number) {
  const { data, error } = await supabaseClient
    .from("weapons_details")
    .select()
    .match({ id: weaponID })
    .single()

  if (error) throw new Error(error.message)
  return data
}
