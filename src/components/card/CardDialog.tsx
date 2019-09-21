import { h, FunctionalComponent } from "preact"
import { css } from "emotion"
import { AdjustableTextarea } from "../common/AdjustableTextarea"
import {
  PRIMARY_COLOR,
  LIGHT_TEXT,
  DISABLED_TEXT,
  SUCCESS_COLOR,
  LIGHT_BACKGROUND,
  SUCCESS_COLOR_RGBA,
  SUCCESS_COLOR_ACTIVE,
} from "../../theme"
import { useState, useRef } from "preact/hooks"

const rootCss = css({
  height: "100%",
  overflow: "hidden",
  display: "flex",
  flexDirection: "column",
})

const headerCss = css({
  height: 56,
  lineHeight: "56px",
  background: PRIMARY_COLOR,
  color: LIGHT_TEXT,
  fontSize: 24,
  fontWeight: "bold",
  textAlign: "center",
  verticalAlign: "middle",
})

const titleContainerCss = css({
  padding: 20,
  borderBottom: `1px solid ${DISABLED_TEXT}`,
})

const descriptionContainerCss = css({
  padding: 20,
  flexGrow: 1,
})

const textareaCss = css({
  fontSize: 18,
  fontWeight: "bold",
  display: "block",
  width: "100%",
  padding: 0,
  border: 0,
  lineHeight: "24px",
})

const buttonsContainer = css({
  display: "grid",
  gridTemplateColumns: "50% 50%",
  position: "fixed",
  bottom: 0,
  width: "100%",
})

const buttonCss = css({
  fontSize: 18,
  fontWeight: "bold",
  border: 0,
  height: 56,
  outline: "none",
  userSelect: "none",
})

const cancelButtonCss = css(buttonCss, {
  background: LIGHT_BACKGROUND,
  transition: "color 200ms ease",

  ":active": {
    color: PRIMARY_COLOR,
  },
})

const saveButtonCss = css(buttonCss, {
  color: LIGHT_TEXT,
  background: SUCCESS_COLOR,
  borderTopLeftRadius: 20,
  transition: "background 200ms ease",

  ":active": {
    backgroundColor: SUCCESS_COLOR_ACTIVE,
  },
})

export const CardDialog = () => {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const titleRef = useRef<HTMLTextAreaElement>()
  const descriptionRef = useRef<HTMLTextAreaElement>()

  return (
    <div className={rootCss}>
      <header className={headerCss}>Create new card</header>
      <div
        className={titleContainerCss}
        onClick={() => {
          if (titleRef.current) {
            titleRef.current.focus()
          }
        }}
      >
        <AdjustableTextarea
          innerRef={titleRef}
          value={title}
          onInput={event => setTitle((event.target as any).value)}
          className={textareaCss}
          placeholder="New word or phrase"
        />
      </div>
      <div
        className={descriptionContainerCss}
        onClick={() => {
          if (descriptionRef.current) {
            descriptionRef.current.focus()
          }
        }}
      >
        <AdjustableTextarea
          innerRef={descriptionRef}
          value={description}
          onInput={event => setDescription((event.target as any).value)}
          className={textareaCss}
          placeholder="Description"
        />
      </div>
      <div className={buttonsContainer}>
        <button className={cancelButtonCss}>Cancel</button>
        <button className={saveButtonCss}>Save</button>
      </div>
    </div>
  )
}
