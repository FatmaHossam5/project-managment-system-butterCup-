import axios from "axios";
import { useContext, useState } from 'react';
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from '../../Context/AuthContext';
import { ToastContext } from '../../Context/ToastContext';
import AuthComponent from '../../Shared/AuthComponent/AuthComponent';
import EmailInput from '../../Shared/EmailInput/EmailInput';
import PasswordInput from '../../Shared/PasswordInput/PasswordInput';
import '../../index.css';

export default function Login({ saveUserData }: any) {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { getToastValue } = useContext(ToastContext);
  const { baseUrl ,role} = useContext(AuthContext)
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)

  const LogIn = (data: any) => {
    setIsLoading(true)
    axios.post(`${baseUrl}/Users/Login`, data)
      .then((response) => {
      
        localStorage.setItem("userToken", response?.data?.token)
        saveUserData()
        console.log(role);
        
        navigate('/dashboard')
        getToastValue('success', 'welcome')
      }).catch((error) => {
        console.log(error);

        getToastValue('error', error?.response?.data?.message)
      }).finally(() => {
        setIsLoading(false)
      })
  }

  return (

    <>
      <AuthComponent title={"Login"} {...{ errors }}>
        <form onSubmit={handleSubmit(LogIn)} className=''>
          <EmailInput inputName={'email'} {...{ errors, register }} />
          <PasswordInput inputName={'password'} placeholder='Enter your password' {...{ errors, register }} />
          <div className=' mt-3 d-flex justify-content-between align-content-center'>
            <Link to={'/register'} className='forget text-decoration-none orange '>Registration ?</Link>
            <Link to={'/request-reset'} className='forget text-decoration-none orange '>Forgot Password ?</Link>
          </div>
          <button type='submit' disabled={isLoading} className='btn AuthBtn w-100 mt-4 fw-bold text-white bg-orange rounded-5 btn-lg '>{isLoading ? <i className='fa fa-spin fa-spinner'></i> : "Login"}</button>
        </form>
      </AuthComponent>


    </>
  );
}