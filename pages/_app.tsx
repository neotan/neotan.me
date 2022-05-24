import '../styles/globals.css'
import Head from 'next/head'
import {DefaultSeo} from 'next-seo'
import {ThemeProvider} from 'next-themes'

function CustomApp({Component, pageProps}) {
  return (
    <>
      <Head>
        <title>NEOTAN.ME</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <DefaultSeo
        titleTemplate="%s - Neo Tan"
        openGraph={{
          type: 'website',
          locale: 'en_US',
          url: 'neotan.me',
          description:
            'The personal website for Neo Tan, web software engineer.',
          site_name: 'Neo Tan | neotan.me',
          images: [
            {
              url: 'https://www.neotan.me/images/avatar-icon.svg',
              width: 600,
              height: 600,
              alt: 'Og Image Alt',
            },
          ],
        }}
        canonical="neotan.me"
      />
      <ThemeProvider
        attribute="class"
        storageKey="neotan.me-theme"
        defaultTheme="dark"
      >
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  )
}

export default CustomApp
