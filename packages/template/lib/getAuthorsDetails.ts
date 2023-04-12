import { siteConfig } from "@/config/siteConfig";
import clientPromise from "./mddb.mjs";

export const getAuthorsDetails = async (authors?: string[]) => {
  const mddb = await clientPromise;
  const allPeople = await mddb.getFiles({ folder: "people" });
  let blogAuthors = [];

  if (authors) {
    blogAuthors = authors;
  } else if (siteConfig.defaultAuthor) {
    blogAuthors = [siteConfig.defaultAuthor];
  }

  return blogAuthors.map((author) => {
    return (
      // allPeople.find(
      //   ({ id, slug, name }) =>
      //     id === author || slug === author || name === author
      // ) ?? { name: author, avatar: siteConfig.avatarPlaceholder }

      // TODO add back support for lookup by id and slug
      allPeople.find((p) => p.metadata?.name === author) ?? {
        name: author,
        avatar: siteConfig.avatarPlaceholder,
      }
    );
  });
};
