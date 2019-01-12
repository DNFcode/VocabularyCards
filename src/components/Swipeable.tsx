import * as React from "react"
import { keyframes, css } from "@emotion/core"
import styled from "@emotion/styled"

import BackLink from "./BackLink"
import ArrowLeftIcon from "../icons/arrow-left.svg"
import CheckIcon from "../icons/check.svg"

export enum Direction {
  LEFT,
  RIGHT,
  NONE,
}

type Props = {
  className?: string
  onTouchStart?: () => any
  onTouchMove?: (direction: Direction, progress: number) => any
  onTouchEnd?: (direction: Direction, progress: number) => any
  onSwipe?: (direction: Direction) => any
}

const Root = styled("div")`
  width: 100%;
  height: 100%;
`

export default class Swipeable extends React.Component<Props> {
  rootRef: React.RefObject<HTMLDivElement>
  touchPoints: Array<number> = []

  constructor(props: Props) {
    super(props)

    this.rootRef = React.createRef()

    this.getProgress = this.getProgress.bind(this)
    this.touchStart = this.touchStart.bind(this)
    this.touchMove = this.touchMove.bind(this)
    this.touchEnd = this.touchEnd.bind(this)
  }

  getProgress(): [Direction, number] {
    const progress =
      (this.touchPoints.slice(-1)[0] - this.touchPoints[0]) / window.innerWidth

    switch (Math.sign(progress)) {
      case 1:
        return [Direction.RIGHT, progress]

      case -1:
        return [Direction.LEFT, -progress]

      default:
        return [Direction.NONE, 0]
    }
  }

  // it should be TouchEvent... not any
  touchStart(event: any) {
    this.touchPoints = [event.touches[0].pageX]
    this.props.onTouchStart && this.props.onTouchStart()
  }

  touchMove(event: any) {
    this.touchPoints.push(event.touches[0].pageX)
    const progress = this.getProgress()
    // I'd use spread operator here.. but typescript doesn't like it
    this.props.onTouchMove && this.props.onTouchMove(progress[0], progress[1])
  }

  touchEnd(event: any) {
    const lastSwipe =
      (this.touchPoints.slice(-1)[0] - this.touchPoints.slice(-2)[0]) /
      window.innerWidth

    if (Math.abs(lastSwipe) > 0.01) {
      this.props.onSwipe &&
        this.props.onSwipe(lastSwipe > 0 ? Direction.RIGHT : Direction.LEFT)
    } else {
      const progress = this.getProgress()
      this.props.onTouchEnd && this.props.onTouchEnd(progress[0], progress[1])
    }
  }

  componentDidMount() {
    const root = this.rootRef.current

    if (root) {
      root.addEventListener("touchstart", this.touchStart)
      root.addEventListener("touchmove", this.touchMove)
      root.addEventListener("touchend", this.touchEnd)
      root.addEventListener("touchcancel", this.touchEnd)
    }
  }

  componentWillUnmount() {
    const root = this.rootRef.current

    if (root) {
      root.removeEventListener("touchstart", this.touchStart)
      root.removeEventListener("touchmove", this.touchMove)
      root.removeEventListener("touchend", this.touchEnd)
      root.removeEventListener("touchcancel", this.touchEnd)
    }
  }

  render() {
    return (
      <Root className={this.props.className} ref={this.rootRef}>
        {this.props.children}
      </Root>
    )
  }
}
