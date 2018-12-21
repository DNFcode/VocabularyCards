import * as React from "react"
import styled, { css } from "react-emotion"
import { Link } from "react-router-dom"

import theme from "../theme"
import { Card } from "../types"

type Props = {
  className?: string
  cards: Card[]
}

const Root = styled("div")`
  width: 100%;
`

const Card = styled(Link)`
  display: block;
  text-decoration: none;
  padding: 10px 20px;
  background: white;
  border-left: 4px solid #ff9800;
  color: ${theme.darkTextColor};
  & + & {
    border-top: 1px solid #e0e0e0;
  }
`

const CardWord = styled("div")`
  font-weight: bold;
  font-family: sans-serif;
  margin-bottom: 5px;
  text-transform: capitalize;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
`

const CardDefinition = styled("div")`
  font-family: sans-serif;
  text-transform: capitalize;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  color: #777777;
`

export default class GlossaryCards extends React.Component<Props> {
  render() {
    return (
      <Root className={this.props.className}>
        {this.props.cards.map(({ id, title, description }, index) => (
          <Card to={`/glossary/card/${id}`} key={index}>
            <CardWord>{title}</CardWord>
            <CardDefinition>{description}</CardDefinition>
          </Card>
        ))}
      </Root>
    )
  }
}
