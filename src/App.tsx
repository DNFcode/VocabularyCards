import { h } from "preact"
import { css, injectGlobal } from "emotion"
import { BottomNavigation } from "./components/BottomNavigation"
import { GlossaryPage } from "./components/glossary/GlossaryPage"

injectGlobal({
  body: {
    margin: 0,
    padding: 0,
  },

  "*": {
    fontFamily: "'Nunito', sans-serif",
  },
})

const rootCss = css({
  height: `${window.innerHeight}px`,
})

const bottomNavigationCss = css({
  height: 56,
  position: "fixed",
  bottom: 0,
})

const App = () => {
  return (
    <div className={rootCss}>
      <GlossaryPage />
      <BottomNavigation className={bottomNavigationCss} />
    </div>
  )
}

export default App
