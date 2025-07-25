// pages/_document.js
import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        {/* Add Google Font for Outfit */}
       <link
  href="https://fonts.googleapis.com/css2?family=Outfit:wght@400;700&display=swap"
  rel="stylesheet"
/>

      </Head>
      <body className="font-outfit">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
