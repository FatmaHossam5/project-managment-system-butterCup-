
import { Link} from "react-router-dom";
import logo from '../../assets/PMS 3.svg'

export default function Login() {
 
  return (
  
    <div className="Auth-container container-fluid ">
 
      <div className="row bg-overlay vh-100 justify-content-center align-items-center">
   
        <div className="col-lg-5 col-md-7 col-sm-9 ">
        <div className="logo  position-relative "> 
      
      <img src={logo} alt="logo" className="position-absolute " />
      </div>
          <div className="from-design py-4 rounded-2">
            <form className="  w-75 m-auto" >
            <span className=" text-white">
              welcome to PMS
              </span>
              <h4 className="fw-bolder color position-relative">Login</h4>
              <div className="form-group my-4 ">
              
                <input
                  placeholder="Enter your E-mail "
                  className="form-control ps-4 mb-1 login " 
                  type="email"
                
                  
               
               />
               <hr className="text-white" />
                
              </div>

              <div className="form-group my-3 ">
              

                <input
                  placeholder=" Enter your Password"
                  className="form-control ps-4 mb-1"
                  type="password"
                 
                />
              <hr className="text-white" />
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