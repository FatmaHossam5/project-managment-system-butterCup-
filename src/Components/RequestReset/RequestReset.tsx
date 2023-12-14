import React from 'react'
import logo from '../../assets/PMS 3.svg'
import { useForm } from 'react-hook-form'
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

export default function RequestReset() {


  const{register,handleSubmit,formState:{errors}}=useForm();
 const navigate= useNavigate()
  const RequestPass =(data)=>{
    axios.post('http://upskilling-egypt.com:3003/api/v1/Users/Reset/Request',data).then((response)=>
    {
     
navigate('/reset-password')
      
    }).catch((error)=>{
      console.log(error);
      
    })
    
  }
  
  return (
   <>

<div className="Auth-container container-fluid ">
 
 <div className="row bg-request vh-100 justify-content-center align-items-center">

   <div className="col-lg-5 col-md-7 col-sm-9 ">
   <div className="logo  position-relative "> 
 
 <img src={logo} alt="logo" className="position-absolute " />
 </div>

         <div className="form-group from-design py-4 rounded-2  ">
      
       
       <form className="  w-75 m-auto" onSubmit={handleSubmit(RequestPass)} >
       <span className=" text-white">
         welcome to PMS
         </span>
         <h4 className="fw-bolder color position-relative mb-4">Forget Password</h4>
         <div className="form-group my-3 position-relative">
          
<label htmlFor="email" className='email'>  E-mail</label>
           <input
             placeholder="Enter your E-mail "
             className="form-control ps-4 mb-1 login " 
             type="email"
             name='email' 
{...register("email",{required:true,pattern:/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/})}
           
             
          
          />
          {errors.email&&errors.email.type==='required'&&(<span className='text-danger'> Email is required</span>)}
          <hr className="text-white" />
           

            
          

         </div>

         

       

         <div className="form-group mt-4">
           <button className="btn rounded-5 p-2 w-100">Request Password</button>
         </div>
       </form>
     </div>
   </div>
 </div>
</div>
   </>
  )
}
