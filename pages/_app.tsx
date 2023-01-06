import { Global } from '@emotion/react'
import type { AppProps } from 'next/app'
import { LanguageProvider } from '../core/components/LanguageProvider'
import { GlobalStyles } from '../src/GlobalStyles'

export default function App({ Component, pageProps }: AppProps) {
  return <>
    <Global styles={GlobalStyles} />
    <LanguageProvider>
      <Component {...pageProps} />
    </LanguageProvider>
  </>
}
