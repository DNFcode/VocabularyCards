import * as React from "react"
import styled, { css } from "react-emotion"

import theme from "../theme"
import BackLink from "./BackLink"
import AnimatedSeachIcon from "./AnimatedSearchIcon"
import ArrowLeftIcon from "../icons/arrow-left.svg"
import CheckIcon from "../icons/check.svg"

type Props = {
  className?: string
  color?: string
  title: string
}

const Root = styled("div")`
  width: 100%;
  height: 56px;
  display: flex;
  background-color: ${({ color }) => color || theme.primaryColor};
  color: white;
  align-items: center;
  box-shadow: 0 -2px 10px 2px #06060661;
  position: relative;
`

const BackArrowLink = styled(BackLink)`
  width: 20px;
  height: 20px;
  padding: 0 20px;
`

const ArrowLeft = styled(ArrowLeftIcon)`
  height: 100%;
  width: 100%;
`

const Title = styled("div")`
  font-size: 20px;
`

const RightActionsContainer = styled("span")`
  padding-right: 20px;
  margin-left: auto;
`

export default class TopNavigation extends React.Component<Props> {
  render() {
    return (
      <Root className={this.props.className} color={this.props.color}>
        <BackArrowLink>
          <ArrowLeft />
        </BackArrowLink>
        <Title>{this.props.title}</Title>
        <RightActionsContainer>{this.props.children}</RightActionsContainer>
      </Root>
    )
  }
}
