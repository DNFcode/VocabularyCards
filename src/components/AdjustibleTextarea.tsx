import React, {
  createRef,
  useLayoutEffect,
  forwardRef,
  useImperativeMethods,
} from "react"
import styled from "@emotion/styled"

type Props = React.TextareaHTMLAttributes<HTMLTextAreaElement>

export type AdjustibleTextareaMethods = {
  focus: () => void
}

const Textarea = styled("textarea")`
  outline: none;
  resize: none;
`

/**
 * Textarea which will grow and shrink depending on its content
 */
function AdjustibleTextarea(
  props: Props,
  ref: React.Ref<AdjustibleTextareaMethods>
) {
  const { rows, value, ...restProps } = props
  const textareaRef = createRef<HTMLTextAreaElement>()

  useImperativeMethods(ref, () => ({
    focus: () => {
      textareaRef.current && textareaRef.current.focus()
    },
  }))

  useLayoutEffect(
    () => {
      const textarea = textareaRef.current
      if (textarea) {
        // reset height to 0 to get actual scrollHeight of content
        textarea.style.height = "0px"
        if (textarea.clientHeight !== textarea.scrollHeight) {
          textarea.style.height = `${textarea.scrollHeight}px`
        }
      }
    },
    [value]
  )

  return <Textarea {...restProps} value={value} ref={textareaRef} rows={1} />
}

const forwarded = forwardRef<AdjustibleTextareaMethods, Props>(
  AdjustibleTextarea
)

export { forwarded as AdjustibleTextarea }
