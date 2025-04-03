import {createContext, useState} from "react";
export const UserProfileContext=createContext()

export const UserProfileProvider=({children})=>{
    const [currentUserProfile, setcurrentUserProfile]=useState("")

    return (
  <UserProfileContext.Provider>
    {children}
  </UserProfileContext.Provider>
    )
}