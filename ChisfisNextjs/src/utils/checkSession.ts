"use client";
import {useState, useEffect} from "react";

export const checkSession = () => {
   const[activeUser, setActiveUser] = useState(false);
    
    useEffect(() => {
        setActiveUser(sessionStorage.getItem('user') ? true : false);
    })

    return activeUser;
}