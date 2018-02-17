import * as React from "react"
import styled, { css } from "react-emotion"

import Card, { Props as CardProps } from "./Card"
import Animation from "./Animation"

interface State {
  moved: number
}

type Props = {
  moved: number
} & CardProps

const Root = styled("div")`
  height: 100%;
  width: 100%;
  background: white;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`

const cardsClass = css`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  box-sizing: border-box;
`

const prevCardClass = css`
  height: 85%;
  width: 80%;
  position: absolute;
  z-index: 4;
  transform: translate(-125%);
`

const mainCardClass = css`
  height: 85%;
  width: 80%;
  position: absolute;
  z-index: 3;
`

const nextCardClass = css`
  height: 85%;
  width: 80%;
  position: absolute;
  z-index: 2;
  transform: translate(20px) scale(0.95);
`

const hiddenCardClass = css`
  height: 85%;
  width: 80%;
  position: absolute;
  z-index: 1;
  transform: translate(38px) scale(0.9);
  opacity: 0;
`

class Cards extends React.Component<{}, State> {
  cardsContainer: any
  animatedNodes: Array<Animation | null> = []

  state = {
    moved: 0,
  }

  animationDuration = 500
  easeFunction = (x: number) => x * (2 - x)
  reverseEaseFunction = (y: number) => 1 - Math.sqrt(1 - y)

  animate = (progress: number) => {
    this.animatedNodes.forEach(node => {
      if (node) {
        node.animate(-progress)
      }
    })
  }

  playAnimation = (start: number, direction: 1 | -1, to: number = 1) => {
    const startTime = performance.now()

    const step = (time: number) => {
      const progress = (time - startTime) / this.animationDuration
      const animationProgress =
        direction * this.easeFunction(Math.min(progress + start, 1))
      this.animate(animationProgress)
      console.log(progress, start, animationProgress)

      if (progress + start < to) {
        window.requestAnimationFrame(step)
      }
    }

    window.requestAnimationFrame(step)
  }

  addAnimatedNode = (node: Animation | null) => {
    this.animatedNodes.push(node)
  }

  componentWillMount() {
    this.animatedNodes = []
  }

  componentWillUpdate() {
    this.animatedNodes = []
  }

  componentDidMount() {
    let startX: number
    const windowWidth = window.innerWidth

    this.cardsContainer.addEventListener("touchstart", (event: any) => {
      startX = event.touches[0].pageX
    })

    let xs: number[] = [0]
    let animationFrameAvailable: boolean = true
    let lastMoved: number

    this.cardsContainer.addEventListener("touchmove", (event: any) => {
      const x = event.touches[0].pageX
      xs.push(x)
      lastMoved = (startX - x) / windowWidth
      if (animationFrameAvailable) {
        animationFrameAvailable = false

        window.requestAnimationFrame(() => {
          this.animate(lastMoved)
          animationFrameAvailable = true
        })
      }
    })

    this.cardsContainer.addEventListener("touchend", (event: any) => {
      const x = event.changedTouches[0].pageX
      const lastSwipe = (xs[xs.length - 2] - x) / windowWidth
      const moved = (startX - x) / windowWidth
      xs = [0]

      if (Math.abs(lastSwipe) > 0.01) {
        const progress = this.reverseEaseFunction(Math.abs(moved))
        const direction = lastSwipe > 0 ? 1 : -1
        this.playAnimation(progress, direction)
      } else if (Math.abs(moved) > 0.5) {
        const progress = this.reverseEaseFunction(Math.abs(moved))
        const direction = moved > 0 ? 1 : -1
        this.playAnimation(progress, direction)
      } else {
        const progress = this.reverseEaseFunction(Math.abs(moved))
        const direction = moved < 0 ? 1 : -1
        this.playAnimation(-progress, direction, 0)
      }
    })
  }

  render() {
    return (
      <Root>
        <div
          className={cardsClass}
          ref={(cards: any) => {
            this.cardsContainer = cards
          }}
        >
          <Animation
            ref={this.addAnimatedNode}
            className={prevCardClass}
            positiveStyles={({ x }) => ({ transform: `translate(${x}%)` })}
            positiveStart={{ x: -125 }}
            positiveEnd={{ x: 0 }}
          >
            <Card header="Previous card!" />
          </Animation>
          <Animation
            ref={this.addAnimatedNode}
            className={mainCardClass}
            positiveStyles={({ x, y }) => ({
              transform: `translate(${x}px) scale(${y})`,
            })}
            positiveStart={{ x: 0, y: 1 }}
            positiveEnd={{ x: 20, y: 0.95 }}
            negativeStyles={({ x }) => ({ transform: `translate(${x}%)` })}
            negativeStart={{ x: 0 }}
            negativeEnd={{ x: -125 }}
          >
            <Card header="Vocabulary cards!" />
          </Animation>
          <Animation
            ref={this.addAnimatedNode}
            className={nextCardClass}
            positiveStyles={({ x, y, z }) => ({
              transform: `translate(${x}px) scale(${y})`,
              opacity: z,
            })}
            positiveStart={{ x: 20, y: 0.95, z: 1 }}
            positiveEnd={{ x: 38, y: 0.9, z: 0 }}
            negativeStyles={({ x, y }) => ({
              transform: `translate(${x}px) scale(${y})`,
            })}
            negativeStart={{ x: 20, y: 0.95 }}
            negativeEnd={{ x: 0, y: 1 }}
          >
            <Card header="Next card!" />
          </Animation>
          <Animation
            ref={this.addAnimatedNode}
            className={hiddenCardClass}
            negativeStyles={({ x, y, z }) => ({
              transform: `translate(${x}px) scale(${y})`,
              opacity: z,
            })}
            negativeStart={{ x: 38, y: 0.9, z: 0 }}
            negativeEnd={{ x: 20, y: 0.95, z: 1 }}
          >
            <Card header="Hidden card!" />
          </Animation>
        </div>
      </Root>
    )
  }
}

export default Cards
