import * as React from "react"
import styled, { css } from "react-emotion"
import { Form, Field } from "react-final-form"

import AdjustibleTextarea from "./AdjustibleTextarea"

type FormFields = {
  title: string
  description: string
}

type Props = {
  className?: string
  initialValues: FormFields
  onSubmit: (values: object) => void
}

const TitleContainer = styled("div")`
  width: 100%;
  border-bottom: 1px solid lightgray;
  padding: 5px 10px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  min-height: 50px;
`

const TitleTextarea = styled(AdjustibleTextarea)`
  width: 100%;
  line-height: 18px;
  font-size: 18px;
  font-weight: bold;
  border: none;
  padding: 0;
  font-family: sans-serif;
  overflow: hidden;
`

const DescriptionTextarea = styled("textarea")`
  flex-grow: 1;
  width: 100%;
  padding: 10px 10px;
  box-sizing: border-box;
  font-size: 18px;
  line-height: 18px;
  resize: none;
  outline: none;
  border: none;
  font-family: sans-serif;
`

class CardForm extends React.Component<Props> {
  formRef: React.RefObject<HTMLFormElement>

  constructor(props: Props) {
    super(props)

    this.formRef = React.createRef()
  }

  submit() {
    const form = this.formRef.current
    if (form) {
      form.dispatchEvent(new Event("submit", { cancelable: true }))
    }
  }

  render() {
    // consider submitting a PR to final-form about generic Form class
    return (
      <Form
        initialValues={this.props.initialValues}
        onSubmit={this.props.onSubmit}
        render={({ handleSubmit }) => (
          <form
            ref={this.formRef}
            onSubmit={handleSubmit}
            className={this.props.className}
          >
            <TitleContainer>
              <Field
                name="title"
                render={({ input }) => (
                  <TitleTextarea {...input} placeholder="Something to learn" />
                )}
              />
            </TitleContainer>
            <Field
              name="description"
              render={({ input }) => (
                <DescriptionTextarea {...input} placeholder="Description" />
              )}
            />
          </form>
        )}
      />
    )
  }
}

export default CardForm
