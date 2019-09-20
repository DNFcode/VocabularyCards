import { h, FunctionalComponent } from "preact"
import { css, cx } from "emotion"
import {
  LIGHT_TEXT,
  SHADOW_COLOR_RGBA,
  SUCCESS_COLOR,
  DANGER_COLOR,
} from "../../theme"

const cardCss = css({
  padding: "12px 16px",
  marginBottom: 8,
  boxShadow: `0 1px 6px ${SHADOW_COLOR_RGBA(0.1)}`,
})

const cardHeaderBlockCss = css({
  marginBottom: 8,
  display: "flex",
  justifyContent: "space-between",
})

const cardTitleCss = css({
  fontSize: 18,
  fontWeight: "bold",
})

const cardStatusCss = css({
  width: 62,
  fontSize: 12,
  color: LIGHT_TEXT,
  padding: "4px 0",
  borderRadius: 5,
  textAlign: "center",
  verticalAlign: "middle",
})

const successBackground = css({
  backgroundColor: SUCCESS_COLOR,
})

const dangerBackground = css({
  backgroundColor: DANGER_COLOR,
})

const cardDescription = css({
  fontSize: 16,
})

export const GlossaryCard: FunctionalComponent<{
  title: string
  description: string
  learned: boolean
}> = ({ title, learned, description }) => {
  return (
    <div className={cardCss}>
      <div className={cardHeaderBlockCss}>
        <div className={cardTitleCss}>{title}</div>
        <div
          className={cx(
            cardStatusCss,
            learned ? successBackground : dangerBackground
          )}
        >
          {learned ? "Learned" : "Ongoing"}
        </div>
      </div>
      <div className={cardDescription}>{description}</div>
    </div>
  )
}
