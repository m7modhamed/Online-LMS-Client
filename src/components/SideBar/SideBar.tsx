import React from "react";
import styles from "./style.module.css";
import { Avatar } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import ListAltIcon from "@mui/icons-material/ListAlt";
import HomeIcon from "@mui/icons-material/Home";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";
import { Link } from "react-router-dom";
import { useAuth } from "../../Authentication/AuthContext";

export const SideBar = () => {

  const { user, logout, isAuthenticated } = useAuth();


  return (
    <div className={styles.sidebarContainer}>
      {/* Logo Section */}
      <div className={styles.logoSection}>
        <Avatar
          alt="Instructor Avatar"
          src="/avatar.png"
          className={styles.avatar}
        />
        <h2 className={styles.logoText}>{user?.firstName} {user?.lastName}</h2>
      </div>

      {/* Navigation Links */}
      <ul className={styles.navList}>
        <li>
          <Link to={"/home"} className={styles.navLink}>
            <HomeIcon className={styles.icon} />
            <span className={styles.label}>Home</span>
          </Link>
        </li>
        <li>
          <Link to={"/instructor-dashboard/createCourse"} className={styles.navLink}>
            <AddIcon className={styles.icon} />
            <span className={styles.label}>Create Course</span>
          </Link>
        </li>
        <li>
          <Link to={"/instructor-dashboard/myCourses"} className={styles.navLink}>
            <ListAltIcon className={styles.icon} />
            <span className={styles.label}>My Courses</span>
          </Link>
        </li>
        <li>
          <Link to={"/settings"} className={styles.navLink}>
            <SettingsIcon className={styles.icon} />
            <span className={styles.label}>Settings</span>
          </Link>
        </li>
      </ul>

      {/* Footer Section */}
      <div className={styles.footer}>
        <Link to={'/login'} onClick={()=>{logout()}} className={styles.navLink}>
          <LogoutIcon className={styles.icon} />
          <span className={styles.label}>Logout</span>
        </Link>
      </div>
    </div>
  );
};
