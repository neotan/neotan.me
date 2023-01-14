/* eslint-disable @next/next/no-page-custom-font */
import { NextSeo } from 'next-seo'
import { NEXT_SEO_DEFAULT } from '@/next-seo.config'

export default function Head() {
  return (
    <>
      <title>Metaversus @ NEOTAN.ME</title>
      <meta content="width=device-width, initial-scale=1" name="viewport" />
      <link rel="icon" href="/favicon-web3.ico" />

      <script async src="https://cdn.splitbee.io/sb.js" />
      <NextSeo
        {...NEXT_SEO_DEFAULT}
        useAppDir={true}
      />
    </>
  )
}
