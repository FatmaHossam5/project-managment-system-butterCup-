
import { useForm } from "react-hook-form";
import { Link} from "react-router-dom";


export default function Login() {
  const {register,handleSubmit,formState:{errors}}=useForm()

  const LogIn=(data:string)=>{
   
    console.log(data);
    
  }
 
  return (
    <div className="Auth-container container-fluid">
      <div className="row bg-overlay vh-100 justify-content-center align-items-center">
        <div className="col-lg-5 col-md-7 col-sm-9">
          <div className="from-design py-4 rounded-2">
            
            <form className="  w-75 m-auto" onSubmit={handleSubmit(LogIn as any)} >
            <span className=" text-white">
              welcome to PMS
              </span>
              <h4 className="fw-bolder color">Log in</h4>
              <div className="form-group my-3 position-relative">
                <i className="fa fa-envelope-open position-absolute"></i>
                <input
                  placeholder="Enter your E-mail"
                  className="form-control ps-4 mb-1"
                  type="email"
                  style={{ border:'none',color:'#EF9B28',}}
                  {...register('email',{required:true,pattern:/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/})}
                />
                {errors.email&&errors.email.type==='required'&&(<span className="text-danger"> email is required</span>)}
              </div>

              <div className="form-group my-3 position-relative">
                <i className="fa fa-key position-absolute"></i>

                <input
                  placeholder="Password"
                  className="form-control ps-4 mb-1"
                  type="password"
                  {...register("password",{required:true})}
                 
                />
                {errors.password&&errors.password.type==='required'&&(<span className="text-danger"> password is required</span>)}
              
              </div>

              <div className="form-group my-3 position-relative d-flex justify-content-end">
                <Link to="/reset-pass-request" className="text-white">
                  Forgot Password?
                </Link>
              </div>

              <div className="form-group my-3">
                <button className="btn w-100">Login</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}