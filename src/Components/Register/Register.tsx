import logo from '../../assets/PMS 3.svg'
import photo from '../../assets/Ellipse 1.svg'
import photoOverLay from '../../assets/Group 48102075.svg'
import { Link, useNavigate } from 'react-router-dom';
import styles from './Register.module.css'
import { useForm } from 'react-hook-form';
import { ToastContainer } from 'react-bootstrap';
import axios from 'axios';
import { toast } from 'react-toastify';

export default function Register() {

  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm()

  const onSubmit = (data: any) => {
    console.log(data)
    axios.post(
      `http://upskilling-egypt.com:3003/api/v1/Users/Register`,
      data
    )
      .then((response) => {
        console.log(response);
        toast.success(`success registeration! Just one step else`, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        })
        // getToastValue('success', "Welcom!")
        navigate('/verify-user')
      })
      .catch((error) => {
        console.log(error);
        toast.error(error.response.data.message, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        })

        //     getToastValue('error', error.response)
      })
  }

  return (
    <>

      <div className='container-fluid Auth-container'>
        <div className="row bg-overlay align-items-center justify-content-center vh-100">
          <div className="col-lg-5 col-md-7 col-sm-9 w-50">

            <div className="logo position-relative ">
              <img src={logo} alt="logo" className="position-absolute " />
            </div>

            <div className="form-group from-design p-5 rounded-2 ">
              <h6 className='text-white'>Welcome to PMS</h6>
              <h3 className='color'><span className='text-decoration-underline color fs-2'>C</span>reate New Account</h3>

              <div className=' text-center text-white my-3 position-relative'>
                {/* <input type="file" className={`${styles.inputFileRegister}`}/> */}
                <img src={photo} alt='profile photo' className={`${styles.imgRegister} `}/>
                <img src={photoOverLay} alt='profile photo' className={`${styles.overlayRegister} position-absolute`}/>
              </div>

              <form action="" onSubmit={handleSubmit(onSubmit)}>
                <ToastContainer />

                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group mt-3 position-relative">
                      {/* <TextField
                        variant="standard"
                        type="email"
                        placeholder="Enter Your E-mail"
                        className="w-100"
                      /> */}
                      <label htmlFor="" className='color fs-6'>UserName</label>
                      <input
                        className='form-control ps-1'
                        type="text"
                        placeholder='Enter your name'
                        {...register("userName",
                          {
                            required: true,
                            // pattern: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/
                          })}
                      />
                      <hr className="text-white m-0" />
                    </div>
                    {errors.userName && errors.userName.type === "required" && <span className='text-danger '> user name is required </span>}
                    {/* {errors.email && errors.email.type === "pattern" && <span className='text-danger '>Invalid email </span>} */}
                  </div>

                  <div className="col-md-6">
                    <div className="form-group mt-3 position-relative">
                      <label htmlFor="" className='color fs-6'>E-mail</label>
                      <input
                        className='form-control ps-1'
                        type="email"
                        placeholder='Enter your E-mail'
                        {...register("email",
                          {
                            required: true,
                            pattern: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/
                          })}
                      />
                      <hr className="text-white m-0" />
                    </div>
                    {errors.email && errors.email.type === "required" && <span className='text-danger '> email is required </span>}
                    {errors.email && errors.email.type === "pattern" && <span className='text-danger '>Invalid email </span>}

                  </div>

                  <div className="col-md-6">
                    <div className="form-group mt-3 position-relative">
                      <label htmlFor="" className='color fs-6'>Country</label>
                      <input
                        className='form-control ps-1'
                        type="text"
                        placeholder="Enter your country "
                        {...register("country",
                          {
                            required: true

                          }
                        )}
                      />
                      <hr className="text-white m-0" />
                    </div>
                    {errors.country && errors.country.type === "required" && <span className='text-danger'> country is required </span>}
                  </div>

                  <div className="col-md-6">
                    <div className="form-group mt-3 position-relative">
                      <label htmlFor="" className='color fs-6'>Phone Number</label>
                      <input
                        className='form-control ps-1'
                        type="number"
                        placeholder="Enter your phone number"
                        {...register("phoneNumber",
                          {
                            required: true
                          }
                        )}
                      />
                      <hr className="text-white m-0" />
                      {errors.phoneNumber && errors.phoneNumber.type === "required" && <span className='text-danger'> phone number is required </span>}

                    </div>
                  </div>

                  <div className="col-md-6">
                    <div className="form-group mt-3 position-relative">
                      <label htmlFor="" className='color fs-6'>password</label>
                      <input
                        className='form-control ps-1'
                        type="password"
                        placeholder="Enter your password"
                        {...register("password",
                          {
                            required: true
                          }
                        )}
                      />
                      <hr className="text-white m-0" />
                    </div>

                    {errors.password && errors.password.type === "required" && <span className='text-danger'> password is required </span>}

                  </div>

                  <div className="col-md-6">
                    <div className="form-group mt-3 position-relative">
                      <label htmlFor="" className='color fs-6'>Confirm Password</label>
                      <input
                        className='form-control ps-1'
                        type="password"
                        placeholder="confirm your password"
                        {...register("confirmPassword",
                          {
                            required: true

                          }
                        )}
                      />
                      <hr className="text-white m-0" />
                    </div>

                    {errors.confirmPassword && errors.confirmPassword.type === "required" && <span className='text-danger'> confirm Password is required </span>}

                  </div>
                </div>

                <div className='form-group d-flex justify-content-end my-3 fs-6'>
                  <Link className='text-white text-decoration-underline' to={"/login"}>
                    Login Now ?
                  </Link>
                </div>

                <div className='w-75 m-auto'>
                  <button className={`${styles.rounded6} btn btn-success w-100 mt-3`}>
                    save
                  </button>
                </div>
              </form>
            </div>

          </div>
        </div>
      </div>
    </>
  )
}
