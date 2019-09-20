import { h, Fragment } from "preact"
import { css } from "emotion"
import { LIGHT_TEXT, PRIMARY_COLOR, LIGHT_BACKGROUND } from "../../theme"
import { GlossarySearch } from "./GlossarySearch"

const pageHeaderCss = css({
  paddingTop: 32,
  backgroundColor: PRIMARY_COLOR,
})

const headerTitleCss = css({
  fontSize: 30,
  fontWeight: "bold",
  color: LIGHT_TEXT,
  marginLeft: 16,
})

const stickyContainerCss = css({
  position: "sticky",
  top: 0,
  overflow: "hidden",
})

const searchContainerCss = css({
  backgroundColor: PRIMARY_COLOR,
  paddingTop: 24,
  paddingBottom: 24,
})

const headerBottomCss = css({
  borderRadius: "20px 20px 0 0",
  height: 20,
  backgroundColor: "transparent",
  boxShadow: `0 0 0 10px ${PRIMARY_COLOR}`,
})

export const GlossaryHeader = () => {
  return (
    <Fragment>
      <header className={pageHeaderCss}>
        <div className={headerTitleCss}>Glossary</div>
      </header>
      <div className={stickyContainerCss}>
        <div className={searchContainerCss}>
          <GlossarySearch />
        </div>
        <div className={headerBottomCss} />
      </div>
    </Fragment>
  )
}
