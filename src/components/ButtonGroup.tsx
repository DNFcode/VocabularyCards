import * as React from "react"
import styled from "@emotion/styled"
import { PrimaryColor, LightBackgroundColor } from "../theme"

const Root = styled("span")({})

const Button = styled("button")<{ active: boolean }>(({ active }) => ({
  width: 100,
  padding: "10px 0",
  border: `1px solid ${PrimaryColor}`,
  background: active ? PrimaryColor : LightBackgroundColor,
  color: active ? LightBackgroundColor : PrimaryColor,
  fontSize: 16,
  outline: "none",
  cursor: "pointer",

  ":first-of-type": {
    borderRadius: "5px 0 0 5px",
    borderRightWidth: 0,
  },

  ":last-of-type": {
    borderRadius: "0 5px 5px 0",
  },
}))

type ButtonInfo = {
  label: string
  active?: boolean
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void
}

export function ButtonGroup(props: {
  className?: string
  buttons: ButtonInfo[]
}) {
  const { buttons, className } = props

  return (
    <Root className={className}>
      {buttons.map((button, index) => (
        <Button active={!!button.active} key={index} onClick={button.onClick}>
          {button.label}
        </Button>
      ))}
    </Root>
  )
}
