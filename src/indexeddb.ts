import { openDB, DBSchema } from "idb"
import { Card } from "./types"

interface IDBSchema extends DBSchema {
  cards: {
    key: string
    value: Card
  }
}

const DB_NAME = "lexia"
const DB_VERSION = 1

const idbPromise = openDB<IDBSchema>(DB_NAME, DB_VERSION, {
  upgrade: (db, oldVersion, newVersion) => {
    if (newVersion === 1) {
      db.createObjectStore("cards", { keyPath: "id" })
    }
    // continue any migrations here
  },
})

export async function addCard(card: Card) {
  return (await idbPromise).add("cards", card)
}

export async function updateCard(card: Card) {
  return (await idbPromise).put("cards", card)
}

export async function removeCard(id: string) {
  return (await idbPromise).delete("cards", id)
}

export async function getCards() {
  return (await idbPromise).getAll("cards")
}
