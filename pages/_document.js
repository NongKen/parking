import Document, { Head, Main, NextScript } from 'next/document'

export default class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps }
  }

  render() {
    return (
      <html>
        <Head>
          <link rel='stylesheet' href='//cdnjs.cloudflare.com/ajax/libs/antd/3.9.2/antd.min.css' />
          <title>Web Page</title>
          <meta name="viewport" content="initial-scale=1.0, width=device-width" />
          <style>{`body { margin: 0 }`}</style>
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    )
  }
}
