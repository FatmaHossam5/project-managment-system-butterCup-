import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useContext } from "react";
import { AuthContext } from "../../Context/AuthContext";

export default function ChangePass({ handleClose }: any) {
  const navigate = useNavigate();

  let { reqHeaders, baseUrl }:any = useContext(AuthContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data: any) => {
  const onSubmit = (data:any) => {
     axios
      .put(`${baseUrl}/Users/ChangePassword`, data, {
        headers: reqHeaders,
      })
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
      <div className="Auth-container container-fluid  bg-overlay">
        <div className="row ">
          <form
            className="w-100 m-auto p-5 bg-form"
            onSubmit={handleSubmit(onSubmit)}
          >
            <h4 className="fw-bolder color p-0">Change Your Password</h4>
            <div className="form-group my-1 ">
              <p className="color my-0" style={{ fontSize: "14px" }}>
                Old Password
              </p>
              <input
                placeholder="Old Password"
                className="form-control ps-4 mb-1"
                type="password"
                {...register("oldPassword", {
                  required: true,
                })}
              />
              <hr className="text-white" />

              {errors.oldPassword && errors.oldPassword.type === "required" && (
                <span className="text-danger">oldPassword is required</span>
              )}
            </div>
            <div className="form-group my-1 position-relative">
              <p className="color my-0" style={{ fontSize: "14px" }}>
                New Password
              </p>

              <input
                placeholder="New Password"
                className="form-control ps-4 mb-1"
                type="password"
                {...register("newPassword", {
                  required: true,
                })}
              />
              <hr className="text-white" />

              {errors.newPassword && errors.newPassword.type === "required" && (
                <span className="text-danger">newPassword is required</span>
              )}
            </div>
            <div className="form-group my-1 position-relative">
              <p className="color my-0" style={{ fontSize: "14px" }}>
                Confirm Password
              </p>
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
              <button className="btn w-100">Change Password</button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
                }
}
