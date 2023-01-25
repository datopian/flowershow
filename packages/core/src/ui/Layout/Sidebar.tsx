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
    <nav className="">
      {siteMap.map((item) => (
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
  );
};
