import { Global } from '@emotion/react'
import type { AppProps } from 'next/app'
import { GlobalStyles } from './GlobalStyles'

export default function App({ Component, pageProps }: AppProps) {
  return <>
    <Global styles={GlobalStyles} />
    <Component {...pageProps} />
  </>
}
