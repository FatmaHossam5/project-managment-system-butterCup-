import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { AuthContext } from "../../Context/AuthContext";
import axios from "axios";
import noData from '../../assets/noData.png';
import { Modal } from 'react-bootstrap';



export default function Tasks() {
  const [tasks, setTasks] = useState([]);
  const[modalState,setModalState]=useState("close")
  const[modalUpdate,setModalUpdate]=useState("close")
  const handleClose = () => setModalState("close");
  const { baseUrl,reqHeaders,role }: any = useContext(AuthContext);
  // console.log(role);
  
  const navigate = useNavigate();

  const navigateTo = () => {
    navigate("/dashboard/add-task");
  };

  const addToTask =()=>{
    navigate('/dashboard/add-task')
  }
  const showDeleteModel = ()=>{
   
    
    setModalState("delete-modal")
  }

  const showUpdateModel = ()=>{
   
    
    setModalUpdate("update-modal")
  }

  const getTasksList = () => {
    axios
      .get(`${baseUrl}/Task/manager`,{ headers: reqHeaders })
      .then((response: any) => {
        console.log(response.data.data);
        setTasks(response?.data?.data);

      })
      .catch((error:any) => {
        console.log("error",error.response.data.data.message);

      });
  };

  useEffect(() => {
    getTasksList();
  }, []);

  return (
    <>
         <Modal show={modalState==='delete-modal'&& "update-modal"} onHide={handleClose}>

         <Modal.Body>
       <div className="delete-container">
          <div className="icons text-end">
        <i onClick={handleClose} className="fa-regular fa-circle-xmark text-danger "></i>
          </div>
          <div className="text-center">
            <div className="text-center">
            <img className=' '  src={noData} alt="msg-NoData" />
            </div>
            <h5 className='py-3'> Are you sure to Delete this item ? </h5>
          </div>

          <div className="delete-btn text-end">
            <button  className='text-white bg-danger btn btn-outline-danger   border-danger p-3  '>Delete This Item </button>
          </div>
        </div>
       </Modal.Body>
       </Modal>
       <div className="container bg-white rounded-3 px-3">
  <div className="col-md-12 trans-head">
    <div className="top d-flex justify-content-between p-3">
    <h3>Tasks</h3>
        {role=="Manager"?<button onClick={addToTask} className='btn bg-warning text-white'> <i className='fa-plus'></i> Add New Task </button>
:""}
    </div>

  </div>
  <div className="col-md-12 ">
    {/* <input type="text" placeholder='SearchFleets 'className='rounded-4 border-1 mb-4 pro' /> */}
 
      <div className="header d-flex justify-content-between p-3">
       
       
      </div>

     {role=="Manager"? <div className="table-container p-3">
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Title</th>
              <th scope="col">Status</th>
              <th scope="col">Description</th>
              <th scope="col">User</th>
              <th scope="col">Project</th>
              {role=="Manager"?<th scope="col">Actions</th>:""}
            </tr>
          </thead>
          <tbody>
            {tasks.length > 0 ? (
              tasks.map((task: any) => (
                <tr key={task?.id}>
                  <th scope="row">{task?.title}</th>
                  <td >{task?.status}</td>
                  <td>{task?.description}</td>
                  <td>{task?.employee.userName}</td>
                  <td>{task?.project.title}</td>
              {role=="Manager"?<td><i onClick={showDeleteModel} className="fa fa-trash p-2" aria-hidden="true"></i><i onClick={showUpdateModel} className="fa fa-edit" aria-hidden="true"></i></td>:""}
                </tr>
              ))
            ) : (
              <div className="text-center"><img src={noData} alt="notfound" /></div>
            )}
          </tbody>
        </table>
      </div>:<h1>employee</h1>}
      </div>
      </div>
    </>
  );
}
