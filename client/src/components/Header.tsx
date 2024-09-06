// Components
import { GitHubLogoIcon } from "@radix-ui/react-icons"

export function Header() {
  return (
    <header className="backdrop-blur-sm bg-background/80 border-b left-0 sticky top-0 z-10">
      <div className="flex items-center justify-between px-5 py-3 mx-auto w-full lg:max-w-[1405px]">
        <h3 className="font-bold text-lg">Celestial Architect</h3>
        <a
          href="https://github.com/christalind03/Celestial-Architect"
          target="_blank"
        >
          <GitHubLogoIcon className="size-5" />
        </a>
      </div>
    </header>
  )
}
