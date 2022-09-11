import siteConfig from '../config/siteConfig';

export default function DocsLayout({ children, frontMatter }) {
  const { title, editLink } = frontMatter;
  // edit link will only appear if enabled in frontmatter and in siteConfig
  const editUrl = siteConfig.repoRoot + siteConfig.repoEditPath + frontMatter._raw.sourceFilePath;
  return (
    <article className="docs prose dark:prose-invert prose-a:break-words mx-auto p-6">
      <header>
        <div className="mb-6">{title && <h1>{title}</h1>}</div>
      </header>
      <section>
        {children}
        {editUrl && siteConfig.editPageShow && editLink && (
          <div className="mt-12 mb-6">
            <a
              className="flex no-underline font-semibold text-yellow-li"
              href={editUrl}
              target="_blank">
              Edit this page
              <span className="mx-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                  />
                </svg>
              </span>
            </a>
          </div>
        )}
      </section>
    </article>
  );
}
