import * as React from "react";
import * as ReactDOM from "react-dom";

import { AppContainer } from 'react-hot-loader'
import App from './App'


const render = (Component: typeof App) => {
  ReactDOM.render(
    <AppContainer>
      <Component />
    </AppContainer>,
    document.getElementById('react'),
  )
}

render(App)

// Webpack Hot Module Replacement API
if (module.hot) {
  module.hot.accept('./App', () => {
    const NextApp = require("./App").default
    render(App)
  })
}