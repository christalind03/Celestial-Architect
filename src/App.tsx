// Components
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
      </Layout>
    </Fragment>
  )
}
