import React, { useContext, useEffect, useState } from 'react'
import avatar from '../../assets/avatar.png'
import axios from 'axios'
import { AuthContext } from '../../Context/AuthContext'
import { Link, useParams } from 'react-router-dom'
import { ToastContext } from '../../Context/ToastContext'
import styles from './ViewProject.module.css'
interface Project {
  title: string;
  description: string;
  manager: {
    userName: string;
  };
}

export default function ViewProject() {
  const{id}=useParams()
  const [Project,setProject]=useState<Project | null>(null)
const {baseUrl,reqHeaders}:any=useContext(AuthContext)
const{getToastValue}=useContext(ToastContext)




useEffect(()=>{
  axios.get(`${baseUrl}/project/${id}`,{headers:reqHeaders}).then((response)=>{
    setProject(response?.data)
  }).catch((error)=>{
 
   
    getToastValue('error',error.response.data.message)
  })
},[])


  return (<>

<div className="container ">  
    <div className="col-md-12 mt-4">
      <h3>Project Board</h3>
    </div>
    <div className="col-md-8 m-auto ">
      <div className=" col-md-8  m-auto content  bg-view rounded-3 text-center vh-50 mt-5">
            <div className='pt-5 mb-5 mt-5'>
            <img src={avatar} alt="" className='pb-3'/>
        <h5 className='text-white'>  {Project?.manager?.userName}  </h5>
        </div>
        <div className="secondary mb-3 pb-3 view ">
      <div className='d-flex ms-5'>
      <label htmlFor="title " className='text-white'>Title: </label>
       <input type="text"name='title' className=' text-center form-control w-75 mb-3 m-auto rounded-5 border-0 text-black'value={Project?.title} />
      </div>
        <div className="d-flex ms-5">
        <label htmlFor="desc" className='text-white'>Desc: </label>
      <input type="text"name='desc' className= ' text-center form-control w-75 mb-3 m-auto  rounded-5  border-0 text-black' value={Project?.description} />
        </div>
      <div className={`${styles['hover-effect']} bg-white mt-5 ms-2 arrView`}  >
        <Link to = '/dashboard/projects'>
        <i className="fa-solid fa-arrow-left pt-2 pb-1 "></i>
        </Link>
        </div>
        </div>
        </div>
    </div>
   </div>
  </>
  
 


   
   
   
   
  
  )
}
  
  

 

