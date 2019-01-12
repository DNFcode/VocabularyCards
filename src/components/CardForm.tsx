import * as React from "react"
import styled from "@emotion/styled"
import { Form, Field } from "react-final-form"

import {
  BorderColor,
  TextColor,
  TextLightColor,
  DarkerBackgroundColor,
  PrimaryColor,
} from "../theme"
import {
  AdjustibleTextarea,
  AdjustibleTextareaMethods,
} from "./AdjustibleTextarea"

type FormFields = {
  title: string
  description: string
}

type Props = {
  className?: string
  initialValues: FormFields
  onSubmit: (values: object) => void
}

const TitleContainer = styled("div")({
  width: "100%",
  borderBottom: `1px solid ${BorderColor}`,
  padding: "20px 10px",
  display: "flex",
  alignItems: "center",
  boxSizing: "border-box",
  minHeight: 50,
})

const StyledForm = styled("form")({
  padding: "0 10px",
})

const TitleTextarea = styled(AdjustibleTextarea)`
  width: 100%;
  line-height: 20px;
  font-size: 18px;
  font-weight: bold;
  border: none;
  padding: 0;
  font-family: sans-serif;
  overflow: hidden;
  color: ${TextColor};
`

const DescriptionTextarea = styled("textarea")`
  flex-grow: 1;
  width: 100%;
  padding: 20px 10px;
  box-sizing: border-box;
  font-size: 18px;
  line-height: 20px;
  resize: none;
  outline: none;
  border: none;
  font-family: sans-serif;
  color: ${TextLightColor};
`

const PopupButtons = styled("div")({
  position: "fixed",
  bottom: 0,
  left: 0,
  width: "100%",
})

const CancelButton = styled("button")({
  border: 0,
  fontSize: 16,
  borderTop: `1px solid ${BorderColor}`,
  background: DarkerBackgroundColor,
  borderRight: `1px solid ${BorderColor}`,
  textTransform: "uppercase",
  height: 56,
  width: "50%",
})

const ActionButton = styled("button")({
  border: 0,
  fontSize: 16,
  borderTop: `1px solid ${BorderColor}`,
  background: DarkerBackgroundColor,
  color: PrimaryColor,
  textTransform: "uppercase",
  height: 56,
  width: "50%",
})

class CardForm extends React.Component<Props> {
  formRef = React.createRef<HTMLFormElement>()
  titleRef = React.createRef<AdjustibleTextareaMethods>()

  submit() {
    const form = this.formRef.current
    if (form) {
      form.dispatchEvent(new Event("submit", { cancelable: true }))
    }
  }

  componentDidMount() {
    setTimeout(() => {
      this.titleRef.current && this.titleRef.current.focus()
    }, 300)
  }

  render() {
    // consider submitting a PR to final-form about generic Form class
    return (
      <Form
        initialValues={this.props.initialValues}
        onSubmit={this.props.onSubmit}
        render={({ handleSubmit }) => (
          <StyledForm
            ref={this.formRef}
            onSubmit={handleSubmit}
            className={this.props.className}
          >
            <TitleContainer>
              <Field
                name="title"
                render={({ input }) => (
                  <TitleTextarea
                    {...input}
                    ref={this.titleRef}
                    placeholder="Something to learn"
                  />
                )}
              />
            </TitleContainer>
            <Field
              name="description"
              render={({ input }) => (
                <DescriptionTextarea {...input} placeholder="Description" />
              )}
            />
            <PopupButtons>
              <CancelButton>Cancel</CancelButton>
              <ActionButton>Add</ActionButton>
            </PopupButtons>
          </StyledForm>
        )}
      />
    )
  }
}

export default CardForm
