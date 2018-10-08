import * as React from "react"
import styled from "react-emotion"

import theme from "../theme"
import NavIcon from "./NavIcon"
import BookIcon from "../icons/bx-book.svg"
import ChartIcon from "../icons/bx-trending-up.svg"
import CogsIcon from "../icons/bx-cog.svg"
import LearnIcon from "../icons/bxs-flask.svg"

type Props = {
  className?: string
}

const Root = styled("nav")`
  background: white;
  box-shadow: 0 2px 5px 2px #b7b7b7;
  display: grid;
  overflow: hidden;
  padding: 0 15px;
  box-sizing: border-box;
  grid-template-columns: 1fr 1fr 1fr 1fr;
`

export default class Navigation extends React.Component<Props> {
  render() {
    return (
      <Root className={this.props.className}>
        <NavIcon to="/cards" title="Study" Icon={LearnIcon} />
        <NavIcon to="/glossary" title="Glossary" Icon={BookIcon} />
        <NavIcon to="/stats" title="Analytics" Icon={ChartIcon} />
        <NavIcon to="/settings" title="Settings" Icon={CogsIcon} />
      </Root>
    )
  }
}
