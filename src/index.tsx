import * as React from "react"
import * as ReactDOM from "react-dom"
import { Provider } from "react-redux"

import { AppContainer } from "react-hot-loader"
import App from "./App"
import { initStore } from "./redux/store"

const store = initStore()

const render = (Component: typeof App) => {
  ReactDOM.render(
    <AppContainer>
      <Provider store={store}>
        <Component />
      </Provider>
    </AppContainer>,
    document.getElementById("react")
  )
}

render(App)

// Webpack Hot Module Replacement API
if (module.hot) {
  module.hot.accept("./App", () => {
    const NextApp = require("./App").default
    render(App)
  })
}
