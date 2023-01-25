import Head from "next/head.js";
import { useEffect, useState } from "react";

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
        <Nav
          title={nav.title}
          logo={nav.logo}
          links={nav.links}
          search={nav.search}
          social={nav.social}
          defaultTheme={theme.defaultTheme}
          themeToggleIcon={theme.themeToggleIcon}
        />
        {/* 3-column wrapper for sidebar, content and toc */}
        <div className="flex">
          {/* SIDEBAR */}
          {showSidebar && <Sidebar currentPath={url_path} siteMap={sitemap} />}
          {/* main content and footer wrapper */}
          <div className="relative mx-auto">
            {/* MAIN CONTENT */}
            <main className="flex-auto">
              {children}
              {/* EDIT THIS PAGE LINK */}
              {showEditLink && edit_url && <EditThisPage url={edit_url} />}
            </main>
            {/* FOOTER */}
            <Footer links={nav.links} author={author} />
          </div>
        </div>
      </div>
      {/** TABLE OF CONTENTS */}
      {showToc && tableOfContents.length > 0 && (
        <div className="hidden xl:fixed xl:right-0 xl:top-[4.5rem] xl:block xl:w-1/5 xl:h-[calc(100vh-4.5rem)] xl:flex-none xl:overflow-y-auto xl:py-16 xl:pr-6 xl:mb-16">
          <TableOfContents
            tableOfContents={tableOfContents}
            currentSection={currentSection}
          />
        </div>
      )}
    </>
  );
};
