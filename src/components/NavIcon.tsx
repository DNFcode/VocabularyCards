import * as React from "react"
import styled, { css } from "react-emotion"
import { NavLink } from "react-router-dom"

type NavIconProps = {
  to: string
  title: string
  Icon: React.SFC<{ className: string }>
}

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
