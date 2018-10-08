import * as React from "react"
import styled, { css } from "react-emotion"

import AnimatedSeachIcon from "./AnimatedSearchIcon"
import SearchIcon from "../icons/search.svg"
import CrossIcon from "../icons/cross.svg"

type Props = {
  className?: string
}

type State = {
  search: string
}

const Root = styled("div")`
  width: 100%;
  height: 56px;
  display: flex;
  align-items: center;
`

const SearchInput = styled("input")`
  height: 100%;
  display: block;
  flex-grow: 1;
  border: none;
  margin: 0;
  padding: 2px;
  box-sizing: border-box;
  font-size: 100%;
  outline: none;
`

const iconClass = css`
  position: relative;
  width: 20px;
  height: 20px;
  margin: 10px 15px;
`

export default class Search extends React.Component<Props, State> {
  state = {
    search: "",
  }

  constructor(props: Props) {
    super(props)
    this.handleSearchChange = this.handleSearchChange.bind(this)
  }

  handleSearchChange(event: any) {
    this.setState({
      search: event.currentTarget.value,
    })
  }

  render() {
    const { search } = this.state

    return (
      <Root className={this.props.className}>
        <AnimatedSeachIcon searchActive={!!search} className={iconClass} />
        <SearchInput
          type="text"
          placeholder="Search for cards"
          value={this.state.search}
          onChange={this.handleSearchChange}
        />
      </Root>
    )
  }
}
