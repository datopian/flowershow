//  Every mdx file will have tags and links
//  Generic so that we can create custom
//  types later... Not definite
//  await MyMdDb.query({ filetype: ["md", "mdx"] })
export type MDXFile<T = { [key: string]: any }> = DatabaseFile<{
  tags: string[];
  links: string[];
}> &
  T;

//  Optional params so that we can build complex dynamic queries
//  E.g I want all files in the blogs folder with X and Y tags
export interface DatabaseQuery {
  folder?: string;
  type?: string; // TODO
  tags?: string[];
  extensions?: string[];
  urlPath?: string;
}
