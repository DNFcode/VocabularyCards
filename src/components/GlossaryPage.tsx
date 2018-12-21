import * as React from "react"
import styled from "react-emotion"

import Search from "./Search"
import GlossaryCards from "./GlossaryCards"
import { keyframes } from "emotion"
import { Link } from "react-router-dom"
import { observer } from "mobx-react"
import { AppStore, StoreConsumer, withStore } from "../store"

@observer
class GlossaryPage extends React.Component<{ store: AppStore }> {
  render() {
    return (
      <Root>
        <SearchContainer>
          <FloatingSearch />
        </SearchContainer>
        <Cards>
          {!this.props.store.cards.length && (
            <NoCardsMessage>No cards yet :(</NoCardsMessage>
          )}
          {!!this.props.store.cards.length && (
            <>
              <CardsGroupTitle>Latest cards</CardsGroupTitle>
              <CardsGroup cards={this.props.store.cards} />
            </>
          )}
        </Cards>
        <AddButton to="/glossary/new">+</AddButton>
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
`

const CardsGroup = styled(GlossaryCards)`
  box-shadow: 0 1px 5px 0px #b7b7b7;
`

const CardsGroupTitle = styled("div")`
  padding: 15px 20px;
  font-family: sans-serif;
  font-size: 12px;
  font-weight: bold;
  color: #656565;
`

const AddButton = styled(Link)`
  width: 40px;
  height: 40px;
  border-radius: 100%;
  position: fixed;
  bottom: 20px;
  right: 20px;
  background: #4aa6b5;
  text-align: center;
  line-height: 36px;
  color: white;
  font-size: 30px;
  text-decoration: none;
  font-family: sans-serif;
  box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.2);
`

const Root = styled("div")`
  position: relative;
  background-color: #f9f9f9;
  display: flex;
  flex-direction: column;
`

const NoCardsMessage = styled("div")`
  text-align: center;
  padding: 20px;
  font-weight: bold;
`
