import * as React from "react"
import { connect } from "react-redux"
import styled, { css } from "react-emotion"
import { keyframes } from "emotion"
import { withRouter, RouteComponentProps } from "react-router"

import { actions } from "../redux/cards/cards.actions"
import TopNavigation from "./TopNavigaton"
import CardForm from "./CardForm"
import CheckIcon from "../icons/check.svg"

const Root = styled("div")`
  height: 100%;
  background: white;
  display: flex;
  flex-direction: column;
`

const newCardFormClass = css`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  margin-top: 5px;
`

const Check = styled(CheckIcon)`
  height: 20px;
  width: 20px;
  display: block;
`

type Props = typeof actions & RouteComponentProps<any>

class NewCardPage extends React.Component<Props> {
  formRef: React.RefObject<CardForm>

  constructor(props: Props) {
    super(props)

    this.formRef = React.createRef()
    this.createCard = this.createCard.bind(this)
    this.submitForm = this.submitForm.bind(this)
  }

  shouldComponentUpdate() {
    return false
  }

  createCard(values: any) {
    if (values.title && values.description) {
      this.props.createCard(values.title, values.description)
      this.props.history.push("/glossary")
    }
  }

  submitForm() {
    const cardForm = this.formRef.current
    if (cardForm) {
      cardForm.submit()
    }
  }

  render() {
    return (
      <Root>
        <TopNavigation title="New card">
          <span onClick={this.submitForm}>
            <Check />
          </span>
        </TopNavigation>
        <CardForm
          className={newCardFormClass}
          ref={this.formRef}
          onSubmit={this.createCard}
          initialValues={{
            title: "",
            description: "",
          }}
        />
      </Root>
    )
  }
}

const component = connect(null, actions)(withRouter(NewCardPage))

export default component
