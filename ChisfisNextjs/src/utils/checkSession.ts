"use client";
import { useState, useEffect} from "react";
//import { useRouter } from "next/router";
import { usePathname } from "next/navigation";

// TODO:  NEED TO CREATE AN AUTHENTICATION PRIVATE COMPONENT
// TO HANDLE THE AUTHENTICAION AND REDIRECT / WRAPPER

export const checkSession = () => {
   const[activeUser, setActiveUser] = useState(false);
  // const router = useRouter(); // router cannot be used because component header may not have mounted
   const pathname = usePathname();

    useEffect(() => {
        setActiveUser(sessionStorage.getItem('user') ? true : false);
    })

   /* if(!activeUser){
        if(pathname == "/author" ||
            pathname == "/account" ||
            pathname == "/account-password" ||
            pathname == "/account-savelists" ||
            pathname == "/account-billing" 
        ){
            console.log("redirect user to home");
            window.location.href = "/";
        }
    } */
 return activeUser;
}