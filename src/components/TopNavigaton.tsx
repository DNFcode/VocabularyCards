import * as React from "react"
import { keyframes, css } from "@emotion/core"
import styled from "@emotion/styled"

import { PrimaryColor } from "../theme"
import CloseIcon from "../icons/close.svg"

type Props = {
  className?: string
  onClose?: () => void
  title: string
}

const Root = styled("div")`
  width: 100%;
  height: 56px;
  display: flex;
  background-color: ${PrimaryColor};
  color: white;
  align-items: center;
  position: relative;
  justify-content: center;
`

const CloseButton = styled("button")({
  border: 0,
  outline: 0,
  padding: 0,
  height: 18,
  width: 18,
  background: 0,
  position: "absolute",
  left: 20,
})

const Title = styled("div")({
  fontSize: 16,
})

export function TopNavigation(props: Props) {
  return (
    <Root className={props.className}>
      <CloseButton onClick={props.onClose}>
        <CloseIcon width="100%" />
      </CloseButton>
      <Title>{props.title}</Title>
    </Root>
  )
}
