import Link from "next/link.js";
import clsx from "clsx";
import { Disclosure } from "@headlessui/react";

export interface NavItem {
  name: string;
  href: string;
}

export interface NavGroup {
  name: string;
  children: Array<NavItem>;
}

interface Props {
  currentPath: string;
  nav: Array<NavItem | NavGroup>;
}

function isNavGroup(item: NavItem | NavGroup): item is NavGroup {
  return (item as NavGroup).children !== undefined;
}

export const Sidebar: React.FC<Props> = ({ currentPath, nav }) => {
  function isActiveItem(item: NavItem) {
    return item.href === currentPath;
  }

  /* function isActiveGroup(group: NavGroup): boolean {
   *   return (
   *     group.children.length > 0 &&
   *     group.children.some((item) => item.href === currentPath)
   *   );
   * } */

  return (
    <nav data-testid="lhs-sidebar">
      {nav.map((item) =>
        !isNavGroup(item) ? (
          <div key={item.name}>
            <Link
              href={item.href}
              className={clsx(
                isActiveItem(item)
                  ? "text-sky-500"
                  : "font-normal text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-300",
                "group flex items-center px-2 py-2 text-sm font-medium rounded-md"
              )}
            >
              {item.name}
            </Link>
          </div>
        ) : (
          <Disclosure as="div" key={item.name} className="space-y-1">
            {({ open }) => (
              <>
                <Disclosure.Button className="group w-full flex items-center pr-2 py-2 text-left text-sm font-medium rounded-md">
                  <svg
                    className={clsx(
                      open ? "text-gray-400 rotate-90" : "text-gray-300",
                      "mr-2 h-5 w-5 flex-shrink-0 transform transition-colors duration-150 ease-in-out group-hover:text-gray-400"
                    )}
                    viewBox="0 0 20 20"
                    aria-hidden="true"
                  >
                    <path d="M6 6L14 10L6 14V6Z" fill="currentColor" />
                  </svg>
                  {item.name}
                </Disclosure.Button>
                <Disclosure.Panel className="space-y-1">
                  {item.children.map((subItem) => (
                    <Link
                      key={subItem.name}
                      href={subItem.href}
                      className="group flex w-full items-center rounded-md py-2 pl-10 pr-2 text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                    >
                      {subItem.name}
                    </Link>
                  ))}
                </Disclosure.Panel>
              </>
            )}
          </Disclosure>
        )
      )}
    </nav>
  );
};
