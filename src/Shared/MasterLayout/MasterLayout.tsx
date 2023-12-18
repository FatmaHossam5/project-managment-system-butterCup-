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
    <div className='col-md-10 dashboard  '>

        <Header />
        
      
    <Outlet userData={userData}/>

    </div>
    </div>
  
</div>
   
    
  

    {/* <div className="container-fluid ">
        <div className="row">
        <div className="col-md-12">
                <div className='bg-info'>
                    <NavBar adminData={adminData}/>
                </div>
                </div>
            <div className="col-md-3 ">
                <div>
                    <SideBar/>
                </div>
            </div>
          
                <div className="content-container">
                <Outlet/>
                </div>
            
        </div>
    </div> */}
    </>
  )
}
