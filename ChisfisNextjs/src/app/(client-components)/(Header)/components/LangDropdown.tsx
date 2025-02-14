"use client";

import { Popover, Tab, Transition } from "@headlessui/react";
import { FC, Fragment, useEffect, useState } from "react";
import { fetchTranslations, setLanguagePreference } from "@/store/slices/translationsSlice";
import { fetchCurrencies, setCurrencyPreference } from "@/store/slices/currencySlice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import {
  GlobeAltIcon,
  ChevronDownIcon,
  CurrencyDollarIcon,
  CurrencyBangladeshiIcon,
  CurrencyEuroIcon,
  CurrencyPoundIcon,
  CurrencyRupeeIcon,
  BanknotesIcon,
  
} from "@heroicons/react/24/outline";
import { getCurrPref, getLangPref } from "@/utils/helpers";

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
    description: "Dom. Republic",
    lang: "Spg",
    code: "sp",
    active: false,
  },
];

export const headerCurrency = [
  {
    id: "USD",
    name: "USD",
    code: "USD",
    icon: CurrencyDollarIcon,
    active: false,
  },
  {
    id: "DOP",
    name: "DOP",
    code: "DOP",
    icon: CurrencyDollarIcon,
    active: false
  },
  {
    id: "CAD",
    name: "CAD",
    code: "CAD",
    icon: CurrencyDollarIcon,
    active: false
  },
  {
    id: "EUR",
    name: "EUR",
    code: "EUR",
    icon: CurrencyEuroIcon,
    active: false
  },{
    id: "INR",
    name: "INR",
    code: "INR",
    icon: CurrencyRupeeIcon,
    active: false
  },
  {
    id: "GBP",
    name: "GBP",
    code: "GBP",
    icon: CurrencyPoundIcon,
    active: false
  },
];
interface LangDropdownProps {
  panelClassName?: string;
  className?: string;
}

function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}

const LangDropdown: FC<LangDropdownProps> = ({
  panelClassName = "top-full right-0 max-w-sm w-96",
  className = "hidden md:flex",
}) => {

  const [langPref, setLangPref] = useState("en");
  const [currPref, setCurrPref] = useState("USD");

  const [languages, setLanguages] = useState(headerLanguage);
  const [currencies, setCurrencies] = useState(headerCurrency);

  const dispatch = useDispatch<AppDispatch>();
  const { translations, isLoading, error } = useSelector((state: RootState) => state.translations);

  // Check if localStorage is available and load the preferred language
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedLangPref = getLangPref();

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

      // currency starts here
      const storedCurrPref = getCurrPref();
      if (!storedCurrPref) 
      {
          localStorage.setItem("currPref","USD");
          updateActiveCurrency("USD");
      } else {
          setCurrPref(storedCurrPref);
          dispatch(fetchCurrencies(storedCurrPref));
          updateActiveCurrency(storedCurrPref);
      }
    }
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchTranslations(getLangPref()) );
    //alert(1);
  }, [dispatch]);

  const updateActiveCurrency = (currCode: string) => {
    setCurrencies((prevCurrencies) =>
      prevCurrencies.map((item) => ({
        ...item,
        active: item.code === currCode, 
      }))
    );
  };

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

  const handleCurrencyChange = (currCode: string) => {

    if(currCode == currPref){
      return;
    } else {
      localStorage.setItem("currPref", currCode);
    }
     setCurrPref(currCode);
     dispatch(setCurrencyPreference(currCode));
     dispatch(fetchCurrencies(currCode));
     updateActiveCurrency(currCode);
  }

  const renderLang = (close: () => void) => {
    return (
      <div className="LangDropdown grid gap-8 lg:grid-cols-2">
        {/* {headerLanguage.map((item, index) => (
          <a
            key={index}
            href={item.href}
            onClick={() => close()}
            className={`flex items-center p-2 -m-3 transition duration-150 ease-in-out rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50 ${
              item.active ? "bg-gray-100 dark:bg-gray-700" : "opacity-80"
            }`}
          >
            <div className="">
              <p className="text-sm font-medium ">{item.name}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {item.description}
              </p>
            </div>
          </a>
        ))} */}

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
    );
  };

  const renderCurr = (close: () => void) => {
    return (
      <div className="grid gap-7 lg:grid-cols-2">
        {currencies.map((item, index) => (
          <button
            key={item.id}
            onClick={(e) => {
              e.preventDefault();
              handleCurrencyChange(item.code);
              close();
            }}
            className={`flex items-center p-2 -m-3 transition duration-150 ease-in-out rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50 ${
              item.active ? "bg-gray-100 dark:bg-gray-700" : "opacity-80"
            }`}
          >
            <item.icon className="w-[18px] h-[18px] " />
            <p className="ml-2 text-sm font-medium ">{item.name}</p>
          </button>
        ))}
      </div>
    );
  };

  return (
    <>
      <Popover className={`LangDropdown relative ${className}`}>
        {({ open, close }) => (
          <>
            <Popover.Button
              className={`
                ${open ? "" : "text-opacity-80"}
             group px-3 py-1.5 border-neutral-300 hover:border-neutral-400 dark:border-neutral-700 rounded-full inline-flex items-center text-sm text-gray-700 dark:text-neutral-300 font-medium hover:text-opacity-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75`}
            >
              <span className="ml-2 select-none">{headerLanguage.find((lang) => lang.code === langPref)?.lang || "Eng"}</span>
              <GlobeAltIcon className="w-6 h-6 opacity-80" />
              <span className="mx-1">/</span>
              <span className="ml-2 select-none">{headerCurrency.find((curr) => curr.code === currPref)?.code || "USD"}</span>
              <BanknotesIcon className="w-6 h-6 opacity-80" />
              <ChevronDownIcon
                className={`${open ? "-rotate-180" : "text-opacity-70"}
                  ml-1 h-4 w-4  group-hover:text-opacity-80 transition ease-in-out duration-150`}
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
              <Popover.Panel className={`absolute z-20  ${panelClassName}`}>
                <div className="p-3 sm:p-6 rounded-2xl bg-white dark:bg-neutral-800 shadow-lg ring-1 ring-black ring-opacity-5">
                  <Tab.Group>
                    <Tab.List className="flex space-x-1 rounded-full bg-gray-100 dark:bg-slate-700 p-1">
                      {["Language", "Currency"].map((category) => (
                        <Tab
                          key={category}
                          className={({ selected }) =>
                            classNames(
                              "w-full rounded-full py-2 text-sm font-medium leading-5 text-gray-700",
                              "focus:outline-none focus:ring-0",
                              selected
                                ? "bg-white shadow"
                                : "text-gray-700 dark:text-slate-300 hover:bg-white/70 dark:hover:bg-slate-900/40"
                            )
                          }
                        >
                          {category}
                        </Tab>
                      ))}
                    </Tab.List>
                    <Tab.Panels className="mt-5">
                      <Tab.Panel
                        className={classNames(
                          "rounded-xl p-3",
                          "focus:outline-none focus:ring-0"
                        )}
                      >
                        {renderLang(close)}
                      </Tab.Panel>
                      <Tab.Panel
                        className={classNames(
                          "rounded-xl p-3",
                          "focus:outline-none focus:ring-0"
                        )}
                      >
                        {renderCurr(close)}
                      </Tab.Panel>
                    </Tab.Panels>
                  </Tab.Group>
                </div>
              </Popover.Panel>
            </Transition>
          </>
        )}
      </Popover>
    </>
  );
};
export default LangDropdown;
