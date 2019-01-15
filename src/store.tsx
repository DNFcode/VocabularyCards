import * as React from "react"
import { observable, action } from "mobx"

import { getCards, addCard, updateCard, removeCard } from "./indexeddb"
import { Card } from "./types"

export class AppStore {
  constructor() {
    getCards().then(cards => {
      this.cards = cards
    })
  }

  @observable cards: Card[] = []

  @action
  addCard = async (card: Card) => {
    await addCard(card)
    this.cards = [...this.cards, card]
  }

  updateCard = async (card: Card) => {
    await updateCard(card)
    this.cards = this.cards.map(c => (c.id !== card.id ? c : card))
  }

  removeCard = async (id: string) => {
    await removeCard(id)
    this.cards = this.cards.filter(c => c.id !== id)
  }
}

const store = new AppStore()
const StoreContext = React.createContext(store)

const StoreProvider = (props: { children?: React.ReactNode }) => (
  <StoreContext.Provider value={store}>{props.children}</StoreContext.Provider>
)

function withStore<P extends { store: AppStore }>(
  Component: React.ComponentClass<P, any>
) {
  return function ComponentWithStore(props: P) {
    return (
      <StoreContext.Consumer>
        {store => <Component {...props} store={store} />}
      </StoreContext.Consumer>
    )
  }
}

export { StoreProvider, withStore, StoreContext }
