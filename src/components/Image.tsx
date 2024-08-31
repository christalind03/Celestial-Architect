type Props = {
  src: string
  className?: string
}

export function Image({ src, className }: Props) {
  return (
    <img
      loading="lazy"
      {...{ src, className }} // This is the same as writing `src={src}` and `className={className}`
    />
  )
}
