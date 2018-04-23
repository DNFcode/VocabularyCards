import {
  createStore,
  combineReducers,
  applyMiddleware,
  ReducersMapObject,
} from "redux"
import createSagaMiddleware from "redux-saga"

import { cardsReducer } from "./cards/cards.reducers"
import { CardsActions } from "./cards/cards.actions"

type Actions = CardsActions
export type State = {
  cards: ReturnType<typeof cardsReducer>
}

const reducers: ReducersMapObject<State, Actions> = {
  cards: cardsReducer,
}

export function initStore() {
  return createStore(
    combineReducers(reducers),
    applyMiddleware(createSagaMiddleware())
  )
}
