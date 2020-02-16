import crypto from 'crypto';
import Document, { Html, Head, Main, NextScript } from 'next/document';

const cspHashOf = (text: any) => {
  const hash = crypto.createHash('sha256');
  hash.update(text);
  return `'sha256-${hash.digest('base64')}'`;
};

export default class extends Document {
  static async getInitialProps(ctx: any) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    const csp = `upgrade-insecure-requests; object-src 'none'; script-src ${cspHashOf(
      NextScript.getInlineScriptSource(this.props),
    )} 'unsafe-inline' 'unsafe-eval' 'strict-dynamic' https:; base-uri 'none'; report-uri=/report-csp-violation`;

    return (
      <Html lang='en-US'>
        <Head>
          <meta httpEquiv='Content-Security-Policy' content={csp} />
          <link rel='manifest' href='/site.webmanifest' />
          <link rel='shortcut icon' href='/favicon.ico' />
          <meta name='msapplication-TileColor' content='#d50000' />
          <meta name='msapplication-config' content='/browserconfig.xml' />
          <meta name='theme-color' content='#d50000' />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
