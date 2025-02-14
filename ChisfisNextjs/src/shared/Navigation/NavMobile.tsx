"use client";
import React from "react";
import ButtonClose from "@/shared/ButtonClose";
import Logo from "@/shared/Logo";
import { Disclosure } from "@headlessui/react";
import { NavItemType } from "./NavigationItem";
import { NAVIGATION_DEMO } from "@/data/navigation";
// import ButtonPrimary from "@/shared/ButtonPrimary";
// import SocialsList from "@/shared/SocialsList";

import NotifyDropdown from "@/app/(client-components)/(Header)/components/NotifyDropdown";
import AvatarDropdown from "@/app/(client-components)/(Header)/components/AvatarDropdown";
import LangDropdownSingle from "@/app/(client-components)/(Header)/components/LangDropdownSingle";

import { ChevronDownIcon } from "@heroicons/react/24/solid";

import Link from "next/link";

export interface NavMobileProps {
  data?: NavItemType[];
  onClickClose?: () => void;
}

const NavMobile: React.FC<NavMobileProps> = ({
  data = NAVIGATION_DEMO,
  onClickClose,
}) => {
  const _renderMenuChild = (item: NavItemType) => {
    return (
      <ul className="nav-mobile-sub-menu pl-6 pb-1 text-base">
        {item.children?.map((i, index) => (
          <Disclosure key={i.href + index} as="li">
            <Link
              href={{
                pathname: i.href || undefined,
              }}
              className="flex px-4 text-neutral-900 dark:text-neutral-200 text-sm font-medium rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 mt-0.5"
            >
              <span
                className={`py-2.5 pr-3 ${!i.children ? "block w-full" : ""}`}
              >
                {i.name}
              </span>
              {i.children && (
                <span
                  className="flex-1 flex"
                  onClick={(e) => e.preventDefault()}
                >
                  <Disclosure.Button
                    as="span"
                    className="py-2.5 flex justify-end flex-1"
                  >
                    <ChevronDownIcon
                      className="ml-2 h-4 w-4 text-neutral-500"
                      aria-hidden="true"
                    />
                  </Disclosure.Button>
                </span>
              )}
            </Link>
            {i.children && (
              <Disclosure.Panel>{_renderMenuChild(i)}</Disclosure.Panel>
            )}
          </Disclosure>
        ))}
      </ul>
    );
  };

  const _renderItem = (item: NavItemType, index: number) => {
    return (
      <Disclosure
        key={item.id}
        as="li"
        className="text-neutral-900 dark:text-white"
      >
        <Link
          className="flex w-full px-4 font-medium uppercase tracking-wide text-sm hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-lg"
          href={{
            pathname: item.href || undefined,
          }}
        >
          <span
            className={`py-2.5 pr-3 ${!item.children ? "block w-full" : ""}`}
          >
            {item.name}
          </span>
          {item.children && (
            <span className="flex-1 flex" onClick={(e) => e.preventDefault()}>
              <Disclosure.Button
                as="span"
                className="py-2.5 flex items-center justify-end flex-1 "
              >
                <ChevronDownIcon
                  className="ml-2 h-4 w-4 text-neutral-500"
                  aria-hidden="true"
                />
              </Disclosure.Button>
            </span>
          )}
        </Link>
        {item.children && (
          <Disclosure.Panel>{_renderMenuChild(item)}</Disclosure.Panel>
        )}
      </Disclosure>
    );
  };

  return (
    <div className="overflow-y-auto w-full h-screen py-2 transition transform shadow-lg ring-1 dark:ring-neutral-700 bg-white dark:bg-neutral-900 divide-y-2 divide-neutral-100 dark:divide-neutral-800">
      <div className="py-6 px-5">
        <Logo />
        <span className="absolute right-2 top-2 p-1">
          <ButtonClose onClick={onClickClose} />
        </span>
      </div>
      <ul className="flex flex-col py-6 px-2 space-y-1">
        {data.map(_renderItem)}
      </ul>
      <div className="flex items-center justify-between py-6 px-5">

        <LangDropdownSingle
          panelClassName="w-screen px-0"
        />
      </div>
      <div className="flex items-center justify-between py-6 px-5">
        <NotifyDropdown />
        </div>
        <div className="flex items-center justify-between py-6 px-5">

        <AvatarDropdown handleSignOut={function (): Promise<void> {
          throw new Error("Function not implemented.");
        } } /> 
      </div>
    </div>
  );
};

export default NavMobile;
