import * as React from "react"
import styled from "react-emotion"

import Search from "./Search"
import GlossaryCards from "./GlossaryCards"
import { keyframes } from "emotion"
import { Link } from "react-router-dom"
import { observer } from "mobx-react"
import { AppStore, StoreConsumer, withStore } from "../store"
import { LightBackgroundColor } from "../theme"
import { ButtonGroup } from "./ButtonGroup"

@observer
class GlossaryPage extends React.Component<{ store: AppStore }> {
  render() {
    return (
      <Root>
        <SearchContainer>
          <FloatingSearch />
          <ButtonGroup
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
  box-sizing: border-box;
  z-index: 1;
`

const FloatingSearch = styled(Search)`
  background: white;
  box-shadow: 0 0 5px 0px #b7b7b7;
  overflow: hidden;
`

const Cards = styled("div")`
  padding-bottom: 80px;
  min-height: 0;
  overflow: auto;
  padding: 10px;
`

const CardsGroup = styled(GlossaryCards)``

const CardsGroupTitle = styled("div")`
  padding: 15px 20px;
  font-family: sans-serif;
  font-size: 12px;
  font-weight: bold;
  color: #656565;
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
