import { Outlet } from "react-router-dom";
import NavBar from "../Navbar/NavBar";
import SideBar from "../SideBar/SideBar";
import styles from './MasterLayout.module.css';

export default function MasterLayout({ userData }: any) {
  return (
    <>
      <div className={`container-fluid ${styles.masterLayout}`}>
        <div className={`d-flex ${styles.layoutContainer}`}>
          {/* Sidebar */}
          <div className={`${styles.sidebarContainer} vh-100`}>
            <SideBar />
          </div>
          
          {/* Main Content Area */}
          <div className={`${styles.mainContent} w-100 bg-body`}>
            {/* Navigation Bar */}
            <div className={styles.navbarContainer}>
              <NavBar userData={userData} />
            </div>
            
            {/* Page Content */}
            <div className={styles.pageContent}>
              <Outlet />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
