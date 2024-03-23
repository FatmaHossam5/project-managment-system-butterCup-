import { useContext } from 'react';
import logo from '../../assets/PMS 3.svg'
import axios from "axios";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";

import { ToastContext } from '../../Context/ToastContext';


import { AuthContext } from '../../Context/AuthContext';

export default function Login({ saveUserData }: any) {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const{getToastValue}= useContext(ToastContext);
  const{baseUrl}=useContext(AuthContext)
  const navigate = useNavigate()


  const LogIn = (data: any) => {
    axios.post(`${baseUrl}/Users/Login`, data)
      .then((response) => {
        localStorage.setItem("userToken", response?.data?.token)
        saveUserData()
       navigate('/dashboard')
       getToastValue('success','welcome')
      }).catch((error) => {
        getToastValue('error',error?.response?.data?.message)
      })
  }
  return (

    <>

      <div className="Auth-container container-fluid ">

        <div className="row bg-overlay vh-100 justify-content-center align-items-center">

          <div className="col-lg-5 col-md-7 col-sm-9 ">

            <div className="logo  position-relative ">
              <img src={logo} alt="logo" className="position-absolute " />
            </div>

            <div className="form-group from-design py-4 rounded-2  ">


              <form className="  w-75 m-auto" onSubmit={handleSubmit(LogIn)} >
                <span className=" text-white">
                  welcome to PMS
                </span>
                <h4 className="fw-bolder color position-relative p-0">Log in</h4>

                <div className="form-group my-3 position-relative">
                  <input
                    placeholder="Enter your E-mail "
                    className="form-control ps-4 mb-1 login "
                    type="email"
                    {...register('email', { required: true, pattern: /^[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/ })}
                  />
                  <hr className="text-white" />

                  {errors.email && errors.email.type === 'required' && (<span className="text-danger"> email is required</span>)}

                </div>


                <div className="form-group my-3 ">

                  <input
                    placeholder=" Enter your Password"
                    className="form-control ps-4 mb-1"
                    type="password"
                    {...register("password", { required: true })}

                  />
                  <hr className="text-white" />

                  {errors.password && errors.password.type === 'required' && (<span className="text-danger"> password is required</span>)}


                </div>

                <div className="form-group mt-5 position-relative d-flex justify-content-between  ">
                  <Link to="/register" className="text-white text-decoration-none ">
                    <h6 className="Forget-pass">
                      Register Now?
                    </h6>

                  </Link>
                  <Link to="/request-reset" className="text-white text-decoration-none ">
                    <h6 className="Forget-pass">

                      Forgot Password?
                    </h6>

                  </Link>
                </div>

                <div className="form-group mt-4">
                  <button className="btn rounded-5 p-2 w-100">Login</button>
                </div>
              </form>
            </div>

          </div>
        </div>
      </div>


    </>
  );
}