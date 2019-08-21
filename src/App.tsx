import { h } from "preact"
import { css, injectGlobal } from "emotion"
import { BottomNavigation } from "./components/BottomNavigation"
import { GlossaryPage } from "./components/GlossaryPage"

injectGlobal({
  body: {
    margin: 0,
    padding: 0,
  },
})

const rootCss = css({
  height: `${window.innerHeight}px`,
  display: "grid",
  gridTemplateRows: "1fr 56px",
})

const App = () => {
  return (
    <div className={rootCss}>
      <GlossaryPage />
      <BottomNavigation />
    </div>
  )
}

export default App
