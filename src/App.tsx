import * as React from "react"
import { BrowserRouter, Route } from "react-router-dom"
import styled, { injectGlobal } from "react-emotion"
import { ThemeProvider } from "emotion-theming"

import CardsPage from "./components/CardsPage"
import Navigation from "./components/Navigation"
import StatsPage from "./components/StatsPage"
import SettingsPage from "./components/SettingsPage"
import EditPage from "./components/EditPage"

injectGlobal`
  body {
    margin: 0;
    padding: 0;
  }
`

const theme = {
  primaryColor: "#4AA6B5",
}

const Container = styled("div")`
  background: white;
`

const FixedNavigation = styled(Navigation)`
  position: fixed;
  bottom: 0;
  width: 100%;
`

export default class App extends React.Component {
  render() {
    return (
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Container>
            <Route path="/cards" component={CardsPage} />
            <Route path="/stats" component={StatsPage} />
            <Route path="/settings" component={SettingsPage} />
            <Route path="/edit" component={EditPage} />
            <FixedNavigation />
          </Container>
        </BrowserRouter>
      </ThemeProvider>
    )
  }
}
