


import { Outlet } from 'react-router-dom'
import Header from '../Header/Header'
import NavBar from '../Navbar/NavBar'
import SideBar from '../SideBar/SideBar'

export default function MasterLayout({userData}:any) {
  return (
 <>

<div className="container-fluid master">
    <div className="col-md-12 bg-white  ">
        <NavBar userData={userData}/>
    </div>
    <div className='d-flex '>
    <div className="col-md-2 "  >

        <SideBar/>
    </div>
    <div className='col-md-10 dashboard mt-0  '>        
      
    <Outlet userData={userData}/>

    </div>
    </div>
  
</div>

    </>
  )
}
