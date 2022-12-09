/* eslint import/no-default-export: off */
import { allPeople } from "contentlayer/generated";
import { formatDate } from "@/lib/formatDate.js";
import { siteConfig } from "@/config/siteConfig.js";
import { Avatar } from "@/components/Avatar.jsx";

const getAuthorsDetails = ({ people, authors, defaultAuthor }) => {
  let blogAuthors = [];

  if (authors) {
    blogAuthors = authors;
  } else if (defaultAuthor) {
    blogAuthors = [defaultAuthor];
  }

  return blogAuthors.map((author) => {
    return (
      people.find(
        ({ id, slug, name }) =>
          id === author || slug === author || name === author
      ) ?? { name: author, avatar: siteConfig.avatarPlaceholder }
    );
  });
};

export default function BlogLayout({ children, frontMatter }) {
  const { title, created, authors } = frontMatter;

  const authorsDetails = getAuthorsDetails({
    people: allPeople,
    authors,
    defaultAuthor: siteConfig.defaultAuthor,
  });

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
          {authorsDetails && (
            <div className="flex flex-wrap not-prose items-center space-x-6 space-y-3 justify-center">
              {authorsDetails.map(({ name, avatar, isDraft, url_path }) => (
                <Avatar
                  key={url_path}
                  name={name}
                  img={avatar}
                  href={url_path && !isDraft ? `/${url_path}` : undefined}
                />
              ))}
            </div>
          )}
        </div>
      </header>
      <section>{children}</section>
    </article>
  );
}
