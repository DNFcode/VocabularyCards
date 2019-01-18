import * as React from "react"
import styled from "@emotion/styled"
import { Link } from "react-router-dom"
import {
  DarkerBackgroundColor,
  TextLightColor,
  TextColor,
  DangerColor,
} from "../theme"
import { Card } from "../types"

type Props = {
  className?: string
  cards: Card[]
}

const Root = styled("div")({
  width: "100%",
})

const Card = styled(Link)({
  borderRadius: 5,
  display: "block",
  textDecoration: "none",
  padding: 10,
  background: DarkerBackgroundColor,
  marginBottom: 10,
})

const Dot = styled("div")({
  height: 8,
  width: 8,
  borderRadius: "100%",
  backgroundColor: DangerColor,
  flexShrink: 0,
})

const CardTop = styled("div")({
  display: "flex",
  alignItems: "center",
})

const CardTitle = styled("div")({
  fontWeight: "bold",
  textTransform: "capitalize",
  color: TextColor,
  marginLeft: 10,
  marginRight: 10,
  minWidth: 0,
  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis",
})

const CardProgress = styled("div")({
  color: DangerColor,
  fontSize: 12,
  fontWeight: "bold",
  marginLeft: "auto",
})

const CardDescription = styled("div")({
  color: TextLightColor,
  marginTop: 10,
  marginLeft: 18,
})

export default class GlossaryCards extends React.Component<Props> {
  render() {
    return (
      <Root className={this.props.className}>
        {this.props.cards.map(({ id, title, description }) => (
          <Card to={`/glossary/actions/${id}`} key={id}>
            <CardTop>
              <Dot />
              <CardTitle>{title}</CardTitle>
              <CardProgress>learned</CardProgress>
            </CardTop>
            <CardDescription>{description}</CardDescription>
          </Card>
        ))}
      </Root>
    )
  }
}
