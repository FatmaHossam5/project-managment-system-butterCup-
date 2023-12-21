import React, { useContext, useEffect, useState } from 'react'
import avatar from '../../assets/avatar.png'
import axios from 'axios'
import { AuthContext } from '../../Context/AuthContext'
import { useParams } from 'react-router-dom'

export default function ViewProject() {
  const{id}=useParams()
  const [viewPro,setViewPro]=useState([])
const {baseUrl,reqHeaders}:any=useContext(AuthContext)
useEffect(()=>{
  axios.get(`${baseUrl}/Project/${id}`,{headers:reqHeaders}).then((response)=>{
    console.log(response);
    setViewPro(response?.data?.data)
    
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
      
        </div>
        <div className="secondary mb-3 pb-3 view">
          {viewPro?.map((project)=><>
            <img src={avatar} alt="" className='pb-3'/>
        <h5 className='text-black'>{project?.manager?.userName}</h5>
        
       <input type="text" className='form-control w-75 mb-3 m-auto rounded-5 border-0 text-white' />
      <input type="text" className='form-control w-75 mb-3 m-auto  rounded-5  border-0 text-white'  />
      <input type="text"className='form-control w-75 mb-3 m-auto  rounded-5  border-0 text-white' />
          </>
          
          
          
          
          )}
       
      <div className="bg-white mt-5 ms-2 arrView ">
        <i className="fa-solid fa-arrow-left "></i>
        </div>
        </div>
        </div>
    </div>
    
   </div>
  </>
  
 


   
   
   
   
  
  )
}
  
  

 

