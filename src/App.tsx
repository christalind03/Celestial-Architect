// Components
import { AppDashboard } from "@/components/app/AppDashboard"
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

      <AppConfig storageKey="app-config">
        <Layout>
          <Hero />
          <AppDashboard />
        </Layout>
      </AppConfig>
    </QueryClientProvider>
  )
}
