import SideBar from '../SideBar/SideBar'
import NavBar from '../Navbar/NavBar'
import Dashboard from '../../Components/Dashboard/Dashboard'
import Header from '../Header/Header'

export default function MasterLayout({userData}:any) {
  return (
    <>

<div className="container-fluid master">
    <div className="col-md-12 bg-white  ">
        <NavBar userData={userData}/>
    </div>
    <div className='d-flex'>
    <div className="col-md-2 vh-100  ">
        <SideBar/>
    </div>
    <div className='col-md-10 dashboard'>

        <Header  userData={userData}/>
        
      
    <Dashboard/>

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
                <div className='bg-danger'>
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
