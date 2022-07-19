export default function BlogLayout ({ children, frontMatter }) {
    const { date, title } = frontMatter
    return (
      <article className="text-center font-serif prose prose-invert mx-auto p-6">
        <header>
          <div className="mb-6">{title && <h1>{title}</h1>}</div>
          <div className="mb-6">{date && <p className="text-bold text-teal-500">{(new Date(date)).toLocaleDateString()}</p>}</div>
        </header>
        <section>
          {children}
        </section>
      </article>
    );
}
