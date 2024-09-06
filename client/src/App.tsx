// Components
import { CharacterOverview } from "@/components/app/CharacterOverview"
import { CharacterSelector } from "@/components/app/CharacterSelector"
import { Header } from "@/components/Header"
import { Hero } from "@/components/Hero"
import { Layout } from "@/components/Layout"

// Hooks
import { AppConfig } from "@/hooks/AppConfig"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

const queryClient = new QueryClient()

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Header />
      
      <Layout>
        <Hero />
        <AppConfig storageKey="app-config">
          <div className="flex flex-col gap-3 items-center">
            <CharacterSelector />
            <CharacterOverview />
          </div>
        </AppConfig>
      </Layout>
    </QueryClientProvider>
  )
}
