import '../styles/globals.css'
import Head from 'next/head'
import {ThemeProvider} from 'next-themes'

function CustomApp({Component, pageProps}) {
  return (
    <>
      <Head>
        <title>NEOTAN.ME</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ThemeProvider attribute="class" storageKey="neotan.me-theme">
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  )
}

export default CustomApp
