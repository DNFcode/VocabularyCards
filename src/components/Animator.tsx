import React, { useState, useEffect, useRef, ReactNode } from "react"

/*
Element should be animated when it's mounted
Element should be given a chance to animate on dismount
Element should be just rendered if it's just mounted
*/

export type AnimatedComponentProps = {
  onTransitionEnd: () => void
  state: AnimationState
}

export type AnimationState = "in" | "rendered" | "out"

export function Animator(props: {
  shown: boolean
  render(props: AnimatedComponentProps): JSX.Element
}) {
  const firstRender = useRef(true)
  const [isRendered, setIsRendered] = useState(false)

  useEffect(() => {
    firstRender.current = false
    if (props.shown && !isRendered) {
      setIsRendered(true)
    }
  })

  function onTransitionEnd() {
    setIsRendered(props.shown)
  }

  if (!isRendered && !props.shown) {
    return null
  }

  return props.render({
    state: props.shown ? (firstRender.current ? "rendered" : "in") : "out",
    onTransitionEnd,
  })
}
