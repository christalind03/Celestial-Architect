// Components
import { AppDashboard } from "@/components/app/AppDashboard"
import { Header } from "@/components/Header"
import { Hero } from "@/components/Hero"
import { Layout } from "@/components/Layout"
import { Toaster } from "@/components/ui/Toaster"

// Hooks
import { AppConfig } from "@/hooks/AppConfig"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

const queryClient = new QueryClient()

export function App() {
  return (
    <AppConfig storageKey="app-config">
      <QueryClientProvider client={queryClient}>
        <Toaster />
        <Header />

        <Layout>
          <Hero />
          <AppDashboard />
        </Layout>
      </QueryClientProvider>
    </AppConfig>
  )
}
