import { NextSeo } from 'next-seo'
import Head from 'next/head'
import DemoComponent from './Demo'
import { Pre } from './Pre'
import siteConfig from '../config/siteConfig'

const components = {
  Head,
  DemoComponent,
  pre: Pre,
  wrapper: ({ layout, ...rest }) => {
    const Layout = require(`../layouts/${layout}`).default
    return <Layout {...rest} />
  }
}

export default function MdxPage({ children, ...rest }) {
  const { Component, frontMatter } = children;
  return (
    <>
      <NextSeo 
        title={frontMatter?.title}
        description={frontMatter?.description}
        openGraph={{
          title: frontMatter.title,
          description: frontMatter.description,
          ...siteConfig.nextSeo.openGraph,
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
