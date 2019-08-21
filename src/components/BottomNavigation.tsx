import { h, FunctionalComponent } from "preact"
import { css } from "emotion"
import {
  SUCCESS_COLOR,
  SUCCESS_COLOR_RGBA,
  ACTIVE_SUCCESS_COLOR,
} from "../theme"
import { CardsIcon } from "../icons/cards"
import { BookIcon } from "../icons/book"
import { PlusIcon } from "../icons/plus"
import { BottomPanel } from "../icons/bottomPanel"
import { NavButton } from "./NavButton"

const rootCss = css({
  height: "100%",
  width: "100%",
  position: "relative",
})

const bottomPanelCss = css({
  position: "absolute",
  bottom: 0,
})

const buttonBlockCss = css({
  height: "100%",
  width: "100%",
  display: "grid",
  gridTemplateColumns: "1fr 90px 1fr",
  position: "absolute",
})

const createButtonCss = css({
  width: 56,
  height: 56,
  backgroundColor: SUCCESS_COLOR,
  boxShadow: `0 4px 6px ${SUCCESS_COLOR_RGBA(0.4)}`,
  borderRadius: "100%",
  border: 0,
  padding: 0,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  position: "absolute",
  left: "50%",
  transform: "translate(-50%, -50%)",
  outline: 0,
  transition: "box-shadow 200ms ease, background-color 200ms ease",

  ":active": {
    boxShadow: `0 4px 10px ${SUCCESS_COLOR_RGBA(0.6)}`,
    backgroundColor: ACTIVE_SUCCESS_COLOR,
  },
})

export const BottomNavigation = () => {
  return (
    <div className={rootCss}>
      <BottomPanel className={bottomPanelCss} />
      <div className={buttonBlockCss}>
        <button className={createButtonCss}>
          <PlusIcon color="white" />
        </button>
        <NavButton label="Study" disabled={true} Icon={CardsIcon} />
        <div />
        <NavButton label="Glossary" disabled={false} Icon={BookIcon} />
      </div>
    </div>
  )
}
