import * as React from "react"
import { Route, match } from "react-router-dom"
import { TransitionGroup } from "react-transition-group"
import { ClassNames } from "@emotion/core"
import { History } from "history"

type Props = {
  exact?: boolean
  component?: any
  children?: (
    props: { match: match<any>; history: History<any> }
  ) => React.ReactNode
  path: string
  getRouteAnimation: (node: React.ReactNode, css: any) => React.ReactNode[]
}

export default class AnimatedRoute extends React.Component<Props> {
  render() {
    return (
      <Route
        exact={this.props.exact || false}
        path={this.props.path}
        children={({ match, location }) => (
          <ClassNames>
            {({ css }) => (
              <TransitionGroup component={null} appear={false}>
                {!!match &&
                  this.props.getRouteAnimation(
                    <Route
                      path={this.props.path}
                      children={this.props.children}
                      component={this.props.component}
                      location={location}
                    />,
                    css
                  )}
              </TransitionGroup>
            )}
          </ClassNames>
        )}
      />
    )
  }
}
