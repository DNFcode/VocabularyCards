import { h, render } from "preact"
import * as OfflinePluginRuntime from "offline-plugin/runtime"

if (process.env.NODE_ENV === "production") {
  OfflinePluginRuntime.install()
}

let root = document.getElementById("react") || undefined
function init() {
  let App = require("./App").default
  render(<App />, document.body, root)
}

// in development, set up HMR:
if (module.hot) {
  //require('preact/devtools');   // turn this on if you want to enable React DevTools!
  module.hot.accept("./App", () => requestAnimationFrame(init))
}

init()
