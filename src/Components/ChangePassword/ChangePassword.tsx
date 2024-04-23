import axios from "axios";
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../Context/AuthContext";
import { ToastContext } from "../../Context/ToastContext";
import ConfirmPassword from "../../Shared/ConfirmPassword/ConfirmPassword";
import PasswordInput from "../../Shared/PasswordInput/PasswordInput";
import styles from './ChangePassword.module.css';
interface ChangePassProps {
  handleClose: () => void;
}
interface FormData {
  oldPassword: string;
  newPassword: string;
  confirmNewPassword: string;
}
export default function ChangePass({ handleClose }: ChangePassProps) {

  const { reqHeaders, baseUrl }: any = useContext(AuthContext);
  const { getToastValue } = useContext(ToastContext);
  const [isLoading, setIsLoading] = useState(false)
  const { register, handleSubmit, formState: { errors }, getValues } = useForm<FormData>();

  const onSubmit = (data: FormData) => {
    setIsLoading(true)
    axios
      .put(`${baseUrl}/Users/ChangePassword`, data, {
        headers: reqHeaders,
      })
      .then((response) => {
        handleClose();
        getToastValue('success', 'password changed SuccessFully')
      })
      .catch((error) => {
        getToastValue('error', error.response.data.message)
      }).finally(() => {
        setIsLoading(false)
      })
  };
  return (
    <>
      <div className=" container-fluid   ">
        <div className="row ">
          <form
            className="w-100 m-auto p-5"
            onSubmit={handleSubmit(onSubmit)}
          >
            <h3 className="fw-bolder color ">Change Your Password</h3>
            <PasswordInput {...{ register, errors }} inputName={"oldPassword"} placeholder="old Password" />
            <PasswordInput {...{ register, errors }} inputName={"newPassword"} placeholder="New Password" />
            <ConfirmPassword {...{ register, errors, getValues }} inputName={'confirmNewPassword'} placeholder="Confirm New Password" />
            <button type="submit" disabled={isLoading} className={`${styles.changeBtn} btn AuthBtn w-100 mt-4  text-white bg-orange rounded-3 btn-lg `}>{isLoading ? <i className='fa fa-spin fa-spinner'></i> : 'Change Password'}</button>
          </form>
        </div>
      </div>
    </>
  );
}

