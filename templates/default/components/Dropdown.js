import { useState, Fragment, useRef } from 'react';
import { Menu, Transition } from '@headlessui/react';
import Link from 'next/link';
import { MyLink } from './MyLink';

function Dropdown({ item, router }) {
  const dropdownRef = useRef(null);
  const [openDropdown, setOpenDropdown] = useState(false);
  const [mouseOverButton, setMouseOverButton] = useState(false);
  const [mouseOverMenu, setMouseOverMenu] = useState(false);

  const timeoutDuration = 200;
  let timeoutButton;
  let timeoutMenu;

  const onMouseEnterButton = () => {
    clearTimeout(timeoutButton);
    setOpenDropdown(true);
    setMouseOverButton(true);
  };
  const onMouseLeaveButton = () => {
    timeoutButton = setTimeout(() => setMouseOverButton(false), timeoutDuration);
  };

  const onMouseEnterMenu = () => {
    clearTimeout(timeoutMenu);
    setMouseOverMenu(true);
  };
  const onMouseLeaveMenu = () => {
    timeoutMenu = setTimeout(() => setMouseOverMenu(false), timeoutDuration);
  };
  const show = openDropdown && (mouseOverMenu || mouseOverButton);

  return (
    <Menu as="div" className="relative">
      <Menu.Button
        onClick={() => setOpenDropdown(!openDropdown)}
        onMouseEnter={onMouseEnterButton}
        onMouseLeave={onMouseLeaveButton}>
        {item.hasOwnProperty('href') ? (
          <Link href={item.href}>
            <a
              href={item.href}
              className={`text-slate-500 inline-flex items-center mr-2 px-1 pt-1 text-sm font-medium
                   ${item.href === router.pathname ? 'text-slate-500' : 'hover:text-slate-600'}
                 `}
              aria-current={item.current ? 'page' : undefined}>
              {item.name}
            </a>
          </Link>
        ) : (
          <div
            className={`text-slate-500 inline-flex items-center mr-2 px-1 pt-1 text-sm font-medium hover:text-slate-600 fill-slate-500 hover:fill-slate-600`}>
            {item.name}
          </div>
        )}
      </Menu.Button>

      {item.hasOwnProperty('subItems') && (
        <Transition
          as={Fragment}
          show={show}
          enter="transition ease-out duration-1000"
          enterFrom="transform opacity-0 scale-5"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-5">
          <Menu.Items
            className={`absolute top-5 flex flex-col dark:bg-slate-900/95 backdrop-blur`}
            ref={dropdownRef}
            onMouseEnter={onMouseEnterMenu}
            onMouseLeave={onMouseLeaveMenu}>
            {item.subItems.map((subItem) => (
              <Menu.Item key={subItem.name} onClick={() => setOpenDropdown(false)}>
                <MyLink
                  href={subItem.href}
                  className={`text-slate-500 inline-flex items-center mt-2 px-1 pt-1 text-sm font-medium hover:text-slate-600`}>
                  {subItem.name}
                </MyLink>
              </Menu.Item>
            ))}
          </Menu.Items>
        </Transition>
      )}
    </Menu>
  );
}

export default Dropdown;
