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
type SearchProvider = "algolia" | "kbar";

export interface SearchProviderConfig {
  provider: SearchProvider;
  config: object;
}
