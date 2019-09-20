import { h, Fragment, FunctionalComponent } from "preact"
import { css } from "emotion"
import { SearchIcon } from "../../icons/search"
import { LIGHT_BACKGROUND, DISABLED_TEXT } from "../../theme"

const rootCss = css({
  marginLeft: 16,
  marginRight: 16,
  height: 40,
  width: "auto",
  borderRadius: 20,
  background: LIGHT_BACKGROUND,
  padding: "0 16px",
  display: "flex",
  alignItems: "center",
})

const inputCss = css({
  fontSize: 14,
  border: "none",
  marginLeft: 8,
  width: "100%",
  outline: "none",
})

const iconCss = css({
  flexShrink: 0,
  color: DISABLED_TEXT,
})

export const GlossarySearch: FunctionalComponent<{ value?: string }> = ({
  value,
}) => {
  return (
    <div className={rootCss}>
      <SearchIcon className={iconCss} />
      <input className={inputCss} placeholder="Search cards" value={value} />
    </div>
  )
}
