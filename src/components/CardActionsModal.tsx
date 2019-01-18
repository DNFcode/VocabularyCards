import React, { useContext, useEffect } from "react"
import styled from "@emotion/styled"

import { StoreContext } from "../store"
import {
  LightBackgroundColor,
  TextColor,
  DangerColor,
  SecondaryColor,
  BorderColor,
} from "../theme"
import PencilIcon from "../icons/bx-pencil.svg"
import TrashIcon from "../icons/bx-trash.svg"
import BulbIcon from "../icons/bx-bulb.svg"

const Root = styled("div")<{ shown: boolean }>(({ shown }) => ({
  position: "absolute",
  zIndex: 101,
  height: "100%",
  width: "100%",
  pointerEvents: shown ? "all" : "none",
}))

const Shadow = styled("div")<{ shown: boolean }>(({ shown }) => ({
  background: "rgb(0,0,0, 0.25)",
  height: "100%",
  width: "100%",
  opacity: shown ? 1 : 0,
  transition: "opacity 150ms ease-out",
}))

const Actions = styled("div")<{ shown: boolean }>(({ shown }) => ({
  background: LightBackgroundColor,
  position: "absolute",
  bottom: 0,
  width: "100%",
  transform: `translateY(${shown ? "0%" : "120%"})`,
  transition: "transform 150ms ease-out",
  boxShadow: "0 0 6px rgba(0, 0, 0, 0.25)",
}))

const Action = styled("div")<{ color: string }>(({ color }) => ({
  padding: 20,
  display: "flex",
  alignItems: "center",
  color,
  borderBottom: `1px solid ${BorderColor}`,

  ":last-of-type": {
    border: 0,
  },
}))

const ActionIcon = styled("div")({
  height: 16,
  width: 16,
  marginRight: 10,
})

const ActionText = styled("div")({
  fontSize: 16,
})

export function CardActionsModal(props: {
  shown: boolean
  cardId: string
  onClose: () => void
}) {
  const store = useContext(StoreContext)

  useEffect(() => {})

  return (
    <Root shown={props.shown}>
      <Shadow shown={props.shown} onClick={props.onClose} />
      <Actions shown={props.shown}>
        <Action color={TextColor}>
          <ActionIcon>
            <PencilIcon />
          </ActionIcon>
          <ActionText>Edit card</ActionText>
        </Action>
        <Action color={DangerColor}>
          <ActionIcon>
            <TrashIcon />
          </ActionIcon>
          <ActionText>Remove card</ActionText>
        </Action>
        <Action color={SecondaryColor}>
          <ActionIcon>
            <BulbIcon />
          </ActionIcon>
          <ActionText>Mark as learned</ActionText>
        </Action>
      </Actions>
    </Root>
  )
}
