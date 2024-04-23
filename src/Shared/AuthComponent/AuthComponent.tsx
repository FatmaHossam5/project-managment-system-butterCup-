import React from 'react'
import { useLocation } from 'react-router-dom'
import AuthLogo from '../../assets/AuthLogo.svg'
interface Props {
    children: React.ReactNode
    title: string
  }
export default function AuthComponent({title,children}:Props) {
const {pathname}=useLocation();
  return (
    <>
    <main className={`${pathname === '/' || pathname === '/login' ? "AuthLogin" : pathname === "/request-reset" ? "bg-request" : pathname === "/reset-password" ? "bg-reset" : "AuthChange"} Auth-container container-fluid`}>
    <div className=" auth  ">
      
      <div className={`${pathname === '/register'? "col-md-10" :"col-md-6" }  m-auto`}>

        <div className='text-center '>
          <img src={AuthLogo} className='Auth-Logo object-fit-cover me-2 mt-1' alt="logo" />
        </div>

        <div className={`position-relative bg-overlay p-5  text-white  ${pathname === "/" ? " animate__zoomIn" : pathname === "/reset-pass" ? "animate__slideInDown" : pathname === "/register" ?  "animate__slideInDown more"  :  "animate__zoomInDown"} `}>
          <span>Welcome to PMS</span>
          <h1 className={`fw-bold orange ${pathname === '/register'? "mb-3" :"mb-0" } title position-relative `}>{title}</h1>
          {children}
        </div>

      </div>
    </div>
  </main>
  </>
  )
}
