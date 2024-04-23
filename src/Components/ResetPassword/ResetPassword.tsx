import React, { useContext, useState } from 'react'
import logo from '../../assets/PMS 3.svg'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../../Context/AuthContext';
import { ToastContext } from '../../Context/ToastContext';
import AuthComponent from '../../Shared/AuthComponent/AuthComponent';
import EmailInput from '../../Shared/EmailInput/EmailInput';
import PasswordInput from '../../Shared/PasswordInput/PasswordInput';
import ConfirmPassword from '../../Shared/ConfirmPassword/ConfirmPassword';
interface FormData {
  email: string;
  seed: string;
  password: string;
  confirmPassword: string;
}
export default function ResetPassword() {
    const {register,handleSubmit,formState:{errors},getValues}=useForm<FormData>();
    const navigate=useNavigate()
    const{baseUrl}=useContext(AuthContext);
    const{getToastValue}=useContext(ToastContext);
    const[isLoading,setIsLoading]=useState(false)


  const ResetPassword =(data:FormData)=>{
    setIsLoading(true)
 axios.post(`${baseUrl}/Users/Reset`,data).then((response)=>{
  getToastValue("success",response?.data?.message)
  navigate('/login')
 }).catch((error)=>{
  getToastValue('error',error?.response?.data?.message)
  
 }).finally(()=>{
  setIsLoading(false)
 })
    
   }
  return (
   
  <>

  <AuthComponent title='Reset Password'>
<form onSubmit={handleSubmit(ResetPassword)}>
  <EmailInput inputName='email' {...{register,errors}} />
  <div className='inputIcon'>

<label className="orange mt-3">OTP Verification</label>
<div className=' d-flex flex-column  '>
  <input
    className=' formControlAuth w-100'
    type="text"
    placeholder='Enter Verification'
    {...register("seed", {
      required: "OTP is Required",
      pattern: {
        value: /^[a-zA-Z0-9]{4}$/,
        message: " OTP must be 4 characters"
      }
    })}
  />
</div>
</div>
{errors?.seed ? <span className='text-danger small'>{errors?.seed?.message}</span> : null}
<PasswordInput inputName='password'placeholder='New Password' {...{ errors, register }}/>
<ConfirmPassword inputName='confirmPassword' placeholder='Confirm New Password' {...{ errors, register ,getValues }}/>
<button type='submit' disabled={isLoading} className='btn AuthBtn w-100 mt-4 fw-bold text-white bg-orange rounded-5 btn-lg '>{isLoading ? <i className='fa fa-spin fa-spinner'></i> : "Save"}</button>

</form>
  </AuthComponent>

  
  
  </>
  )
}
