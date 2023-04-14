import { AppProps } from 'next/app'
import Head from 'next/head'
import React from 'react'
import '../styles/globals.css'

export default function CustomApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Metaversus @ NEOTAN.ME</title>
        <meta content="width=device-width, initial-scale=1" name="viewport" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Component {...pageProps} />
    </>
  )
}