import Script from "next/script";
import { DefaultSeo } from "next-seo";  // SUGGESTION: if we upgrade to App Router, we won't need
import { useRouter } from "next/router";
import { useEffect } from "react";
import type { AppProps } from "next/app";
import {
    Layout, // SUGGESTION: eject it; it's usually sth we (and tech-savvy users) want to customize; only it's specific components should be available in the core package
    SearchProvider,
    pageview, // SUGGESTION: this should be a part of a separate component: GoogleAnalytics (along with the two scripts and the useEffect below)
    ThemeProvider, // SUGGESTION: eject it; this is just re-exported from the core package for no reason
} from "@portaljs/core";
import type { NavGroup, NavItem } from "@portaljs/core";

import siteConfig from "@/config/siteConfig";

import "tailwindcss/tailwind.css";
import "@/styles/docsearch.css";
import "@/styles/global.css";
import "@/styles/prism.css";

export interface CustomAppProps {
    meta: {
        showToc: boolean;
        showEditLink: boolean;
        showSidebar: boolean;
        showComments: boolean;
        urlPath: string; // not sure what's this for
        editUrl?: string;
        [key: string]: any;
    };
    siteMap?: Array<NavItem | NavGroup>;
    [key: string]: any;
}

const MyApp = ({ Component, pageProps }: AppProps<CustomAppProps>) => {
    const router = useRouter();
    const { meta, siteMap } = pageProps;

    // SUGGESTION: when we upgrade to App Router, the Layout component (once we eject it)
    // will be able to fetch any data it needs on it's own
    // ALSO (no matter if we upgrade or not) split the layout into two components:
    // 1) top level layout that imports site-wide, non-dynamic settings from siteConfig and is used here (or as a root Layout in App router)
    // 2) a LayoutRenderer component that get's the per-page, dynamic settings from the pageProps (or again, fetches them on it's own if we upgrade to App Router)
    const layoutProps = {
        // SUGGESTION: these would go to the root Layout component
        showToc: meta?.showToc,
        showEditLink: meta?.showEditLink,
        showSidebar: meta?.showSidebar,
        showComments: meta?.showComments,
        editUrl: meta?.editUrl,
        urlPath: meta?.urlPath,
        // SUGGESTION: these would be passed to (or fetched in) the LayoutRenderer component
        commentsConfig: siteConfig.comments,
        nav: {
            title: siteConfig.navbarTitle?.text ?? siteConfig.title,
            logo: siteConfig.navbarTitle?.logo,
            links: siteConfig.navLinks,
            search: siteConfig.search,
            social: siteConfig.social,
        },
        author: {
            name: siteConfig.author,
            url: siteConfig.domain,
            logo: siteConfig.logo,
        },
        theme: {
            defaultTheme: siteConfig.theme.default,
            themeToggleIcon: siteConfig.theme.toggleIcon,
        },
        siteMap, // SUGGESTION: again, this could be generated in the root Layout if we upgrade to App Router
    };

    // SUGGESTION: move this to a separate component: GoogleAnalytics
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
                // SUGGESTION: move these two Google Analytics scripts to a separate component: GoogleAnalytics
                <>
                    <Script
                        strategy="afterInteractive"
                        src={`https://www.googletagmanager.com/gtag/js?id=${siteConfig.analytics}`}
                    />
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
                </>
            )}
            <SearchProvider searchConfig={siteConfig.search}>
                <Layout {...layoutProps}>
                    <Component {...pageProps} />
                </Layout>
            </SearchProvider>
        </ThemeProvider>
    );
};

export default MyApp;
