import { Dialog, Menu, Transition } from "@headlessui/react";
import Link from "next/link.js";
import { useRouter } from "next/router.js";
import { Fragment, useEffect, useState } from "react";

import { SearchContext, SearchField } from "../Search";
import { BaseLink } from "../Base";
import { MenuIcon, CloseIcon } from "../Icons";
import {
  NavLink,
  NavDropdown,
  isNavDropdown,
  SearchProviderConfig,
} from "../types";

interface Props {
  author?: string;
  links?: Array<NavLink | NavDropdown>;
  search?: SearchProviderConfig;
}

// TODO why mobile navigation only accepts author and regular nav accepts different things like title, logo, version
export const NavMobile: React.FC<Props> = ({ links, search, author }) => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [Search, setSearch] = useState<any>(); // TODO types

  useEffect(() => {
    if (!isOpen) return;

    function onRouteChange() {
      setIsOpen(false);
    }

    router.events.on("routeChangeComplete", onRouteChange);
    router.events.on("routeChangeError", onRouteChange);

    return () => {
      router.events.off("routeChangeComplete", onRouteChange);
      router.events.off("routeChangeError", onRouteChange);
    };
  }, [router, isOpen]);

  useEffect(() => {
    if (search) {
      setSearch(SearchContext(search.provider));
    }
  }, [search]);

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="relative"
        aria-label="Open navigation"
      >
        <MenuIcon className="h-6 w-6 stroke-slate-500" />
      </button>
      <Dialog
        open={isOpen}
        onClose={setIsOpen}
        className="fixed inset-0 z-50 flex items-start overflow-y-auto bg-background-dark/50 pr-10 backdrop-blur lg:hidden"
        aria-label="Navigation"
      >
        <Dialog.Panel className="relative min-h-full w-full max-w-xs bg-background px-4 pt-5 pb-12 dark:bg-background-dark sm:px-6">
          <div className="flex items-center mb-6">
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              aria-label="Close navigation"
            >
              <CloseIcon className="h-6 w-6 stroke-slate-500" />
            </button>
            <Link
              href="/"
              className="ml-6"
              aria-label="Home page"
              legacyBehavior
            >
              {/* <Logomark className="h-9 w-9" /> */}
              <div className="font-extrabold text-primary dark:text-primary-dark text-2xl ml-6">
                {author}
              </div>
            </Link>
          </div>
          {Search && (
            <Search>
              {({ query }: any) => <SearchField mobile onOpen={query.toggle} />}
            </Search>
          )}
          {links && (
            <ul className="mt-2 space-y-2 border-l-2 border-slate-100 dark:border-slate-800 lg:mt-4 lg:space-y-4 lg:border-slate-200">
              {links.map((link) => (
                <Menu as="div" key={link.name} className="relative">
                  <Menu.Button>
                    {!isNavDropdown(link) ? (
                      <li key={link.href}>
                        <Link
                          href={link.href}
                          className={`
                  block w-full pl-3.5 before:pointer-events-none before:absolute before:-left-1 before:top-1/2 before:h-1.5 before:w-1.5 before:-translate-y-1/2 before:rounded-full text-slate-500 before:hidden before:bg-slate-300 hover:text-slate-600 hover:before:block dark:text-slate-400 dark:before:bg-slate-700 dark:hover:text-slate-300`}
                        >
                          {link.name}
                        </Link>
                      </li>
                    ) : (
                      <li key={link.name}>
                        <div className="flex w-full pl-3.5 before:pointer-events-none before:absolute before:-left-1 before:top-1/2 before:h-1.5 before:w-1.5 before:-translate-y-1/2 before:rounded-full text-slate-500 before:hidden before:bg-slate-300 hover:text-slate-600 hover:before:block dark:text-slate-400 dark:before:bg-slate-700 dark:hover:text-slate-300 dark:hover:fill-slate-300 fill-slate-500 hover:fill-slate-600">
                          {link.name}
                          <svg
                            height="20"
                            viewBox="0 0 20 20"
                            width="20"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path d="M7 10l5 5 5-5z" />
                          </svg>
                        </div>
                      </li>
                    )}
                  </Menu.Button>
                  {isNavDropdown(link) && (
                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-200"
                      enterFrom="transform opacity-0 scale-5"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-5"
                    >
                      <Menu.Items className="flex flex-col ml-3">
                        {link.subItems.map((subItem) => (
                          <Menu.Item key={subItem.name}>
                            <BaseLink
                              href={subItem.href}
                              className="text-slate-500 inline-flex items-center mt-2 px-1 pt-1 text-sm font-medium hover:text-slate-600 dark:text-slate-400 dark:hover:text-slate-300"
                            >
                              {subItem.name}
                            </BaseLink>
                          </Menu.Item>
                        ))}
                      </Menu.Items>
                    </Transition>
                  )}
                </Menu>
              ))}
            </ul>
          )}
        </Dialog.Panel>
      </Dialog>
    </>
  );
};
