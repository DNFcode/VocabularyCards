import { FunctionalComponent, Ref, createRef, h } from "preact"
import { css, cx } from "emotion"
import { JSXInternal } from "preact/src/jsx"
import { useLayoutEffect, useEffect } from "preact/hooks"

const textareaCss = css({
  resize: "none",
  outline: "none",
  overflow: "hidden",
})

/**
 * Textarea which will grow and shrink depending on its content
 */
export const AdjustableTextarea: FunctionalComponent<
  JSXInternal.HTMLAttributes & {
    innerRef?: Ref<HTMLTextAreaElement>
    value?: string
  }
> = props => {
  const { rows, value, innerRef, className, onInput, ...restProps } = props
  const textareaRef = createRef<HTMLTextAreaElement>()

  // useLayoutEffect should be used, but it's broken in Preact ATM
  useEffect(
    () => {
      const textarea = textareaRef.current
      if (textarea) {
        // reset height to 0 to get actual scrollHeight of content
        textarea.value = value || ""
        textarea.style.height = "0px"
        if (textarea.clientHeight !== textarea.scrollHeight) {
          textarea.style.height = `${textarea.scrollHeight}px`
        }
      }
    },
    [value]
  )

  return (
    <textarea
      {...restProps}
      className={cx(textareaCss, className)}
      onInput={event => {
        event.preventDefault()
        onInput && onInput(event)
        ;(event.currentTarget as any).value = value
      }}
      ref={node => {
        textareaRef.current = node
        if (innerRef) {
          if (typeof innerRef === "function") {
            innerRef(node)
          } else {
            innerRef.current = node
          }
        }
      }}
      rows={1}
    />
  )
}
