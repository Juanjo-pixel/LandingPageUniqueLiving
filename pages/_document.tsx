import Document, { Html, Head, Main, NextScript, DocumentContext } from 'next/document';
import { ServerStyleSheet } from 'styled-components';

interface Props {
styles: JSX.Element;
}

export default class MyDocument extends Document<Props> {
static async getInitialProps(ctx: DocumentContext) {
const sheet = new ServerStyleSheet();
const originalRenderPage = ctx.renderPage;
try {
  ctx.renderPage = () =>
    originalRenderPage({
      enhanceApp: (App) => (props) => sheet.collectStyles(<App {...props} />),
    });

  const initialProps = await Document.getInitialProps(ctx);

  return {
    ...initialProps,
    styles: (
      <>
        {initialProps.styles}
        {sheet.getStyleElement()}
      </>
    ),
  };
} finally {
  sheet.seal();
}

}

render() {
return (
<Html>
<Head />
<body>
<Main />
<NextScript />
</body>
</Html>
);
}
}