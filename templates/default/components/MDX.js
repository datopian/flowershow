import { Fragment } from 'react';
import { NextSeo } from 'next-seo';
import Head from 'next/head';
import CustomLink from './Link';
import { Pre } from './Pre';
import siteConfig from '../config/siteConfig';

const components = {
  Head,
  a: CustomLink,
  pre: Pre,
  wrapper: ({ layout, ...rest }) => {
    const Layout = require(`../layouts/${layout}`).default;
    return <Layout {...rest} />;
  }
};

export default function MdxPage({ mdxComponent, frontMatter, ...rest }) {
  const Component = mdxComponent;
  const websiteUrl = siteConfig.authorUrl.replace(/\/+$/, '');
  const seoImageUrl = frontMatter?.image?.startsWith('http')
    ? frontMatter.image
    : websiteUrl + frontMatter.image;
  
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
            : siteConfig?.nextSeo?.openGraph?.images || []
        }}
      />
      <Component
        layout={frontMatter.layout}
        components={components}
        frontMatter={frontMatter}
        {...rest}
      />
      
    </>
  );
}
