import * as React from "react"
import { BrowserRouter, Route, Redirect, Switch } from "react-router-dom"
import styled, { injectGlobal, keyframes, css } from "react-emotion"
import { CSSTransition, Transition } from "react-transition-group"

// import routes, { Position } from "./routes"
import Navigation from "./components/Navigation"
import TopNavigaton from "./components/TopNavigaton"
import CardsPage from "./components/CardsPage"
import StatsPage from "./components/StatsPage"
import SettingsPage from "./components/SettingsPage"
import GlossaryPage from "./components/GlossaryPage"
import NewCardPage from "./components/NewCardPage"
import CardPage from "./components/CardPage"

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
  height: 100%;
  display: flex;
  flex-direction: column;
`

const Content = styled("div")`
  height: 100%;
  overflow: scroll;
  box-sizing: border-box;
  flex-grow: 1;
`

const BottomNavigation = styled(Navigation)`
  position: relative;
  height: 56px;
  width: 100%;
`

const rightSlide = keyframes`
  0% {
    transform: translateX(100%);
  }

  100% {
    transform: translateX(0%);
  }
`

const slideFromRight = css`
  animation: ${rightSlide} 0.3s 0.1s backwards;
  will-change: transform;
`

const slideToRight = css`
  animation: ${rightSlide} reverse 0.3s 0.1s;
  will-change: transform;
`

const RouterContainer = styled("div")`
  position: absolute;
`

let prevLocation: any

let cache: any

// REFACTORING IN PROGRESS
export default class App extends React.Component {
  // move routes setup to routes.js
  render() {
    return (
      <BrowserRouter>
        <>
          <Route
            path="(/cards|/stats|/settings|/glossary)"
            exact
            children={({ match, history, ...props }) => {
              const transitionLocation = match ? history.location : prevLocation

              return (
                <Transition
                  timeout={500}
                  mountOnEnter={true}
                  unmountOnExit={true}
                  in={!!match}
                >
                  <Root>
                    <Content>
                      <Route path="/cards" component={CardsPage} />
                      <Route path="/stats" component={StatsPage} />
                      <Route path="/settings" component={SettingsPage} />
                      <Route path="/glossary" component={GlossaryPage} />
                    </Content>
                    <BottomNavigation location={transitionLocation} />
                  </Root>
                </Transition>
              )
            }}
          />
          <Route
            path="(/glossary/new|/glossary/card/.*)"
            exact
            children={({ match, history, ...props }) => {
              const transitionLocation = match ? history.location : prevLocation

              prevLocation = history.location

              return (
                <CSSTransition
                  classNames={{
                    appear: slideFromRight,
                    enter: slideFromRight,
                    exit: slideToRight,
                  }}
                  timeout={10000}
                  mountOnEnter={true}
                  unmountOnExit={true}
                  in={!!match}
                  addEndListener={(node, done) => {
                    node.addEventListener("animationend", done, false)
                  }}
                >
                  {() => {
                    cache = !match ? (
                      cache
                    ) : (
                      <Root>
                        <Content>
                          <Route
                            path="/glossary/new"
                            component={NewCardPage}
                            location={transitionLocation}
                          />
                          <Route
                            path="/glossary/card/:id"
                            component={CardPage}
                            location={transitionLocation}
                          />
                        </Content>
                      </Root>
                    )

                    return cache
                  }}
                </CSSTransition>
              )
            }}
          />
        </>
      </BrowserRouter>
    )
  }
}
