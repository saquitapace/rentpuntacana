import __stayListing from "./jsons/__stayListing.json";
import { DEMO_AUTHORS } from "./authors";
import { Route } from "@/routers/types";

const DEMO_STAY_LISTINGS = __stayListing.map((post, index): StayDataType => {
  
  return {
    ...post,
    id: (post.id).toString(), //`stayListing_${post.id}_`,
    saleOff: !index ? "-20% today" : post.saleOff,
    isAds: !index ? true : post.isAds,
    author: DEMO_AUTHORS.filter((user) => user.id === post.authorId)[0],
    listingCategory: '',
    href: post.href as Route,
  };
});

export { DEMO_STAY_LISTINGS };
