import '../styles/globals.css'
import { DefaultSeo } from 'next-seo'
import { ThemeProvider } from 'next-themes'
import { AppProps } from 'next/app'
import Head from 'next/head'
import { toUpper } from 'ramda'
import * as React from 'react'
import pkgJson from '../package.json'
//@ts-ignore
import { daisyui } from '../tailwind.config'

const { name, homepage } = pkgJson

export default function CustomApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>{toUpper(homepage)}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <DefaultSeo
        titleTemplate="%s - Neo Tan"
        canonical={name}
        openGraph={{
          type: 'website',
          locale: 'en_US',
          url: name,
          description:
            'Generate hash from text or files!',
          site_name: name,
          images: [
            {
              url: `${homepage}/images/logo.svg`,
              width: 600,
              height: 600,
              alt: 'Og Image Alt',
            },
          ],
        }}
      />
      <ThemeProvider
        attribute="data-theme"
        storageKey={`${homepage}-theme`}
        defaultTheme={daisyui.themes[0]}
      >
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  )
}
