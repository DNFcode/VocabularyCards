import * as React from "react"
import { connect } from "react-redux"
import styled from "react-emotion"

import { State as ReduxState } from "../redux/store"
import { actions } from "../redux/cards/cards.actions"
import SwipeableCards from "./SwipeableCards"

const Root = styled("div")`
  height: 100%;
  background: white;
  display: flex;
  flex-direction: column;
`

type Props = {
  cards: ReduxState["cards"]
} & typeof actions

type State = {
  currentCard: number
  cardsAnswers: {
    [key: string]: boolean
  }
}

class CardsPage extends React.Component<Props, State> {
  cardsIds: Array<string>

  constructor(props: Props) {
    super(props)

    this.cardsIds = Object.keys(this.props.cards)

    const cardsAnswers = {}
    Object.keys(props.cards).forEach(key => {
      cardsAnswers[key] = false
    })

    this.state = {
      currentCard: 0,
      cardsAnswers,
    }

    this.getFullCardData = this.getFullCardData.bind(this)
    this.goToNextCard = this.goToNextCard.bind(this)
    this.goToPrevCard = this.goToPrevCard.bind(this)
  }

  getFullCardData(index: number) {
    const id = this.cardsIds[index]

    return id
      ? {
          ...this.props.cards[id],
          remembered: this.state.cardsAnswers[id],
        }
      : undefined
  }

  goToNextCard() {
    this.setState({
      currentCard: this.state.currentCard + 1,
    })
  }

  goToPrevCard() {
    this.setState({
      currentCard: this.state.currentCard - 1,
    })
  }

  currentCardRemembered() {}

  currentCartForgoten() {}

  render() {
    const { currentCard } = this.state

    return (
      <Root>
        <SwipeableCards
          prevCard={this.getFullCardData(currentCard - 1)}
          mainCard={this.getFullCardData(currentCard)}
          nextCard={this.getFullCardData(currentCard + 1)}
          hiddenCard={this.getFullCardData(currentCard + 2)}
          onSwipeLeft={this.goToNextCard}
          onSwipeRight={this.goToPrevCard}
        />
      </Root>
    )
  }
}

export default connect(
  (state: ReduxState, props: Props) => ({
    cards: state.cards,
  }),
  actions
)(CardsPage)
