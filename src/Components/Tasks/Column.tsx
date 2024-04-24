import axios from 'axios'
import React, { useContext, useState } from 'react'
import { useDrop } from 'react-dnd'
import { AuthContext } from '../../Context/AuthContext'
import { ToastContext } from '../../Context/ToastContext'
import Task from './Task'
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
export default function Column({status,setTasks,todos,inProgress,done,getEmployeeTasks}:ColumnProps) {
    const{baseUrl,reqHeaders}:any=useContext(AuthContext)
    const{getToastValue}=useContext(ToastContext)  
    const [newStatus,setNewStatus]=useState('')
    const tasksToMap = status === 'InProgress' ? inProgress : status === 'Done' ? done : todos;
 
    const [{ isOver }, drop] = useDrop(
        () => ({
          accept: "Task",
          drop: (item:any) => changeItem(item.id),
          collect: (monitor:any) => ({
            isOver: !!monitor.isOver()
          })
        }),
       
      )



      const  changeItem =(id:string)=>{

        axios.put(`${baseUrl}/Task/${id}/change-status`,{status},{headers:reqHeaders}).then((response)=>{
          setNewStatus(response?.data?.status)
            getToastValue("success","changed successfully")
            getEmployeeTasks()   
        }).catch((error)=>{
           getToastValue("error",error?.response?.data?.message)
            
        })
    
    }


      
    return (
        <div className=' px-5 rounded-3 py-2  boxContainer' ref={drop} style={{ width: '250px' }} >
            {status}
            <div      >
              { tasksToMap.map((task:Task) => <Task key={task.id} task={task}  setTasks={setTasks} className={`task ${task.status === 'Done' ? 'done' : ''}`} />)}
            </div>
        </div>
        
    )
}
