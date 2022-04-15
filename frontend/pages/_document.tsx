import Document, {Html, Head, Main, NextScript} from 'next/document'

export default class CustomDocument extends Document {
  render() {
    return (
      <Html className="dark">
        <Head>
          <link rel="stylesheet" href="http://fonts.cdnfonts.com/css/cubano" />
          <link
            rel="stylesheet"
            href="http://fonts.cdnfonts.com/css/sofia-pro"
          />
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link
            rel="preconnect"
            href="https://fonts.gstatic.com"
            crossOrigin="true"
          />
          <link
            href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:ital,wght@0,100;0,400;0,800;1,100;1,400;1,800&display=swap"
            rel="stylesheet"
          />
        </Head>
        <body className="bg-primary">
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
