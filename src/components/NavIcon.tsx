import * as React from "react"
import { keyframes, css, ClassNames } from "@emotion/core"
import styled from "@emotion/styled"
import { NavLink } from "react-router-dom"

type NavIconProps = {
  to: string
  title: string
  Icon: React.SFC<{ className?: string }>
}

const ripple = keyframes`
  0% {
    opacity: 0.3;
    transform: scale(0,0);
  }

  20% {
    opacity: 0.25;
    transform: scale(1,1);
  }

  100% {
    opacity: 0;
    transform: scale(3,3);
  }
`

const rippleEffect = css`
  position: relative;

  &:after {
    content: "";
    display: block;
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    pointer-events: none;
    opacity: 0;
    background-image: radial-gradient(circle, #2fa0b8 30%, transparent 32%);
    background-repeat: no-repeat;
    background-position: 50%;
    animation: ${ripple} 0.35s 20ms ease-out;
  }
`

const iconClass = css`
  display: block;
  height: 25px;
  margin: 2px 0;
`

// width animations are too slow.. FLIP animation perfaps?? Or houdini ;)?
const linkClass = css`
  transition: color 0.15s 20ms linear;
  display: flex;
  flex-direction: column;
  text-decoration: none;
  color: #848484;
  justify-content: center;
  -webkit-tap-highlight-color: transparent;

  div {
    text-align: center;
    font-size: 12px;
    font-weight: bold;
    will-change: font-size;
  }
`

const activeLinkClass = css`
  ${rippleEffect};
  color: #2fa0b8 !important;
`

const NavIcon: React.SFC<NavIconProps> = ({ to, title, Icon }) => (
  <ClassNames>
    {({ css }) => (
      <NavLink
        to={to}
        className={css(linkClass)}
        activeClassName={css(activeLinkClass)}
      >
        <Icon className={css(iconClass)} />
        <div>{title}</div>
      </NavLink>
    )}
  </ClassNames>
)

export default NavIcon
