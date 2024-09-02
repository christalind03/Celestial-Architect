// Components
import { AppConfig } from "@/hooks/AppConfig"
import { CharacterOverview } from "@/components/app/CharacterOverview"
import { CharacterSelector } from "@/components/app/CharacterSelector"
import { Fragment } from "react/jsx-runtime"
import { Header } from "@/components/Header"
import { Hero } from "@/components/Hero"
import { Layout } from "@/components/Layout"

export function App() {
  return (
    <Fragment>
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
    </Fragment>
  )
}
