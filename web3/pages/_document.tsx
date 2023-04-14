import Document, { Head, Html, Main, NextScript } from 'next/document'
import React from 'react'

export default class CustomDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
          <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Sofia+Sans+Condensed:wght@400;700;800;900&display=swap" />
          <script async src="https://cdn.splitbee.io/sb.js" />
        </Head>
        <body className='antialiased'>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}