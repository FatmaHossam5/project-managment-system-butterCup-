import { Outlet } from "react-router-dom";
import NavBar from "../Navbar/NavBar";
import SideBar from "../SideBar/SideBar";

export default function MasterLayout({ userData }: any) {
  return (
    <>
      <div className="container-fluid master ">
          <div className="d-flex   ">
          <div className="vh-25">
            <SideBar/>
          </div>
          <div className="w-100 bg-body mb-4" >
            <NavBar userData={userData}/>
           <Outlet/>
          </div>
          </div>
        </div>
   
    </>
  );
}
