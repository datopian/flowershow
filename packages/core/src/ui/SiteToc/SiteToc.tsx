import Link from "next/link.js";
import clsx from "clsx";
import { Disclosure, Transition } from "@headlessui/react";

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

export const SiteToc: React.FC<Props> = ({ currentPath, nav }) => {
  function isActiveItem(item: NavItem) {
    return item.href === currentPath;
  }

  return (
    <nav data-testid="lhs-sidebar" className="flex flex-col space-y-3 text-sm">
      {nav.map((item) =>
        !isNavGroup(item) ? (
          <Link
            key={item.name}
            href={item.href}
            className={clsx(
              isActiveItem(item)
                ? "text-sky-500"
                : "font-normal text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-300",
              "block"
            )}
          >
            {item.name}
          </Link>
        ) : (
          <Disclosure
            as="div"
            className="flex flex-col space-y-3"
            key={item.name}
          >
            {({ open }) => (
              <>
                <Disclosure.Button className="group w-full flex items-center text-left text-md font-medium text-slate-900 dark:text-white">
                  <svg
                    className={clsx(
                      open ? "text-slate-400 rotate-90" : "text-slate-300",
                      "mr-2 h-5 w-5 flex-shrink-0 transform transition-colors duration-150 ease-in-out group-hover:text-slate-400"
                    )}
                    viewBox="0 0 20 20"
                    aria-hidden="true"
                  >
                    <path d="M6 6L14 10L6 14V6Z" fill="currentColor" />
                  </svg>
                  {item.name}
                </Disclosure.Button>
                <Transition
                  enter="transition duration-100 ease-out"
                  enterFrom="transform scale-95 opacity-0"
                  enterTo="transform scale-100 opacity-100"
                  leave="transition duration-75 ease-out"
                  leaveFrom="transform scale-100 opacity-100"
                  leaveTo="transform scale-95 opacity-0"
                >
                  <Disclosure.Panel className="flex flex-col space-y-3">
                    {item.children.map((subItem) => (
                      <Link
                        href={subItem.href}
                        className={clsx(
                          isActiveItem(subItem)
                            ? "text-sky-500"
                            : "text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-300",
                          "block ml-7"
                        )}
                      >
                        {subItem.name}
                      </Link>
                    ))}
                  </Disclosure.Panel>
                </Transition>
              </>
            )}
          </Disclosure>
        )
      )}
    </nav>
  );
};
