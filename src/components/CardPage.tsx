import * as React from "react"
import styled, { css } from "react-emotion"
import { keyframes } from "emotion"
import { withRouter, RouteComponentProps } from "react-router"

import TopNavigation from "./TopNavigaton"
import CardForm from "./CardForm"
import CheckIcon from "../icons/check.svg"
import TrashIcon from "../icons/trash.svg"
import { Card } from "../types"
import { observer } from "mobx-react"
import { withStore, AppStore } from "../store"

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

const Trash = styled(TrashIcon)`
  margin-right: 20px;
  height: 20px;
  width: 20px;
  display: block;
`

const Icons = styled("div")`
  display: flex;
  align-items: center;
`

type Props = {
  store: AppStore
} & RouteComponentProps<{ id: string }>

@observer
class CardPage extends React.Component<Props> {
  formRef: React.RefObject<CardForm>
  cacheCard?: Card

  constructor(props: Props) {
    super(props)

    this.formRef = React.createRef()
    this.updateCard = this.updateCard.bind(this)
    this.removeCard = this.removeCard.bind(this)
    this.submitForm = this.submitForm.bind(this)
  }

  updateCard(values: any) {
    const card = this.props.store.cards.find(
      card => card.id === this.props.match.params.id
    )!
    this.props.history.push("/glossary")
    this.props.store.updateCard({
      ...card,
      title: values.title,
      description: values.description,
    })
  }

  removeCard() {
    // this is a hack, I'm not sure how bad it is though
    this.cacheCard = this.props.store.cards.find(
      card => card.id === this.props.match.params.id
    )
    this.props.store.removeCard(this.props.match.params.id)
    this.props.history.push("/glossary")
  }

  submitForm() {
    const cardForm = this.formRef.current
    if (cardForm) {
      cardForm.submit()
    }
  }

  render() {
    const card =
      this.cacheCard ||
      this.props.store.cards.find(
        card => card.id === this.props.match.params.id
      )

    return (
      <Root>
        <TopNavigation title="In progress" color="#FF9800">
          <Icons>
            <Trash onClick={this.removeCard} />
            <Check onClick={this.submitForm} />
          </Icons>
        </TopNavigation>
        <CardForm
          className={newCardFormClass}
          ref={this.formRef}
          onSubmit={this.updateCard}
          initialValues={{
            title: card!.title,
            description: card!.description,
          }}
        />
      </Root>
    )
  }
}

export default withStore(withRouter(CardPage))
