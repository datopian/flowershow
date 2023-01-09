import { Menu, Transition } from "@headlessui/react";
import Link from "next/link.js";
import { Fragment, useRef, useState } from "react";

import { BaseLink } from "../Base";

import { NavLink, NavDropdown, isNavDropdown } from "../types";

interface Props {
  link: NavLink | NavDropdown;
}

export const NavItem: React.FC<Props> = ({ link }) => {
  const dropdownRef = useRef(null);
  const [showDropdown, setshowDropdown] = useState(false);

  const timeoutDuration = 200;
  let timeoutId;

  const openDropdown = () => {
    clearTimeout(timeoutId);
    setshowDropdown(true);
  };
  const closeDropdown = () => {
    timeoutId = setTimeout(() => setshowDropdown(false), timeoutDuration);
  };

  return (
    <Menu as="div" className="relative">
      <Menu.Button
        onClick={() => setshowDropdown(!showDropdown)}
        onMouseEnter={openDropdown}
        onMouseLeave={closeDropdown}
      >
        {!isNavDropdown(link) ? (
          <Link
            href={link.href}
            className="text-slate-500 inline-flex items-center mr-2 px-1 pt-1 text-sm font-medium hover:text-slate-600"
          >
            {link.name}
          </Link>
        ) : (
          <div className="text-slate-500 inline-flex items-center mr-2 px-1 pt-1 text-sm font-medium hover:text-slate-600 fill-slate-500 hover:fill-slate-600">
            {link.name}
          </div>
        )}
      </Menu.Button>

      {isNavDropdown(link) && (
        <Transition
          as={Fragment}
          show={showDropdown}
          enter="transition ease-out duration-200"
          enterFrom="transform opacity-0 scale-5"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-5"
        >
          <Menu.Items
            className="absolute top-5 flex flex-col dark:bg-slate-900/95 backdrop-blur"
            ref={dropdownRef}
            onMouseEnter={openDropdown}
            onMouseLeave={closeDropdown}
          >
            {link.subItems.map(({ name, href }) => (
              <Menu.Item key={name}>
                <BaseLink
                  href={href}
                  onClick={() => setshowDropdown(false)}
                  className="text-slate-500 inline-flex items-center mt-2 px-1 pt-1 text-sm font-medium hover:text-slate-600"
                >
                  {name}
                </BaseLink>
              </Menu.Item>
            ))}
          </Menu.Items>
        </Transition>
      )}
    </Menu>
  );
};
