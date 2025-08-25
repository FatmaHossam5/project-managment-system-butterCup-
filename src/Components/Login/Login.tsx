import axios from "axios";
import { useContext, useState } from 'react';
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from '../../Context/AuthContext';
import { ToastContext } from '../../Context/ToastContext';
import AuthComponent from '../../Shared/AuthComponent/AuthComponent';
import EmailInput from '../../Shared/EmailInput/EmailInput';
import PasswordInput from '../../Shared/PasswordInput/PasswordInput';
import styles from './Login.module.css';
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
        <form onSubmit={handleSubmit(LogIn)} className={styles['login-form']}>
          <div className={styles['form-fields-container']}>
            <EmailInput inputName={'email'} {...{ errors, register }} />
            <PasswordInput inputName={'password'} placeholder='Enter your password' {...{ errors, register }} />
          </div>
          
          <div className={styles['links-container']}>
            <Link to={'/register'} className={`${styles['auth-link']} ${styles['registration-link']}`}>
              <i className='fas fa-user-plus me-2'></i>
              Create Account
            </Link>
            <Link to={'/request-reset'} className={`${styles['auth-link']} ${styles['forgot-password-link']}`}>
              <i className='fas fa-key me-2'></i>
              Forgot Password?
            </Link>
          </div>
          
          <button 
            type='submit' 
            disabled={isLoading} 
            className={styles['login-button']}
          >
            {isLoading ? (
              <div className={styles['loading-container']}>
                <i className='fa fa-spin fa-spinner me-2'></i>
                Signing In...
              </div>
            ) : (
              <div className={styles['button-content']}>
                <i className='fas fa-sign-in-alt me-2'></i>
                Sign In
              </div>
            )}
          </button>
        </form>
      </AuthComponent>
    </>
  );
}