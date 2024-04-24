import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Context/AuthContext.tsx";
import { ToastContext } from "../../Context/ToastContext.tsx";
import Loading from "../../Shared/Loading/Loading.tsx";
import DoneIcon from '../../assets/DoneIcon.svg';
import ProgressIcon from '../../assets/ProgressIcon.svg';
import TodoIcon from '../../assets/TodoIcon.svg';
import header from "../../assets/header-bg.png";
import Ch from "../Chart/Ch.tsx";
import ChartsUsers from "../chartsUsers/chartsUsers.tsx";
interface TaskDetail {
  cardColor: string;
  iconBgColor: string;
  icon: string;
  status: string;
  number: number;
}

interface UserDetails extends TaskDetail {
  status: "ActiveUser" | "DesActiveUser";
}
interface DashboardProps {
  userData: any;
}

export default function Dashboard({ userData }: DashboardProps) {
  const [toDoCount, setToDoCount] =  useState<number>(0);
  const [progressCount, setProgressCount] =  useState<number>(0);
  const [doneCount, setDoneCount] = useState<number>(0);
  const[isLoading,setIsLoading]=useState<boolean>(false);
  const [activeCount, setActiveCount] =  useState<number>(0);
  const [deActiveCount, setDeActiveCount] =  useState<number>(0);
  const {baseUrl,reqHeaders,role}=useContext(AuthContext)
  const{getToastValue}=useContext(ToastContext)
  const TasksDetails :TaskDetail[]= [
    { cardColor: "tasksTodo", iconBgColor: "tasksBg", icon: TodoIcon, status: "Todo", number: toDoCount },
    { cardColor: "tasksProgress", iconBgColor: "progressBg", icon: ProgressIcon, status: "InProgress", number: progressCount },
    { cardColor: "tasksDone", iconBgColor: "doneBg", icon: DoneIcon, status: "Done", number: doneCount }
  ]
  const UsersDetails: UserDetails[]= [
    { cardColor: "tasksTodo", iconBgColor: "tasksBg", icon: TodoIcon, status: "ActiveUser", number: activeCount },
    { cardColor: "tasksProgress", iconBgColor: "progressBg", icon: ProgressIcon, status: "DesActiveUser", number: deActiveCount },
  ]

  const getTasksCounts =()=>{
    setIsLoading(true)
    axios.get(`${baseUrl}/Task/count`,{headers:reqHeaders}).then((response)=>{
      setToDoCount(response?.data?.toDo)
      setProgressCount(response?.data?.inProgress)
      setDoneCount(response?.data?.done)
    }).catch((error)=>{
      getToastValue('error',error.message)
    }).finally(()=>{
      setIsLoading(false)
    })
  }



  const getUsersCounts =()=>{
    setIsLoading(true)
    axios.get(`${baseUrl}/Users/count`,{headers:reqHeaders}).then((response)=>{
      setActiveCount(response?.data?.activatedEmployeeCount)
      setDeActiveCount(response?.data?.deactivatedEmployeeCount)
    }).catch((error)=>{
      getToastValue('error',error.message)
    }).finally(()=>{
      setIsLoading(false)
    })
  }

useEffect(()=>{
  getTasksCounts();
  if(role==='Manager'){
    getUsersCounts();

  }
},[])

  return (
    <>
      <div>
        <div className="container-fluid   ">
          {/*welcome section*/}
          <div className="col-12  ">
            <div className="header position-relative   ">
              <img src={header} alt="background" className='w-100 ' />
            </div>
            <div className="header-content position-absolute ">
              <h1 className='text-white'>
                Welcome  <span className='text-warning'> {userData?.userName}</span>
              </h1>
              <h3 className='mt-2 text-white'>
                You can add project and assign tasks to your team
              </h3>
            </div>
          </div>
          {/*cards section*/}
          {isLoading? <Loading/>:<>

          <div className="col-11 rounded-2 m-auto mt-3   d-flex justify-content-between">
            <div className="col-6   ">
              <h3 className="ps-4 mt-3">Tasks</h3>
              <div className=" progress-mode d-flex justify-content-around  ">
                {TasksDetails.map((ele) =>
                  <div key={ele.icon} className="col-md-3 mt-5   text-center ">

                    <div className={`d-flex flex-column ${ele.cardColor} p-2 rounded-4`}>

                      <div className={`IconContainer ${ele.iconBgColor} p-1 mb-2`}>
                        <img src={ele.icon} alt="Icon" />
                      </div>
                      <h6 className='mb-0'>{ele.status}</h6>
                      <span className='fs-4 fw-medium'>{ele.number}</span>
                    </div>
                  </div>
                )}
              </div>

            </div>
            {role==='Manager'&&(<>
            <div className="col-6  ">
              <h3 className="ps-5 mt-3">Users</h3>
              <div className=" progress-mode d-flex   ">
                {UsersDetails.map((ele) =>
                  <div key={ele.icon} className="col-md-4 m-5  text-center ">

                    <div className={`d-flex flex-column ${ele.cardColor} p-2 rounded-4`}>

                      <div className={`IconContainer ${ele.iconBgColor} p-1 mb-2`}>
                        <img src={ele.icon} alt="Icon" />
                      </div>
                      <h6 className='mb-0'>{ele.status}</h6>
                      <span className='fs-4 fw-medium'>{ele.number}</span>
                    </div>
                  </div>
                )}
              </div>

            </div>
            </>)}
         
          </div>
          {/*Doughnut section*/}
          <div className="col-10   d-flex  justify-content-between">
            <div className="col-5 mx-auto box  rounded-3 my-3 "><Ch /></div>
{role==="Manager"&&(<>
<div className="col-4 box rounded-3 my-2"><ChartsUsers /></div>
</>)}
       
          </div>
          </>}
        
        </div>


      </div>
    </>
  );
}
