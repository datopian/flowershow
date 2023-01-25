import Head from "next/head.js";
import Link from "next/link.js";
import { useEffect, useState } from "react";
import clsx from "clsx";

import { useTableOfContents } from "./useTableOfContents";
import { collectHeadings } from "../../utils";
import { Nav } from "../Nav";
import { NavConfig, AuthorConfig, ThemeConfig, isNavDropdown } from "../types";
import { NextRouter, useRouter } from "next/router.js";

interface Props extends React.PropsWithChildren {
  nav: NavConfig;
  author: AuthorConfig;
  theme: ThemeConfig;
  showToc: boolean;
  showEditLink: boolean;
  showSidebar: boolean;
  url_path: string;
  edit_url?: string;
}

interface Page {
  slug: string;
  url_path: string;
  title?: string;
}

export const Layout: React.FC<Props> = ({
  children,
  nav,
  author,
  theme,
  showEditLink,
  showToc,
  showSidebar,
  url_path,
  edit_url,
}) => {
  const [tableOfContents, setTableOfContents] = useState([] as any); // TODO types
  const [sitemap, setSitemap] = useState<Page[]>([]);
  const currentSection = useTableOfContents(tableOfContents);
  const router: NextRouter = useRouter();

  useEffect(() => {
    if (!showToc) return;
    const headingNodes: NodeListOf<HTMLHeadingElement> =
      document.querySelectorAll("h1,h2,h3");
    const toc = collectHeadings(headingNodes);
    setTableOfContents(toc ?? []);
  }, [router.asPath, showToc]); // update table of contents on route change with next/link

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("/search.json");
      const json = await res.json();
      setSitemap(json);
    };
    fetchData();
  }, [showSidebar]);

  function isActiveSection(section) {
    if (section.id === currentSection) {
      return true;
    }
    if (!section.children) {
      return false;
    }
    return section.children.findIndex(isActiveSection) > -1;
  }

  function isActivePath(path) {
    return path === url_path;
  }

  return (
    <>
      <Head>
        <link
          rel="icon"
          href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>💐</text></svg>"
        />
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <div className="min-h-screen bg-background dark:bg-background-dark">
        {/* TODO logic for picking title */}
        <Nav
          title={nav.title}
          logo={nav.logo}
          links={nav.links}
          search={nav.search}
          social={nav.social}
          defaultTheme={theme.defaultTheme}
          themeToggleIcon={theme.themeToggleIcon}
        />
        {/* sidebar and content wrapper */}
        <div className="flex flex-grow px-4 py-5 sm:px-6 lg:px-8 max-w-full">
          {showSidebar && (
            <div className="hidden md:fixed md:inset-y-0 md:top-[81px] md:flex md:w-64 md:flex-col">
              <div className="flex min-h-0 flex-1 flex-col border-r border-gray-200 bg-white">
                <div className="flex flex-1 flex-col overflow-y-auto pt-5 pb-4">
                  <nav className="mt-5 flex-1 space-y-1 bg-white px-2">
                    {sitemap.map((item) => (
                      <Link
                        key={item.url_path}
                        href={item.url_path}
                        className={clsx(
                          isActivePath(item.url_path)
                            ? "bg-gray-100 text-gray-900"
                            : "text-gray-600 hover:bg-gray-50 hover:text-gray-900",
                          "group flex items-center px-2 py-2 text-sm font-medium rounded-md"
                        )}
                      >
                        {item.title ?? item.slug}
                      </Link>
                    ))}
                  </nav>
                </div>
              </div>
            </div>
          )}
          <div className="relative mx-auto">
            <main className="flex-auto">
              {children}
              {showEditLink && edit_url && (
                <div className="mb-10 prose dark:prose-invert p-6 mx-auto">
                  <a
                    className="flex no-underline font-semibold justify-center"
                    href={edit_url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Edit this page
                    <span className="mx-1">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                        />
                      </svg>
                    </span>
                  </a>
                </div>
              )}
            </main>
          </div>
        </div>
        <footer className="bg-background dark:bg-background-dark prose dark:prose-invert max-w-none flex flex-col items-center justify-center w-full h-auto pt-10 pb-20">
          <div className="flex w-full flex-wrap justify-center">
            {nav.links.map(
              (item) =>
                !isNavDropdown(item) && (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="inline-flex items-center mx-4 px-1 pt-1 font-regular hover:text-slate-300 no-underline"
                  >
                    {/* TODO aria-current={item.current ? "page" : undefined} */}
                    {item.name}
                  </Link>
                )
            )}
          </div>
          <p className="flex items-center justify-center">
            Created by
            <a
              href={author.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center no-underline"
            >
              {author.logo && (
                <img
                  src={author.logo}
                  alt={author.name}
                  className="my-0 h-6 block"
                />
              )}
              {author.name}
            </a>
          </p>
          <p className="flex items-center justify-center">
            Made with
            <a
              href="https://flowershow.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center no-underline"
            >
              <img
                src="https://flowershow.app/assets/images/logo.svg"
                alt="Flowershow"
                className="my-0 h-6 block"
              />
              Flowershow
            </a>
          </p>
        </footer>
      </div>
      {/** TABLE OF CONTENTS */}
      {showToc && tableOfContents.length > 0 && (
        <div className="hidden xl:fixed xl:right-0 xl:top-[4.5rem] xl:block xl:w-1/5 xl:h-[calc(100vh-4.5rem)] xl:flex-none xl:overflow-y-auto xl:py-16 xl:pr-6 xl:mb-16">
          <nav aria-labelledby="on-this-page-title" className="w-56">
            <h2 className="font-display text-md font-medium text-slate-900 dark:text-white">
              On this page
            </h2>
            <ol className="mt-4 space-y-3 text-sm">
              {tableOfContents.map((section) => (
                <li key={section.id}>
                  <h3>
                    <Link
                      href={`#${section.id}`}
                      className={
                        isActiveSection(section)
                          ? "text-sky-500"
                          : "font-normal text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-300"
                      }
                    >
                      {section.title}
                    </Link>
                  </h3>
                  {section.children && section.children.length > 0 && (
                    <ol className="mt-2 space-y-3 pl-5 text-slate-500 dark:text-slate-400">
                      {section.children.map((subSection) => (
                        <li key={subSection.id}>
                          <Link
                            href={`#${subSection.id}`}
                            className={
                              isActiveSection(subSection)
                                ? "text-sky-500"
                                : "hover:text-slate-600 dark:hover:text-slate-300"
                            }
                          >
                            {subSection.title}
                          </Link>
                          {subSection.children &&
                            subSection.children.length > 0 && (
                              <ol className="mt-2 space-y-3 pl-5 text-slate-500 dark:text-slate-400">
                                {subSection.children.map((thirdSection) => (
                                  <li key={thirdSection.id}>
                                    <Link
                                      href={`#${thirdSection.id}`}
                                      className={
                                        isActiveSection(thirdSection)
                                          ? "text-sky-500"
                                          : "hover:text-slate-600 dark:hover:text-slate-300"
                                      }
                                    >
                                      {thirdSection.title}
                                    </Link>
                                  </li>
                                ))}
                              </ol>
                            )}
                        </li>
                      ))}
                    </ol>
                  )}
                </li>
              ))}
            </ol>
          </nav>
        </div>
      )}
    </>
  );
};
