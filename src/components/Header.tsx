// Components
import { Button } from "@/components/ui/Button"
import { GitHubLogoIcon } from "@radix-ui/react-icons"
import { Settings } from "@/components/app/Settings"

export function Header() {
  return (
    <header className="backdrop-blur-sm bg-background/80 border-b left-0 sticky top-0 z-10">
      <div className="flex items-center justify-between px-5 py-3 mx-auto w-full lg:max-w-[1405px]">
        <h3 className="font-bold text-lg">Celestial Architect</h3>
        <div className="flex gap-1 items-center">
          <Button size="icon" variant="ghost">
            <a
              href="https://github.com/christalind03/Celestial-Architect"
              target="_blank"
            >
              <GitHubLogoIcon className="size-4" />
            </a>
          </Button>
          <Settings />
        </div>
      </div>
    </header>
  )
}
