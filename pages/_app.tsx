import '../styles/globals.css'
import Head from 'next/head'
import { DefaultSeo } from 'next-seo'
import { ThemeProvider } from 'next-themes'
import { AnimatePresence } from 'framer-motion'
import { keys } from 'ramda'
import pkgJson from 'package.json'
import { daisyui } from '../tailwind.config'

const SITE_NAME = pkgJson.name

export default function CustomApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>NEOTAN.ME</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <DefaultSeo
        titleTemplate="%s - Neo Tan"
        canonical="neotan.me"
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
      />
      <AnimatePresence
        exitBeforeEnter
        initial={false}
        onExitComplete={() => window.scrollTo(0, 0)}
      >
        <ThemeProvider
          attribute="data-theme"
          storageKey={`${SITE_NAME}-theme"`}
          defaultTheme={keys(daisyui.themes[0])?.[0]}
        >
          <Component {...pageProps} />
        </ThemeProvider>
      </AnimatePresence>
    </>
  )
}
