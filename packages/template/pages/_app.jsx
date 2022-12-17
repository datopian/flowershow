/* eslint import/no-default-export: off */
import { DefaultSeo } from "next-seo";
import { ThemeProvider } from "next-themes";
import { useRouter } from "next/router";
import Script from "next/script";
import { useEffect, useState } from "react";
import "tailwindcss/tailwind.css";

// TODO
import { SearchProvider } from "@flowershow/core";
import { Layout } from "../components/Layout";

import { siteConfig } from "../config/siteConfig";
import { collectHeadings } from "../lib/collectHeadings";
import { pageview } from "../lib/gtag";
import "../styles/docsearch.css";
import "../styles/global.css";
import "../styles/prism.css";

function MyApp({ Component, pageProps }) {
  const router = useRouter();

  useEffect(() => {
    if (siteConfig.analytics) {
      const handleRouteChange = (url) => {
        pageview(url);
      };
      router.events.on("routeChangeComplete", handleRouteChange);
      return () => {
        router.events.off("routeChangeComplete", handleRouteChange);
      };
    }
  }, [router.events]);

  const [tableOfContents, setTableOfContents] = useState([]);

  useEffect(() => {
    const headingNodes = document.querySelectorAll("h2,h3");
    const toc = collectHeadings(headingNodes);
    setTableOfContents(toc ?? []);
  }, [router.asPath]); // update table of contents on route change with next/link

  return (
    <ThemeProvider
      disableTransitionOnChange
      attribute="class"
      defaultTheme={siteConfig.theme.default}
      forcedTheme={siteConfig.theme.default ? null : "light"}
    >
      <DefaultSeo defaultTitle={siteConfig.title} {...siteConfig.nextSeo} />
      {/* Global Site Tag (gtag.js) - Google Analytics */}
      {siteConfig.analytics && (
        <Script
          strategy="afterInteractive"
          src={`https://www.googletagmanager.com/gtag/js?id=${siteConfig.analytics}`}
        />
      )}
      {siteConfig.analytics && (
        <Script
          id="gtag-init"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${siteConfig.analytics}', {
                page_path: window.location.pathname,
              });
            `,
          }}
        />
      )}
      <SearchProvider searchConfig={siteConfig.search}>
        <Layout {...pageProps} tableOfContents={tableOfContents}>
          <Component {...pageProps} />
        </Layout>
      </SearchProvider>
    </ThemeProvider>
  );
}

export default MyApp;
