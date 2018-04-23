import * as React from "react"
import styled from "react-emotion"

import Search from "./Search"
import DictionaryCards from "./DictionaryCards"
import { keyframes } from "emotion"
import { Link } from "react-router-dom"
import { connect } from "react-redux"
import { State } from "../redux/store"

const SearchContainer = styled("div")`
  position: fixed;
  width: 100%;
  padding: 20px;
  box-sizing: border-box;
`

const FloatingSearch = styled(Search)`
  background: white;
  border-radius: 3px;
  box-shadow: 0 0 5px 0px #b7b7b7;
  overflow: hidden;
`

const Cards = styled("div")`
  padding-top: 80px;
  padding-bottom: 90px;
`

const CardsGroup = styled(DictionaryCards)`
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
  bottom: 70px;
  right: 20px;
  background: #4aa6b5;
  text-align: center;
  line-height: 36px;
  color: white;
  font-size: 30px;
  text-decoration: none;
  font-family: sans-serif;
`

const Root = styled("div")`
  position: relative;
`

const NoCardsMessage = styled("div")`
  text-align: center;
  padding: 20px;
  font-weight: bold;
`

type Props = {
  cards: State["cards"]
}

class GlossaryPage extends React.Component<Props, any> {
  shouldComponentUpdate(nextProps: Props) {
    return nextProps.cards !== this.props.cards
  }

  render() {
    const cards = Object.values(this.props.cards)

    return (
      <>
        <Root>
          <SearchContainer>
            <FloatingSearch />
          </SearchContainer>
          <Cards>
            {!cards.length && <NoCardsMessage>No cards yet :(</NoCardsMessage>}
            {!!cards.length && (
              <>
                <CardsGroupTitle>Latest cards</CardsGroupTitle>
                <CardsGroup cards={cards} />
              </>
            )}
          </Cards>
        </Root>
        <AddButton to="/glossary/new">+</AddButton>
      </>
    )
  }
}

export default connect((state: State) => ({ cards: state.cards }))(GlossaryPage)
