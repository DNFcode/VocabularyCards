import * as React from "react"
import { withRouter, RouteComponentProps } from "react-router"

type Props = {
  className?: string
} & RouteComponentProps<any>

class BackLink extends React.Component<Props> {
  handleClick = () => {
    this.props.history.push("/glossary")
  }

  render() {
    return (
      <a className={this.props.className} onClick={this.handleClick}>
        {this.props.children}
      </a>
    )
  }
}

export default withRouter(BackLink)
