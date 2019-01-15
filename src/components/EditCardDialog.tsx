import React, { useContext } from "react"

import { StoreContext } from "../store"
import { CardDialog } from "./CardDialog"
import { Card } from "src/types"

export function EditCardDialog(props: { card: Card }) {
  const store = useContext(StoreContext)

  return (
    <CardDialog
      title="Edit card"
      initialValues={props.card}
      onSubmit={values => {
        store.updateCard({
          ...props.card,
          title: values.title,
          description: values.description,
        })
      }}
    />
  )
}
