import React from "react"
import { ThemeButton } from "../core/components/ThemeButton"

export default function Home() {
  return <div>
    <ThemeButton transition="0.4s" wrapperWidth={50} sliderWidth={22} />
    {/* There is no any layouts, go at <i>core</i> folder. */}
  </div>
}
