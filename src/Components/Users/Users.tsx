import axios from 'axios';
import { Fragment, useContext, useEffect, useState } from 'react';
import { Modal } from 'react-bootstrap';
import { CiSearch, CiUser } from "react-icons/ci";
import { FaEye } from "react-icons/fa6";
import { HiDotsVertical as ThreeDots } from "react-icons/hi";
import { ImBlocked } from "react-icons/im";
import { IoFilter } from "react-icons/io5";
import { AuthContext } from '../../Context/AuthContext';
import { ToastContext } from '../../Context/ToastContext';
interface User {
  id: string;
  userName: string;
  isActivated: boolean;
  phoneNumber: string;
  email: string;
  creationDate: string;
}import styles from './Users.module.css';
import { useNavigate } from 'react-router-dom';

export default function Users() {

  const { getToastValue }: any = useContext(ToastContext)
  const { baseUrl, reqHeaders, role }: any = useContext(AuthContext)
  const [usersList, setUsersList] = useState<User[]>()
  const [modalState, setModalState] = useState("close")
  const handleClose = () => setModalState("close");
  const [userItem, setUserItem] = useState<User|null>(null)
  const [pageArray, setPageArray] = useState()
  const [searchValue, setSearchValue] = useState()
  const [searchRole, setSearchRole] = useState()
  const navigate = useNavigate()

  const showAllUsers = (no: any, searchValue: any, searchRole: any) => {
    axios.get(`${baseUrl}/Users`,
      {
        headers: reqHeaders,
        params: {
          pageSize: 10,
          pageNumber: no,
          userName: searchValue,
          groups: searchRole
        }
      }

    ).then((response) => {
      setPageArray(Array(response.data.totalNumberOfPages).fill().map((_, i) => i + 1))
      setUsersList(response.data.data);
    }).catch((error) => {
      getToastValue('error', error.response.data.message)
    })
  }

  const handleBlock = (user: string) => {
    axios.put(`${baseUrl}/Users/${user}`, user, { headers: reqHeaders })
      .then((response) => {
        showAllUsers()
        {
          response.data.isActivated === false ? getToastValue('warning', "user is blocked") : getToastValue('success', "user is Unblocked")
        }
      }).catch((error) => {
        getToastValue('error', error.response.data.message)
      })
  }

  const handleView = (user: User) => {
    setModalState("show-user")
    setUserItem(user)
  }

  const filtration = () => {
   { searchValue !== null ?
      showAllUsers(1, searchValue, searchRole)
      : <img src={noData} alt="" />}
  }
  const filtrationByRole = () => {
    searchRole !== null ?
      showAllUsers(1, searchValue, searchRole)
      : <img src={noData} alt="" />
  }

  useEffect(() => {
    role == "Manager" ? showAllUsers() : navigate("/Notfound")

  }, [])

  return (
    <Fragment>

      {/* View Details of User*/}
      <Modal show={modalState === 'show-user'} onHide={handleClose}>
        <div className="p-3">
          <h3 className='text-center'>User Details</h3>
          <p><b>userName:</b> {userItem?.userName}</p>
          <p><b>phoneNumber:</b> {userItem?.phoneNumber}</p>
          <p><b>email:</b> {userItem?.email}</p>
          <p><b>Status:</b> {userItem?.isActivated == true ? "Active" : "Not Active"}</p>
        </div>
      </Modal>

      <div className={`${styles.users}`}>

        <div className="header bg-white py-4 px-5">
          <h2>
            Users
          </h2>
        </div>

        <div className={`${styles.tableContainer} my-3 p-0 rounded-3 bg-white `}>

          {/* Filteration Row */}
          <div className='px-3 py-4 row'>

            {/* search by user name */}
            <div className="col-md-3">
              <div className="search position-relative">
                <CiSearch className={`position-absolute ${styles.searchIcon}`} />
                <input
                  type="text"
                  className={`form-control ${styles.searchInput} rounded-5`}
                  placeholder="Search by user name"
                  onChange={(e) => setSearchValue(e.target.value)}
                />
              </div>
            </div>
            <div className="col-md-2">
              <button onClick={filtration} className='btn btn-white rounded-5 border'><IoFilter /> Filter</button>
            </div>

            {/* search by role */}
            <div className="col-md-3">
              <div className="search position-relative">
                <CiUser className={`position-absolute ${styles.searchIcon} text-muted`} />
                <select
                  className={`form-select ${styles.searchInput} rounded-5`}
                  onChange={(e) => setSearchRole(e.target.value)}
                >
                  <option value="">select role</option>
                  <option value="1">Manager</option>
                  <option value="2">Employee</option>
                </select>
              </div>
            </div>
            <div className="col-md-2">
              <button onClick={filtrationByRole} className='btn btn-white rounded-5 border'><IoFilter /> Filter</button>
            </div>
          </div>

          {/* Table Row */}
          <table className="table table-striped">
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
                usersList?.map((user: any) => {
                  return (
                    <tr key={user.id}>
                      <th scope="row">{user.userName}</th>
                      <td>
                        {
                          user.isActivated == true ?
                            <button className='btn btn-success rounded-5'>Active</button>
                            : <button className='btn btn-danger rounded-5'>Not Active</button>
                        }
                      </td>
                      <td>{user.phoneNumber}</td>
                      <td>{user.email}</td>
                      <td>{user.creationDate}</td>
                      <td>

                        <div className="dropdown">

                          <ThreeDots className="dropdown-toggle" data-bs-toggle="dropdown" />
                          <ul className="dropdown-menu">
                            <li>
                              {user.isActivated == true ?

                                <a className="dropdown-item"
                                  onClick={() => handleBlock(user.id)}> <ImBlocked /> Block
                                </a>
                                : <a className="dropdown-item"
                                  onClick={() => handleBlock(user.id)}> <ImBlocked /> UnBlock
                                </a>
                              }

                            </li>

                            <li><a className="dropdown-item" onClick={() => handleView(user)}> <FaEye /> View</a></li>
                          </ul>
                        </div>

                      </td>
                    </tr>
                  )
                })
              }

            </tbody>
          </table>

          {/* Pagination Row */}
          <div className=" d-flex justify-content-end p-3">
            <div className="col-md-1">
              Showing
            </div>
            <div className="col-md-1">
              <select className='form-select'
                onChange={(e) => showAllUsers(e.target.value, searchValue, searchRole)}
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

    </Fragment>
  )
}
