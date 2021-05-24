import { createGlobalStyle } from 'styled-components'
import Head from 'next/head'
import { AppProps } from 'next/app'
import { useRouter } from 'next/router'
import { IntlProvider, MessageFormatElement } from 'react-intl'
import { useCallback } from 'react'

import en from '../content/locales/en.json'
import de from '../content/locales/de.json'

const GlobalStyle = createGlobalStyle`
  html,
  body {
    font-family: 'Poppins', sans-serif;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
`

const App = ({ Component, pageProps }: AppProps) => {
  const { locale } = useRouter()
  const [shortLocale] = locale ? locale.split('-') : ['en']

  return (
    <>
      <Head>
        <title>Makeup Shop</title>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>

      <GlobalStyle />
      <IntlProvider locale={shortLocale} messages={shortLocale === 'en' ? en : de}>
        <Component {...pageProps} />
      </IntlProvider>
    </>
  )
}

export default App
