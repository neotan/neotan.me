import Document, { Head, Html, Main, NextScript } from 'next/document'
import React from 'react'
import { cn, isDevMode } from 'utils/helpers'


export default class CustomDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
          <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:ital,wght@0,100;0,200;0,300;0,400;1,100;1,200;1,300;1,400&family=Montserrat:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,200;1,400&family=Noto+Sans+TC:wght@500;700;900&display=swap" />
          <script async src="https://cdn.splitbee.io/sb.js" />
        </Head>
        <body className={cn('antialiased', { 'debug-screens': isDevMode })}>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
