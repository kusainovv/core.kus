import React from "react"
import { useCopyText } from "../core/utils/useCopyText";

export default function Home() {
  const { copy } = useCopyText(true, 'test')
  
  return <h1 onClick={(event) => copy('2')}>
    There is no any layouts, go at <i>core</i> folder.
  </h1>
}
