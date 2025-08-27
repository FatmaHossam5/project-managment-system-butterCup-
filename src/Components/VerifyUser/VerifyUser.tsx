import axios from 'axios';
import { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Context/AuthContext';
import { ToastContext } from '../../Context/ToastContext';
import AuthComponent from '../../Shared/AuthComponent/AuthComponent';
import Input from '../../Shared/Input/Input';
import Button from '../../Shared/Button/Button';

export default function VerifyUser() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();
  const { baseUrl } = useContext(AuthContext);
  const { getToastValue } = useContext(ToastContext);

  const verifyUser = (data: any) => {
    axios.put(`${baseUrl}/Users/verify`, data)
      .then(() => {
        getToastValue("success", "Verified");
        navigate('/login');
      })
      .catch((error) => {
        getToastValue('error', error?.response?.data?.message);
      });
  };

  return (
    <AuthComponent title="Verify Email">
      <form onSubmit={handleSubmit(verifyUser)}>
        <Input
          type="email"
          placeholder="Enter your E-mail"
          label="E-mail"
          name="email"
          register={register}
          errors={errors}
          required={true}
          validation={{
            pattern: {
              value: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
              message: "Please enter a valid email address"
            }
          }}
        />

        <Input
          type="password"
          placeholder="Enter your code"
          label="Code"
          name="code"
          register={register}
          errors={errors}
          required={true}
        />

        <div className="form-group mt-4">
          <Button
            type="submit"
            variant="primary"
            fullWidth={true}
            className="rounded-5 p-2"
          >
            Verify
          </Button>
        </div>
      </form>
    </AuthComponent>
  );
}
