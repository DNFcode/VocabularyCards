import { h } from "preact"
import { css, cx } from "emotion"

const wrapperCss = css({
  height: 60,
  width: "100%",
  display: "flex",
  justifyContent: "center",
  overflowX: "hidden",
  position: "relative",
})

const svgCss = css({
  position: "absolute",
  bottom: 0,
})

export const BottomPanel = (props: { className?: string }) => (
  <div className={cx(wrapperCss, props.className)}>
    <svg
      className={svgCss}
      width="608"
      height="60"
      viewBox="0 0 608 60"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g filter="url(#filter0_d)">
        <path
          d="M4 43V4H257C264.975 4 269.798 10.8625 274.763 17.9261L274.766 17.9301C275.194 18.5381 275.604 19.13 276.006 19.718L276.016 19.7328C278.502 23.3417 280.693 26.5223 284.938 29.704C290.474 33.7514 297.143 35.9542 304 36C310.858 35.9545 317.527 33.7521 323.063 29.705C327.312 26.5165 329.502 23.3372 331.99 19.7244L331.994 19.719C332.394 19.135 332.807 18.539 333.234 17.931L333.236 17.9279C338.201 10.864 343.026 4 351 4H604V43H4Z"
          fill="white"
        />
      </g>
      <rect x="4" y="40" width="600" height="20" fill="white" />
      <defs>
        <filter
          id="filter0_d"
          x="0"
          y="0"
          width="608"
          height="47"
          filterUnits="userSpaceOnUse"
          color-interpolation-filters="sRGB"
        >
          <feFlood flood-opacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          />
          <feOffset />
          <feGaussianBlur stdDeviation="2" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.15 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow"
            result="shape"
          />
        </filter>
      </defs>
    </svg>
  </div>
)
