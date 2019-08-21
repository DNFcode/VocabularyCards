import { useState, useEffect, useMemo } from "preact/hooks"
import { Card } from "./types"
import { getCards } from "./indexeddb"

function createStore<StoreT>(defaultStore?: StoreT) {
  let subscribers: Array<(store: StoreT) => void> = []
  let store: StoreT | undefined = defaultStore

  function initStore(newStore: StoreT) {
    store = newStore
  }

  function setStore(newStore: Partial<StoreT>) {
    if (store) {
      store = { ...store, ...newStore }
      subscribers.forEach(subscriber => {
        subscriber(store!)
      })
      return
    }
    throw Error("Store wasn't initialised for interaction.")
  }

  function getStore() {
    if (store) {
      return store
    }
    throw Error("Store wasn't initialised for interaction.")
  }

  // function useStore<T = StoreT>(
  //   getter?: (store: StoreT) => T[] = store => {
  //     return [store]
  //   }
  // ): T[] {}

  // getter seems useless so far
  type UseStore<T = StoreT> = (getter?: (store: StoreT) => T[]) => T[]
  const useStore: UseStore = getter => {
    if (!store) {
      throw Error("Store wasn't initialised for interaction.")
    }
    const [value, setValue] = useState(getter(store))
    useEffect(() => {
      subscribers.push(store => {
        setValue(getter(store))
      })
      return () => {
        subscribers = subscribers.filter(setter => setter !== setter)
      }
    }, [])
    return value
  }

  return {
    initStore,
    setStore,
    getStore,
    useStore,
  }
}

const cardsStore = createStore<{ cards: Card[] }>()
;(async () => {
  cardsStore.initStore({ cards: await getCards() })
})()
