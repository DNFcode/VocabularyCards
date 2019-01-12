import * as React from "react"
import { keyframes, css } from "@emotion/core"
import styled from "@emotion/styled"
import { TimelineMax, TweenMax, Linear, Power3, Ease } from "gsap"

import Card from "./Card"
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

type CardData = {
  remembered: boolean
  title: string
  description: string
}

type Props = {
  prevCard?: CardData
  mainCard?: CardData
  nextCard?: CardData
  hiddenCard?: CardData
  onSwipeLeft?: () => any
  onSwipeRight?: () => any
}

export default class SwipeableCards extends React.Component<Props> {
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

  killAnimations() {
    this.dragLeft && this.dragLeft.kill()
    this.dragRight && this.dragRight.kill()
    this.slideLeft && this.slideLeft.kill()
    this.slideRight && this.slideRight.kill()
    this.slideDefault && this.slideDefault.kill()
    this.dragLeft = undefined
    this.dragRight = undefined
    this.slideLeft = undefined
    this.slideRight = undefined
    this.slideDefault = undefined
  }

  initAnimations() {
    this.killAnimations()
    if (
      this.props.mainCard &&
      this.cardsRefs.mainCard &&
      this.cardsRefs.mainCard.current
    ) {
      this.dragLeft = this.createAnimation(animations.left, Linear.easeNone)
      this.slideLeft = this.createAnimation(animations.left, Power3.easeOut)
      this.props.onSwipeLeft &&
        this.slideLeft.addCallback(this.props.onSwipeLeft, "+=0")
    }
    if (
      this.props.prevCard &&
      this.cardsRefs.prevCard &&
      this.cardsRefs.prevCard.current
    ) {
      this.dragRight = this.createAnimation(animations.right, Linear.easeNone)
      this.slideRight = this.createAnimation(animations.right, Power3.easeOut)
      this.props.onSwipeRight &&
        this.slideRight.addCallback(this.props.onSwipeRight, "+=0")
    }
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
    if (direction === Direction.LEFT) {
      this.dragLeft && this.dragLeft.progress(progress)
      this.dragRight && this.dragRight.progress(0)
    } else {
      this.dragRight && this.dragRight.progress(progress)
      this.dragLeft && this.dragLeft.progress(0)
    }
  }

  handleTouchEnd(direction: Direction, progress: number) {
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

  componentWillUnmount() {
    this.killAnimations()
  }

  render() {
    const { prevCard, mainCard, nextCard, hiddenCard } = this.props

    return (
      <SwipeableContainer
        onTouchStart={this.handleTouchStart}
        onTouchMove={this.handleTouchMove}
        onTouchEnd={this.handleTouchEnd}
        onSwipe={this.handleSwipe}
      >
        {!!prevCard && (
          <PrevCard
            key={`prev-${prevCard.title}`}
            cardRef={this.cardsRefs.prevCard}
            title={prevCard.title}
            description={prevCard.description}
          />
        )}
        {!!mainCard && (
          <MainCard
            key={`prev-${mainCard.title}`}
            cardRef={this.cardsRefs.mainCard}
            title={mainCard.title}
            description={mainCard.description}
          />
        )}
        {!!nextCard && (
          <NextCard
            key={`prev-${nextCard.title}`}
            cardRef={this.cardsRefs.nextCard}
            title={nextCard.title}
            description={nextCard.description}
          />
        )}
        {!!hiddenCard && (
          <HiddenCard
            key={`prev-${hiddenCard.title}`}
            cardRef={this.cardsRefs.hiddenCard}
            title={hiddenCard.title}
            description={hiddenCard.description}
          />
        )}
      </SwipeableContainer>
    )
  }
}
