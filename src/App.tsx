import * as React from "react"
import { BrowserRouter, Route, Redirect, Switch } from "react-router-dom"
import styled, { injectGlobal, keyframes, css } from "react-emotion"
import {
  CSSTransition,
  Transition,
  TransitionGroup,
} from "react-transition-group"

import { getCardPageAnimation, getTopPageAnimation } from "./animations"
import Navigation from "./components/Navigation"
import CardsPage from "./components/CardsPage"
import StatsPage from "./components/StatsPage"
import SettingsPage from "./components/SettingsPage"
import GlossaryPage from "./components/GlossaryPage"
import NewCardPage from "./components/NewCardPage"
import CardPage from "./components/CardPage"
import AnimatedRoute from "./components/AnimatedRoute"

injectGlobal`
  body {
    margin: 0;
    padding: 0;
  }
`

const Root = styled("div")`
  background: #f9f9f9;
  color: #404040;
  font-family: sans-serif;
  position: fixed;
  overflow: scroll;
  width: 100%;
  height: ${window.innerHeight}px;
  display: flex;
  flex-direction: column;
`

const Content = styled("div")`
  height: 100%;
  overflow: scroll;
  box-sizing: border-box;
  flex-grow: 1;
  position: relative;

  > * {
    position: absolute !important;
    height: 100%;
    width: 100%;
    will-change: transform;
  }
`

const BottomNavigation = styled(Navigation)`
  position: relative;
  height: 56px;
  width: 100%;
  flex-shrink: 0;
  z-index: 100;
`

export default class App extends React.Component {
  // move routes setup to routes.js
  render() {
    return (
      <BrowserRouter>
        <Root>
          <Content>
            <Redirect from="/" to="/glossary" />
            <AnimatedRoute
              getRouteAnimation={getTopPageAnimation}
              path="/cards"
              component={CardsPage}
            />
            <AnimatedRoute
              getRouteAnimation={getTopPageAnimation}
              path="/stats"
              component={StatsPage}
            />
            <AnimatedRoute
              getRouteAnimation={getTopPageAnimation}
              path="/settings"
              component={SettingsPage}
            />
            <AnimatedRoute
              getRouteAnimation={getTopPageAnimation}
              path="/glossary"
              component={GlossaryPage}
            />
            <AnimatedRoute
              exact={true}
              getRouteAnimation={getCardPageAnimation}
              path="/glossary/new"
              component={NewCardPage}
            />
            <AnimatedRoute
              exact={true}
              getRouteAnimation={getCardPageAnimation}
              path="/glossary/card/:id"
              component={CardPage}
            />
          </Content>
          <BottomNavigation />
        </Root>
      </BrowserRouter>
    )
  }
}
