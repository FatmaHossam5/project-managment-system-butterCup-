import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { Modal } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Context/AuthContext';
import Datano from '../../assets/DataNo.svg';
import avatar from '../../assets/avatar.png';
import { ToastContext } from '../../Context/ToastContext';
export default function Projects() {
const {baseUrl,reqHeaders}:any=useContext(AuthContext)
const [allProjs,setAllProjs]=useState([])
const [itemId,setItemId]=useState(0)
const navigate= useNavigate()
const[modalState,setModalState]=useState("close")
const handleClose = () => setModalState("close");
const[pagesArray,setPagesArray]=useState([]);
const[searchInput,setSearchInput]=useState("");
let{getToastValue}=useContext(ToastContext)

  {/* Get  All Projects */ }
  const showAllProjects =(pageNo,title)=>{
    axios.get(`${baseUrl}/Project`,{headers:reqHeaders,
      params:{pageSize:10,
        pageNumber:pageNo,
        title
      }}
      )
      .then((response)=>{
      setAllProjs(response?.data?.data)
      setPagesArray(Array(response?.data?.totalNumberOfPages).fill().map((_,i)=>i+1))

    }).catch((error)=>{
   getToastValue('error',error?.response?.data?.message)
    })
  }
    {/* Navigation */ }
  const navToAddPro =()=>{
    navigate('/dashboard/Add-pro')
  }
  const editShow =(id)=>{
    
    navigate(`/dashboard/edit-pro/${id}`)

  }
  const viewPro = (id)=>{
    navigate(`/dashboard/view-pro/${id}`)
  }
    {/* show  Delete Modal */ }
  const showDeleteModel = (id)=>{

    setModalState("delete-modal")
    setItemId(id)
 
  }
    {/*  Delete Function */ }
  const DeleteProject =()=>{
    axios.delete(`${baseUrl}/project/${itemId}`,{headers:reqHeaders}).then((response)=>{
      getToastValue("success","DeletedSuccessfully!")
      handleClose()
      showAllProjects();
    }).catch((error)=>{
      getToastValue('error',error?.response?.data?.message)
      
    })
  }

  {/*  Filtration Function */ }
  const getTitleValue =(title)=>{
    setSearchInput(title.target.value);
    showAllProjects(1,title.target.value)
   }

  useEffect(() => {
    showAllProjects();
  }, [])
  
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
                <img className=' ' src={Datano} alt="msg-NoData" />
              </div>
              <h5 className='py-3'> Are you sure to Delete this item ? </h5>
            </div>

            <div className="delete-btn text-end">
              <button onClick={DeleteProject} className='text-white bg-danger btn btn-outline-danger   border-danger rounded-2  '>Delete This Item </button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
      <div className="container bg-white rounded-3 p-3">
        <div className="col-md-12 trans-head">
          <div className="top d-flex justify-content-between ">
            <h4>Projects</h4>
            <button onClick={navToAddPro} className='btn btn-warning bg-warning text-white'> <i className='fa-plus'></i> Add New Project </button>
          </div>
        </div>
        <div className="col-md-12 ">
          <input onChange={getTitleValue} type="text" placeholder='    SearchFleets ' className='rounded-4 border-1 mb-4 pro' />
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
              {allProjs.length > 0 && allProjs.map((pro) => (<tr key={pro?.id}>
                <td>{pro?.title}</td>
                <td className='text-white' ><div className='status'>{pro?.manager?.userName}</div></td>
                <td>{pro?.description}</td>
                <td>
                  <div className="img-container">

                    {pro?.imagePath ? (<img className='img-fluid' src={`https://upskilling-egypt.com/` + pro?.imagePath} />) : (<img className='img-fluid' src={avatar} />)}

                  </div>
                </td>
                <td className='datepicker' >{pro?.creationDate}</td>
                <td> <div className="dropdown ">
                  <button className="btn btn-transparent dropdown-toggle " type="button" data-bs-toggle="dropdown" aria-expanded="false">
                    <i className="fa-solid fa-ellipsis-vertical"></i>
                  </button>
                  <ul className="dropdown-menu ">
                    <li onClick={() => viewPro(pro?.id)}><a className="dropdown-item" > <i className=" fa-regular fa-eye "></i> View</a></li>
                    <li onClick={() => editShow(pro?.id)} ><a className="dropdown-item " > <i className="fa-regular fa-pen-to-square pe-2"></i>Edit</a></li>
                    <li onClick={() => showDeleteModel(pro?.id)}><a className="dropdown-item" > <i className="fa-solid fa-trash pe-2"></i>Delete</a></li>
                  </ul>
                </div></td>
              </tr>
              ))}



            </tbody>

          </Table>
          <nav aria-label="..." className='me-5'>
            <ul className="pagination pagination-xs  w-50 ms-auto d-flex justify-content-end">
              {pagesArray.map((pageNo) => <li className="page-item  "><a onClick={() => showAllProjects(pageNo, searchInput)} className="page-link">{pageNo}</a></li>
              )}






            </ul>

          </nav>
          {allProjs.length == 0 && <div className=' d-flex justify-content-center align-content-center'><img src={Datano} alt="notfound " /></div>}
        </div>
      </div>
    </>
  )
}
