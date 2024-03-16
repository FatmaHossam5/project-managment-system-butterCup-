import React from 'react'
import navlogo from '../../assets/navlogo.png'
import userimg from '../../assets/userimg.png'
export default function NavBar({userData}:any) {
  return (
    <>

      <nav className="navbar navbar-expand-lg navbar-light   navbar rounded-3 ">
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav w-100 m-auto d-flex justify-content-between    ">
            <li className="nav-item  position-relative ">
              <img src={navlogo} alt="navlogo" />
            </li>
            <li className="nav-item d-flex   userImg   ">
              <i className="fa-solid fa-bell mt-3 text-warning  "></i>
              <a className="nav-link text-black " href="#">   <img src={userimg} alt="avatar" className='ps-1 ' />   </a>
              <div className='d-block'>
                <span className='fs-6 d-block '> {userData?.userName}</span>
                <span className='fs-6'>{userData?.userEmail}</span>
              </div>
            </li>
          </ul>
        </div>
      </nav>
      
    </>
  )
}
