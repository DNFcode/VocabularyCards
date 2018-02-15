import * as React from "react"
import styled, { css, keyframes } from "react-emotion"
import { NavLink } from "react-router-dom"

type NavIconProps = {
  to: string
  title: string
  Icon: React.SFC<{ className: string }>
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
    background-image: radial-gradient(circle, white 30%, transparent 32%);
    background-repeat: no-repeat;
    background-position: 50%;
    animation: ${ripple} 0.35s ease-out;
  }
`

const iconClass = css`
  display: block;
  height: 20px;
  margin: 2px 0;
`

const linkClass = css`
  transition: min-width 0.15s linear;
  display: flex;
  flex-direction: column;
  text-decoration: none;
  color: white;
  min-width: 30px;

  div {
    transition: font-size 0.15s linear;
    text-align: center;
    font-size: 0;
  }
`

const activeLinkClass = css`
  ${rippleEffect};
  min-width: 100px;

  div {
    font-size: 14px;
  }
`

const NavIcon: React.SFC<NavIconProps> = ({ to, title, Icon }) => (
  <NavLink to={to} className={linkClass} activeClassName={activeLinkClass}>
    <Icon className={iconClass} />
    <div>{title}</div>
  </NavLink>
)

export default NavIcon
