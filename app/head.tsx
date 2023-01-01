/* eslint-disable @next/next/no-page-custom-font */
import { NextSeo } from 'next-seo'
import { NEXT_SEO_DEFAULT } from '../next-seo.config'

export default function Head() {
  return (
    <>
      <title>NEOTAN.ME</title>
      <meta content="width=device-width, initial-scale=1" name="viewport" />
      <link rel="icon" href="/favicon.ico" />
      {/* <link
        rel="preconnect"
        href="https://fonts.gstatic.com"
        crossOrigin="true"
      />
      <link
        href="https://fonts.googleapis.com/css2?family=Mitr:wght@200;300;400;500;600;700&display=swap"
        rel="stylesheet"
      />
      <link
        href="https://fonts.googleapis.com/css2?family=Noto+Sans:ital,wght@0,200;0,400;0,700;0,900;1,200;1,400;1,600;1,900&display=swap"
        rel="stylesheet"
      />
      <link
        href="https://fonts.googleapis.com/css2?family=Noto+Sans+TC:wght@100;300;400;500;700;900&display=swap"
        rel="stylesheet"
      />
      <link
        href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:ital,wght@0,100;0,400;0,800;1,100;1,400;1,800&display=swap"
        rel="stylesheet"
      /> */}
      <script async src="https://cdn.splitbee.io/sb.js" />
      <NextSeo
        {...NEXT_SEO_DEFAULT}
        useAppDir={true}
      />
    </>
  )
}
