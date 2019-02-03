import * as React from "react"
import { keyframes, css, ClassNames } from "@emotion/core"
import styled from "@emotion/styled"
import { CSSTransition } from "react-transition-group"

const rightSlide = keyframes`
  0% {
    transform: translateY(-110%);
  }

  100% {
    transform: translateY(0%);
  }
`

const opacityAnimation = keyframes`
  0% {
    opacity: 0;
    transform: scale(0.95)
  }

  100% {
    opacity: 1;
    transform: scale(1)
  }
`

const popupScale = keyframes`
0% {
  opacity: 0;
  transform: scale(0.5) translateY(30%)
}

100% {
  opacity: 1;
  transform: scale(1) translateY(0%)
}
`

const shadowOpacity = keyframes`
0% {
  opacity: 0;
}

100% {
  opacity: 1;
}`

const transparent = css({
  opacity: 0,
})

const backed = css`
  z-index: -1;
`

const topFadeIn = css({
  animation: `${opacityAnimation} 150ms ease-out`,
})

const topFadeOut = css({
  display: "none !important",
})

const popupIn = css({
  animation: `${popupScale} 0.2s 50ms backwards ease-out`,
})

const popupOut = css({
  animation: `${popupScale} reverse 0.2s 50ms ease-in`,
})

const shadowIn = css({
  animation: `${shadowOpacity} 0.2s 50ms backwards ease-out`,
})

const shadowOut = css({
  animation: `${shadowOpacity} reverse 0.2s 50ms ease-in`,
})

// const slideFromRight = css`
//   animation: ${rightSlide} 0.3s 50ms backwards ease-out;
// `

// const slideToRight = css`
//   animation: ${rightSlide} reverse 0.3s 50ms ease-in;
// `

const Shadow = styled("div")`
  background: rgba(0, 0, 0, 0.25);
  opacity: 0;
  will-change: opacity;
  position: absolute;
  height: 100%;
  width: 100%;
  z-index: 100;
`

export const getCardPageAnimation = (page: any, css: any) => [
  <CSSTransition
    classNames={{
      enterActive: css(shadowIn),
      exitActive: css(shadowOut),
    }}
    timeout={10000}
    addEndListener={(node, done) => {
      node.addEventListener("animationend", done, false)
    }}
  >
    <Shadow />
  </CSSTransition>,
  <CSSTransition
    classNames={{
      enterActive: css(popupIn),
      exitActive: css(popupOut),
    }}
    timeout={10000}
    addEndListener={(node, done) => {
      node.addEventListener("animationend", done, false)
    }}
  >
    {page}
  </CSSTransition>,
]

export const getTopPageAnimation = (page: any, css: any) => [
  <CSSTransition
    classNames={{
      enter: css(transparent),
      enterActive: css(topFadeIn),
      exit: css(topFadeOut),
      exitActive: css(topFadeOut),
    }}
    timeout={10000}
    addEndListener={(node, done) => {
      node.addEventListener("animationend", done, false)
    }}
  >
    {page}
  </CSSTransition>,
  ,
]
