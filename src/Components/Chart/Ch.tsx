import { useContext, useEffect, useState } from "react";
import { Chart as ChartJs } from "chart.js/auto";
import { Doughnut} from "react-chartjs-2";
import { AuthContext } from "../../Context/AuthContext";
import axios from "axios";

export default function Ch() {

  const [activeCount, setActiveCount] = useState(0);
  const [deActiveCount, setDeActiveCount] = useState(0);
  // console.log(deActiveCount);
  
  const {baseUrl,reqHeaders}:any=useContext(AuthContext)


  const getChartCounts =()=>{
    axios.get(`${baseUrl}/Users/count`,{headers:reqHeaders}).then((response)=>{
      console.log(response);
      
      setActiveCount(response?.data?.activatedEmployeeCount)
      setDeActiveCount(response?.data?.deactivatedEmployeeCount)

    }).catch((error)=>{
      console.log(error);
    })
  }

  useEffect(()=>{
    getChartCounts();
  },[])
  
  const data = {
    labels: ["Active", "Deactivated"],
    datasets: [
      {
        label: "Employee Status",
        data: [activeCount, deActiveCount],
        borderWidth: 1,
        backgroundColor:['pink','gray'],
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
