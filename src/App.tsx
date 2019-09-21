import { h } from "preact"
import { css, injectGlobal } from "emotion"
import { BottomNavigation } from "./components/BottomNavigation"
import { GlossaryPage } from "./components/glossary/GlossaryPage"
import { CardDialog } from "./components/card/CardDialog"
import { DARK_TEXT } from "./theme"

injectGlobal({
  html: {
    height: "100%",
  },

  body: {
    height: "100%",
    margin: 0,
    padding: 0,
  },

  "*": {
    fontFamily: "'Nunito', sans-serif",
    color: DARK_TEXT,
  },
})

const rootCss = css({
  // height: `${window.innerHeight}px`,
  height: "100%",
})

const bottomNavigationCss = css({
  height: 56,
  position: "fixed",
  bottom: 0,
})

const App = () => {
  return (
    <div className={rootCss}>
      {/* <GlossaryPage />
      <BottomNavigation className={bottomNavigationCss} /> */}
      <CardDialog />
    </div>
  )
}

export default App
