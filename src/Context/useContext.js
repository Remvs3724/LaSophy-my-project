import {createContext, useState, useEffect} from "react";
import axios from "axios";
export const UserContext=createContext()
export const UserProvider=({children})=>{
    const [currentUser,setCurrentUser] = useState("")
    const [currentUserProfile, setcurrentUserProfile]=useState("")
    const [userBookCollects, setUserBookCollects]=useState([])
    const [loadingUser, setLoadingUser] = useState(true);

    useEffect(() => {
      axios.get("http://localhost:5001", { withCredentials: true })
        .then(response => {
          if (response.data.loginOrnot) {
            setCurrentUser(response.data.currentUser);
          } else {
            setCurrentUser(null);
          }
        })
        .catch(error => console.error("Error fetching auth status:", error))
        .finally(() => {
          setLoadingUser(false); // ✅ Now it's done loading
        })
    }, []);

return (
    <UserContext.Provider value={{ 
      currentUser, 
      setCurrentUser, 
      currentUserProfile,
      setcurrentUserProfile,
      userBookCollects, 
      setUserBookCollects,
      loadingUser,
      }}>
      {children}
    </UserContext.Provider>

)
}