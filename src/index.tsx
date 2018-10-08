import * as React from "react"
import * as ReactDOM from "react-dom"
import { Provider } from "react-redux"

import { AppContainer } from "react-hot-loader"
import App from "./App"
import { initStore } from "./redux/store"

// if ("serviceWorker" in navigator) {
//   navigator.serviceWorker
//     .register("service-worker.js")
//     .then(function(registration) {
//       console.log(
//         "Hooray. Registration successful, scope is:",
//         registration.scope
//       )
//     })
//     .catch(function(err) {
//       console.log("Whoops. Service worker registration failed, error:", err)
//     })
// }

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
