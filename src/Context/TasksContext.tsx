import axios from "axios";
import { createContext, useContext, useState } from "react";
import { AuthContext } from "./AuthContext";



export  const TasksContext = createContext ({});

 const TasksContextProvider =(props:any)=>{

const [getDataTasks,setGetDataTasks]=useState<any[]>([]); 
let{baseUrl,reqHeaders}=useContext(AuthContext)

const getAllTasks=()=>{
    axios.get(`${baseUrl}/Task/manager?pageSize=14&pageNumber=1`,{headers:reqHeaders}).then((response)=>{
        console.log(response);
        setGetDataTasks(response.data)
        
    }).catch((error)=>{
        console.log(error);
        
    })
}



   return( <TasksContext.Provider value={{ getDataTasks, getAllTasks }}>
    {props.children}
  </TasksContext.Provider>)
 }
 export default TasksContextProvider 