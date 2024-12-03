"use client";

import { Popover, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/24/solid";
import { GlobeAltIcon } from "@heroicons/react/24/outline";
import { FC, Fragment, useEffect, useState } from "react";
import { fetchTranslations, setLanguagePreference } from "@/store/slices/translationsSlice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";


export const headerLanguage = [
  {
    id: "English",
    name: "English",
    description: "United States",
    lang: "Eng",
    code: "en",
    active: false,
  },
  {
    id: "Spanish",
    name: "Spanish",
    description: "D. Republic",
    lang: "Spg",
    code: "sp",
    active: false,
  },
];

interface LangDropdownProps {
  panelClassName?: string;
}

const LangDropdown: FC<LangDropdownProps> = ({
  panelClassName = "z-10 w-screen max-w-[280px] px-4 mt-4 right-0 sm:px-0",
}) => {
  const [langPref, setLangPref] = useState("en");
  const [languages, setLanguages] = useState(headerLanguage);
  const dispatch = useDispatch<AppDispatch>();
  const { translations, isLoading, error } = useSelector((state: RootState) => state.translations);

  // Check if localStorage is available and load the preferred language
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedLangPref = localStorage.getItem("langPref");

      if (!storedLangPref) 
      {
        const userLang = navigator.language || 'en';

        // Set the default language based on the user's browser
        if (userLang.includes("en")) {
          updateActiveLanguage("en");
        } else {
          updateActiveLanguage("sp");
        }
      } else {
        setLangPref(storedLangPref);
        dispatch(fetchTranslations(storedLangPref));
        updateActiveLanguage(storedLangPref);
      }
    }
  }, [dispatch]);

  const updateActiveLanguage = (langCode: string) => {
    setLanguages((prevLanguages) =>
      prevLanguages.map((item) => ({
        ...item,
        active: item.code === langCode, 
      }))
    );
  };

  const handleLanguageChange = (langCode: string) => {
    setLangPref(langCode);
    dispatch(setLanguagePreference(langCode));
    dispatch(fetchTranslations(langCode));
    updateActiveLanguage(langCode);
  };

  return (
    <div className="LangDropdown">
      <Popover className="relative">
        {({ open, close }) => (
          <>
            <Popover.Button
              className={`group px-3 py-1.5 border-neutral-300 hover:border-neutral-400 dark:border-neutral-700 rounded-full inline-flex items-center text-sm text-gray-700 dark:text-neutral-300 font-medium hover:text-opacity-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 ${
                open ? "" : "text-opacity-80"
              }`}
            >
              <GlobeAltIcon className="h-6 w-6" />
              <span className="ml-2 select-none">{headerLanguage.find((lang) => lang.code === langPref)?.lang || "Eng"}</span>
              <ChevronDownIcon
                className={`ml-2 h-4 w-4 group-hover:text-opacity-80 transition ease-in-out duration-150 ${
                  open ? "-rotate-180" : "text-opacity-70"
                }`}
                aria-hidden="true"
              />
            </Popover.Button>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-200"
              enterFrom="opacity-0 translate-y-1"
              enterTo="opacity-100 translate-y-0"
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-1"
            >
              <Popover.Panel className={`absolute ${panelClassName}`}>
                <div className="overflow-hidden rounded-2xl shadow-lg ring-1 ring-black ring-opacity-5">
                  <div className="relative grid gap-8 bg-white dark:bg-neutral-800 p-7 lg:grid-cols-2">
                    {languages.map((item) => (
                      <button
                        key={item.id}
                        onClick={(e) => {
                          e.preventDefault();
                          handleLanguageChange(item.code);
                          close();
                        }}
                        className={`flex items-center p-2 -m-3 transition duration-150 ease-in-out rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-700 focus:outline-none ${
                          item.active
                            ? "bg-gray-100 dark:bg-neutral-700"
                            : "opacity-80"
                        }`}
                      >
                        <div>
                          <p className="text-sm font-medium">{item.name}</p>
                          <p className="text-xs text-gray-500 dark:text-neutral-400">
                            {item.description}
                          </p>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </Popover.Panel>
            </Transition>
          </>
        )}
      </Popover>
    </div>
  );
};

export default LangDropdown;