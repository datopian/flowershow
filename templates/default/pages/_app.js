import { useEffect } from 'react';
import Script from 'next/script';
import { useRouter } from 'next/router';
import { ThemeProvider } from 'next-themes';
import { DefaultSeo } from 'next-seo';
import 'tailwindcss/tailwind.css';
import '../styles/global.css';
import '../styles/prism.css';
import '../styles/docsearch.css';

import siteConfig from '../config/siteConfig.js';
import Layout from '../components/Layout';
import * as gtag from '../lib/gtag';

function MyApp({ Component, pageProps }) {
  // Google Analytics
  if (siteConfig.analytics) {
    const router = useRouter();
    useEffect(() => {
      const handleRouteChange = (url) => {
        gtag.pageview(url);
      };
      router.events.on('routeChangeComplete', handleRouteChange);
      return () => {
        router.events.off('routeChangeComplete', handleRouteChange);
      };
    }, [router.events]);
  }
  // end Google Analytics

  return (
    <ThemeProvider
      disableTransitionOnChange attribute="class"
      defaultTheme={siteConfig.theme.default}
      forcedTheme={siteConfig.theme.default ? null : 'light'}
    >
      <DefaultSeo defaultTitle={siteConfig.title || siteConfig.navbarTitle.text} {...siteConfig.nextSeo} />
      {/* Global Site Tag (gtag.js) - Google Analytics */}
      {siteConfig.analytics
        && (
        <Script
          strategy="afterInteractive"
          src={`https://www.googletagmanager.com/gtag/js?id=${siteConfig.analytics}`}
        />
        )}
      {siteConfig.analytics
        && (
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
      <Layout title={pageProps.title}>
        <Component {...pageProps} />
      </Layout>
    </ThemeProvider>
  );
}

export default MyApp;
