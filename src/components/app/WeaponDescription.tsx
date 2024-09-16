import { Fragment } from "react/jsx-runtime"

type Props = {
  title: string
  baseDescription: string
  parameters: number[]
}

export function WeaponDescription({ title, baseDescription, parameters }: Props) {
  function generateDescription() {
    const paramPattern = /#(\d+)\[i\](%?)/g
    const descriptionElements: (JSX.Element | string)[] = []

    let match
    let lastIndex = 0

    while ((match = paramPattern.exec(baseDescription)) !== null) {
      const [_, paramIndex, isPercentage] = match
      const arrayIndex = parseInt(paramIndex, 10) - 1

      // Push the text before the current match
      if (match.index > lastIndex) {
        const textBeforeMatch = baseDescription.slice(lastIndex, match.index)
        descriptionElements.push(textBeforeMatch)
      }

      // Determine the display value for the parameter
      if (0 <= arrayIndex && arrayIndex < parameters.length) {
        const parameterValue = parameters[arrayIndex]
        const displayValue = isPercentage
          ? `${(parameterValue * 100).toFixed(1)}%`
          : parameterValue

        descriptionElements.push(
          <b key={descriptionElements.length} className="text-amber-500">
            {displayValue}
          </b>
        )
      } else {
        descriptionElements.push(`#${paramIndex}[i]`)
      }

      lastIndex = paramPattern.lastIndex
    }

    // Push the text after the last match
    if (lastIndex < baseDescription.length) {
      descriptionElements.push(baseDescription.slice(lastIndex))
    }

    // Return the array after handling line breaks
    return descriptionElements.map((htmlElement) =>
      typeof htmlElement === "string"
        ? htmlElement
            .split("\\n")
            .map((currLine, elementIndex, elementArray) => {
              return (
                <Fragment key={elementIndex}>
                  {currLine}
                  {elementIndex < elementArray.length - 1 && (
                    <br key={elementIndex} />
                  )}
                </Fragment>
              )
            })
        : htmlElement
    )
  }

  return (
    <div className="flex flex-col gap-2.5">
      <label className="font-bold mt-1 text-center">{title}</label>
      <p className="leading-relaxed">{generateDescription()}</p>
    </div>
  )
}
