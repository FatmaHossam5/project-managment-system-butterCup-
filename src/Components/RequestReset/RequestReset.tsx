import React, { useContext, useState } from 'react'
import logo from '../../assets/PMS 3.svg'
import { useForm } from 'react-hook-form'
import axios from 'axios';

import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Context/AuthContext';
import { ToastContext } from '../../Context/ToastContext';
import AuthComponent from '../../Shared/AuthComponent/AuthComponent';
import EmailInput from '../../Shared/EmailInput/EmailInput';

export default function RequestReset() {
const{register,handleSubmit,formState:{errors}}=useForm();
 const navigate= useNavigate()
 const {baseUrl}=useContext(AuthContext);
 const{ getToastValue}=useContext(ToastContext)
const[isLoading,setIsLoading]=useState(false)


  const RequestPass =(data:any)=>{
    setIsLoading(false)
    axios.post(`${baseUrl}/Users/Reset/Request`,data).then((response)=>
    {
     getToastValue('success',response?.data?.message)
navigate('/reset-password')
    
    }).catch((error)=>{
      getToastValue('error',error?.response?.data?.message)
    }).finally(()=>{
      setIsLoading(true)
    })
    
  }
  
  return (
    <>
  
    <AuthComponent title='Request Reset Password' >
      <form onSubmit={handleSubmit(RequestPass)} className='mt-5'>
        <EmailInput inputName='email'{...{register,errors}} />
        <button type='submit' disabled={isLoading} className='btn AuthBtn w-100 mt-4  text-white bg-orange rounded-5 btn-lg '>{isLoading ? <i className='fa fa-spin fa-spinner'></i> : "Send"}</button>
      </form>
     </AuthComponent>
   

    
    </>
  )
}