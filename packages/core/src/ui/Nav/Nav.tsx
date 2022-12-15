import Link from "next/link";
import { useEffect, useState } from "react";

import { ThemeSelector } from "../Base";
import { SearchContext, SearchField } from "../Search";
import { GitHubIcon, DiscordIcon } from "../Icons";
import { NavMobile } from "./NavMobile";
import { NavItem } from "./NavItem";
import { NavTitle } from "./NavTitle";

/* eslint-disable-next-line */
/* export interface NavProps {} */

/* import { siteConfig } from "../config/siteConfig"; */
const siteConfig: any = {};

const Search = SearchContext(siteConfig.search?.provider);

export function Nav() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [modifierKey, setModifierKey] = useState();

  useEffect(() => {
    setModifierKey(
      /(Mac|iPhone|iPod|iPad)/i.test(navigator.platform)
        ? "⌘"
        : ("Ctrl " as any)
    );
  }, []);

  useEffect(() => {
    function onScroll() {
      setIsScrolled(window.scrollY > 0);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll, { passive: true } as any);
    };
  }, []);

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
      <div className="mr-2 sm:mr-4 flex lg:hidden">
        <NavMobile navigation={siteConfig.navLinks} />
      </div>
      <div className="flex flex-none items-center">
        <NavTitle siteConfig={siteConfig} />
        <div className="hidden lg:flex ml-8 mr-6 sm:mr-8 md:mr-0">
          {siteConfig.navLinks.map((item) => (
            <NavItem item={item} key={item.name} />
          ))}
        </div>
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
        {siteConfig.github && (
          <Link href={siteConfig.github} className="group" aria-label="GitHub">
            <GitHubIcon className="h-6 w-6 dark:fill-slate-400 group-hover:fill-slate-500 dark:group-hover:fill-slate-300" />
          </Link>
        )}
        {siteConfig.discord && (
          <Link
            href={siteConfig.discord}
            className="group"
            aria-label="Discord"
          >
            <DiscordIcon className="h-8 w-8 dark:fill-slate-400 group-hover:fill-slate-500 dark:group-hover:fill-slate-300" />
          </Link>
        )}
      </div>
    </header>
  );
}
