import React from 'react'
import SideBar from '../SideBar/SideBar'
import NavBar from '../Navbar/NavBar'
import { Outlet } from 'react-router-dom'

export default function MasterLayout() {
  return (
    <>
   
    <div className="container-fluid">
        <div className="row">
            <div className="col-md-3 ">
                <div className='bg-danger'>
                    <SideBar/>
                </div>
            </div>
            <div className="col-md-9">
                <div className='bg-info'>
                    <NavBar/>
                </div>
                <div className="content-container">
                <Outlet/>
                </div>
            </div>
        </div>
    </div>
    </>
  )
}
