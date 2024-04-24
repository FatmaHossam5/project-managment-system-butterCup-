import { useContext } from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./App.css";
import { AddProject, AddTask, AuthContext, AuthLayout, ChangePass, Dashboard, EditProject, EditTask, Login, MasterLayout, Notfound, Projects, ProtectedRoute, Register, RequestReset, ResetPassword, Tasks, ToastContainer, Users, VerifyUser, ViewProject } from './index'
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";



function App() {
  let { userData, saveUserData }: any = useContext(AuthContext)
  const routes = createBrowserRouter([{
    path: '/',
    element: <AuthLayout />,
    errorElement: <Notfound />,
    children: [
      { index: true, element: <Login saveUserData={saveUserData} /> },
      { path: 'login', element: <Login saveUserData={saveUserData} /> },
      { path: 'register', element: <Register /> },
      { path: 'request-reset', element: <RequestReset /> },
      { path: 'reset-password', element: <ResetPassword /> },
      { path: 'verify-user', element: <VerifyUser /> },
      { path: 'Change-pass', element: <ChangePass   /> },

    ]
  }, 
   {
    path: 'dashboard',
    element: <ProtectedRoute userData={userData}> <MasterLayout userData={userData} />  </ProtectedRoute>,
    errorElement: <Notfound />,
    children: [
      { index: true, element: <Dashboard userData={userData} /> },
      { path: "projects", element: <Projects /> },
      { path: "Add-pro", element: <AddProject /> },
      { path: "edit-pro/:id", element: <EditProject /> },
      { path: "view-pro/:id", element: <ViewProject /> },
      { path: "users", element: <Users /> },
      { path: "tasks", element: <Tasks /> },
      { path: "add-task", element: <AddTask /> },
      { path: "edit-task/:id", element: <EditTask /> },

    ],
  },
  ]);

  return (
    <>
      <DndProvider backend={HTML5Backend}>
        <RouterProvider router={routes} />
        <ToastContainer />
      </DndProvider>
    </>






  );
}

export default App;
