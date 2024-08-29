import { Fragment } from "react/jsx-runtime";
import { Header } from "@/components/Header";

export function App() {
  return (
    <Fragment>
      <Header />
      <div className="flex h-screen items-center justify-center">
        <h1>Celestial Architect</h1>
      </div>
    </Fragment>
)
}
