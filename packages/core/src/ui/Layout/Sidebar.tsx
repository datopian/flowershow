import Link from "next/link.js";
import clsx from "clsx";

export interface PageLink {
  slug: string;
  url_path: string;
  title?: string;
}

interface Props {
  currentPath: string;
  siteMap: PageLink[];
}

export const Sidebar: React.FC<Props> = ({ currentPath, siteMap }) => {
  function isActivePath(path: string) {
    return path === currentPath;
  }

  return (
    <nav data-testid="lhs-sidebar">
      {siteMap.map((item) => (
        <Link
          key={item.url_path}
          href={item.url_path}
          className={clsx(
            isActivePath(item.url_path)
              ? "text-sky-500"
              : "font-normal text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-300",
            "group flex items-center px-2 py-2 text-sm font-medium rounded-md"
          )}
        >
          {item.title ?? item.slug}
        </Link>
      ))}
    </nav>
  );
};
