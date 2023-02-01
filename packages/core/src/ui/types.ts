// shared types used in more than one component
// TODO find out what's the best place to put them, what's the best practice

// layout
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

export interface NavConfig {
  title: string;
  logo?: string;
  version?: string;
  links: Array<NavLink | NavDropdown>;
  search?: SearchProviderConfig;
  social?: Array<SocialLink>;
}

export interface AuthorConfig {
  name: string;
  url: string;
  logo: string;
}

export interface ThemeConfig {
  defaultTheme: "dark" | "light";
  themeToggleIcon: string;
}

// ToC

export interface TocSection {
  id: string;
  title: string;
  level: string;
  children?: any;
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
interface SharedFields {
  title?: string;
  description?: string;
  image?: string;
  layout: string;
  showEditLink?: boolean;
  showToc?: boolean;
  showComments?: boolean;
  isDraft?: boolean;
  data: Array<string>;
}

interface ComputedFields {
  url_path: string;
  edit_url?: string;
}

export interface Page extends SharedFields, ComputedFields {}

export interface Blog extends SharedFields, ComputedFields {
  created: string; // TODO type?
  authors?: Array<string>;
  tags?: Array<string>;
}
