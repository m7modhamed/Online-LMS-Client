import React from 'react'
import styles from './style.module.css'
import { SideBar } from '../SideBar/SideBar'
import { Outlet } from 'react-router-dom'
export const InstructorDashboard = () => {
  return (
    <div className={styles.container}>

      <div className={styles.SideBar}>
        <SideBar/>
      </div>
      <div className={styles.mainSide}>
        <Outlet/>
      </div>

    </div>
  )
}
