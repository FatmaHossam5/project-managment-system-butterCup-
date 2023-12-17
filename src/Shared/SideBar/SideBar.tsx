import  { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Sidebar, Menu, MenuItem} from "react-pro-sidebar";
import Modal from "react-bootstrap/Modal";
import ChangePassword from "../../Components/ChangePassword/ChangePassword";

export default function SideBar() {
  // let [isCollapsed, setIsCollapsed] = useState(true);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  // let handleToggle = () => {
  //   setIsCollapsed(!isCollapsed);
  // };
  let navigate = useNavigate();
 

  return (
    <div className="sidebar-container">
      <Modal show={show} onHide={handleClose}>
      
        <Modal.Body>
          <ChangePassword handleClose={handleClose}/>
        </Modal.Body>
        
      </Modal>
      <Sidebar collapsed={false} className="p-0 m-0" toggled={true}>
        <Menu>
          
          <MenuItem
           style={{ fontSize: '12px' }} 
           icon={<i className="fa fa-home" aria-hidden="true"></i>}
           component={<Link to="/dashboard" />}
          >
            Homeeeee
          </MenuItem>
          <MenuItem
           style={{ fontSize: '12px' }} 
            icon={<i className="fa fa-users" aria-hidden="true"></i>}
            component={<Link to="/dashboard/users" />}
          >
            Users
          </MenuItem>
         
          <MenuItem
           style={{ fontSize: '12px' }} 
            icon={<i className="fa-solid fa-bars"></i>}
            component={<Link to="/dashboard/categories" />}
          >
            Tasks
          </MenuItem>
          <MenuItem
          style={{ fontSize: '12px' }}            onClick={handleShow}
            icon={<i className="fa fa-key" aria-hidden="true"></i>}
          >
            Change Password
          </MenuItem>
        
        </Menu>
      </Sidebar>
    </div>

  );
}