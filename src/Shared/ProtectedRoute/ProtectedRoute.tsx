import { Navigate } from 'react-router-dom';

export default function ProtectedRoute({userData,children}:any) {
    if(userData==null&&localStorage.getItem("userToken")==null){
        return <Navigate to ='/login'/>
     }else{
        return children;
     }
}
