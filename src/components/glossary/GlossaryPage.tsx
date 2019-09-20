import { h } from "preact"
import { css } from "emotion"
import {
  PRIMARY_COLOR,
  LIGHT_BACKGROUND,
  LIGHT_TEXT,
  LIGHTER_TEXT,
} from "../../theme"
import { GlossaryHeader } from "./GlossaryHeader"
import { SAMPLE_CARDS } from "./sampleCards"
import { GlossaryCard } from "./GlossaryCard"

const rootCss = css({
  height: "100%",
  overflowY: "auto",
})

const cardsContainerCss = css({
  height: "100%",
  backgroundColor: LIGHT_BACKGROUND,
})

const titleCss = css({
  fontSize: 16,
  fontWeight: "bold",
  paddingLeft: 16,
  color: LIGHTER_TEXT,
  marginBottom: 20,
})

export const GlossaryPage = () => {
  return (
    <div className={rootCss}>
      <GlossaryHeader />
      <div className={cardsContainerCss}>
        <div className={titleCss}>Recent cards</div>
        {SAMPLE_CARDS.map(card => (
          <GlossaryCard
            title={card.title}
            description={card.description}
            learned={card.learned}
          />
        ))}
      </div>
    </div>
  )
}
