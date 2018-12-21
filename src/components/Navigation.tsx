import * as React from "react"
import styled from "react-emotion"

import NavIcon from "./NavIcon"
import BookIcon from "../icons/bx-book.svg"
import ChartIcon from "../icons/bx-trending-up.svg"
import CogsIcon from "../icons/bx-cog.svg"
import LearnIcon from "../icons/bxs-flask.svg"
import PlusIcon from "../icons/plus.svg"

type Props = {
  className?: string
}

const Root = styled("nav")`
  background: white;
  box-shadow: 0 2px 5px 2px #b7b7b7;
  box-sizing: border-box;
  position: relative;
`

const NavIcons = styled("div")({
  display: "grid",
  gridTemplateColumns: "1fr 1fr 1fr 1fr 1fr",
  padding: "0 10px",
  overflow: "hidden",
  height: "100%",
})

const FloatingButton = styled("button")({
  height: 56,
  width: 56,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  position: "absolute",
  top: -20,
  right: 0,
  left: 0,
  margin: "auto",
  border: "none",
  borderRadius: "100%",
  boxShadow: "0 3px 8px rgba(0, 0, 0, 0.40)",
  background: "linear-gradient(135deg, #93de6c 0%,#54b3ef 100%)",
  outline: "none",

  ":active": {
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.40)",
  },
})

export default class Navigation extends React.Component<Props> {
  render() {
    return (
      <Root className={this.props.className}>
        <FloatingButton>
          <PlusIcon width={16} height={16} />
        </FloatingButton>
        <NavIcons>
          <NavIcon to="/cards" title="Study" Icon={LearnIcon} />
          <NavIcon to="/glossary" title="Glossary" Icon={BookIcon} />
          <div />
          <NavIcon to="/stats" title="Analytics" Icon={ChartIcon} />
          <NavIcon to="/settings" title="Settings" Icon={CogsIcon} />
        </NavIcons>
      </Root>
    )
  }
}
