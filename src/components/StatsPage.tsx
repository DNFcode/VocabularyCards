import * as React from "react"

const availHeight = window.screen.availHeight
const height = window.innerHeight

const Page: React.SFC = () => (
  <div>
    <input type="text" />
    <div>AvailHeight {availHeight}</div>
    <div>Height {height}</div>
  </div>
)

export default Page
