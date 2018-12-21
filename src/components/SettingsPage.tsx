import * as React from "react"
import styled, { keyframes } from "react-emotion"

const Root = styled("div")`
  height: 100%;
  width: 100%;
  position: fixed;
  background-color: lightgray;
`

class Page extends React.Component<{}, { size: number }> {
  state = {
    size: window.innerHeight,
  }

  componentDidMount() {
    window.addEventListener("resize", () => {
      this.setState({
        size: window.innerHeight,
      })
    })
  }

  render() {
    return (
      <Root>
        <input type="text" />
        {this.state.size}
      </Root>
    )
  }
}

export default Page
