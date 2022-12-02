/* eslint import/no-default-export: off */
import { formatDate } from "@/lib/formatDate.js";

export default function BlogLayout({ children, frontMatter }) {
  const { title, created, authorDetails } = frontMatter;
  return (
    <article className="docs prose dark:prose-invert prose-a:break-words mx-auto p-6">
      <header>
        <div className="mb-4 flex-col items-center">
          {title && <h1 className="flex justify-center">{title}</h1>}
          {created && (
            <p className="text-sm text-zinc-400 dark:text-zinc-500 flex justify-center">
              <time dateTime={created}>{formatDate(created)}</time>
            </p>
          )}
          <div className="flex items-center space-x-6 justify-center">
            {authorDetails.map((author) => {
              return (
                <div key={author.name} className="flex items-center space-x-2">
                  <img
                    src={author.avatar}
                    width="38px"
                    height="38px"
                    alt="avatar"
                    className="h-10 w-10 rounded-full"
                  />
                  <p className="text-sm text-black dark:text-white font-medium">
                    {author.name}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </header>
      <section>{children}</section>
    </article>
  );
}
