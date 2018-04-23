import * as React from "react"
import styled, { keyframes } from "react-emotion"

const Root = styled("div")`
  height: 100%;
  width: 100%;
  position: fixed;
  background-color: lightgray;
`

class Page extends React.Component<{}, {}> {
  componentDidMount() {}

  render() {
    return <Root>To be implemeted</Root>
  }
}

export default Page
