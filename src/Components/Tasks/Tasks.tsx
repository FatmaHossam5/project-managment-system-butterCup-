import axios from "axios";
import { useCallback, useContext, useEffect, useState } from "react";
import { Modal, Table } from 'react-bootstrap';
import { useNavigate } from "react-router";
import { AuthContext } from "../../Context/AuthContext";
import { ToastContext } from "../../Context/ToastContext";
import Loading from "../../Shared/Loading/Loading";
import Pagination from "../../Shared/Pagination/Pagination";
import Datano from '../../assets/DataNo.svg';
import Column from "./Column";
import styles from './Tasks.module.css';
import NoData from "../../Shared/NoData/NoData";
interface Task {
  id: string;
  title:string;
  status: string;

}

interface FilterTasksByStatusParams {
  status: string;
  tasks: Task[];
}
export default function Tasks() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [modalState, setModalState] = useState("close")
  const handleClose = () => setModalState("close");
  const [projectId, setProjectId] = useState(0);
  const { baseUrl, reqHeaders, role }: any = useContext(AuthContext);
  const {getToastValue}=useContext(ToastContext)
  const navigate = useNavigate();
  const [todos, setTodos] = useState<Task[]>([]);
  const [inProgress,setInProgress]=useState<Task[]>([])
  const [done,setDone]=useState<Task[]>([])
  const [totalPages,setTotalPages]=useState(0);
  const[currentPage,setCurrentPage]=useState(1);
  const[isLoading,setIsLoading]=useState(false);
 
  

  {/* show All Tasks for Manager  */ }
   const getTasksList = useCallback((pageNumber:number) => {
    setIsLoading(true)
    axios
      .get(`${baseUrl}/Task/manager`, { headers: reqHeaders ,params:{
        pageSize:3,
        pageNumber
      }}
      )
      .then((response: any) => {
        console.log(response);
        
        setTasks(response?.data?.data);
        setTotalPages(response?.data?.totalNumberOfPages)
        console.log(totalPages);
        
      })
      .catch((error: any) => {
        getToastValue("error", error.response.data.data.message);
        console.log(error);
        

      }).finally(()=>{
        setIsLoading(false)
      })
  },[baseUrl,reqHeaders,getToastValue])

const handlePageChange=(pageNumber:number)=>{
setCurrentPage(pageNumber);
getTasksList(pageNumber)
}


 {/*Navigate to Add New Task by Manager  */ }
  const navToAddTask = () => {
    navigate('/dashboard/add-task')
  }

  {/* show Delete Task Model */ }
  const showDeleteModel = (id:number) => {
    setModalState("delete-modal")
    setProjectId(id)
  }

  {/*Delete Task */ }
  const deleteTask = () => {
    axios.delete(`${baseUrl}/Task/${projectId}`, { headers: reqHeaders }).then(() => {
      getToastValue('success','Deleted Successfully!!')
      handleClose();
      getTasksList(1)
    }).catch((error) => {
      getToastValue("error",error?.response?.data?.message)
    })
  }

  {/*Update Task */ }
  const editTaskShow =(id:string)=>{
 
    navigate(`/dashboard/edit-task/${id}`)

  }

  const getEmployeeTasks = useCallback(() => {
    setIsLoading(true)
    axios.get(`${baseUrl}/Task`, { headers: reqHeaders }).then((response) => {
        const tasks: Task[] = response?.data?.data || [];
        const filterTasksByStatus = ({ status, tasks }: FilterTasksByStatusParams) => tasks.filter((task) => task.status === status);
        const todosTask = filterTasksByStatus({ status: 'ToDo', tasks });
        const inProgressTask = filterTasksByStatus({ status: 'InProgress', tasks });
        const doneTask = filterTasksByStatus({ status: 'Done', tasks });
        setTodos(todosTask); 
        setInProgress(inProgressTask);
        setDone(doneTask);
        setTasks(tasks);
    }).catch((error)=>{
      console.log(error);
      
    }).finally(()=>{
      setIsLoading(false)
    })
}, [baseUrl, reqHeaders]);


  

  useEffect(() => {
    if(role==='Manager')
    getTasksList(1);
  else
  getEmployeeTasks()
  }, [role,getTasksList,getEmployeeTasks]);


  const statuses =['ToDo','InProgress','Done']
  return (
    <>
      <Modal show={modalState === 'delete-modal'} onHide={handleClose}>
        <Modal.Body>
          <div className="delete-container">
            <div className="icons text-end">
              <button onClick={handleClose}  className="btn btn-icon" aria-label="Close">
              <i  className="fa-regular fa-circle-xmark text-danger "></i>
              </button>
             
            </div>
            <div className="text-center">
              <div className="text-center">
              <img src={Datano} alt="Data Not Found" />
              </div>
              <h5 className='py-3'> Are you sure to Delete this item ? </h5>
            </div>

            <div className="delete-btn text-end">
              <button onClick={deleteTask} className='text-white bg-danger btn btn-outline-danger   border-danger p-3  '>Delete This Item </button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
      <div className=" container bg-white rounded-3 ">
        <div className="col-md-12 trans-head">
          <div className="top d-flex justify-content-between p-3">
            <h3>Tasks</h3>
            {role == "Manager" && (<button onClick={navToAddTask} className='btn bg-warning text-white hover-effect'> <i className='fa-plus'></i> Add New Task </button>)
            }
          </div>
        </div>
        <div className={`${styles.tableContainer}  my-3 p-0  rounded-3   ms-3 `}>
          {role == "Manager" ?
          
            <div className="container table-responsive pt-5 ">
          {isLoading?<Loading/>:<>
          {tasks.length>0?<>
            <Table striped  hover>
                <thead className={` ${ styles.tableHead} text-center `}>
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
                  
                    {tasks.map((task: any) => (
                      <tr key={task?.id}>
                        <td className={`${styles.tableBody}`} >{task?.title}</td>
                        <td >{task?.status}</td>
                        <td>{task?.description}</td>
                        <td>{task?.employee.userName}</td>
                        <td>{task?.project.title}</td>
                        {role == "Manager" ?

                          <td> <div className="dropdown ">
                            <button className="btn btn-transparent dropdown-toggle " type="button" data-bs-toggle="dropdown"     aria-haspopup="true"aria-expanded="false">
                              <i className="fa-solid fa-ellipsis-vertical"></i>
                            </button>
                            <ul className="dropdown-menu ">

                              <li onClick={() => editTaskShow(task?.id)} ><a className="dropdown-item " > <i className="fa-regular fa-pen-to-square pe-2"></i>Edit</a></li>
                              <li onClick={() => showDeleteModel(task?.id)}><a className="dropdown-item" > <i className="fa-solid fa-trash pe-2"></i>Delete</a></li>
                            </ul>
                          </div></td>

                          : ""}
                      </tr>
                    ))
                  }



                </tbody>

              </Table> 
<Pagination totalPages={totalPages} currentPage={currentPage} onPageChange={handlePageChange}searchValue=""/>
          
          </>:<> 
<NoData/>                 
 </>}
          
          
          </>}
        
            </div> :
            <>
              {todos.length >= 0 && <div className="row ">
                <div className="col-md-12 d-flex justify-content-evenly rounded-1 py-2 tasksBox text-white text-center">
                  {statuses.map((status, index) =>
                    <Column key={index} status={status} tasks={tasks} setTasks={setTasks} todos={todos} inProgress={inProgress} done={done} setTodos={setTodos} setInProgress={setInProgress} setDone={setDone} getEmployeeTasks={getEmployeeTasks} />)}
                </div>
              </div>}
            </>}
        </div>
      </div>
    </>
  );
}
