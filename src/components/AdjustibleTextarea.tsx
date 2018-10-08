import * as React from "react"
import styled from "react-emotion"

type Props = React.TextareaHTMLAttributes<HTMLTextAreaElement>

const Textarea = styled("textarea")`
  outline: none;
  resize: none;
`

/**
 * Textarea which will grow and shrink depending on its content
 */
export default class AdjustibleTextarea extends React.Component<Props> {
  textareaRef: React.RefObject<HTMLTextAreaElement>

  constructor(props: Props) {
    super(props)
    this.textareaRef = React.createRef()

    this.resizeTextarea = this.resizeTextarea.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  resizeTextarea() {
    const textarea = this.textareaRef.current
    if (textarea) {
      // reset height to 0 to get actual scrollHeight of content
      textarea.style.height = "0px"
      if (textarea.clientHeight !== textarea.scrollHeight) {
        textarea.style.height = `${textarea.scrollHeight}px`
      }
    }
  }

  componentDidMount() {
    // this.resizeTextarea()
  }

  componentDidUpdate() {
    this.resizeTextarea()
  }

  handleChange(event: React.ChangeEvent<HTMLTextAreaElement>) {
    if (this.props.onChange) {
      this.props.onChange(event)
    }
    // resize in case if value is not controlled by onChange()
    this.resizeTextarea()
  }

  render() {
    const { rows, onChange, ...restProps } = this.props

    return (
      <Textarea
        {...restProps}
        innerRef={this.textareaRef}
        onChange={this.handleChange}
        rows={1}
      />
    )
  }
}
