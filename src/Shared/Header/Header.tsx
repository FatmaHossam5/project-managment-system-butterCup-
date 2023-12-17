import React from 'react'
import header from '../../assets/header-bg.png'

export default function Header({userData}:any) {
console.log(userData);

  return (
   <>
   
   <div className="container-fluid headers  ">
    <div className="col-md-12 ">
      <div className="header position-relative ">
      <img src={header} alt="" className='w-100'/>
      </div>
      <div className="header-content  position-absolute ">
        <h1 className='text-white'>
        Welcome  <span className='text-warning'> {userData?.userName}</span>
        </h1>
           
       <h3 className='mt-5 text-white'>
       You can add project and assign tasks to your team
       </h3>
      </div>
   
    </div>
   </div>
   
   
   </>
  )
}
