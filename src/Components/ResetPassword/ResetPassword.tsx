import React, { useContext } from 'react'
import logo from '../../assets/PMS 3.svg'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../../Context/AuthContext';
import { ToastContext } from '../../Context/ToastContext';
interface FormData {
  email: string;
  seed: string;
  password: string;
  confirmPassword: string;
}
export default function ResetPassword() {
    const {register,handleSubmit,formState:{errors}}=useForm<FormData>();
    const navigate=useNavigate()
    const{baseUrl}=useContext(AuthContext);
    const{getToastValue}=useContext(ToastContext)


  const ResetPassword =(data:FormData)=>{
 axios.post(`${baseUrl}/Users/Reset`,data).then((response)=>{
  getToastValue("success",response?.data?.message)
  navigate('/login')
 }).catch((error)=>{
  getToastValue('error',error?.response?.data?.message)
  
 })
    
   }
  return (
   
    <div className="Auth-container container-fluid ">
    <div className="row bg-reset vh-100 justify-content-center align-items-center">
      <div className="col-lg-5 col-md-7 col-sm-9 mt-5 ">
      <div className="logo  position-relative "> 
    <img src={logo} alt="logo" className="position-absolute " />
    </div>
            <div className="form-group from-design py-4 rounded-2  ">
          <form className="  w-75 m-auto" onSubmit={handleSubmit(ResetPassword)} >
          <span className=" text-white">
            welcome to PMS
            </span>
            <h4 className="fw-bolder color position-relative p-0">Reset  Password</h4>
            <div className="form-group my-3 position-relative">
             <label htmlFor="email" className='email w-50 text-end'> E-mail </label>
              <input
                placeholder="Enter your E-mail "
                className="form-control ps-4 mb-1 login " 
                type="email"
               
              {...register("email",{required:true,pattern:/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/})}
             />
             {errors.email&&errors.email.type==='required'&&(<span className='text-danger'>Email is required </span>)}
             <hr className="text-white" />
            </div>
            <div className="form-group my-3 position-relative ">       
            <label htmlFor="email" className='otp w-50 text-end'>   OTP Verification </label>
              <input
                placeholder=" Enter your Password"
                className="form-control ps-4 mb-1"
                type="password"
               {...register("seed",{required:true})}
              />
             {errors.seed&&errors.seed.type==='required'&&(<span className='text-danger'>OTP is required </span>)}
            <hr className="text-white" />
            </div>
            <div className="form-group my-3 position-relative ">
            <label htmlFor="newPass" className='newPass w-50 text-end'>  New Password </label>
              <input
                placeholder=" Enter your New Password"
                className="form-control ps-4 mb-1"
                type="password"
            
                {...register("password",{required:true})}
              />
             {errors.password&&errors.password.type==='required'&&(<span className='text-danger'>password is required </span>)}
            <hr className="text-white" />
            </div>
            <div className="form-group my-3 position-relative ">
            <label htmlFor="confirm" className='confirm  w-50 text-end'>  Confirm Password </label>
              <input
                placeholder=" Confirm New Password"
                className="form-control ps-4 mb-1"
                type="password"
             
                {...register("confirmPassword",{required:true})}
              />
             {errors.confirmPassword&&errors.confirmPassword.type==='required'&&(<span className='text-danger'>confirmPassword is required </span>)}
            <hr className="text-white" />
            </div>
            <div className="form-group mt-4">
              <button className="btn rounded-5 p-2 w-100">save</button>
            </div>
          </form>
        </div>
      </div>
    </div>
   </div>
  )
}
