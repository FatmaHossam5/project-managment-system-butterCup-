import { useForm } from "react-hook-form";
// import logo from "../../../src/assets/bg-changepass.jpg";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

export default function ChangePass({ handleClose }:any) {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data:any) => {
    // console.log(data);

    axios
      .put(
        "https://upskilling-egypt.com/api/v1/Users/ChangePassword",
        data,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
          },
        }
      )
      .then((response) => {
        handleClose();
        toast.success("password changed successsfully", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      })
      .catch((error) => {
        toast.error(error.response.data.message, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      });
  };

  return (
    <>
     <div className="Auth-container container-fluid ">
 
 <div className="row bg-overlay vh-100 justify-content-center align-items-center">

   <div className="col-lg-5 col-md-7 col-sm-9 ">
   {/* <div className="logo  position-relative "> 
 
  <img src={logo} alt="logo" className="position-absolute " />
 </div> */}

         <div className="form-group from-design py-3 my-5 rounded-2  ">
      
         <form className="w-75 m-auto" onSubmit={handleSubmit(onSubmit)}>
              <h4 className="fw-bolder color position-relative p-0">Change Your Password</h4>
              <div className="form-group my-1 position-relative">
               <p  className="color my-0" style={{ fontSize: '14px' }}>Old Password</p>
                <input
                  placeholder="Old Password"
                  className="form-control ps-4 mb-1"
                  type="password"
                  {...register("oldPassword", {
                    required: true,
                  })}
                />
                    <hr className="text-white" />

                {errors.oldPassword &&
                  errors.oldPassword.type === "required" && (
                    <span className="text-danger">oldPassword is required</span>
                  )}
              </div>
              <div className="form-group my-1 position-relative">
                <p className="color my-0" style={{ fontSize: '14px' }}>New Password</p>

                <input
                  placeholder="New Password"
                  className="form-control ps-4 mb-1"
                  type="password"
                  {...register("newPassword", {
                    required: true,
                  })}
                />
                 <hr className="text-white" />

                {errors.newPassword &&
                  errors.newPassword.type === "required" && (
                    <span className="text-danger">newPassword is required</span>
                  )}
              </div>
              <div className="form-group my-1 position-relative">
                <p className="color my-0" style={{ fontSize: '14px' }}>Confirm Password</p>
                <input
                  placeholder="Confirm New Password"
                  className="form-control ps-4 mb-1"
                  type="password"
                  {...register("confirmNewPassword", {
                    required: true,
                  })}
                />
                   <hr className="text-white" />

                {errors.confirmNewPassword &&
                  errors.confirmNewPassword.type === "required" && (
                    <span className="text-danger">
                      confirmNewPassword is required
                    </span>
                  )}
              </div>

              <div className="form-group my-3">
                <button className="btn  w-100">Change Password</button>
              </div>
            </form>
     
     </div>
   </div>
 </div>
</div>
    </>
  );
}



