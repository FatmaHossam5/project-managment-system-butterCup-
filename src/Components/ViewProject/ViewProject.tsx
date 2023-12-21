import React, { useContext, useEffect, useState } from 'react'
import avatar from '../../assets/avatar.png'
import axios from 'axios'
import { AuthContext } from '../../Context/AuthContext'
import { Link, useParams } from 'react-router-dom'


export default function ViewProject() {
  const{id}=useParams()
  const [Project,setProject]=useState({})
const {baseUrl,reqHeaders}:any=useContext(AuthContext)




useEffect(()=>{
  axios.get(`${baseUrl}/project/${id}`,{headers:reqHeaders}).then((response)=>{
    setProject(response?.data)
  }).catch((error)=>{
    console.log(error);
  })
},[])
  return (<>

<div className="container">  
    <div className="col-md-12">
      <h3>Project Board</h3>
    </div>
    <div className="col-md-8 m-auto ">
      <div className=" col-md-8  m-auto content  bg-view rounded-3 text-center vh-50 mt-5">
            <div className='pt-5 mb-5 mt-5'>
            <img src={avatar} alt="" className='pb-3'/>
        <h5 className='text-black'>  {Project?.manager?.userName}  </h5>
        </div>
        <div className="secondary mb-3 pb-3 view ">
      <div className='d-flex ms-5'>
      <label htmlFor="title   ">Title: </label>
       <input type="text"name='title' className=' text-center form-control w-75 mb-3 m-auto rounded-5 border-0 text-white'value={Project?.title} />
      </div>
        <div className="d-flex ms-5">
        <label htmlFor="desc  ">Desc: </label>
      <input type="text"name='desc' className= ' text-center form-control w-75 mb-3 m-auto  rounded-5  border-0 text-white' value={Project?.description} />
        </div>
      <div className="bg-white mt-5 ms-2 arrView ">
        <Link to = '/dashboard/projects'>
        <i className="fa-solid fa-arrow-left "></i>
        </Link>
        </div>
        </div>
        </div>
    </div>
   </div>
  </>
  
 


   
   
   
   
  
  )
}
  
  

 

