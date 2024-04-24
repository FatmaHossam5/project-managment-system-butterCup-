import { useContext, useEffect, useState } from "react";
import { Chart as ChartJs } from "chart.js/auto";
import { Doughnut} from "react-chartjs-2";
import { AuthContext } from "../../Context/AuthContext";
import axios from "axios";
import { ToastContext } from "../../Context/ToastContext";
import Loading from "../../Shared/Loading/Loading";
interface ChartData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    borderWidth: number;
    backgroundColor: string[];
  }[];
  options?: any; 
}
export default function Ch() {

    const [activeCount, setActiveCount] = useState(0);
    const [deActiveCount, setDeActiveCount] = useState(0);
    const {baseUrl,reqHeaders}:any=useContext(AuthContext)
    const{getToastValue}=useContext(ToastContext)
    const [isLoading ,setIsLoading]=useState(false)
  
  
    const getChartCounts =()=>{
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
    getChartCounts();
  },[])
  
  const data:ChartData = {
    labels: ["Active", "Deactivated"],
    datasets: [
      {
        label: "Employee Status",
        data: [activeCount, deActiveCount],
        borderWidth: 1,
        backgroundColor:['#EF9B28','#446961'],
        
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
    {isLoading?<Loading/>:<>
    
    <div style={{ maxWidth: "300px",margin:"auto" }} >
    <Doughnut data={data}   ></Doughnut>
  </div>
    </>}
    </>
  );

}
