import React, {
  useState,
  useRef,
  useEffect,
  FormEvent,
  ChangeEvent,
} from "react"
import styled from "@emotion/styled"

import {
  BorderColor,
  TextColor,
  TextLightColor,
  DarkerBackgroundColor,
} from "../theme"
import {
  AdjustibleTextarea,
  AdjustibleTextareaMethods,
} from "./AdjustibleTextarea"

export type CardFormFields = {
  title: string
  description: string
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
  display: "flex",
  flexDirection: "column",
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

const FormButton = styled("button")({
  border: 0,
  fontSize: 16,
  borderTop: `1px solid ${BorderColor}`,
  background: DarkerBackgroundColor,
  textTransform: "uppercase",
  height: 56,
  width: "50%",
  outline: 0,
})

const CancelButton = styled(FormButton)({
  borderRight: `1px solid ${BorderColor}`,
})

export function CardForm(props: {
  initialValues: CardFormFields
  className?: string
  onSubmit?: (values: CardFormFields) => void
  onCancel?: () => void
}) {
  const [title, setTitle] = useState(props.initialValues.title)
  const [description, setDescription] = useState(
    props.initialValues.description
  )
  const titleRef = useRef<AdjustibleTextareaMethods>(null)
  const descriptionRef = useRef<HTMLTextAreaElement>(null)
  const formRef = useRef<HTMLFormElement>(null)

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    props.onSubmit &&
      title &&
      description &&
      props.onSubmit({
        title,
        description,
      })
  }

  // shouldn't be here
  useEffect(() => {
    setTimeout(() => {
      if (titleRef.current) {
        titleRef.current.focus()
      }
    }, 300)
  }, [])

  return (
    <StyledForm
      ref={formRef}
      onSubmit={handleSubmit}
      className={props.className}
    >
      <TitleContainer>
        <TitleTextarea
          ref={titleRef}
          value={title}
          placeholder="Something to learn"
          onChange={event => setTitle(event.target.value)}
          onKeyPress={event => {
            if (event.key === "Enter") {
              event.preventDefault()
              descriptionRef.current && descriptionRef.current.focus()
            }
          }}
        />
      </TitleContainer>
      <DescriptionTextarea
        ref={descriptionRef}
        value={description}
        placeholder="Description"
        onChange={event => setDescription(event.target.value)}
        onKeyPress={event => {
          if (event.key === "Enter") {
            event.preventDefault()
            formRef.current &&
              formRef.current.dispatchEvent(new Event("submit"))
          }
        }}
      />
      <PopupButtons>
        <CancelButton onClick={props.onCancel} type="button">
          Cancel
        </CancelButton>
        <FormButton type="submit">Add</FormButton>
      </PopupButtons>
    </StyledForm>
  )
}
