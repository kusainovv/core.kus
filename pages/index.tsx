import React, { useState } from "react"
import { Popup } from "../core/components/Popup"
import { ThemeButton } from "../core/components/ThemeButton"

export default function Home() {
  
  const [isShowLanguages, setShowLanguages] = useState(true);

  return <div>
    <ThemeButton transition="0.4s" wrapperWidth={50} sliderWidth={22} />

     <Popup isOpened={isShowLanguages} backgroundCloseZone='rgba(0,0,0,0.4)' onCloseHandler={() => setShowLanguages(false)} transition={'0.4s'}>
        <h1>test</h1>
      </Popup>
     

     <h1>dasdasasdsadsadas</h1>

  </div>
}
