import { siteConfig } from "../config/siteConfig";
import clientPromise from "./mddb.mjs";

export const getAuthorsDetails = async (authors?: string[]) => {
  const mddb = await clientPromise;
  const allPeople = await mddb.getFiles({ folder: "people" });
  let blogAuthors: string[] = [];

  if (authors) {
    blogAuthors = authors;
  } else if (siteConfig.defaultAuthor) {
    blogAuthors = [siteConfig.defaultAuthor];
  }

  return blogAuthors.map((author) => {
    const matchedAuthor = allPeople.find(
      (p) =>
        p.metadata?.id === author ||
        p.metadata?.slug === author ||
        p.metadata?.name
    );
    return (
      matchedAuthor ?? {
        name: author,
        avatar: siteConfig.avatarPlaceholder,
      }
    );
  });
};
