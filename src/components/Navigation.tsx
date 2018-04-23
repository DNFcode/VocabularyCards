import * as React from "react"
import styled from "react-emotion"

import theme from "../theme"
import NavIcon from "./NavIcon"
import BookIcon from "../icons/book.svg"
import ChartIcon from "../icons/chart-bar.svg"
import CogsIcon from "../icons/cogs.svg"
import LearnIcon from "../icons/graduation-cap.svg"

type Props = {
  className?: string
  location: any
}

const Root = styled("nav")`
  background: ${theme.primaryColor};
  box-shadow: 0 2px 10px 4px #b7b7b7;
  display: flex;
  justify-content: space-around;
  align-items: center;
  overflow: hidden;
`

export default class Navigation extends React.Component<Props> {
  shouldComponentUpdate(nextProps: Props) {
    return nextProps.location !== this.props.location
  }

  render() {
    return (
      <Root className={this.props.className}>
        <NavIcon to="/cards" title="Learn" Icon={LearnIcon} />
        <NavIcon to="/glossary" title="Glossary" Icon={BookIcon} />
        <NavIcon to="/stats" title="Analytics" Icon={ChartIcon} />
        <NavIcon to="/settings" title="Settings" Icon={CogsIcon} />
      </Root>
    )
  }
}
