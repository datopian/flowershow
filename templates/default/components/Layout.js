import Head from 'next/head'
import Link from 'next/link'
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
      <div className="relative min-h-screen pb-24 dark:bg-slate-900">
        <Header />
        <main>
          {children}
        </main>
        <footer className="absolute bottom-0 dark:bg-slate-900 prose dark:prose-invert max-w-none flex flex-col items-center justify-center w-full h-26 py-12">
          <div className="flex ml-8 mr-6 sm:mr-8 md:mr-0">
            {siteConfig.navLinks.map((item) => (
              <Link key={item.href} href={item.href}>
                <a
                  key={item.name}
                  href={item.href}
                  className="inline-flex items-center mr-6 px-1 pt-1 font-regular hover:text-slate-300 no-underline"
                  aria-current={item.current ? 'page' : undefined}
                >
                  {item.name}
                </a>
              </Link>
            ))}
          </div>
          <p className="flex items-center justify-center">
            Made with
            <a
              href={siteConfig.authorUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center no-underline"
            >
              <img src={siteConfig.authorLogo} alt={siteConfig.author} className="my-0 h-6 block" />
              {siteConfig.author}
            </a>
          </p>
        </footer>
      </div>
    </>
  )
}
