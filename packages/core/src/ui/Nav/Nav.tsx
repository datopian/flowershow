import { useEffect, useState } from "react";

import { ThemeSelector } from "../Base";
import { SearchContext, SearchField } from "../Search";
import { NavMobile } from "./NavMobile";
import { NavItem } from "./NavItem";
import { NavTitle } from "./NavTitle";
import { NavSocial } from "./NavSocial";

import {
  NavLink,
  NavDropdown,
  SocialLink,
  SearchProviderConfig,
} from "../types";

interface Props {
  title: string;
  logo?: string;
  version?: string;
  links?: Array<NavLink | NavDropdown>;
  search?: SearchProviderConfig;
  social?: Array<SocialLink>;
}

export const Nav: React.FC<Props> = ({
  title,
  logo,
  version,
  links,
  search,
  social,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [modifierKey, setModifierKey] = useState<string>();
  const [Search, setSearch] = useState<any>(); // TODO types

  useEffect(() => {
    function onScroll() {
      setIsScrolled(window.scrollY > 0);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  // TODO refactor this, navigator.platform is deprecated
  useEffect(() => {
    setModifierKey(
      /(Mac|iPhone|iPod|iPad)/i.test(navigator.platform) ? "⌘" : "Ctrl "
    );
  }, []);

  useEffect(() => {
    setSearch(SearchContext(search));
  }, [search]);

  return (
    <header
      className={`
        sticky top-0 z-50 flex items-center justify-between px-4 py-5 sm:px-6 lg:px-8 max-w-full
        ${
          isScrolled
            ? "dark:bg-slate-900/95 backdrop-blur [@supports(backdrop-filter:blur(0))]:dark:bg-slate-900/75"
            : "dark:bg-slate-900"
        }
      `}
    >
      {/* Mobile navigation  */}
      <div className="mr-2 sm:mr-4 flex lg:hidden">
        <NavMobile links={links} />
      </div>
      {/* Non-mobile navigation */}
      <div className="flex flex-none items-center">
        <NavTitle title={title} logo={logo} version={version} />
        {links && (
          <div className="hidden lg:flex ml-8 mr-6 sm:mr-8 md:mr-0">
            {links.map((link) => (
              <NavItem link={link} key={link.name} />
            ))}
          </div>
        )}
      </div>
      <div className="relative flex items-center basis-auto justify-end gap-6 xl:gap-8 md:shrink w-full">
        {Search && (
          <Search>
            {({ query }: any) => (
              <SearchField modifierKey={modifierKey} onOpen={query?.toggle} />
            )}
          </Search>
        )}
        <ThemeSelector />
        {social && <NavSocial links={social} />}
      </div>
    </header>
  );
};
