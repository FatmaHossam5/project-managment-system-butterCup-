import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import './App.css';
import Dashboard from './Components/Dashboard/Dashboard';
import Login from './Components/Login/Login';
import Projects from './Components/Projects/Projects';
import Register from './Components/Register/Register';
import RequestReset from './Components/RequestReset/RequestReset';
import ResetPassword from './Components/ResetPassword/ResetPassword';
import Tasks from './Components/Tasks/Tasks';
import Users from './Components/Users/Users';
import VerifyUser from './Components/VerifyUser/VerifyUser';
import AuthLayout from './Shared/AuthLayout/AuthLayout';
import Notfound from './Shared/NotFound/Notfound';
import { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import MasterLayout from './Shared/MasterLayout/MasterLayout';
import ProtectedRoute from './Shared/ProtectedRoute/ProtectedRoute';
import { ToastContainer } from 'react-bootstrap';

function App() {
  interface saveAdminData{
    encodedToken:String|null,
    decodedToken:string|null
  }
  const[adminData,setAdminData]=useState(null)
 
  let saveAdminData=()=>{
    let encodedToken=localStorage.getItem("adminToken");
    let decodedToken= jwtDecode(encodedToken)
    setAdminData(decodedToken)
  
  }
  useEffect(()=>{
    if(localStorage.getItem("adminToken")){
      saveAdminData()
    }
  },[])

  const routes = createBrowserRouter([{
     path:'/',
     element:<AuthLayout/>,
     errorElement:<Notfound/>,
     children:[
      {index:true,element:<Login saveAdminData={saveAdminData} />},
      {path:'login',element:<Login saveAdminData={saveAdminData}/>},
      {path:'register',element:<Register/>},
      {path:'request-reset',element:<RequestReset/>},
      {path:'reset-password',element:<ResetPassword/>},
      {path:'verify-user',element:<VerifyUser/>},
     ]
  },{
    path:'dashboard',
    element: <ProtectedRoute adminData={adminData}> <MasterLayout adminData={adminData} />  </ProtectedRoute>,
           
               
    errorElement:<Notfound/>,
    children:[
     {index:true,element:<Dashboard  adminData={adminData} />},
     {path:'projects',element:<Projects/>},
     {path:'users',element:<Users/>},
     {path:'tasks',element:<Tasks/>},
    ]
  }]);

  return (
    <>
    <ToastContainer/>
   <RouterProvider router={routes}/>
    </>
  )
}

export default App
