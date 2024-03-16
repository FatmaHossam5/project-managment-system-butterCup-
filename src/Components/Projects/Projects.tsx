import axios from 'axios';
import { ChangeEvent, useContext, useEffect, useState } from 'react';
import { Modal } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Context/AuthContext';
import Datano from '../../assets/DataNo.svg';
import avatar from '../../assets/avatar.png';
import { ToastContext } from '../../Context/ToastContext';

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
const { baseUrl, reqHeaders }: { baseUrl: string, reqHeaders: Record<string, string> } = useContext(AuthContext);
const [allProjects,setAllProjects]=useState<Project[]>([])
const [itemId,setItemId]=useState(0)
const navigate= useNavigate()
const[modalState,setModalState]=useState("close")
const handleClose = () => setModalState("close");
const[pagesArray,setPagesArray]=useState<number[]>([]);
const[searchInput,setSearchInput]=useState("")
const [currentPage, setCurrentPage] = useState(1);
const{getToastValue}=useContext(ToastContext)
const [debouncedSearchInput, setDebouncedSearchInput] = useState('');
const debounceDelay = 500; 

  {/* Get  All Projects */ }
  const showAllProjects =(pageNo:number,title:string):void=>{
    axios.get(`${baseUrl}/Project`,{headers:reqHeaders,
      params:{pageSize:10,
        pageNumber:pageNo,
        title
      }}
      )
      .then((response)=>{
      setAllProjects(response?.data?.data)
      setPagesArray(Array.from({ length: response?.data?.totalNumberOfPages ?? 0 }, (_, i) => i + 1));
    })
    .catch((error)=>{
   getToastValue('error',error?.response?.data?.message)
    })
  }
  const debounce = (func: (...args: any[]) => void, delay: number) => {
    let timeoutId: number | undefined;
    return (...args: any[]) => {
      if (timeoutId) clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        func(...args);
      }, delay);

    };
  };
  
  


const debouncedSetSearchInput = debounce((value) => {
  setDebouncedSearchInput(value);

}, debounceDelay);

  const handlePageChange = (pageNo:number) => {
    setCurrentPage(pageNo);
    debouncedSetSearchInput(searchInput);
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
    showAllProjects(1,'');
    debouncedSetSearchInput(searchInput)
  }, [searchInput])
  
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
      <div className="container bg-white rounded-3 p-3">
        <div className="row ">
        <div className="col-md-12  trans-head">
          <div className="top  d-flex  justify-content-between ">
           <div className='d-none d-md-flex' >
           <h4>Projects</h4>
           </div>
          <div  className='col-12  col-md-auto' >
          <button onClick={navToAddPro} className='btn btn-warning bg-warning text-white hover-effect'> <i className='fa-plus'></i> Add New Project </button>

          </div>
          </div>
        </div>
        </div>
        <div className="row">
        <div className="col-md-12 mb-2 ">
          <input onChange={getTitleValue} type="text" placeholder='Search Projects' className='search-input' />
          </div>
          </div>
          <div className="row">
          <div className='col-md-12 table-responsive '>
          <Table striped bordered hover>
            <thead >
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
            <tbody className='text-center '>
              {allProjects.length > 0 && allProjects.map((pro) => (<tr key={pro?.id}>
                <td>{pro?.title}</td>
                <td className='text-white' ><div className='status'>{pro?.manager?.userName}</div></td>
                <td>{pro?.description}</td>
                <td>
                  <div className="img-container">
                    <img className='img-fluid' src={pro?.imagePath ? `https://upskilling-egypt.com/${pro?.imagePath}` : avatar} />
                  </div>
                </td>
                <td className='datePicker'> {pro?.creationDate ? new Date(pro.creationDate).toLocaleDateString() : 'N/A'}</td>
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
          </div>
          </div>
          <div className="row">
          <div className='col-md-12'>
          <nav aria-label="..." className='me-5'>
            <ul className="pagination pagination-xs  w-100  d-flex justify-content-center justify-content-md-end">
              {pagesArray.map((pageNo, index) => <li key={index} className="page-item  "><button onClick={() => handlePageChange(pageNo)} className="page-link">{pageNo}</button></li>
              )}
            </ul>
          </nav>
          </div>
          </div>
          {allProjects.length == 0 && <div className=' d-flex justify-content-center align-content-center'><img src={Datano} alt="notfound " /></div>}
       
      </div>
    </>
  )
}
