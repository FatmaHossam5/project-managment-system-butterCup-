

import { Link} from "react-router-dom";
import logo from '../../assets/PMS 3.svg'

import axios from "axios";


import { useForm } from "react-hook-form";
import { Link, useNavigate} from "react-router-dom";
import { toast } from "react-toastify";




export default function Login({saveAdminData}:any) {
 
  const {register,handleSubmit,formState:{errors}}=useForm();
  
    const navigate=useNavigate()

const LogIn =(data:any)=>{

axios.post('http://upskilling-egypt.com:3003/api/v1/Users/Login',data)

.then((response)=>{
  
    localStorage.setItem("adminToken",response?.data?.token)
    saveAdminData()
    navigate('/dashboard')
   
}).catch((error)=>{
  
    toast(error?.response?.data?.message);

})
}
 
  return (
  
    <div className="Auth-container container-fluid ">
 
      <div className="row bg-overlay vh-100 justify-content-center align-items-center">
   
        <div className="col-lg-5 col-md-7 col-sm-9 ">
        <div className="logo  position-relative "> 
      
      <img src={logo} alt="logo" className="position-absolute " />
      </div>
          <div className="from-design py
            <form className="  w-75 m-auto" >
            <span className=" text-white">
              welcome to PMS
              </span>
              <h4 className="fw-bolder color position-relative">Login</h4>
              <div className="form-group my-4 ">
           
            
            <form className="  w-75 m-auto" onSubmit={handleSubmit(LogIn)} >
            <span className=" text-white">
              welcome to PMS
              </span>
              <h4 className="fw-bolder color">Log in</h4>
              <div className="form-group my-3 position-relative">
                <i className="fa fa-envelope-open position-absolute"></i>

                <input
                  placeholder="Enter your E-mail "
                  className="form-control ps-4 mb-1 login " 
                  type="email"

                
                  
               
               />
               <hr className="text-white" />
                

                 
                  {...register('email',{required:true,pattern:/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/})}
                />
                {errors.email&&errors.email.type==='required'&&(<span className="text-danger"> email is required</span>)}

              </div>

              <div className="form-group my-3 ">
              

                <input
                  placeholder=" Enter your Password"
                  className="form-control ps-4 mb-1"
                  type="password"
                  {...register("password",{required:true})}
                 
                />
              <hr className="text-white" />

                {errors.password&&errors.password.type==='required'&&(<span className="text-danger"> password is required</span>)}
              

              </div>

              <div className="form-group my-3 position-relative d-flex justify-content-end  ">
                <Link to="/reset-pass-request" className="text-white text-decoration-none ">
                  <h6 className="Forget-pass">
                  Forgot Password?
                  </h6>
            
                </Link>
              </div>

              <div className="form-group my-3">
                <button className="btn rounded-5 p-2 w-100">Login</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}