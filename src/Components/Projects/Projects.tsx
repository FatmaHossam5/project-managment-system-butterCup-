import axios from 'axios';
import { ChangeEvent, useContext, useEffect, useState } from 'react';
import { Modal, Table } from 'react-bootstrap';
import { CiSearch } from "react-icons/ci";
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
}


export default function Projects() {
  const { baseUrl, reqHeaders, role }: { baseUrl: string, reqHeaders: Record<string, string> , role:string|null } = useContext(AuthContext);
  const [allProjects,setAllProjects]=useState<Project[]>([])
  const [itemId,setItemId]=useState(0)
  const [allProjsEmployee, setAllProjsEmployee] = useState([])
  const[modalState,setModalState]=useState("close")
  const[pagesArray,setPagesArray]=useState<number[]>([]);
  const[searchInput,setSearchInput]=useState("")
  const [currentPage, setCurrentPage] = useState(1);
  const{getToastValue}=useContext(ToastContext)
  const [searchValue,setSearchValue] = useState()
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const navigate= useNavigate()
  const handleClose = () => setModalState("close");





  const showAllProjectsEmployee = (no:any,searchValue:string)=> {
    axios.get(`${baseUrl}/Project/employee`,
      {
        headers: reqHeaders,
        params: {
          pageSize: 5,
          pageNumber: no,
          title:searchValue
        }
      }
    ).then((response) => {
      setPagesArray(Array(response.data.totalNumberOfPages).fill().map((_, i) => i + 1))
      setAllProjsEmployee(response?.data?.data)
    }).catch((error) => {
      getToastValue('error', error.response.data.message)
    })
  }








  {/* Get  All Projects */ }
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
    showAllProjects(pageNo, searchInput); 
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
    showAllProjects(1,title.target.value)
   }
   useEffect(() => {
    if (role === "Manager") {
      setCurrentPage(1)
      showAllProjects(1, searchInput);
    } else {
      showAllProjectsEmployee(1, '');
    }
  }, [searchInput]);
  
  
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
      {role==='Manager'? <>
    
      <div className={`${styles.project}bg-white rounded-3 container` }>
        <div className={`${styles.project}` }>
        <div className="col-md-12  trans-head">
          <div className="top  d-flex  justify-content-between m-auto px-4 mb-3 ">
           <div className='d-none d-md-flex' >
           <h4>Projects</h4>
           </div>
          <div  className='col-12  col-md-auto' >
          <button onClick={navToAddPro} className='btn btn-warning bg-warning text-white hover-effect'> <i className='fa-plus'></i> Add New Project </button>

          </div>
          </div>
        </div>
        </div>
        <div className=" ms-3">
       <Input getSearchValue={getTitleValue} placeHolder='Search ProjectName'/>
          </div>
          <div  className={`${styles.tableContainer} my-3 p-0  rounded-3 bg-white  ms-3 py-1`}>
         {isLoading?<Loading/>:<>
         {allProjects.length>0?<>
         
          <div className='container table-responsive pt-5  '>
            <Table striped  hover>
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
   <Pagination currentPage={currentPage} totalPages={pagesArray} onPageChange={handlePageChange} searchValue={searchInput}/>

            </div>
         </>:<><NoData/></>}
       
         </>
           
         }
       
          </div>
          
       
      </div>
      
      
      </>
      
  :
  <div className="container rounded-3">

  <div className="header bg-white py-4 px-5">
    <h2>Projects</h2>
  </div>

  <div className={`${styles.tableContainer} my-3 p-0 rounded-3 bg-white `}>

    {/* Filteration Row */}
    <div className='px-3 py-4 row'>
      <div className="col-md-3">
        <div className="search position-relative">
          <CiSearch className={`position-absolute ${styles.searchIcon}`} />
          <input
            type="text"
            className={`form-control ${styles.searchInput} rounded-5`}
            placeholder="Search by title of project"
            onChange={(e)=>setSearchValue(e.target.value)}
          />
        </div>
      </div>
      {/* <div className="col-md-2">
        <button onClick={filtration} className='btn btn-white rounded-5 border'><IoFilter /> Filter</button>
      </div> */}
    </div>

    {/* Table Row */}
    {
      allProjsEmployee.length > 0 ?

        <table className="table table-striped text-center">
          <thead className={`${styles.tableHead}`}>
            <tr>
              <th scope="col">Title</th>
              <th scope="col">Descraption</th>
              <th scope="col">modification Date</th>
              <th scope="col">Num Tasks</th>
              <th scope="col">Date Created</th>
              <th></th>
            </tr>
          </thead>
          <tbody>

            {
              allProjsEmployee.map((pro) => {
                return (
                  <tr key={pro?.id}>
                    <td>{pro?.title}</td>
                    <td className='text-white' ><div className='status p-1'>{pro?.description}</div></td>
                    <td>{pro?.modificationDate}</td>
                    <td>{pro?.task.length}</td>
                    <td>{pro?.creationDate}</td>
                    <td></td>
                  </tr>
                )
              }
              )
            }

          </tbody>
        </table> :

        <NoData/>
    }

    {/* Pagination Row */}
    <div className=" d-flex justify-content-end p-3">
      <div className="col-md-1">
        Showing
      </div>
      <div className="col-md-1">
        <select className='form-select' 
        onChange={(e)=>showAllProjectsEmployee(e.target.value, searchValue)}
        >
        {
          pagesArray?.map((pageNo)=>{               
           return(
            <option key={pageNo} value={pageNo}>{pageNo}</option>
           )
          })
        }
        </select>
      </div>
      <div className="col-md-2 text-center">
        of {pagesArray?.length} Results
      </div>
    </div>

  </div>
</div>


}

    </>
  )
}
