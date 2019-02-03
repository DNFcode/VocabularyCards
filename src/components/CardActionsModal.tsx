import React, { useContext, useEffect, useRef, useState } from "react"
import styled from "@emotion/styled"
import { Spring, config, animated, interpolate } from "react-spring"

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
import { AnimationState } from "./Animator"

const Root = styled("div")<{ shown: boolean }>(({ shown }) => ({
  position: "absolute",
  zIndex: 101,
  height: "100%",
  width: "100%",
  pointerEvents: shown ? "all" : "none",
}))

const Shadow = animated(
  styled("div")({
    background: "rgba(0,0,0, 0.25)",
    height: "100%",
    width: "100%",
  })
)

const Actions = animated(
  styled("div")({
    background: LightBackgroundColor,
    position: "absolute",
    bottom: 0,
    width: "100%",
    boxShadow: "0 0 6px rgba(0, 0, 0, 0.25)",
  })
)

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
  animationState: AnimationState
  onTransitionEnd: () => void
  cardId: string
  onClose: () => void
}) {
  const store = useContext(StoreContext)
  const rootRef = useRef<HTMLDivElement>(null)
  const shown =
    props.animationState === "in" || props.animationState === "rendered"

  return (
    <Root shown={shown} ref={rootRef}>
      <Spring
        native
        config={{ tension: 250, friction: 22, mass: 0.5 }}
        onRest={props.onTransitionEnd}
        from={{ opacity: 0 }}
        to={{
          opacity: shown ? 1 : 0,
        }}
      >
        {style => <Shadow style={style} onClick={props.onClose} />}
      </Spring>
      <Spring
        native
        config={{ tension: 250, friction: 22, mass: 0.5 }}
        from={{ y: 120 }}
        to={{
          y: shown ? 0 : 120,
        }}
      >
        {({ y }) => (
          <Actions
            style={{
              transform: interpolate([y], y => `translateY(${y}%)`),
            }}
          >
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
        )}
      </Spring>
    </Root>
  )
}
