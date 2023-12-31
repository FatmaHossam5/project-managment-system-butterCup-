import { Children, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { AuthContext } from "../../Context/AuthContext";
import axios from "axios";
import noData from '../../assets/noData.png';
import Datano from '../../assets/DataNo.svg';
import { Modal, Pagination, Table } from 'react-bootstrap';
import { ToastContext } from "../../Context/ToastContext";
import DataTable from "react-data-table-component";
import Column from "./Column";




export default function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [modalState, setModalState] = useState("close")
  const [modalUpdate, setModalUpdate] = useState("close")
  const handleClose = () => setModalState("close");
  const [projectId, setProjectId] = useState(0);
  const { baseUrl, reqHeaders, role }: any = useContext(AuthContext);
  const {getToastValue}=useContext(ToastContext)
  const navigate = useNavigate();
 
  const [todos,setTodos]=useState([])
  const [inProgress,setInProgress]=useState([])
  const [done,setDone]=useState([])
  
 
  

  {/* show All Tasks for Manager  */ }
   const getTasksList = ( ) => {
    axios
      .get(`${baseUrl}/Task/manager?pageSize=14&pageNumber=1`, { headers: reqHeaders })
      .then((response: any) => {
        console.log(response.data.data);
        setTasks(response?.data?.data);

      })
      .catch((error: any) => {
        getToastValue("error", error.response.data.data.message);

      });
  };

 {/*Navigate to Add New Task by Manager  */ }
  const navToAddTask = () => {
    navigate('/dashboard/add-task')
  }

  {/* show Delete Task Model */ }
  const showDeleteModel = (id) => {
    setModalState("delete-modal")
    setProjectId(id)
  }

  {/*Delete Task */ }
  const deleteTask = () => {
    axios.delete(`${baseUrl}/Task/${projectId}`, { headers: reqHeaders }).then((response) => {
      getToastValue('success','Deleted Successfully!!')
      handleClose();
      getTasksList()
    }).catch((error) => {
      getToastValue("error",error?.response?.data?.message)
    })
  }

  {/*Update Task */ }
  const editTaskShow =(id)=>{
    
    navigate(`/dashboard/edit-task/${id}`)

  }

  const getEmployeeTasks =()=>{
    axios.get(`${baseUrl}/Task`,{headers:reqHeaders}).then((response)=>{
      console.log(response);
      
  
      const todosTask=response?.data?.data.filter((task:any)=>task.status=='ToDo')
      const inProgressTask=response?.data?.data.filter((task:any)=>task.status=='InProgress')
      const doneTask=response?.data?.data.filter((task:any)=>task.status=='Done')
      setTodos(todosTask)
      setInProgress(inProgressTask)
      setDone(doneTask)
  
      setTasks(response.data.data)
   
    })
   }
  

  useEffect(() => {
    if(role==='Manager')
    getTasksList();
  else
  getEmployeeTasks()
  }, []);


  const statuses =['ToDo','InProgress','Done']
  return (
    <>
  
      <Modal show={modalState === 'delete-modal'} onHide={handleClose}>

        <Modal.Body>
          <div className="delete-container">
            <div className="icons text-end">
              <i onClick={handleClose} className="fa-regular fa-circle-xmark text-danger "></i>
            </div>
            <div className="text-center">
              <div className="text-center">
                <img  src={Datano} alt="msg-NoData" />
              </div>
              <h5 className='py-3'> Are you sure to Delete this item ? </h5>
            </div>

            <div className="delete-btn text-end">
              <button onClick={deleteTask} className='text-white bg-danger btn btn-outline-danger   border-danger p-3  '>Delete This Item </button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
      <div className="container bg-white rounded-3 px-3">
        <div className="col-md-12 trans-head">
          <div className="top d-flex justify-content-between p-3">
            <h3>Tasks</h3>
            {role == "Manager" ? <button onClick={navToAddTask} className='btn bg-warning text-white'> <i className='fa-plus'></i> Add New Task </button>
              : ""}
            
          </div>

        </div>
        <div className="col-md-12 ">
          <input type="text" placeholder='SearchFleets ' className='rounded-4 border-1 mb-4 pro' />

          <div className="header d-flex justify-content-between p-3">


          </div>

          {role == "Manager" ? 
          <div className="table-container p-3">
            <Table striped bordered hover>
              <thead className='text-center '>
                <tr>
                  <th scope="col">Title</th>
                  <th scope="col">Status</th>
                  <th scope="col">Description</th>
                  <th scope="col">User</th>
                  <th scope="col">Project</th>
                  {role == "Manager" ? <th scope="col">Actions</th> : ""}
                </tr>
              </thead>
              <tbody className='text-center '>
                {tasks.length > 0 ? (
                  tasks.map((task: any) => (
                    <tr key={task?.id}>
                    
                    <td >{task?.title}</td>
                      <td >{task?.status}</td>
                      <td>{task?.description}</td>
                      <td>{task?.employee.userName}</td>
                      <td>{task?.project.title}</td>
                      {role == "Manager" ?

                        <td> <div className="dropdown ">
                          <button className="btn btn-transparent dropdown-toggle " type="button" data-bs-toggle="dropdown" aria-expanded="false">
                            <i className="fa-solid fa-ellipsis-vertical"></i>
                          </button>
                          <ul className="dropdown-menu ">

                            <li onClick={()=>editTaskShow(task?.id)} ><a className="dropdown-item " > <i className="fa-regular fa-pen-to-square pe-2"></i>Edit</a></li>
                            <li onClick={() => showDeleteModel(task?.id)}><a className="dropdown-item" > <i className="fa-solid fa-trash pe-2"></i>Delete</a></li>
                          </ul>
                        </div></td>

                        : ""}
                    </tr>
                  ))
                ) : (
                  <div className="text-center"><img src={noData} alt="notfound" /></div>
                )}
                  
  
                    
              </tbody>
            
           </Table>
    
          </div> :
           <>


{todos.length>0&&<div className="row ">


  <div className="col-md-12 d-flex justify-content-evenly rounded-1 py-5 tasksBox text-white text-center">
 
  {statuses.map((status,index)=>
  <Column  key={index} status={status} tasks={tasks} setTasks={setTasks} todos={todos} inProgress={inProgress} done={done}  setTodos={setTodos} setInProgress={setInProgress} setDone={setDone} getEmployeeTasks={getEmployeeTasks}/>)}
  </div>


  </div>}


          </>}
            
           
        </div>
      </div>
    </>
  );
}
