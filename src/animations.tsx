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
  animation: `${opacityAnimation} reverse 0ms ease-in`,
})

const fadeIn = css({
  animation: `${opacityAnimation} 0.27s 50ms backwards ease-out`,
})

const fadeOut = css({
  animation: `${opacityAnimation} reverse 0.27s 50ms ease-in`,
})

// const slideFromRight = css`
//   animation: ${rightSlide} 0.3s 50ms backwards ease-out;
// `

// const slideToRight = css`
//   animation: ${rightSlide} reverse 0.3s 50ms ease-in;
// `

const Shadow = styled("div")`
  background: gray;
  opacity: 0;
  will-change: opacity;
`

export const getCardPageAnimation = (page: any, css: any) => [
  <CSSTransition
    classNames={{
      enterActive: css(fadeIn),
      exitActive: css(fadeOut),
    }}
    timeout={400}
    addEndListener={(node, done) => {
      node.addEventListener("animationend", done, false)
    }}
  >
    <Shadow />
  </CSSTransition>,
  <CSSTransition
    classNames={{
      enterActive: css(fadeIn),
      exitActive: css(fadeOut),
    }}
    timeout={400}
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
