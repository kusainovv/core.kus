import React from "react"
import { useCookie } from "../core/utils/useCookie"

export default function Home() {
  const _ = useCookie();
  _.addCookie('name', 'John');
  _.addCookie('surname', 'Newman');
  _.deleteCookieField('name');
  _.changeCookieValue('surname', 'Someone')
  console.warn(_.getCookies())
  return <h1>
    There is no any layouts, go at <i>core</i> folder.
  </h1>
}
