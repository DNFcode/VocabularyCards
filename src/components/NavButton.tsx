import { h, FunctionalComponent } from "preact"
import { css } from "emotion"
import { PRIMARY_COLOR, DISABLED_TEXT, PRIMARY_COLOR_RGBA } from "../theme"
import { useState } from "preact/hooks"

const ACTIVE_EFFECT_DURATION = 400

const activeEffectRoot = (released: boolean) =>
  css({
    position: "absolute",
    width: "100%",
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
    opacity: released ? 0 : 1,

    transition: `opacity ${ACTIVE_EFFECT_DURATION}ms 100ms ease`,
  })

const activeEffectCss = (touched: boolean) =>
  css({
    position: "absolute",
    width: "120px",
    height: "120px",
    background: `radial-gradient(circle at center, ${PRIMARY_COLOR_RGBA(
      0.3
    )} 68%, transparent 70%)`,
    opacity: touched ? 0.7 : 0,
    transform: touched ? `scale(1)` : `scale(0.5)`,
    transition: touched
      ? `opacity ${ACTIVE_EFFECT_DURATION}ms ease, transform ${ACTIVE_EFFECT_DURATION}ms ease`
      : undefined,
  })

const NavButtonActiveEffect = () => {
  const [touched, setTouched] = useState(false)
  const [released, setReleased] = useState(false)

  return (
    <div
      className={activeEffectRoot(released)}
      onTouchStart={() => {
        setTouched(true)
      }}
      onTouchEnd={() => {
        setReleased(true)
        window.setTimeout(() => {
          setTouched(false)
          setReleased(false)
        }, ACTIVE_EFFECT_DURATION)
      }}
    >
      <div className={activeEffectCss(touched)} />
    </div>
  )
}

const navButtonCss = (disabled: boolean) =>
  css({
    color: disabled ? DISABLED_TEXT : PRIMARY_COLOR,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    border: 0,
    background: 0,
    outline: 0,
    position: "relative",
  })

const navButtonLabelCss = css({
  fontWeight: "bold",
  fontSize: 14,
  fontFamily: '"Nunito", sans-serif',
})

const navButtonIconCss = css({
  display: "block",
})

export const NavButton: FunctionalComponent<{
  label: string
  disabled: boolean
  // Icon should accept any component
  Icon: FunctionalComponent<{ className?: string }>
}> = ({ label, disabled, Icon }) => {
  return (
    <button className={navButtonCss(disabled)}>
      <NavButtonActiveEffect />
      <Icon className={navButtonIconCss} />
      <div className={navButtonLabelCss}>{label}</div>
    </button>
  )
}
