import { useContext } from 'react';
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
import MasterLayout from './Shared/MasterLayout/MasterLayout';
import Notfound from './Shared/NotFound/Notfound';
import ProtectedRoute from './Shared/ProtectedRoute/ProtectedRoute';
import { ToastContainer } from 'react-bootstrap';
import { AuthContext } from './Context/AuthContext';
import ChangePass from './Components/ChangePassword/ChangePassword';


function App() {

 let {userData,saveUserData}:any=useContext(AuthContext)

  const routes = createBrowserRouter([{
     path:'/',
     element:<AuthLayout/>,
     errorElement:<Notfound/>,
     children:[
      {index:true,element:<Login saveUserData={saveUserData} />},
      {path:'login',element:<Login saveUserData={saveUserData}/>},
      {path:'register',element:<Register/>},
      {path:'request-reset',element:<RequestReset/>},
      {path:'reset-password',element:<ResetPassword/>},
      {path:'verify-user',element:<VerifyUser/>},
      {path:'Change-pass',element:<ChangePass/>},

     ]
  },{
    path:'dashboard',
    element: <ProtectedRoute userData={userData}> <MasterLayout userData={userData} />  </ProtectedRoute>,
           
               
    errorElement:<Notfound/>,
    children:[
     {index:true,element:<Dashboard userData={userData} />},
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
