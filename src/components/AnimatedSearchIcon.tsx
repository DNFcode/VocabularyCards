import * as React from "react"
import styled, { css, keyframes } from "react-emotion"
import CSSTransition from "react-transition-group/CSSTransition"

import SearchIcon from "../icons/search.svg"
import CrossIcon from "../icons/cross.svg"

type Props = {
  className?: string
  searchActive: boolean
}

const rotateFadeIn = keyframes`
  0% {
    opacity: 0;
    transform: rotate(0deg);
  }

  100% {
    opacity: 1;
    transform: rotate(90deg);
  }
`

const rotateFadeOut = keyframes`
  0% {
    opacity: 1;
    transform: rotate(0deg);
  }

  100% {
    opacity: 0;
    transform: rotate(90deg);
  }
`

const forwardRotateFadeIn = css`
  animation: ${rotateFadeIn} 0.2s;
`

const forwardRotateFadeOut = css`
  animation: ${rotateFadeOut} 0.2s;
`

const backwardsRotateFadeIn = css`
  animation: ${rotateFadeOut} reverse 0.2s;
`

const backwardsRotateFadeOut = css`
  animation: ${rotateFadeIn} reverse 0.2s;
`

const Root = styled("div")`
  position: relative;
`

const iconClass = css`
  position: absolute;
  width: 100%;
  height: 100%;
`

export default class AnimatedSearchIcon extends React.Component<Props> {
  render() {
    const { searchActive, className } = this.props

    return (
      <div className={className}>
        <CSSTransition
          classNames={{
            enter: forwardRotateFadeIn,
            exit: backwardsRotateFadeOut,
          }}
          timeout={10000}
          mountOnEnter={true}
          unmountOnExit={true}
          in={searchActive}
          addEndListener={(node, done) => {
            node.addEventListener("animationend", done, false)
          }}
        >
          <CrossIcon className={iconClass} />
        </CSSTransition>
        <CSSTransition
          classNames={{
            enter: backwardsRotateFadeIn,
            exit: forwardRotateFadeOut,
          }}
          timeout={10000}
          unmountOnExit={true}
          in={!searchActive}
          addEndListener={(node, done) => {
            node.addEventListener("animationend", done, false)
          }}
        >
          <SearchIcon className={iconClass} />
        </CSSTransition>
      </div>
    )
  }
}
