import axios from 'axios';
import React, { Fragment, useContext, useEffect, useState } from 'react';
import { Modal } from 'react-bootstrap';
import { CiUser } from 'react-icons/ci';
import { FaEye } from "react-icons/fa6";
import { HiDotsVertical as ThreeDots } from "react-icons/hi";
import { ImBlocked } from "react-icons/im";
import { AuthContext } from '../../Context/AuthContext';
import { ToastContext } from '../../Context/ToastContext';
import Input from '../../Shared/Input/Input';
import Loading from '../../Shared/Loading/Loading';
import NoData from '../../Shared/NoData/NoData';
import Pagination from '../../Shared/Pagination/Pagination';
import styles from './Users.module.css';
interface User {
  id: string;
  userName: string;
  isActivated: boolean;
  phoneNumber: string;
  email: string;
  creationDate: string;
}
interface Props { }

const Users: React.FC<Props> = () => {

  const { getToastValue }: { getToastValue: any } = useContext(ToastContext)
  const { baseUrl, reqHeaders }: { baseUrl: string, reqHeaders: any } = useContext(AuthContext)
  const [usersList, setUsersList] = useState<User[]>([])
  const [modalState, setModalState] = useState<string>("close")
  const handleClose = () => setModalState("close");
  const [userItem, setUserItem] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [searchValue, setSearchValue] = useState<string>('');
  const [searchRole, setSearchRole] = useState<number>(1)


  const showAllUsers = (pageNumber: number, userName: string, groups: number) => {
    setIsLoading(true)
    axios.get(`${baseUrl}/Users`,
      {
        headers: reqHeaders,
        params: {
          pageNumber,
          pageSize: 3,
          userName,
          groups
        }
      }
    ).then((response) => {
      setUsersList(response.data.data);
      setTotalPages(response.data.totalNumberOfPages)
    }).catch((error) => {
      getToastValue('error', error.response.data.message)
    }).finally(() => {
      setIsLoading(false)
    })
  }

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    showAllUsers(pageNumber, searchValue, Number(searchRole))
  };

  const handleBlock = (user: string) => {
    axios.put(`${baseUrl}/Users/${user}`, user, { headers: reqHeaders })
      .then((response) => {
        showAllUsers(currentPage, searchValue, Number(searchRole))
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

  const handleSearchValue = (userName: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(userName.target.value);
    setCurrentPage(1);
    showAllUsers(1, userName.target.value, Number(searchRole))
  }

  const handleRoleChange = (groups: React.ChangeEvent<HTMLSelectElement>) => {
    setSearchRole(+groups.target.value)
    setCurrentPage(1)
    if (groups.target.value === '1') {
      showAllUsers(1, searchValue, 1)
    } else if (groups.target.value === '2') {
      showAllUsers(1, searchValue, 2)
    }
  }

  useEffect(() => {
    setCurrentPage(1)
    showAllUsers(1, searchValue, Number(searchRole));
  }, [searchValue, searchRole]);

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
      <div className={`${styles.users} container`}>
        <div className="header bg-white  px-5">
          <h2>
            Users
          </h2>
        </div>
        <div className='px-3  row'>
          {/* search by user name */}
          <Input getSearchValue={handleSearchValue} placeHolder="Search by user name" />
          {/* search by role */}
          <div className="col-md-3">
            <div className="search position-relative">
              <CiUser className={`position-absolute ${styles.searchIcon} text-muted`} />
              <select
                className={`form-select ${styles.searchInput} rounded-5`}
                onChange={handleRoleChange}
              >
                <option defaultValue={1} value="1">Manager</option>
                <option value="2">Employee</option>
              </select>
            </div>
          </div>
        </div>
        <div className={`${styles.tableContainer} my-3 p-0 rounded-3 bg-white ms-3 py-1 `}>
          {/* Table Row */}
          {isLoading ? <Loading /> :
            <>
              {usersList?.length > 0 ? <>
                <div className='container  pt-5 '>
                  <table className="table table-striped ">
                    <thead className={`${styles.tableHead} `}>
                      <tr>
                        <th scope="col">UserName</th>
                        <th scope="col">Status</th>
                        <th scope="col">phoneNumber</th>
                        <th scope="col">Email</th>
                        <th scope="col">Date created</th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody >
                      {
                        usersList?.map((user: any) => {
                          return (
                            <tr key={user.id} >
                              <th scope="row">{user.userName}</th>
                              <td className={`${styles.tableBody}`}>
                                {
                                  user.isActivated == true ?
                                    <button className='btn btn-success rounded-5 p-0' style={{ width: '100px' }}>Active</button>
                                    : <button className='btn btn-danger rounded-5 p-0' style={{ width: '100px' }}>inActive</button>
                                }
                              </td>
                              <td>{user.phoneNumber}</td>
                              <td>{user.email}</td>
                              <td>{user.creationDate ? new Date(user.creationDate).toDateString().split(' ').slice(1).join(' ') : 'N/A'}</td>
                              <td>
                                <div className="dropdown">
                                  <ThreeDots className="dropdown-toggle" data-bs-toggle="dropdown" />
                                  <ul className="dropdown-menu">
                                    <li>
                                      {user.isActivated == true ?
                                        <a className="dropdown-item"
                                          onClick={() => handleBlock(user.id)}> <ImBlocked /> Block
                                        </a>
                                        : <a className='dropdown-item'
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
                </div>
              </>
                : <><NoData /> </>
              }
            </>
          }
          {/* Pagination Row */}
          <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} searchValue={searchValue} />
        </div>

      </div>

    </Fragment>
  )
}
export default Users