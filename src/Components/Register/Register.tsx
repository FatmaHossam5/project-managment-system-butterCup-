import axios from 'axios';
import { useContext, useState } from 'react';
import { ToastContainer } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Context/AuthContext';
import { ToastContext } from '../../Context/ToastContext';
import photo from '../../assets/Ellipse 1.svg';
import logo from '../../assets/PMS 3.svg';
import { validatePhoneNumber } from '../../Shared/Input/Input';
import styles from './Register.module.css';

export default function Register() {
  const navigate = useNavigate()
  const { baseUrl } = useContext(AuthContext);
  const { getToastValue } = useContext(ToastContext)
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm()

  const onSubmit = (data: any) => {
    setIsLoading(true);
    axios.post(
      `${baseUrl}/Users/Register`,
      data
    )
      .then(() => {
        getToastValue('success', 'Registration successful! Please verify your email to complete the process.')
        navigate('/verify-user')
      })
      .catch((error) => {
        // Handle validation errors from the API
        if (error.response?.data?.additionalInfo?.errors) {
          const errors = error.response.data.additionalInfo.errors;
          const errorMessages = Object.values(errors).flat().join(', ');
          getToastValue('error', errorMessages);
        } else {
          getToastValue('error', error.response?.data?.message || 'Registration failed. Please try again.')
        }
      })
      .finally(() => {
        setIsLoading(false);
      })
  }

  return (
    <>
      <div className='container-fluid Auth-container'>
        <div className="row bgOverlay align-items-center justify-content-center min-vh-100 py-4">
          <div className="col-xl-5 col-lg-6 col-md-8 col-sm-10 col-11">
            
            {/* Logo Section - Fixed positioning */}
            <div className="text-center mb-4">
              <img src={logo} alt="PMS Logo" className={styles.logoImage} />
            </div>

            {/* Form Container */}
            <div className={`${styles.formContainer} form-group from-design py-4 px-4 px-md-5 rounded-3 shadow-lg`}>
              
              {/* Header */}
              <div className="text-center mb-4">
                <h6 className='text-white mb-2 fs-5'>Welcome to PMS</h6>
                <h3 className='color mb-0'>
                  <span className='text-decoration-underline color fs-1'>C</span>reate New Account
                </h3>
              </div>

              {/* Profile Photo Upload - Improved UX */}
              <div className='text-center text-white mb-4 position-relative'>
                <div className={styles.photoUploadContainer}>
                  <label htmlFor="uploadImage" className={styles.photoUploadLabel}>
                    <div className={styles.photoPreview}>
                      <img src={photo} alt='Default profile' className={styles.imgRegister} />
                      <div className={styles.uploadOverlay}>
                        <i className="fas fa-camera"></i>
                        <p>Click to upload photo</p>
                      </div>
                    </div>
                  </label>
                  <input 
                    type="file" 
                    className={styles.inputFileRegister} 
                    id='uploadImage'
                    accept="image/*"
                  />
                  <small className={styles.uploadHint}>
                    Upload a profile picture (optional)
                  </small>
                </div>
              </div>

              {/* Registration Form */}
              <form onSubmit={handleSubmit(onSubmit)} className={styles.registrationForm}>
                <ToastContainer />

                <div className="row g-3">
                  {/* Username Field - Updated validation */}
                  <div className="col-md-6">
                    <div className={`form-group position-relative ${styles.formField}`}>
                      <label htmlFor="userName" className={`${styles.formLabel} color fs-6 mb-2 d-block`}>
                        Username <span className="text-danger">*</span>
                      </label>
                      <input
                        id="userName"
                        className={`form-control ${styles.formInput} ${errors.userName ? styles.inputError : ''}`}
                        type="text"
                        placeholder='Enter your username'
                        {...register("userName", {
                          required: "Username is required",
                          minLength: {
                            value: 3,
                            message: "Username must be at least 3 characters"
                          },
                          pattern: {
                            value: /^[a-zA-Z]+[a-zA-Z0-9]*$/,
                            message: "Username must contain characters and end with numbers without spaces"
                          }
                        })}
                      />
                      <hr className={`${styles.inputUnderline} ${errors.userName ? styles.errorUnderline : ''}`} />
                      {errors.userName && (
                        <span className={`${styles.errorMessage} text-danger`}>
                          {errors.userName.message as string}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Email Field */}
                  <div className="col-md-6">
                    <div className={`form-group position-relative ${styles.formField}`}>
                      <label htmlFor="email" className={`${styles.formLabel} color fs-6 mb-2 d-block`}>
                        Email Address <span className="text-danger">*</span>
                      </label>
                      <input
                        id="email"
                        className={`form-control ${styles.formInput} ${errors.email ? styles.inputError : ''}`}
                        type="email"
                        placeholder='Enter your email'
                        {...register("email", {
                          required: "Email is required",
                          pattern: {
                            value: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
                            message: "Please enter a valid email address"
                          }
                        })}
                      />
                      <hr className={`${styles.inputUnderline} ${errors.email ? styles.errorUnderline : ''}`} />
                      {errors.email && (
                        <span className={`${styles.errorMessage} text-danger`}>
                          {errors.email.message as string}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Country Field */}
                  <div className="col-md-6">
                    <div className={`form-group position-relative ${styles.formField}`}>
                      <label htmlFor="country" className={`${styles.formLabel} color fs-6 mb-2 d-block`}>
                        Country <span className="text-danger">*</span>
                      </label>
                      <input
                        id="country"
                        className={`form-control ${styles.formInput} ${errors.country ? styles.inputError : ''}`}
                        type="text"
                        placeholder="Enter your country"
                        {...register("country", {
                          required: "Country is required"
                        })}
                      />
                      <hr className={`${styles.inputUnderline} ${errors.country ? styles.errorUnderline : ''}`} />
                      {errors.country && (
                        <span className={`${styles.errorMessage} text-danger`}>
                          {errors.country.message as string}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Phone Number Field */}
                  <div className="col-md-6">
                    <div className={`form-group position-relative ${styles.formField}`}>
                      <label htmlFor="phoneNumber" className={`${styles.formLabel} color fs-6 mb-2 d-block`}>
                        Phone Number <span className="text-danger">*</span>
                      </label>
                      <input
                        id="phoneNumber"
                        className={`form-control ${styles.formInput} ${errors.phoneNumber ? styles.inputError : ''}`}
                        type="tel"
                        placeholder="Enter your phone number"
                        {...register("phoneNumber", {
                          required: "Phone number is required",
                          validate: validatePhoneNumber
                        })}
                      />
                      <hr className={`${styles.inputUnderline} ${errors.phoneNumber ? styles.errorUnderline : ''}`} />
                      {errors.phoneNumber && (
                        <span className={`${styles.errorMessage} text-danger`}>
                          {errors.phoneNumber.message as string}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Password Field */}
                  <div className="col-md-6">
                    <div className={`form-group position-relative ${styles.formField}`}>
                      <label htmlFor="password" className={`${styles.formLabel} color fs-6 mb-2 d-block`}>
                        Password <span className="text-danger">*</span>
                      </label>
                      <input
                        id="password"
                        className={`form-control ${styles.formInput} ${errors.password ? styles.inputError : ''}`}
                        type="password"
                        placeholder="Enter your password"
                        {...register("password", {
                          required: "Password is required",
                          minLength: {
                            value: 8,
                            message: "Password must be at least 8 characters"
                          }
                        })}
                      />
                      <hr className={`${styles.inputUnderline} ${errors.password ? styles.errorUnderline : ''}`} />
                      {errors.password && (
                        <span className={`${styles.errorMessage} text-danger`}>
                          {errors.password.message as string}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Confirm Password Field */}
                  <div className="col-md-6">
                    <div className={`form-group position-relative ${styles.formField}`}>
                      <label htmlFor="confirmPassword" className={`${styles.formLabel} color fs-6 mb-2 d-block`}>
                        Confirm Password <span className="text-danger">*</span>
                      </label>
                      <input
                        id="confirmPassword"
                        className={`form-control ${styles.formInput} ${errors.confirmPassword ? styles.inputError : ''}`}
                        type="password"
                        placeholder="Confirm your password"
                        {...register("confirmPassword", {
                          required: "Please confirm your password",
                          validate: (value) => {
                            const currentPassword = watch("password");
                            return value === currentPassword || "Passwords do not match";
                          }
                        })}
                      />
                      <hr className={`${styles.inputUnderline} ${errors.confirmPassword ? styles.errorUnderline : ''}`} />
                      {errors.confirmPassword && (
                        <span className={`${styles.errorMessage} text-danger`}>
                          {errors.confirmPassword.message as string}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Login Link */}
                <div className='form-group d-flex justify-content-end my-4 fs-6'>
                  <Link className={`${styles.loginLink} text-white link text-decoration-none`} to={"/login"}>
                    Already have an account? <span className="color">Login Now</span>
                  </Link>
                </div>

                {/* Submit Button */}
                <div className='w-100'>
                  <button 
                    type="submit"
                    disabled={isLoading}
                    className={`${styles.submitButton} btn btn-success w-100 mt-3 AuthBtn position-relative`}
                  >
                    {isLoading ? (
                      <>
                        <i className='fa fa-spin fa-spinner me-2'></i>
                        Creating Account...
                      </>
                    ) : (
                      'Create Account'
                    )}
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