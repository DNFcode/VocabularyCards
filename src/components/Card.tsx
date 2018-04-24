import React, { SFC, Component, CSSProperties } from "react"
import styled from "react-emotion"
import { Children } from "react"

const Root = styled("div")`
  height: 100%;
  width: 100%;
  border: solid 1px lightgray;
  border-radius: 10px;
  box-shadow: 2px 2px 10px #b7b7b7;
  overflow: hidden;
`

const CardHeader = styled("div")`
  width: 100%;
  height: 33%;
  font-size: 22px;
  background: #eeeeee;
  display: flex;
  justify-content: center;
  align-items: center;
  text-transform: capitalize;
`

const CardHeaderText = styled("div")`
  color: #656565;
  font-weight: bold;
  font-size: 40px;
  text-align: center;
  font-family: sans-serif;
`

const CardContent = styled("div")`
  background: white;
  height: 100%;
  padding: 20px;
  text-align: center;
  font-size: 20px;
  text-transform: capitalize;
`

const ForgotButton = styled("button")`
  background: #f38181;
  border: 1px solid #f38181;
  border-radius: 10px;
  padding: 10px 0;
  width: 100px;
  color: white;
  font-size: 14px;
`

const RememberButton = styled("button")`
  background: #9bcdc5;
  border: 1px solid #9bcdc5;
  border-radius: 10px;
  padding: 10px 0;
  width: 100px;
  color: white;
  font-size: 14px;
`

// use forwardRef??
export type Props = {
  className?: string
  title?: string
  description?: string
  cardRef?: any
}

class Card extends Component<Props> {
  render() {
    return (
      <Root innerRef={this.props.cardRef} className={this.props.className}>
        <CardHeader>
          <CardHeaderText>{this.props.title}</CardHeaderText>
        </CardHeader>
        <CardContent>
          {this.props.description}
          {/* <ForgotButton>Forgot</ForgotButton>
          <RememberButton>Remember</RememberButton> */}
        </CardContent>
      </Root>
    )
  }
}

export default Card
