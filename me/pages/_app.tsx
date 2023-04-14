import { AppProps } from 'next/app'
import Head from 'next/head'
import Script from 'next/script'
import { DefaultSeo } from 'next-seo'
import { NextSeo } from 'next-seo'
import { ThemeProvider } from 'next-themes'
import React from 'react'
import { NEXT_SEO_DEFAULT } from '../next-seo.config'
import pkgJson from '../package.json'
import '../styles/globals.css'

const { name, homepage } = pkgJson

export default function CustomApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>NEOTAN.ME</title>
        <meta content="width=device-width, initial-scale=1" name="viewport" />
        <link rel="icon" href="/favicon.ico" />
        <NextSeo
          {...NEXT_SEO_DEFAULT}
          useAppDir={true}
        />
      </Head>
      <DefaultSeo
        titleTemplate="%s - Neo Tan"
        canonical={name}
        openGraph={{
          type: 'website',
          locale: 'en_US',
          url: name,
          description:
            'Neo\'s personal website.',
          site_name: name,
          images: [
            {
              url: `${homepage}/images/avatar-icon.svg`,
              width: 600,
              height: 600,
              alt: 'Og Image Alt',
            },
          ],
        }}
      />
      <ThemeProvider
        attribute="data-theme"
        storageKey={'neotan.me-root-theme'}
        defaultTheme='light'
      >
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  )
}
