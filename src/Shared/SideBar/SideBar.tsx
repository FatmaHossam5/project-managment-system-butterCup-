import { useContext, useState } from "react";
import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import Modal from "react-bootstrap/Modal";
import { Link, useNavigate } from "react-router-dom";
import ChangePassword from "../../Components/ChangePassword/ChangePassword";
import { AuthContext } from "../../Context/AuthContext";

export default function SideBar() {
  let [isCollapsed, setIsCollapsed] = useState(false);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  let navigate = useNavigate();


  let { role }: any = useContext(AuthContext)
  let logOut = () => {
    localStorage.removeItem("userToken")
    navigate('/login')
  }

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Body>
          <ChangePassword handleClose={handleClose} />
        </Modal.Body>
      </Modal>

      <div style={{ display: 'flex', height: '100%', minHeight: '400px' }}>
        <Sidebar collapsed={!isCollapsed} >
          <Menu>
            <MenuItem></MenuItem>
            <MenuItem
              style={{ fontSize: '12px' }}
              icon={<i className="fa fa-home fa-2x ico" aria-hidden="true"></i>}
              component={<Link to="/dashboard" />}>
              Home
            </MenuItem>
            {role === 'Manager' ? <MenuItem
              style={{ fontSize: '12px' }}
              icon={<i className="fa fa-users fa-2x ico" aria-hidden="true"></i>}
              component={<Link to="/dashboard/users" />}
            >
              Users
            </MenuItem> : ''}
            <MenuItem
              style={{ fontSize: '12px' }}
              icon={<i className="fa-solid fa-diagram-project fa-2x ico"></i>}
              component={<Link to="/dashboard/projects" />}
            >
              Projects
            </MenuItem>
            <MenuItem
              style={{ fontSize: '12px' }}
              icon={<i className="fa-solid fa-list-check fa-2x ico"></i>}
              component={<Link to="/dashboard/tasks" />}
            >
              Tasks
            </MenuItem>
            <MenuItem
              style={{ fontSize: '12px' }} onClick={handleShow}
              icon={<i className="fa fa-key fa-2x ico " aria-hidden="true"></i>}
            >
              Change Pass
            </MenuItem>
            <MenuItem style={{ fontSize: '12px' }}
              icon={<i className="fa-solid fa-arrow-right-from-bracket ico fa-2x"></i>} onClick={logOut}> logOut </MenuItem>
          </Menu>
        </Sidebar>

        <main className="d-none d-md-block" style={{ padding: 10}}>
          <div>
            <div className=" position-relative arrow " onClick={() => setIsCollapsed(!isCollapsed)}>
              {isCollapsed ? <i className="fa-solid fa-chevron-left text-white position-absolute"></i> : <i className="fa-solid fa-chevron-right text-white coll position-absolute"></i>}
            </div>
          </div>
        </main>
      </div>

    </>
  )
} 


