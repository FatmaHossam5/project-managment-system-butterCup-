import { useState } from 'react';
import { FieldErrors, UseFormRegister } from 'react-hook-form';
import '../../index.css';
interface FormValues{
    password?:string;
    oldPassword?:string;
    newPassword?:string
}
interface passwordInputProps{
    register:UseFormRegister<any>;
    inputName:string;
    placeholder?:string;
    errors:FieldErrors<FormValues>
}

export default function PasswordInput({register,inputName,placeholder,errors}:passwordInputProps) {
    const[type,setType]=useState(false);
    const required = "Password is required";
    
    const getLabelText = () => {
      switch(inputName) {
        case "newPassword": return "New Password";
        case "oldPassword": return "Current Password";
        default: return "Password";
      }
    };

    const getErrorField = () => {
      switch(inputName) {
        case "oldPassword": return errors?.oldPassword;
        case "newPassword": return errors?.newPassword;
        default: return errors?.password;
      }
    };

    const errorField = getErrorField();
    
  return (
    <>
    <div className={'inputIcon'}>
      <div className='input-field-container'>
        <label className={'input-label'}>
          <i className='fas fa-lock me-2'></i>
          {getLabelText()}
        </label>
        <div className='input-wrapper'>
          <input
            className={'formControlAuth'}
            type={type ? "text" : "password"}
            placeholder={placeholder || `Enter your ${getLabelText().toLowerCase()}`}
            aria-describedby={`${inputName}-error`}
            {...register(`${inputName}`, {
              required,
              pattern: {
                value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,
                message: "Password must be at least 6 characters with uppercase, lowercase, number and special character"
              },
            })} 
          />
          <button
            type="button"
            className='password-toggle-btn'
            onClick={() => setType(!type)}
            aria-label={type ? "Hide password" : "Show password"}
          >
            <i className={`fa-regular ${type ? 'fa-eye-slash' : 'fa-eye'}`}></i>
          </button>
        </div>
        {errorField && (
          <div id={`${inputName}-error`} className='error-message' role="alert">
            <i className='fas fa-exclamation-circle me-1'></i>
            {errorField.message}
          </div>
        )}
      </div>
    </div>
    </>
  )
}
