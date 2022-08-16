import { NextSeo } from 'next-seo'
import Head from 'next/head'
import { Pre } from './Pre'
import config from '../content/config'

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
  return (
    <>
      <NextSeo 
        title={frontMatter?.title}
        description={frontMatter?.description}
        openGraph={{
          title: frontMatter.title,
          description: frontMatter.description,
          ...config.nextSeo.openGraph,
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
