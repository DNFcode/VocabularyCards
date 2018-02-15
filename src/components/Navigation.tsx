import * as React from "react"
import styled from "react-emotion"

import NavIcon from "./NavIcon"
import BookIcon from "../icons/book.svg"
import ChartIcon from "../icons/chart-bar.svg"
import CogsIcon from "../icons/cogs.svg"
import EditIcon from "../icons/edit.svg"

type Props = {
  className?: string
}

const Root = styled("nav")`
  background: #756c83;
  height: 50px;
  box-shadow: 0 2px 10px 4px #b7b7b7;
  display: flex;
  justify-content: space-around;
  align-items: center;
`

const Navigation: React.SFC<Props> = ({ className }) => (
  <Root className={className}>
    <NavIcon to="/cards" title="Cards" Icon={BookIcon} />
    <NavIcon to="/stats" title="Analytics" Icon={ChartIcon} />
    <NavIcon to="/settings" title="Settings" Icon={CogsIcon} />
    <NavIcon to="/edit" title="Edit" Icon={EditIcon} />
  </Root>
)

export default Navigation
