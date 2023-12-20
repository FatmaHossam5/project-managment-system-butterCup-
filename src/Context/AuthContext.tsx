import { createContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";



export  const AuthContext = createContext ({});


export default function AuthContextProvider(props:any){

  const [userData, setUserData] = useState(null);
  const[role,setRole]=useState(null)
  

  let reqHeaders={
    Authorization:`Bearer ${localStorage.getItem("userToken")}`
  }
  const baseUrl = "http://upskilling-egypt.com:3003/api/v1";

  const saveUserData = () => {
    const encodedToken:any = localStorage.getItem("userToken");
    const decodedToken:any = jwtDecode(encodedToken)

    setUserData(decodedToken)
    setRole(decodedToken.userGroup)

  };

  useEffect(() => {
    if (localStorage.getItem("userToken")) {
      saveUserData();
    }
  }, []);


  return (
    <AuthContext.Provider value={{userData,saveUserData,baseUrl,reqHeaders,role}}>
      {props.children}
    </AuthContext.Provider>
  );
}
