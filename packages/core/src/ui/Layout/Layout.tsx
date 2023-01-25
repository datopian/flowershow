import Head from "next/head.js";
import { useEffect, useState } from "react";
import clsx from "clsx";

import { useTableOfContents } from "./useTableOfContents";
import { collectHeadings } from "../../utils";
import { Nav } from "../Nav";
import { Footer } from "./Footer";
import { EditThisPage } from "./EditThisPage";
import { TableOfContents } from "./TableOfContents";
import { Sidebar, PageLink } from "./Sidebar";
import { NavConfig, AuthorConfig, ThemeConfig, TocSection } from "../types";
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
  const [isScrolled, setIsScrolled] = useState(false);
  const [tableOfContents, setTableOfContents] = useState<TocSection[]>([]);
  const [sitemap, setSitemap] = useState<PageLink[]>([]);
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
        {/* NAVBAR */}
        <div
          className={clsx(
            "sticky top-0 z-50 w-full",
            isScrolled
              ? "dark:bg-background-dark/95 bg-background/95 backdrop-blur [@supports(backdrop-filter:blur(0))]:dark:bg-background-dark/75"
              : "dark:bg-background-dark bg-background"
          )}
        >
          <div className="max-w-8xl mx-auto">
            <Nav
              title={nav.title}
              logo={nav.logo}
              links={nav.links}
              search={nav.search}
              social={nav.social}
              defaultTheme={theme.defaultTheme}
              themeToggleIcon={theme.themeToggleIcon}
            />
          </div>
        </div>
        {/* 2 column wrapper for sidebar & content */}
        <div className="max-w-8xl mx-auto px-4 md:px-8">
          {/* SIDEBAR */}
          {showSidebar && (
            <div className="hidden lg:block fixed z-20 inset-0 top-[3.8125rem] left-[max(0px,calc(50%-45rem))] right-auto w-[19.5rem] pb-10 px-8 overflow-y-auto">
              <Sidebar currentPath={url_path} siteMap={sitemap} />
            </div>
          )}
          {/* MAIN CONTENT & FOOTER */}
          <div className="lg:pl-[19.5rem]">
            <div className="max-w-3xl mx-auto pt-10 xl:max-w-none xl:ml-0 xl:mr-[15.5rem] xl:pr-16">
              <div className="relative mx-auto">
                <main className="flex-auto">
                  {children}
                  {/* EDIT THIS PAGE LINK */}
                  {showEditLink && edit_url && <EditThisPage url={edit_url} />}
                </main>
                <Footer links={nav.links} author={author} />
                {/** TABLE OF CONTENTS */}
                {showToc && tableOfContents.length > 0 && (
                  <div className="fixed z-20 top-[3.8125rem] bottom-0 right-[max(0px,calc(50%-45rem))] w-[19.5rem] py-10 overflow-y-auto hidden xl:block">
                    <TableOfContents
                      tableOfContents={tableOfContents}
                      currentSection={currentSection}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
