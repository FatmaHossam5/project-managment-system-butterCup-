import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { Modal } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Context/AuthContext';
import Datano from '../../assets/DataNo.svg';
import avatar from '../../assets/avatar.png';
import styles from '../Users/Users.module.css'
import { CiSearch } from "react-icons/ci";
import { IoFilter } from "react-icons/io5";
import { ToastContext } from '../../Context/ToastContext';
import noData from '../../assets/noData.png';

export default function Projects() {
  const { baseUrl, reqHeaders, role }: any = useContext(AuthContext)
  const [allProjs, setAllProjs] = useState([])
  const [allProjsEmployee, setAllProjsEmployee] = useState([])
  const [itemId, setItemId] = useState(0)
  const navigate = useNavigate()
  const [modalState, setModalState] = useState("close")
  const [pageArray,setPageArray] = useState()
  const [searchValue,setSearchValue] = useState()

  const handleClose = () => setModalState("close");

  const { getToastValue }: any = useContext(ToastContext)

  const showAllProjects = () => {
    axios.get(`${baseUrl}/Project`, { headers: reqHeaders }).then((response) => {
      setAllProjs(response?.data?.data)
    }).catch((error) => {
      getToastValue('error', error.response.data.message)
    })
  }

  const showAllProjectsEmployee = (no:any,searchValue) => {
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
      setPageArray(Array(response.data.totalNumberOfPages).fill().map((_, i) => i + 1))
      setAllProjsEmployee(response?.data?.data)
    }).catch((error) => {
      getToastValue('error', error.response.data.message)
    })
  }

  const navToAddPro = () => {
    navigate('/dashboard/Add-pro')
  }

  const editShow = (id: any) => {
    navigate(`/dashboard/edit-pro/${id}`)
  }

  const showDeleteModel = (id: any) => {
    setModalState("delete-modal")
    setItemId(id)
  }

  const viewPro = (id: any) => {
    navigate(`/dashboard/view-pro/${id}`)
  }

  const DeleteProject = () => {
    axios.delete(`${baseUrl}/project/${itemId}`,
      { headers: reqHeaders }).then((response) => {
        handleClose()
        showAllProjects()
        getToastValue('success', "Deleted Successfully")
      }).catch((error) => {
        getToastValue('error', error.response.data.message)
      })
  }

  const filtration = (e:any) => {
    searchValue?
      showAllProjectsEmployee(1,searchValue)
   : <img src={noData} alt="" />
  }
  
  //Calling
  useEffect(() => {
   { role == "Manager" ? 
    showAllProjects()
    :showAllProjectsEmployee()}    
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

      {
        role == 'Manager' ?

          // manager
          <div className="container rounded-3">

            <div className=" d-flex justify-content-between header bg-white py-4 px-5">
              <h2>Projects</h2>
              <button onClick={navToAddPro} className='btn btn-warning bg-warning text-white'> <i className='fa-plus'></i> Add New Project </button>
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
                    />
                  </div>
                </div>
                <div className="col-md-2">
                  <button className='btn btn-white rounded-5 border'><IoFilter /> Filter</button>
                </div>
              </div>

              {/* Table Row */}

              {
                allProjs.length > 0 ?

                  <table className="table table-striped text-center">
                    <thead className={`${styles.tableHead}`}>
                      <tr>
                        <th scope="col">UserName</th>
                        <th scope="col">Status</th>
                        <th scope="col">phoneNumber</th>
                        <th scope="col">Email</th>
                        <th scope="col">Date created</th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>

                      {
                        allProjs?.map((pro) =>
                        (<tr key={pro?.id}>
                          <td>{pro?.title}</td>
                          <td className='text-white' ><div className='status'>{pro?.manager?.userName}</div></td>
                          <td>{pro?.description}</td>
                          <td>
                            <div className="img-container">

                              {pro?.imagePath ? (<img className='img-fluid' src={`https://upskilling-egypt.com/` + pro?.imagePath} />) : (<img className='img-fluid' src={avatar} />)}

                            </div>
                          </td>
                          <td className='datepicker'>{pro?.creationDate}</td>
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
                  </table>

                  : <div className='text-center'>
                    <img src={noData} alt="" />
                  </div>
              }

              {/* Pagination Row */}
              <div className=" d-flex justify-content-end p-3">
                <div className="col-md-1">
                  Showing
                </div>
                <div className="col-md-1">
                  <select className='form-select'>
                    <option value="10">10</option>
                    <option value="10">20</option>
                  </select>
                </div>
                <div className="col-md-2 text-center">
                  of 102 Results
                </div>
              </div>

            </div>

          </div>

          :

          // employee
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
                <div className="col-md-2">
                  <button onClick={filtration} className='btn btn-white rounded-5 border'><IoFilter /> Filter</button>
                </div>
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

                  <div className='text-center my-3'>
                    <img src={noData} alt="" />
                  </div>
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
                    pageArray?.map((pageNo)=>{               
                     return(
                      <option key={pageNo} value={pageNo}>{pageNo}</option>
                     )
                    })
                  }
                  </select>
                </div>
                <div className="col-md-2 text-center">
                  of {pageArray?.length} Results
                </div>
              </div>

            </div>
          </div>
      }
    </>
  )
}
