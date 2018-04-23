import * as React from "react"
import styled from "react-emotion"

import SwipeableCards from "./SwipeableCards"

const Root = styled("div")`
  height: 100%;
  width: 100%;
`

const Page: React.SFC = () => (
  <Root>
    <SwipeableCards />
  </Root>
)

export default Page
