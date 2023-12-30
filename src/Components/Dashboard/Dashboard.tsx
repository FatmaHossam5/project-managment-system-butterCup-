import header from "../../assets/header-bg.png";
import icon from "../../assets/icone_one.png";
import iconn from "../../assets/icon_2.png";
import iconnn from "../../assets/icon_3.png";
import Ch from "../Chart/Ch.tsx";
import ChartsUsers from "../chartsUsers/chartsUsers.tsx";
import axios from "axios";
import { AuthContext } from "../../Context/AuthContext.tsx";
import { useContext, useEffect, useState } from "react";



export default function Dashboard({ userData }: any) {
  const [toDoCount, setToDoCount] = useState(0);
  const [progressCount, setProgressCount] = useState(0);
  const [doneCount, setDoneCount] = useState(0);
 

  const {baseUrl,reqHeaders,role}:any=useContext(AuthContext)


  const getTasksCounts =()=>{
    axios.get(`${baseUrl}/Task/count`,{headers:reqHeaders}).then((response)=>{
      // console.log(response);
      
      setToDoCount(response?.data?.toDo)
      setProgressCount(response?.data?.inProgress)
      setDoneCount(response?.data?.done)

    }).catch((error)=>{
      console.log(error);
    })
  }

  const [activeCount, setActiveCount] = useState(0);
  const [deActiveCount, setDeActiveCount] = useState(0);
  // console.log(deActiveCount);


  const getUsersCounts =()=>{
    axios.get(`${baseUrl}/Users/count`,{headers:reqHeaders}).then((response)=>{
      // console.log(response);
      
      setActiveCount(response?.data?.activatedEmployeeCount)
      setDeActiveCount(response?.data?.deactivatedEmployeeCount)

    }).catch((error)=>{
      console.log(error);
    })
  }

useEffect(()=>{
  getTasksCounts();
  getUsersCounts();
},[])

  return (
    <>
      <div>
        <div className="container-fluid headers  ">
    <div className="col-md-12 ">
      <div className="header position-relative   ">
      <img src={header} alt="" className='w-100 '/>
      </div>
      <div className="header-content  position-absolute ">
        <h1 className='text-white'>
        Welcome  <span className='text-warning'> {userData?.userName}</span>
        </h1>
           
       <h3 className='mt-5 text-white'>
       You can add project and assign tasks to your team
       </h3>
      </div>
   
    </div>
   </div>
   {role=="Manager"?  <div className="row">
          <div className="col-md-6">
            <div>
              <h3 className="pt-5 mt-5">Tasks</h3>
              <span>Lorem ipsum dolor sit amet,consecteture</span>
              <div className="row">
                <div className="col-md-4 d-flex p-4 m-4 ">
                  <div className=" rounded-3 colorr-one p-3 m-2 text-center" >
                    <img src={icon} alt="#" className="rounded-2 color-one "  style={{ width: '30px' }} />
                    <div className="text-#6F7881 " >Todo</div>
                    <h6>{toDoCount}</h6>
                  </div>
                  <div className=" rounded-3 colorr-two p-3 m-2 text-center" >
                    <img src={iconn} alt="#" className="rounded-2 color-two"  style={{ width: '30px' }} />
                    <div className="text-#6F7881 " >Inprogress</div>
                    <h6>{progressCount}</h6>
                  </div>
                  <div className=" rounded-3 colorr-three p-3 m-2 text-center" >
                    <img src={iconnn} alt="#" className="rounded-2 color-three"  style={{ width: '30px' }} />
                    <div className="text-#6F7881 " >Done</div>
                    <h6>{doneCount}</h6>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <h3 className="pt-5 mt-5">Progress</h3>
            <Ch />
          </div>
        </div>
:  <div className="row">
<div className="col-md-6">
  <div>
    <h3 className="pt-5 mt-5">Users</h3>
    <span>Lorem ipsum dolor sit amet,consecteture</span>
    <div className="row">
      <div className="col-md-4 d-flex p-4 m-4 ">
        <div className=" rounded-3 colorr-one p-3 m-2 text-center" >
          <img src={icon} alt="#" className="rounded-2 color-one "  style={{ width: '30px' }} />
          <div className="text-#6F7881 " >Active User</div>
          <h6>{activeCount}</h6>
        </div>
        <div className=" rounded-3 colorr-two p-3 m-2 text-center" >
          <img src={iconn} alt="#" className="rounded-2 color-two"  style={{ width: '30px' }} />
          <div className="text-#6F7881 " >Deactived User</div>
          <h6>{deActiveCount}</h6>
        </div>
      </div>
    </div>
  </div>
</div>
<div className="col-md-6">
  <h3 className="pt-5 mt-5">Users State</h3>
  <ChartsUsers/>
</div>
</div>}
      </div>
    </>
  );
}
