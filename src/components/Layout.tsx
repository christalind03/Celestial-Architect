type Props = {
  children: React.ReactNode
}

export function Layout({ children }: Props) {
  return (
    <div className="mb-12 mt-10 mx-auto w-full lg:max-w-[1405px]">
      <div className="flex flex-col gap-5 mx-5">
        {children}
      </div>
    </div>
  )
}