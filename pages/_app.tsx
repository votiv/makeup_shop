import { createGlobalStyle } from 'styled-components'
import Head from 'next/head'

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

const App = ({ Component, pageProps }) => (
  <>
    <Head>
      <title>Makeup Shop</title>
      <meta charSet="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    </Head>

    <GlobalStyle />
    <Component {...pageProps} />
  </>
)

export default App
