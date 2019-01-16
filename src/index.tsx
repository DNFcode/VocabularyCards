import * as React from "react"
import * as ReactDOM from "react-dom"
import * as OfflinePluginRuntime from "offline-plugin/runtime"

import { AppContainer } from "react-hot-loader"
import App from "./App"
import { StoreProvider } from "./store"

if (process.env.NODE_ENV === "production") {
  OfflinePluginRuntime.install()
}

const render = (Component: typeof App) => {
  React
  ReactDOM.render(
    <AppContainer>
      <StoreProvider>
        <Component />
      </StoreProvider>
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
