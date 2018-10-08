import * as React from "react"
import { Route } from "react-router-dom"
import { TransitionGroup } from "react-transition-group"

type Props = {
  exact?: boolean
  component: any
  path: string
  getRouteAnimation: (node: React.ReactNode) => React.ReactNode[]
}

export default class AnimatedRoute extends React.Component<Props> {
  render() {
    return (
      <Route
        exact={this.props.exact || false}
        path={this.props.path}
        children={({ match, location }) => (
          <TransitionGroup component={null} appear={false}>
            {!!match &&
              this.props.getRouteAnimation(
                <Route
                  path={this.props.path}
                  component={this.props.component}
                  location={location}
                />
              )}
          </TransitionGroup>
        )}
      />
    )
  }
}
