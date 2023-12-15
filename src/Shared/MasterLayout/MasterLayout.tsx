import React from 'react'
import SideBar from '../SideBar/SideBar'
import NavBar from '../Navbar/NavBar'
import { Outlet } from 'react-router-dom'

export default function MasterLayout({adminData}:any) {
  return (
    <>
   
    <div className="container-fluid">
        <div className="row">
            <div className="col-md-3 ">
                <div>
                    <SideBar/>
                </div>
            </div>
            <div className="col-md-9">
                <div className='bg-info'>
                    <NavBar adminData={adminData}/>
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
