import * as React from "react"
import { connect } from "react-redux"
import styled, { css } from "react-emotion"
import { keyframes } from "emotion"
import { withRouter, RouteComponentProps } from "react-router"

import { State } from "../redux/store"
import { actions } from "../redux/cards/cards.actions"
import TopNavigation from "./TopNavigaton"
import CardForm from "./CardForm"
import CheckIcon from "../icons/check.svg"
import TrashIcon from "../icons/trash.svg"

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
  card: State["cards"][0]
} & RouteComponentProps<{ id: string }> &
  typeof actions

class CardPage extends React.Component<Props> {
  formRef: React.RefObject<CardForm>

  constructor(props: Props) {
    super(props)

    this.formRef = React.createRef()
    this.updateCard = this.updateCard.bind(this)
    this.removeCard = this.removeCard.bind(this)
    this.submitForm = this.submitForm.bind(this)
  }

  // required to cache component on animation back to glossary page
  // I should find a better and clearer way to do that...
  shouldComponentUpdate(nextProps: Props) {
    return !!nextProps.card
  }

  updateCard(values: any) {
    this.props.history.push("/glossary")
    this.props.updateCard(
      this.props.match.params.id,
      values.title,
      values.description
    )
  }

  removeCard() {
    this.props.history.push("/glossary")
    this.props.removeCard(this.props.match.params.id)
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
            title: this.props.card.title,
            description: this.props.card.description,
          }}
        />
      </Root>
    )
  }
}

export default withRouter(
  connect(
    (state: State, props: Props) => ({
      card: state.cards[props.match.params.id],
    }),
    actions
  )(CardPage)
)
