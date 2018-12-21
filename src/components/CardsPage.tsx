import * as React from "react"
import styled from "react-emotion"

import SwipeableCards from "./SwipeableCards"
import { withStore, AppStore } from "../store"

const Root = styled("div")`
  height: 100%;
  background: white;
  display: flex;
  flex-direction: column;
`

type Props = {
  store: AppStore
}

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

    this.cardsIds = Object.keys(this.props.store.cards)

    const cardsAnswers = {}
    Object.keys(props.store.cards).forEach(key => {
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
          ...this.props.store.cards[id],
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

export default withStore(CardsPage)
