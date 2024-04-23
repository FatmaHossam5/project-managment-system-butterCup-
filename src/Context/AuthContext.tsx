import React, { createContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

interface UserData{
id:string;
username:string;
}
interface AuthContextType{
  userData:UserData|null;
  saveUserData:()=>void;
  baseUrl:string;
  reqHeaders:Record<string,string>;
  role:string|null;
}
export const AuthContext = createContext<AuthContextType> ({
  userData:null,
  saveUserData:()=>{}
  ,baseUrl:"",
  reqHeaders:{},
  role:null
});


export default function AuthContextProvider(props:React.PropsWithChildren<{}>){

  const [userData, setUserData] = useState<UserData|null>(null);
  const[role,setRole]=useState <string|null>(null)
  

  const reqHeaders:Record<string,string>    ={
    Authorization:`Bearer ${localStorage.getItem("userToken")||''}`
  }
  const baseUrl = "https://upskilling-egypt.com:3003/api/v1";

  const saveUserData = () => {
    const encodedToken = localStorage.getItem("userToken");
    if(encodedToken){
      const decodedToken:any = jwtDecode(encodedToken)
      setUserData(decodedToken)
      setRole((prevRole)=>{
        return decodedToken.userGroup
      })
   
      
    }
    

  };

  useEffect(() => {
    if (localStorage.getItem("userToken")) {
      saveUserData();
    }
  }, []);
  useEffect(() => {
    if (role !== undefined) {
    
      console.log(role);
     
    }
  }, [role]);
  const contextValue:AuthContextType={
    userData,
    saveUserData,
    baseUrl,
    reqHeaders,
    role
  }

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
}
