import * as React from "react"
import styled, { css } from "react-emotion"
import { TimelineMax, TweenMax, Linear, Power3, Ease } from "gsap"

import Card, { Props as CardProps } from "./Card"
import Swipeable, { Direction } from "./Swipeable"
import { $Values } from "utility-types"

const SwipeableContainer = styled(Swipeable)`
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`

const StyledCard = styled(Card)`
  height: 85%;
  width: 80%;
  position: absolute;
  will-change: transform, opacity;
`

const PrevCard = styled(StyledCard)`
  z-index: 4;
  transform: translate(-125%, 0);
`

const MainCard = styled(StyledCard)`
  z-index: 3;
`

const NextCard = styled(StyledCard)`
  z-index: 2;
  transform: translate(20px) scale(0.95);
`

const HiddenCard = styled(StyledCard)`
  z-index: 1;
  transform: translate(38px) scale(0.9);
  opacity: 0;
`

const animationDuration = 0.3
const animateCardTo = (vars: object) => (target: HTMLElement, ease: Ease) =>
  TweenMax.to(target, animationDuration, { ...vars, ease })

const animations = {
  right: {
    prevCard: animateCardTo({ x: 0 }),
    mainCard: animateCardTo({ x: 20, scale: 0.95 }),
    nextCard: animateCardTo({ x: 38, scale: 0.9, opacity: 0 }),
    hiddenCard: animateCardTo({ x: 38, scale: 0.9, opacity: 0 }),
  },
  left: {
    prevCard: animateCardTo({ xPercent: -125 }),
    mainCard: animateCardTo({ xPercent: -125 }),
    nextCard: animateCardTo({ x: 0, scale: 1 }),
    hiddenCard: animateCardTo({ x: 20, scale: 0.95, opacity: 1 }),
  },
  default: {
    prevCard: animateCardTo({ xPercent: -125 }),
    mainCard: animateCardTo({ x: 0, scale: 1, xPercent: 0 }),
    nextCard: animateCardTo({ x: 20, scale: 0.95, opacity: 1 }),
    hiddenCard: animateCardTo({ x: 38, scale: 0.9, opacity: 0 }),
  },
}

export default class SwipeableCards extends React.Component {
  cardsRefs: {
    prevCard?: React.RefObject<HTMLDivElement>
    mainCard?: React.RefObject<HTMLDivElement>
    nextCard?: React.RefObject<HTMLDivElement>
    hiddenCard?: React.RefObject<HTMLDivElement>
  } = {}

  dragLeft: TimelineMax | undefined
  dragRight: TimelineMax | undefined
  slideLeft: TimelineMax | undefined
  slideRight: TimelineMax | undefined
  slideDefault: TimelineMax | undefined

  constructor(props: any) {
    super(props)

    this.cardsRefs.prevCard = React.createRef()
    this.cardsRefs.mainCard = React.createRef()
    this.cardsRefs.nextCard = React.createRef()
    this.cardsRefs.hiddenCard = React.createRef()

    this.createAnimation = this.createAnimation.bind(this)
    this.initAnimations = this.initAnimations.bind(this)
    this.handleTouchStart = this.handleTouchStart.bind(this)
    this.handleTouchMove = this.handleTouchMove.bind(this)
    this.handleTouchEnd = this.handleTouchEnd.bind(this)
    this.handleSwipe = this.handleSwipe.bind(this)
  }

  createAnimation(cardsAnimations: $Values<typeof animations>, ease: Ease) {
    const timeline = new TimelineMax()
    Object.keys(cardsAnimations).forEach(card => {
      const cardRef = this.cardsRefs[card].current
      if (cardRef) {
        const tween = cardsAnimations[card](cardRef, ease)
        timeline.add(tween, 0)
      }
    })

    timeline.pause()
    return timeline
  }

  initAnimations() {
    this.dragLeft = this.createAnimation(animations.left, Linear.easeNone)
    this.dragRight = this.createAnimation(animations.right, Linear.easeNone)
    this.slideLeft = this.createAnimation(animations.left, Power3.easeOut)
    this.slideRight = this.createAnimation(animations.right, Power3.easeOut)
    this.slideDefault = this.createAnimation(animations.default, Power3.easeOut)
  }

  handleTouchStart() {
    this.slideLeft && this.slideLeft.progress(0).pause()
    this.slideRight && this.slideRight.progress(0).pause()
    this.slideDefault && this.slideDefault.progress(0).pause()
    this.dragLeft && this.dragLeft.progress(0).pause()
    this.dragRight && this.dragRight.progress(0).pause()
  }

  handleTouchMove(direction: Direction, progress: number) {
    console.log("move", progress)
    if (direction === Direction.LEFT) {
      this.dragLeft && this.dragLeft.progress(progress)
      this.dragRight && this.dragRight.progress(0)
    } else {
      this.dragRight && this.dragRight.progress(progress)
      this.dragLeft && this.dragLeft.progress(0)
    }
  }

  handleTouchEnd(direction: Direction, progress: number) {
    console.log("end", progress)
    if (progress > 0.5) {
      if (direction === Direction.LEFT) {
        this.slideLeft && this.slideLeft.invalidate().resume()
      } else {
        this.slideRight && this.slideRight.invalidate().resume()
      }
    } else {
      this.slideDefault && this.slideDefault.invalidate().resume()
    }
  }

  handleSwipe(direction: Direction) {
    console.log("swipe")
    if (direction === Direction.LEFT) {
      this.slideLeft && this.slideLeft.invalidate().resume()
    } else {
      this.slideRight && this.slideRight.invalidate().resume()
    }
  }

  componentDidMount() {
    this.initAnimations()
  }

  componentDidUpdate() {
    this.initAnimations()
  }

  render() {
    return (
      <SwipeableContainer
        onTouchStart={this.handleTouchStart}
        onTouchMove={this.handleTouchMove}
        onTouchEnd={this.handleTouchEnd}
        onSwipe={this.handleSwipe}
      >
        <PrevCard cardRef={this.cardsRefs.prevCard} header="Previous card!" />
        <MainCard
          cardRef={this.cardsRefs.mainCard}
          header="Vocabulary cards!"
        />
        <NextCard cardRef={this.cardsRefs.nextCard} header="Next card!" />
        <HiddenCard cardRef={this.cardsRefs.hiddenCard} header="Hidden card!" />
      </SwipeableContainer>
    )
  }
}
