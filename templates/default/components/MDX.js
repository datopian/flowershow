import Head from 'next/head'

const components = {
  Head,
}

export default function MdxPage({ children }) {
  const { Component, frontMatter: { title } } = children;
  return (
    <article className="prose mx-auto p-6">
      <header>
        <div className="mb-6">
          {title && <h1>{title}</h1>}
        </div>
      </header>
      <section>
        <Component components={components} />
      </section>
    </article>
  );
}
