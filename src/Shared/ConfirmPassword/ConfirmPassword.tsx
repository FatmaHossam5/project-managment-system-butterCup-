import { useState } from 'react';
import { FieldErrors, UseFormGetValues, UseFormRegister } from 'react-hook-form';
import styles from './ConfirmPassword.module.css';
interface FormValues{
    password?:string;
    oldPassword?:string;
    newPassword?:string;
    confirmNewPassword?:string;
    confirmPassword?:string
}
interface confirmPasswordInput{
    register:UseFormRegister<any>;
    inputName:string;
    placeholder?:string;
    getValues:UseFormGetValues<any>;
    errors:FieldErrors<FormValues>
}
export default function ConfirmPassword({register,inputName,placeholder,getValues,errors}:confirmPasswordInput) {
    const [showPassword,setShowPassword]=useState(false)
    const required='This Field is required';
    const togglePasswordVisibility=()=>{
        setShowPassword(!showPassword)
    }
  return (
    <>
    <div className={`${styles.inputIcon}`}>
        <label htmlFor="confirmNewPassword"className={`${styles.orange} mt-3`}>Confirm Password</label>
        <div className=' d-flex  align-items-center justify-content-between position-relative'>
      <div className='d-flex gap-2 flex-grow-1 flex-column  '>
        <input 
        className={`${styles['form-control-Auth']} w-100`}
        type={showPassword?"text":'password'}
        {...register(`${inputName}`,{
            required,
            validate:(value)=>value===getValues(inputName==='confirmNewPassword'?'newPassword':'password')||`password do not match`
        })}
        placeholder={placeholder} />
</div>
<i className={`fa-regular position-absolute end-0 me-3 ${showPassword?'fa-eye-slash':'fa-eye'}`} onClick={togglePasswordVisibility} ></i>
</div>
    </div>

    {inputName === "confirmPassword" ? errors?.confirmPassword ? <span className='text-danger small'>{errors?.confirmPassword?.message}</span> : null
      : inputName === "confirmNewPassword" ? errors?.confirmNewPassword ? <span className='text-danger small'>{errors?.confirmNewPassword?.message}</span> : null
        : null
    }
    
    </>
  )
}
