export default function DocsLayout ({ children, frontMatter }) {
    const { title } = frontMatter
    return (
      <article className="prose mx-auto p-6">
        <header>
          <div className="mb-6">{title && <h1>{title}</h1>}</div>
        </header>
        <section>
          {children}
        </section>
      </article>
    );
}