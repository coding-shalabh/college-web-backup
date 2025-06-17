import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
          {/* Google Analytics Scripts */}
          <script async src="https://www.googletagmanager.com/gtag/js?id=G-CJPYQLZ8DD"></script>
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-E7HHB420K1"></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-CJPYQLZ8DD');
              gtag('config', 'G-E7HHB420K1');
            `,
          }}
        />
      <script async src={`https://www.googletagmanager.com/gtag/js?id=G-CJPYQLZ8DD`}></script>
      
          <script
            dangerouslySetInnerHTML={{
              __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());

                gtag('config', 'G-CJPYQLZ8DD');
              `,
            }}
          />
        </Head>
      <body className="rbt-header-sticky">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
