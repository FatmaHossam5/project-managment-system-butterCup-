import React from 'react'
import { useLocation } from 'react-router-dom'
import AuthLogo from '../../assets/AuthLogo.svg'
import bgLogin from '../../assets/bg-logIn.png'
import bgRequest from '../../assets/bg-reuest.png'
import bgReset from '../../assets/bg-reset.png'
import bgRegister from '../../assets/bg-register.png'

interface Props {
    children: React.ReactNode
    title: string
  }
export default function AuthComponent({title,children}:Props) {
const {pathname}=useLocation();

const getBackgroundStyle = () => {
  let backgroundImage;
  switch(pathname) {
    case '/':
    case '/login':
      backgroundImage = bgLogin;
      break;
    case '/request-reset':
      backgroundImage = bgRequest;
      break;
    case '/reset-password':
      backgroundImage = bgReset;
      break;
    case '/register':
      backgroundImage = bgRegister;
      break;
    case '/verify':
      backgroundImage = bgLogin;
      break;
    default:
      backgroundImage = bgLogin;
  }
  
  return {
    background: `url(${backgroundImage}) no-repeat`,
    backgroundSize: '100% 100%',
    minHeight: '100vh'
  };
};

  return (
    <>
    <main className="Auth-container container-fluid" style={getBackgroundStyle()}>
    <div className="auth">
      
      <div className={`${pathname === '/register' || pathname === '/verify' ? "col-md-10" :"col-6" }  m-auto`}>

        <div className='text-center '>
          <img src={AuthLogo} className='Auth-Logo object-fit-cover me-2 mt-1' alt="logo" />
        </div>

        <div className={`position-relative bg-overlay p-5  text-white  ${pathname === "/" ? " animate__zoomIn" : pathname === "/reset-pass" ? "animate__slideInDown" : pathname === "/register" ?  "animate__slideInDown more"  : pathname === "/verify" ? "animate__zoomIn" : "animate__zoomInDown"} `}>
          <span>Welcome to PMS</span>
          <h1 className={`fw-bold orange ${pathname === '/register' || pathname === '/verify' ? "mb-3" :"mb-0" } title position-relative `}>{title}</h1>
          {children}
        </div>

      </div>
    </div>
  </main>
  </>
  )
}
