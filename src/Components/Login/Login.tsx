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

interface LoginFormData {
  email: string;
  password: string;
}

export default function Login({ saveUserData }: { saveUserData: () => void }) {
  const { register, handleSubmit, formState: { errors, isValid } } = useForm<LoginFormData>({
    mode: 'onChange'
  });
  const { getToastValue } = useContext(ToastContext);
  const { baseUrl, role } = useContext(AuthContext);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (data: LoginFormData) => {
    if (isLoading) return;
    
    setIsLoading(true);
    try {
      const response = await axios.post(`${baseUrl}/Users/Login`, data);
      
      localStorage.setItem("userToken", response?.data?.token);
      saveUserData();
      console.log(role);
      
      navigate('/dashboard');
      getToastValue('success', 'Welcome back! You have successfully signed in.');
    } catch (error: any) {
      console.error('Login error:', error);
      const errorMessage = error?.response?.data?.message || 'Login failed. Please try again.';
      getToastValue('error', errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthComponent title="Login">
      <form 
        onSubmit={handleSubmit(handleLogin)} 
        className={styles['login-form']}
        noValidate
        aria-label="Login form"
      >
        <div className={styles['form-fields-container']}>
          <EmailInput 
            inputName="email" 
            errors={errors} 
            register={register} 
          />
          <PasswordInput 
            inputName="password" 
            placeholder="Enter your password" 
            errors={errors} 
            register={register} 
          />
        </div>
        
        <div className={styles['links-container']}>
          <Link 
            to="/register" 
            className={`${styles['auth-link']} ${styles['registration-link']}`}
            aria-label="Create a new account"
          >
            <i className="fas fa-user-plus" aria-hidden="true"></i>
            <span>Create Account</span>
          </Link>
          <Link 
            to="/request-reset" 
            className={`${styles['auth-link']} ${styles['forgot-password-link']}`}
            aria-label="Reset your password"
          >
            <i className="fas fa-key" aria-hidden="true"></i>
            <span>Forgot Password?</span>
          </Link>
        </div>
        
        <button 
          type="submit" 
          disabled={isLoading || !isValid}
          className={styles['login-button']}
          aria-describedby={isLoading ? "loading-description" : undefined}
          aria-busy={isLoading}
        >
          {isLoading ? (
            <div className={styles['loading-container']}>
              <i className="fa fa-spin fa-spinner" aria-hidden="true"></i>
              <span>Signing In...</span>
            </div>
          ) : (
            <div className={styles['button-content']}>
              <i className="fas fa-sign-in-alt" aria-hidden="true"></i>
              <span>Sign In</span>
            </div>
          )}
        </button>
        
        {isLoading && (
          <div id="loading-description" className="sr-only">
            Please wait while we sign you in...
          </div>
        )}
      </form>
    </AuthComponent>
  );
}