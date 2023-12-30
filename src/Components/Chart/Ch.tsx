import { useContext, useEffect, useState } from "react";
import { Chart as ChartJs } from "chart.js/auto";
import { Doughnut} from "react-chartjs-2";
import { AuthContext } from "../../Context/AuthContext";
import axios from "axios";

export default function Ch() {

 

  const [toDoCount, setToDoCount] = useState(0);
  const [progressCount, setProgressCount] = useState(0);
  const [doneCount, setDoneCount] = useState(0);
 

  const {baseUrl,reqHeaders}:any=useContext(AuthContext)


  const getTasksCounts =()=>{
    axios.get(`${baseUrl}/Task/count`,{headers:reqHeaders}).then((response)=>{
      console.log(response);
      
      setToDoCount(response?.data?.toDo)
      setProgressCount(response?.data?.inProgress)
      setDoneCount(response?.data?.done)

    }).catch((error)=>{
      console.log(error);
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
        backgroundColor:['pink','gray',"beige"],
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
    <div style={{width:'50%'}}>
      <Doughnut data={data} ></Doughnut>
    </div>
  );
}
