"use client";

import { Popover, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/24/solid";
import { GlobeAltIcon } from "@heroicons/react/24/outline";
import { FC, Fragment, useEffect, useState } from "react";
import translation2 from "@/utils/translation2";

export const headerLanguage = [
  {
    id: "English",
    name: "English",
    description: "United State",
    lang: "Eng",
    code :"en",
    active: false,
  },
  {
    id: "Spanish",
    name: "Spanish",
    description: "D. Republic",
    lang: "Spg",
    code :"sp",
    active: false,
  }
];

interface LangDropdownProps {
  panelClassName?: string;
}

const LangDropdown: FC<LangDropdownProps> = ({
  panelClassName = "z-10 w-screen max-w-[280px] px-4 mt-4 right-0 sm:px-0",
}) => {

{/*}
window.addEventListener("languagechange", () => {
  alert(1)
  console.log("languagechange event detected!");
});

window.onlanguagechange = (event) => {
  alert(2)
  console.log("languagechange event detected!");
}; */}

const [userPref,setUserPref]= useState('');
const [lang, setLang]= useState(''); // display Eng or Spg in header
const [langPref, setLangPref]= useState('');

useEffect(()=>{
  const localSvalue = localStorage.getItem("langPref"); // check to see if it is set in local storage
  const userLang = navigator.language; // getting brower language if it isnt stored in storage

  if(localSvalue ==""){
    console.log("local storage language is not set");
    if(userLang.includes("en")){
      console.log("found en in users browser");
      headerLanguage[0].active = true;
      setLang(headerLanguage[0].lang);
    } else {
      headerLanguage[1].active = true;
      setLang(headerLanguage[1].lang);
    }
  } else {
    console.log("local storage language is set:", localSvalue);
    setUserPref(localSvalue);
    if(localSvalue=="en"){
      headerLanguage[0].active=true;
      setLang(headerLanguage[0].lang);
    } else {
      headerLanguage[1].active=true;
      setLang(headerLanguage[1].lang); 
    }
  }
},[]);

  const handleChange = (item) => {
    localStorage.setItem("langPref", item.code);
    if(item.code=="en"){
      headerLanguage[0].active=true;
      setLang(headerLanguage[0].lang);
    } else {
      headerLanguage[1].active=true;
      setLang(headerLanguage[1].lang); 
    }
    console.log("calling service and updating local storage selected language strings")
    translation2.init();
  };
  
  return (
    <div className="LangDropdown">
      <Popover className="relative">
        {({ open, close }) => (
          <>
            <Popover.Button
              className={`
                ${open ? "" : "text-opacity-80"}
             group px-3 py-1.5 border-neutral-300 hover:border-neutral-400 dark:border-neutral-700 rounded-full inline-flex items-center text-sm text-gray-700 dark:text-neutral-300 font-medium hover:text-opacity-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75`}
            >
              {/*<GlobeAltIcon className="w-[18px] h-[18px] opacity-80" /> */}
              <GlobeAltIcon className="h-6 w-6" />

              <span className="ml-2 select-none">{lang}</span>
              <ChevronDownIcon
                className={`${open ? "-rotate-180" : "text-opacity-70"}
                  ml-2 h-4 w-4  group-hover:text-opacity-80 transition ease-in-out duration-150`}
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
                    {headerLanguage.map((item, index) => (
                      <a
                        key={index}
                        lang={item.lang}
                        onClick={(e) => {
                          e.preventDefault();
                          handleChange(item);
                          close();
                        }}
                        className={`flex items-center p-2 -m-3 transition duration-150 ease-in-out rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-700 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50 ${
                          item.active
                            ? "bg-gray-100 dark:bg-neutral-700"
                            : "opacity-80"
                        }`}
                      >
                        <div className="">
                          <p className="text-sm font-medium ">{item.name}</p>
                          <p className="text-xs text-gray-500 dark:text-neutral-400">
                            {item.description}
                          </p>
                        </div>
                      </a>
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
