import axios from 'axios';
import { ChangeEvent, useContext, useEffect, useState } from 'react';
import { Modal, Table } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Context/AuthContext';
import { ToastContext } from '../../Context/ToastContext';
import Input from '../../Shared/Input/Input';
import Loading from '../../Shared/Loading/Loading';
import NoData from '../../Shared/NoData/NoData';
import Pagination from '../../Shared/Pagination/Pagination';
import Datano from '../../assets/DataNo.svg';
import avatar from '../../assets/avatar.png';
import styles from '../Users/Users.module.css';
interface Project {
  id: string;
  title:string;
  manager: {
    userName: string;
  };
  description:string;
  imagePath:string;
  creationDate:string;
  task:[];
}


export default function Projects() {
  const { baseUrl, reqHeaders, role }: { baseUrl: string, reqHeaders: Record<string, string> , role:string|null } = useContext(AuthContext);
  const [allProjects,setAllProjects]=useState<Project[]>([])
  const [itemId,setItemId]=useState(0)
  const [allProjsEmployee, setAllProjsEmployee] = useState<Project[]>([])
  const[modalState,setModalState]=useState("close")
  const[pagesArray,setPagesArray]=useState<number>(0);
  const[searchInput,setSearchInput]=useState("")
  const [currentPage, setCurrentPage] = useState(1);
  const{getToastValue}=useContext(ToastContext)
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const navigate= useNavigate()
  const handleClose = () => setModalState("close");




  {/* Get  All Projects for Employee */ }

  const showAllProjectsEmployee = (pageNo:Number,title:string)=> {
    setIsLoading(true)
    axios.get(`${baseUrl}/Project/employee`,
      {
        headers: reqHeaders,
        params: {
          pageSize: 5,
          pageNumber: pageNo,
          title
        }
      }
    ).then((response) => {
      setPagesArray(response?.data?.totalNumberOfPages)
      setAllProjsEmployee(response?.data?.data)
    }).catch((error) => {
      getToastValue('error', error.response.data.message)
      console.log(error);
      
    }).finally(()=>{
      setIsLoading(false)
    })
  }

  {/* Get  All Projects for Manager */ }
  const showAllProjects =(pageNo:number,title:string):void=>{
    setIsLoading(true)
    axios.get(`${baseUrl}/Project`,{headers:reqHeaders,
      params:{pageSize:3,
        pageNumber:pageNo,
        title
      }}
      )
      .then((response)=>{
      setAllProjects(response?.data?.data)
      setPagesArray(response?.data?.totalNumberOfPages);
    })
    .catch((error)=>{
   getToastValue('error',error?.response?.data?.message)

   
    }).finally(()=>{
      setIsLoading(false)
    })
  }
  
  

  const handlePageChange = (pageNo:number) => {
    setCurrentPage(pageNo);
    if(role==='Manager'){
      showAllProjects(pageNo, searchInput); 

    }else if(role==='Employee'){
      showAllProjectsEmployee(pageNo,searchInput)
    }
  };
    {/* Navigation */ }
  const navToAddPro =()=>{
    navigate('/dashboard/Add-pro')
  }
  const editShow =(id:string)=>{
    
    navigate(`/dashboard/edit-pro/${id}`)
  }
  const viewPro = (id:string)=>{
    navigate(`/dashboard/view-pro/${id}`)
  }
    {/* show  Delete Modal */ }
  const showDeleteModel = (id:string)=>{
    setModalState("delete-modal")
    setItemId(Number(id))
 
  }
    {/*  Delete Function */ }
  const deleteProject =()=>{
    axios.delete(`${baseUrl}/project/${itemId}`,{headers:reqHeaders}).then(()=>{
      getToastValue("success","Deleted Successfully!")
      handleClose()
      showAllProjects(1,'');
    }).catch((error)=>{
      getToastValue('error',error?.response?.data?.message)
      
    })
  }

  {/*  Filtration Function */ }
  const getTitleValue =(title:ChangeEvent<HTMLInputElement>)=>{
    setSearchInput(title.target.value);
    setCurrentPage(1)
    if(role==='Manger'){
      showAllProjects(1,title.target.value)

    }else if(role==='Employee'){
      showAllProjectsEmployee(1,title.target.value)
    }
   }

   useEffect(() => {
    if (role === "Manager") {
      setCurrentPage(1)
      showAllProjects(1, searchInput);
    } else if(role === "Employee"){
      setCurrentPage(1)
      showAllProjectsEmployee(1, searchInput);
    }
  }, [searchInput,role]);
  
  
  return (
    <>
      <Modal show={modalState === 'delete-modal'} onHide={handleClose} aria-labelledby="delete-modal-title">
        <Modal.Body>
          <div className="delete-container">
            <div className="icons text-end">
              <button onClick={handleClose} className="btn btn-icon" aria-label="Close">
                <i className="fa-regular fa-circle-xmark text-danger "></i>
              </button>
            </div>
            <div className="text-center">
              <div className="text-center">
                <img className=' ' src={Datano} alt="msg-NoData" />
              </div>
              <h5 className='py-3'> Are you sure to Delete this item ? </h5>
            </div>
            <div className="delete-btn text-end">
              <button onClick={deleteProject} className='text-white bg-danger btn btn-outline-danger   border-danger rounded-2  '>Delete This Item </button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
      {role === 'Manager' ?
        <>
          {/* jsx code for manger */}
          <div className={`${styles.project}bg-white rounded-3 container`}>
            <div className={`${styles.project}`}>
              <div className="col-md-12  trans-head">
                <div className="top  d-flex  justify-content-between m-auto px-4 mb-3 ">
                  <div className='d-none d-md-flex' >
                    <h4>Projects</h4>
                  </div>
                  <div className='col-12  col-md-auto' >
                    <button onClick={navToAddPro} className='btn btn-warning bg-warning text-white hover-effect'> <i className='fa-plus'></i> Add New Project </button>

                  </div>
                </div>
              </div>
            </div>
            <div className=" ms-3">
              <Input getSearchValue={getTitleValue} placeHolder='Search ProjectName' />
            </div>
            <div className={`${styles.tableContainer} my-3 p-0  rounded-3 bg-white  ms-3 py-1`}>
              {isLoading ? <Loading /> : <>
                {allProjects.length > 0 ? <>

                  <div className='container table-responsive pt-5  '>
                    <Table striped hover>
                      <thead className={`${styles.tableHead} `}>
                        <tr className='bg text-center' >
                          <th>Title</th>
                          <th>Manager</th>
                          <th>Description</th>
                          <th>Image</th>
                          <th>Date Created</th>
                          <th>
                          </th>
                        </tr>
                      </thead>
                      <tbody className='text-center py-5 '>
                        {allProjects.length > 0 && allProjects.map((pro) => (<tr key={pro?.id}>
                          <td >{pro?.title}</td>
                          <td className='text-white' ><div className='status'>{pro?.manager?.userName}</div></td>
                          <td>{pro?.description}</td>
                          <td>
                            <div className="img-container">
                              <img className='img-fluid' src={pro?.imagePath ? `https://upskilling-egypt.com/${pro?.imagePath}` : avatar} />
                            </div>
                          </td>
                          <td className='datePicker'> {pro?.creationDate ? new Date(pro.creationDate).toDateString().split(' ').slice(1).join(' ') : 'N/A'}</td>
                          <td> <div className="dropdown ">
                            <button className="btn btn-transparent dropdown-toggle " type="button" data-bs-toggle="dropdown" aria-expanded="false">
                              <i className="fa-solid fa-ellipsis-vertical"></i>
                            </button>
                            <ul className="dropdown-menu ">
                              <li><button className="dropdown-item" onClick={() => viewPro(pro?.id)} > <i className=" fa-regular fa-eye "></i> View</button></li>
                              <li><button className="dropdown-item" onClick={() => editShow(pro?.id)} > <i className="fa-regular fa-pen-to-square pe-2"></i>Edit</button></li>
                              <li><button className="dropdown-item" onClick={() => showDeleteModel(pro?.id)} > <i className="fa-solid fa-trash pe-2"></i>Delete</button></li>
                            </ul>
                          </div></td>
                        </tr>
                        ))}
                      </tbody>
                    </Table>
                    <Pagination currentPage={currentPage} totalPages={pagesArray} onPageChange={handlePageChange} searchValue={searchInput} />

                  </div>
                </> : <><NoData /></>}

              </>

              }

            </div>


          </div>
        </>
        :
        <>
          {/* jsx code for employee */}
          <div className={`${styles.project}bg-white rounded-3 container`}>
            <div className={`${styles.project}`}>
              <div className="col-md-12  trans-head">
                <div className="top  d-flex  justify-content-between m-auto px-4 mb-3 ">
                  <div className='d-none d-md-flex' >
                    <h4>Projects</h4>
                  </div>
                </div>
              </div>
            </div>
            <div className=" ms-3">
              <Input getSearchValue={getTitleValue} placeHolder='Search ProjectName' />
            </div>
            <div className={`${styles.tableContainer} my-3 p-0  rounded-3 bg-white  ms-3 py-1`}>
              {isLoading ? <Loading /> : <>
                {allProjsEmployee.length > 0 ? <>
                  <div className='container table-responsive pt-5  '>
                    <Table striped hover>
                      <thead className={`${styles.tableHead} `}>
                        <tr className='bg text-center' >
                          <th>Title</th>
                          <th>Description</th>
                          <th>Num Tasks</th>
                          <th>Date Created</th>
                          <th>
                          </th>
                        </tr>
                      </thead>
                      <tbody className='text-center py-5 '>
                        {allProjsEmployee.length > 0 && allProjsEmployee.map((pro) => (<tr key={pro?.id}>
                          <td >{pro?.title}</td>
                          <td>{pro?.description}</td>
                          <td>{pro?.task.length}</td>
                          <td className='datePicker'> {pro?.creationDate ? new Date(pro.creationDate).toDateString().split(' ').slice(1).join(' ') : 'N/A'}</td>
                          <td> <div className="dropdown ">
                          </div></td>
                        </tr>
                        ))}
                      </tbody>
                    </Table>
                    <Pagination currentPage={currentPage} totalPages={pagesArray} onPageChange={handlePageChange} searchValue={searchInput} />
                  </div>
                </> : <><NoData /></>}
              </>
              }
            </div>
          </div>
        </>



      }

    </>
  )
}
