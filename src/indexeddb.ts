import idb, { UpgradeDB } from "idb"
import { Card } from "src/types"

const name = "VocabularyCards"
const version = 1

function migrations(upgradeDB: UpgradeDB) {
  if (upgradeDB.oldVersion < 1) {
    upgradeDB.createObjectStore("cards", { keyPath: "id" })
  }
}

const idbPromise = idb.open(name, version, migrations)

export async function addCard(card: Card) {
  const db = await idbPromise
  const tx = db.transaction("cards", "readwrite")
  tx.objectStore<Card>("cards").add(card)

  return tx.complete
}

export async function updateCard(card: Card) {
  const db = await idbPromise
  const tx = db.transaction("cards", "readwrite")
  tx.objectStore<Card>("cards").put(card)

  return tx.complete
}

export async function removeCard(id: string) {
  const db = await idbPromise
  const tx = db.transaction("cards", "readwrite")
  tx.objectStore<Card>("cards").delete(id)

  return tx.complete
}

export async function getCards() {
  const db = await idbPromise
  const tx = db.transaction("cards", "readwrite")
  return tx.objectStore<Card>("cards").getAll()
}
