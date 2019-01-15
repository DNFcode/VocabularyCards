import React, { useContext } from "react"

import { StoreContext } from "../store"
import { getUid } from "../utils"
import { CardDialog } from "./CardDialog"

export function NewCardDialog(props: {}) {
  const store = useContext(StoreContext)

  return (
    <CardDialog
      title="Create new card"
      onSubmit={values => {
        store.addCard({
          id: getUid(),
          title: values.title,
          description: values.description,
          continiousSuccessfullChecks: 0,
          lastCheckDate: null,
          created: new Date(),
        })
      }}
    />
  )
}
