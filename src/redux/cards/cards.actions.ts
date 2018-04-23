import { $Values } from "utility-types"

// can't use enum since enums are refering to numbers and as a result actions will interfiere
export type ActionType = "CARD_CREATED" | "CARD_UPDATED" | "CARD_REMOVED"

export const actions = {
  createCard: (title: string, description: string) => ({
    type: "CARD_CREATED" as "CARD_CREATED",
    payload: {
      title,
      description,
    },
  }),

  updateCard: (id: string, title: string, description: string) => ({
    type: "CARD_UPDATED" as "CARD_UPDATED",
    payload: {
      id,
      title,
      description,
    },
  }),

  removeCard: (id: string) => ({
    type: "CARD_REMOVED" as "CARD_REMOVED",
    payload: {
      id,
    },
  }),
}

export type CardsActions = ReturnType<$Values<typeof actions>>
