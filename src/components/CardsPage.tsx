import * as React from "react"
import styled from "react-emotion";

import Cards from './Cards'

const Root = styled('div')`
  height: 100%;
  width: 100%;
  position: fixed;
`

const Page: React.SFC = () => <Root><Cards/></Root>

export default Page
