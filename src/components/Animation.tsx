import React, { SFC, Component, CSSProperties } from "react"
import styled from "react-emotion"
import { Children } from "react"

type animationVars = { [key: string]: number }

export type Props = {
  className?: string
  positiveStyles?: (props: animationVars) => React.CSSProperties
  positiveStart?: animationVars
  positiveEnd?: animationVars
  negativeStyles?: (props: animationVars) => React.CSSProperties
  negativeStart?: animationVars
  negativeEnd?: animationVars
}

class Animation extends Component<Props, any> {
  private node: HTMLDivElement | null = null

  getNode = (node: HTMLDivElement) => {
    this.node = node
  }

  animate = (animationProgress: number) => {
    const {
      positiveStyles,
      positiveStart,
      positiveEnd,
      negativeStyles,
      negativeStart,
      negativeEnd,
    } = this.props

    let progress = animationProgress || 0
    progress = progress > 1 ? 1 : progress
    progress = progress < -1 ? -1 : progress

    let style: React.CSSProperties = {}
    if (progress > 0 && positiveStart && positiveEnd && positiveStyles) {
      let currentVars: animationVars = {}
      Object.keys(positiveStart).forEach(
        key =>
          (currentVars[key] =
            positiveStart[key] +
            (positiveEnd[key] - positiveStart[key]) * progress)
      )

      style = positiveStyles(currentVars)
    } else if (progress < 0 && negativeStart && negativeEnd && negativeStyles) {
      let currentVars: animationVars = {}
      Object.keys(negativeStart).forEach(
        key =>
          (currentVars[key] =
            negativeStart[key] +
            (negativeEnd[key] - negativeStart[key]) * -progress)
      )

      style = negativeStyles(currentVars)
    }

    if (this.node) {
      this.node.removeAttribute("style")
    }

    Object.keys(style).forEach(key => {
      if (this.node) {
        this.node.style[key] = style[key]
      }
    })
  }

  render() {
    return (
      <div ref={this.getNode} className={this.props.className}>
        {this.props.children}
      </div>
    )
  }
}

export default Animation
