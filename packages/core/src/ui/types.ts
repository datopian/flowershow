// shared types used in more than one component
// TODO find out what's the best place to put them, what's the best practice

// navigation
export interface NavLink {
  name: string;
  href: string;
}

export interface NavDropdown {
  name: string;
  subItems: Array<NavLink>;
}

export function isNavDropdown(
  link: NavLink | NavDropdown
): link is NavDropdown {
  return (link as NavDropdown).subItems !== undefined;
}

// social
export type SocialPlatform = "github" | "discord";

export interface SocialLink {
  label: SocialPlatform;
  href: string;
}

// search
export type SearchProvider = "algolia" | "kbar";

export interface SearchProviderConfig {
  provider: SearchProvider;
  config: object;
}

// TEMP contentlayer
export interface Page {
  title?: string;
  description?: string;
  image?: string;
  layout: string;
  showEditLink?: boolean;
  showToc?: boolean;
  isDraft?: boolean;
  data: Array<string>;
  url_path: string;
  edit_url: string | null;
}

export interface Blog extends Page {
  created?: string;
  authors?: Array<string>;
  tags?: Array<string>;
}