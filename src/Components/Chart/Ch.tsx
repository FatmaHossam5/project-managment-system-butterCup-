import { useContext, useEffect, useState } from "react";
import { Chart as ChartJs } from "chart.js/auto";
import { Doughnut} from "react-chartjs-2";
import { AuthContext } from "../../Context/AuthContext";
import axios from "axios";
import { ToastContext } from "../../Context/ToastContext";
import Loading from "../../Shared/Loading/Loading";
interface TaskCounts {
  toDo: number;
  inProgress: number;
  done: number;
}

interface ContextType {
  baseUrl: string;
  reqHeaders: any; 
}




export default function Ch() {
  const [toDoCount, setToDoCount] =  useState<number>(0);
  const [progressCount, setProgressCount] = useState<number>(0);
  const [doneCount, setDoneCount] = useState<number>(0);
  const {baseUrl,reqHeaders}:ContextType=useContext(AuthContext);
  const {getToastValue}=useContext(ToastContext);
  const [isLoading ,setIsLoading]=useState(false)


  const getTasksCounts =()=>{
    setIsLoading(true)
    axios.get<TaskCounts>(`${baseUrl}/Task/count`,{headers:reqHeaders}).then((response)=>{
      setToDoCount(response?.data?.toDo)
      setProgressCount(response?.data?.inProgress)
      setDoneCount(response?.data?.done)

    }).catch((error)=>{
     getToastValue('error',error.message)
    }).finally(()=>{
      setIsLoading(false)
    })
  }

  useEffect(()=>{
    getTasksCounts();
  },[])
  
  const data = {
    labels: ["ToDo", "InProgress","Done"],
    datasets: [
      {
        label: "Employee Status",
        data: [toDoCount,progressCount,doneCount ],
        borderWidth: 1,
        backgroundColor:['#446961','#EF9B28',"#076b55"],
      },
    ],
    options: {
      scales: {
        x: { 
          display: false,
          drawOnChartArea: true
        },
      },
    },
  };

  useEffect(() => {
    ChartJs.register();
  }, []);

  return (
    <>
    {isLoading?<Loading/>:
    <>
     <div style={{ maxWidth: "300px",margin:"auto" }}    >
      <Doughnut data={data}  ></Doughnut>
    </div>
    </>}
   
    </>
  );
}
