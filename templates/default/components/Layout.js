import Head from 'next/head'
import { NextSeo } from 'next-seo'
import siteConfig from '../config/siteConfig'
import Header from './Nav'

export default function Layout({ children, title='' }) {
  return (
    <>
      <NextSeo
        title={title}
        />
      <Head>
        <link rel="icon" href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>💐</text></svg>" />
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Header />
      <main className="dark:bg-slate-900">
        {children}
      </main>
      <footer className="dark:bg-slate-900 prose dark:prose-invert w-full max-w-none flex items-center justify-center w-full h-24 border-t">
        <p className="flex items-center justify-center">
          Created by
          <a
            href={siteConfig.authorUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center no-underline"
          >
            <img src={siteConfig.authorLogo} alt={siteConfig.author} className="ml-2 h-6 block" />
            {siteConfig.author}
          </a>
        </p>
      </footer>
    </>
  )
}
