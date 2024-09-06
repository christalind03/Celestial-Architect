export async function fetchData(url: string) {
  try {
    const fetchResponse = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
      },
    })

    if (fetchResponse.ok) {
      return fetchResponse.json()
    }

    throw new Error(`Unable to access API endpoint.`)
  } catch (error: unknown) {
    let message = error instanceof Error ? error.message : String(error)
    throw new Error(message)
  }
}
