import { FieldErrors, UseFormRegister } from 'react-hook-form';
interface FormValues{
   email:string;

}
interface EmailInput{
    inputName:string;
    register:UseFormRegister<any>;
    errors:FieldErrors<FormValues>
}
export default function EmailInput({inputName,register,errors}:EmailInput) {
    const pattern= {
        value: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
        message: "Please enter a valid email address",
      }
      const required= "Email is required"
  return (
    <>
    <div className={'inputIcon'}>
      <div className='input-field-container'>
        <label className={'input-label'}>
          <i className='fas fa-envelope me-2'></i>
          Email Address
        </label>
        <div className='input-wrapper'>
          <input
            className={'formControlAuth'}
            type="email"
            placeholder='Enter your email address'
            aria-describedby="email-error"
            {...register(`${inputName}`, {
              required,
              pattern,
            })}
          />
          <div className='input-icon'>
            <i className='fas fa-envelope'></i>
          </div>
        </div>
        {errors?.email && (
          <div id="email-error" className='error-message' role="alert">
            <i className='fas fa-exclamation-circle me-1'></i>
            {errors?.email?.message}
          </div>
        )}
      </div>
    </div>
    </>
  )
}
