import React, { useContext, useState } from 'react'
import { AuthContext } from '../../Context/AuthContext'
import Task from './Task'
import { useDrop } from 'react-dnd'
import axios from 'axios'
import { ToastContext } from '../../Context/ToastContext'

export default function Column({status,tasks,setTasks,todos,inProgress,done,getEmployeeTasks}) {
    const{baseUrl,reqHeaders}:any=useContext(AuthContext)
    const{getToastValue}=useContext(ToastContext)
    const [newStatus,setNewStatus]=useState('')
        
    let tasksToMap=todos
    if(status==='InProgress'){
    tasksToMap=inProgress
    }
    if(status==='Done'){
        tasksToMap=done
    }
    const [{ isOver }, drop] = useDrop(
        () => ({
          accept: "task",
          drop: (item) => changeItem(item.id,item.status),
          collect: (monitor) => ({
            isOver: !!monitor.isOver()
          })
        }),
       
      )


      const  changeItem =(id)=>{
        axios.put(`${baseUrl}/Task/${id}/change-status`,{status},{headers:reqHeaders}).then((response)=>{
            console.log(response?.data?.status);
            setNewStatus(response?.data?.status)
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
                {tasksToMap.length > 0 && tasksToMap.map(task => <Task key={task.id} task={task} tasks={tasks} setTasks={setTasks} />)}
            </div>
        </div>
    )
}
