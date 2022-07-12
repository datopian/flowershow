import Head from 'next/head'
import DemoComponent from './Demo'
import { Hero } from './Hero'
import { Pre } from './Pre'

const components = {
  Head,
  Hero,
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
    <Component
      layout={frontMatter.layout}
      components={components}
      frontMatter={frontMatter}
      {...rest}
    />
  )
}
