import { Reducer } from "redux"
import { ActionType, CardsActions, actions } from "./cards.actions"

type Card = {
  id: string
  title: string
  description: string
  continiousSuccessfullChecks: number
  lastCheckDate: Date | null
  created: Date
}

type State = {
  [key: string]: Card
}

let key = 0

export const cardsReducer: Reducer<State, CardsActions> = (
  state = {},
  action
) => {
  switch (action.type) {
    case "CARD_CREATED": {
      const { title, description } = action.payload
      key += 1

      return {
        ...state,
        [key]: {
          id: key,
          title,
          description,
          continiousSuccessfullChecks: 0,
          lastCheckDate: new Date(),
          created: new Date(),
        },
      }
    }

    case "CARD_UPDATED": {
      const { id, title, description } = action.payload

      return {
        ...state,
        [id]: {
          ...state[id],
          title,
          description,
        },
      }
    }

    case "CARD_REMOVED": {
      const { id } = action.payload
      const { [id]: removedCard, ...restState } = state

      return restState
    }

    default:
      return state
  }
}
