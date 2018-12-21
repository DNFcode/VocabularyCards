import * as React from "react"
import styled, { css } from "react-emotion"
import { withRouter, RouteComponentProps } from "react-router"

import TopNavigation from "./TopNavigaton"
import CardForm from "./CardForm"
import CheckIcon from "../icons/check.svg"
import { withStore, AppStore } from "../store"
import { getUid } from "../utils"

const Root = styled("div")`
  height: 100%;
  background: white;
  display: flex;
  flex-direction: column;
  box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.2);
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

type Props = { store: AppStore } & RouteComponentProps<any>

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
      this.props.store.addCard({
        id: getUid(),
        title: values.title,
        description: values.description,
        continiousSuccessfullChecks: 0,
        lastCheckDate: null,
        created: new Date(),
      })
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

export default withStore(withRouter(NewCardPage))
