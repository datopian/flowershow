import Head from 'next/head'
import DemoComponent from './Demo'
import { Pre } from './Pre'

const Paragraph = (props) => {
  if (Array.isArray(props.children)) {
    const math = props.children.filter(el => el.props && el.props.className && el.props.className.includes("math-inline"))
    if (math.length > 0) return <p className='flex items-center' {...props} />
  }
  return <p {...props} />
}

const components = {
  Head,
  DemoComponent,
  p: Paragraph,
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
