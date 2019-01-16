import * as React from "react"
import styled from "@emotion/styled"

import Search from "./Search"
import GlossaryCards from "./GlossaryCards"
import { keyframes } from "emotion"
import { Link } from "react-router-dom"
import { observer } from "mobx-react"
import { AppStore, withStore } from "../store"
import { LightBackgroundColor, TextLightColor } from "../theme"
import { ButtonGroup } from "./ButtonGroup"

@observer
class GlossaryPage extends React.Component<{ store: AppStore }> {
  render() {
    return (
      <Root>
        <SearchContainer>
          <FloatingSearch />
          <Filters
            buttons={[
              {
                label: "Learned",
              },
              {
                label: "All",
              },
              {
                label: "Ongoing",
                active: true,
              },
            ]}
          />
        </SearchContainer>
        <Cards>
          {!this.props.store.cards.length && (
            <NoCardsMessage>No cards yet :(</NoCardsMessage>
          )}
          {!!this.props.store.cards.length && (
            <>
              <CardsGroupTitle>Latest</CardsGroupTitle>
              <CardsGroup cards={this.props.store.cards} />
            </>
          )}
        </Cards>
      </Root>
    )
  }
}

export default withStore(GlossaryPage)

const SearchContainer = styled("div")`
  width: 100%;
  z-index: 1;
  box-shadow: 0 0 5px 0px #b7b7b7;
`

const Filters = styled(ButtonGroup)({
  display: "flex",
  justifyContent: "center",
  marginBottom: 10,
})

const FloatingSearch = styled(Search)`
  background: white;
  padding: 10px;
  overflow: hidden;
  box-sizing: border-box;
`

const Cards = styled("div")`
  padding: 0 10px;
  padding-bottom: 80px;
  min-height: 0;
  overflow: auto;
`

const CardsGroup = styled(GlossaryCards)``

const CardsGroupTitle = styled("div")`
  padding: 10px;
  font-family: sans-serif;
  font-size: 12px;
  font-weight: bold;
  text-transform: uppercase;
  color: ${TextLightColor};
`

const Root = styled("div")`
  position: relative;
  background-color: ${LightBackgroundColor};
  display: flex;
  flex-direction: column;
`

const NoCardsMessage = styled("div")`
  text-align: center;
  padding: 20px;
  font-weight: bold;
`
