import React, { useContext } from "react"
import { keyframes, css } from "@emotion/core"
import styled from "@emotion/styled"
import { withRouter, RouteComponentProps } from "react-router"

import { CardFormFields, CardForm } from "./CardForm"
import { TopNavigation } from "./TopNavigaton"

const Root = styled("div")`
  height: 100%;
  position: absolute;
  width: 100%;
  z-index: 200;
  background: white;
  display: flex;
  flex-direction: column;
  box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.2);
`

const StyledCardForm = styled(CardForm)`
  flex-grow: 1;
  margin-top: 5px;
`

type Props = {
  title: string
  onSubmit: (values: CardFormFields) => void
  initialValues?: CardFormFields
} & RouteComponentProps<any>

function CardDialog(props: Props) {
  return (
    <Root>
      <TopNavigation title={props.title} onClose={props.history.goBack} />
      <StyledCardForm
        onCancel={props.history.goBack}
        onSubmit={values => {
          props.onSubmit(values)
          props.history.goBack()
        }}
        initialValues={
          props.initialValues || {
            title: "",
            description: "",
          }
        }
      />
    </Root>
  )
}

const wrappedCardDialog = withRouter(CardDialog)

export { wrappedCardDialog as CardDialog }
