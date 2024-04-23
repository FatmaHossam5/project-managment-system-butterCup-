import { FieldErrors, UseFormRegister } from 'react-hook-form';
import '../../index.css'
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
        message: "Email is InValid",
      }
      const required= "This Field is required"
  return (
    <>
<div className={'inputIcon'}>

<div className=' d-flex flex-column  '>
  <label className={'orange'} >E-mail</label>
  <input
    className={'formControlAuth'}
    type="email"
    placeholder='Enter your E-mail'
    {...register(`${inputName}`, {
      required,
      pattern,
    })}
  />
</div>
{errors?.email ? <span className='text-danger small'>{errors?.email?.message}</span> : null}
</div>
    </>
  )
}
