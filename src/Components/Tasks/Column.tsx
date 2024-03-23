import React, { useContext, useState } from 'react'
import { AuthContext } from '../../Context/AuthContext'
import Task from './Task'
import { useDrop } from 'react-dnd'
import axios from 'axios'
import { ToastContext } from '../../Context/ToastContext'
interface Task {
    id: string;
    title: string;
    status: string;
   
  }
  
interface ColumnProps {
    status: string;
    tasks: Task[]; 
    setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
    todos: Task[];
    inProgress: Task[];
    done: Task[];
    setTodos: React.Dispatch<React.SetStateAction<Task[]>>;
    setInProgress: React.Dispatch<React.SetStateAction<Task[]>>;
    setDone: React.Dispatch<React.SetStateAction<Task[]>>;
    getEmployeeTasks: () => void;
  }
export default function Column({status,tasks,setTasks,todos,inProgress,done,getEmployeeTasks}:ColumnProps) {
    const{baseUrl,reqHeaders}:any=useContext(AuthContext)
    const{getToastValue}=useContext(ToastContext)  
    console.log('Current status:', status);
    const tasksToMap = status === 'InProgress' ? inProgress : status === 'Done' ? done : todos;

    const [{ isOver }, drop] = useDrop(
        () => ({
          accept: "task",
          drop: (item:any) => changeItem(item.id,item.status),
          collect: (monitor:any) => ({
            isOver: !!monitor.isOver()
          })
        }),
       
      )


      const  changeItem =(id:string,status:string)=>{

        axios.put(`${baseUrl}/Task/${id}/change-status`,{status},{headers:reqHeaders}).then(()=>{
            getToastValue("success","changed successfully")
            getEmployeeTasks()   
        }).catch((error)=>{
           getToastValue("error",error?.response?.data?.message)
            
        })
    
    }


      
    return (
        <div className=' px-5 rounded-3  boxContainer' ref={drop} >
            {status}
            <div  >
                { tasksToMap.map((task:Task) => <Task key={task.id} task={task}  setTasks={setTasks} />)}
            </div>
        </div>
        
    )
}
