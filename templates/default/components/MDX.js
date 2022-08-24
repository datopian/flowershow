import { NextSeo } from 'next-seo'
import Head from 'next/head'
import { Pre } from './Pre'
import siteConfig from '../config/siteConfig'

const components = {
  Head,
  pre: Pre,
  GlobalTest: ({children}) => <h1 className="bg-red-300">{children}</h1>,
  wrapper: ({ layout, ...rest }) => {
    const Layout = require(`../layouts/${layout}`).default
    return <Layout {...rest} />
  }
}

export default function MdxPage({ children, ...rest }) {
  const { Component, frontMatter } = children;
  const seoImageUrl = siteConfig.authorUrl + frontMatter.image
  
  return (
    <>
      <NextSeo 
        title={frontMatter.title}
        openGraph={{
          title: frontMatter.title,
          description: frontMatter.description,
          images: frontMatter.image
            ? [
                {
                  url: seoImageUrl,
                  width: 1200,
                  height: 627,
                  alt: frontMatter.title
                }
              ] 
            : siteConfig.nextSeo.openGraph.images,
        }}
      />
      <Component
        layout={frontMatter.layout}
        components={components}
        frontMatter={frontMatter}
        {...rest}
      />
    </>
  )
}
