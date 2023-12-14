import React from 'react'
import logo from '../../assets/PMS 3.svg'
export default function ResetPassword() {
  return (
   
    <div className="Auth-container container-fluid ">
 
    <div className="row bg-reset vh-100 justify-content-center align-items-center">
   
      <div className="col-lg-5 col-md-7 col-sm-9 mt-5 ">
      <div className="logo  position-relative "> 
    
    <img src={logo} alt="logo" className="position-absolute " />
    </div>
   
            <div className="form-group from-design py-4 rounded-2  ">
         
          
          <form className="  w-75 m-auto"  >
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
                name='email'
   
              
                
             
             />
             <hr className="text-white" />
              
   
               
             
   
            </div>
   
            <div className="form-group my-3 position-relative ">
            
            <label htmlFor="email" className='otp w-50 text-end'>   OTP Verification </label>
          
              <input
                placeholder=" Enter your Password"
                className="form-control ps-4 mb-1"
                type="password"
               
              />
            <hr className="text-white" />
   
            
   
            </div>
   
            <div className="form-group my-3 position-relative ">
            
            <label htmlFor="email" className='newPass w-50 text-end'>  New Password </label>
          
              <input
                placeholder=" Enter your New Password"
                className="form-control ps-4 mb-1"
                type="password"
               
              />
            <hr className="text-white" />
   
            
   
            </div>
            <div className="form-group my-3 position-relative ">
            
            <label htmlFor="email" className='confirm  w-50 text-end'>  Confirm Password </label>
          
              <input
                placeholder=" Confirm New Password"
                className="form-control ps-4 mb-1"
                type="password"
               
              />
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
