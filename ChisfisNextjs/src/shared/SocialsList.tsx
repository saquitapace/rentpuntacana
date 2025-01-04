import { SocialType } from "@/shared/SocialsShare";
import React, { FC } from "react";

export interface SocialsListProps {
  className?: string;
  itemClass?: string;
  socials?: string[] //SocialType[];
}

const socialsDemo: SocialType[] = [
  { name: "Facebook", icon: "lab la-facebook-square", href: "#" },
  { name: "Twitter", icon: "lab la-twitter", href: "#" },
  { name: "Youtube", icon: "lab la-youtube", href: "#" },
  { name: "Instagram", icon: "lab la-instagram", href: "#" },
];

const SocialsList: FC<SocialsListProps> = ({
  className = "",
  itemClass = "block",
  socials = [],
}) => {

function getIcon(social){
  let icon = "";
  switch(social) {
    case "facebook":
      icon = "lab la-facebook-square";
    break;
    case "instagram":
      icon = "lab la-instagram";
    break;
    case "youtube":
      icon = "lab la-youtube";
    break;
    case "website":
      icon = "globe icon goes here";
    break;
  }
  return icon;
}


  return (
    <nav
      className={`nc-SocialsList flex space-x-2.5 text-2xl text-neutral-6000 dark:text-neutral-300 ${className}`}
      data-nc-id="SocialsList"
    >
      {socialsDemo.map((item, i) => (
        <a
          key={i}
          className={`${itemClass}`}
          href={item.href}
          target="_blank"
          rel="noopener noreferrer"
          title={item.name}
        >
          <i className={getIcon(item.name)}></i>
        </a>
      ))}
    </nav>
  );
};

export default SocialsList;
