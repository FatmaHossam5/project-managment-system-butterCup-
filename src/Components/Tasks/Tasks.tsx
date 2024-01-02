import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { AuthContext } from "../../Context/AuthContext";
import axios from "axios";
import noData from '../../assets/noData.png';
import { Modal } from 'react-bootstrap';
import styles from '../Users/Users.module.css';
import { CiSearch, CiUser } from "react-icons/ci";
import { IoFilter } from "react-icons/io5";


export default function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [modalState, setModalState] = useState("close")
  const [modalUpdate, setModalUpdate] = useState("close")
  const [searchValue, setSearchValue] = useState()
  const [pageArray, setPageArray] = useState()
  const [searchStatus, setSearchStatus] = useState()

  const { baseUrl, reqHeaders, role }: any = useContext(AuthContext);
  const handleClose = () => setModalState("close");
  const navigate = useNavigate();

  const navigateTo = () => {
    navigate("/dashboard/add-task");
  };

  const addToTask = () => {
    navigate('/dashboard/add-task')
  }

  const showDeleteModel = () => {


    setModalState("delete-modal")
  }

  const showUpdateModel = () => {


    setModalUpdate("update-modal")
  }

  const getTasksList = (numberOfPage: any, title: any, status: any) => {
    axios.get(`${baseUrl}/Task/manager`,
      {
        headers: reqHeaders,
        params: {
          title: title,
          pageNumber:numberOfPage ,
          pageSize: 3,
          status: status
        }
      }
    )
      .then((response: any) => {
        setPageArray(Array(response.data.totalNumberOfPages).fill().map((_, i) => i + 1))
        console.log(response.data);
        setTasks(response?.data?.data);

      })
      .catch((error: any) => {
        console.log("error", error.response.data.data.message);

      });
  };

  const filtration = () => {
    {
      searchValue !== null ?
        getTasksList(1 ,searchValue)
        : <img src={noData} alt="" />
    }
  }

  const filterByStatus = () => {
    searchStatus !== null ? 
    getTasksList(1, searchValue, searchStatus)
    : <img src={noData} alt="" />
  }

  useEffect(() => {
    getTasksList();
  }, []);

  return (
    <>
      <Modal show={modalState === 'delete-modal' && "update-modal"} onHide={handleClose}>

        <Modal.Body>
          <div className="delete-container">
            <div className="icons text-end">
              <i onClick={handleClose} className="fa-regular fa-circle-xmark text-danger "></i>
            </div>
            <div className="text-center">
              <div className="text-center">
                <img className=' ' src={noData} alt="msg-NoData" />
              </div>
              <h5 className='py-3'> Are you sure to Delete this item ? </h5>
            </div>

            <div className="delete-btn text-end">
              <button className='text-white bg-danger btn btn-outline-danger   border-danger p-3  '>Delete This Item </button>
            </div>
          </div>
        </Modal.Body>
      </Modal>

      <div className="container ">

        <div className="top d-flex justify-content-between header bg-white py-4 px-5">
          <h2>Tasks</h2>
          {role == "Manager" ? <button onClick={addToTask} className='btn bg-warning text-white'> <i className='fa-plus'></i> Add New Task </button>
            : ""}
        </div>

        <div className={`${styles.tableContainer} my-3 p-0 rounded-3 bg-white `}>


          {/* Filteration Row */}
          <div className='px-3 py-4 row'>

            {/* search by title */}
            <div className="col-md-3">
              <div className="search position-relative">
                <CiSearch className={`position-absolute ${styles.searchIcon}`} />
                <input
                  type="text"
                  className={`form-control ${styles.searchInput} rounded-5`}
                  placeholder="Search by title"
                  onChange={(e) => setSearchValue(e.target.value)}
                />
              </div>
            </div>
            <div className="col-md-2">
              <button
                onClick={filtration}
                className='btn btn-white rounded-5 border'><IoFilter /> Filter</button>
            </div>

             {/* search by status */}
             <div className="col-md-3">
              <div className="search position-relative">
                <CiUser className={`position-absolute ${styles.searchIcon} text-muted`} />
                <select
                  className={`form-select ${styles.searchInput} rounded-5`}
                  onChange={(e) => setSearchStatus(e.target.value)}
                >
                  <option value="" disabled selected>status</option>
                  <option value="ToDo">ToDo</option>
                  <option value="InProgress">InProgress</option>
                  <option value="Done">Done</option>
                </select>
              </div>
            </div>
            <div className="col-md-2">
              <button
               onClick={filterByStatus}
               className='btn btn-white rounded-5 border'><IoFilter /> Filter</button>
            </div>

          </div>

          {role == "Manager" ? <div className="table-container">
            <table className="table table-striped">
              <thead className={`${styles.tableHead}`}>
                <tr>
                  <th scope="col">Title</th>
                  <th scope="col">Status</th>
                  <th scope="col">Description</th>
                  <th scope="col">User</th>
                  <th scope="col">Project</th>
                  {role == "Manager" ? <th scope="col">Actions</th> : ""}
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
                      {role == "Manager" ? <td><i onClick={showDeleteModel} className="fa fa-trash p-2" aria-hidden="true"></i><i onClick={showUpdateModel} className="fa fa-edit" aria-hidden="true"></i></td> : ""}
                    </tr>
                  ))
                ) : (
                  <div className="text-center"><img src={noData} alt="notfound" /></div>
                )}
              </tbody>
            </table>


          </div> : <h1>employee</h1>}

          {/* Pagination Row */}
          <div className=" d-flex justify-content-end p-3">
            <div className="col-md-1">
              Showing
            </div>
            <div className="col-md-1">
              <select className='form-select'
                onChange={(e) => getTasksList(e.target.value, searchValue)}
              >
                {
                  pageArray?.map((pageNo) => {
                    return (
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
    </>
  );
}
