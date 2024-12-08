import React from "react";
import { Course } from "../../interfaces/interfaces";
import styles from "./style.module.css";
import AccessTimeIcon from "@mui/icons-material/AccessTime";

import image from "../../images/4300_7_03.jpg";

export const CourseCard = ({ course }: { course: Course }) => {
  return (
    <>
      <div className={styles.container}>
        <img src={image} />
        <div className={styles.durationContainer}>
          <h5>{course.enrolledStudentsNumber.toString()} students</h5>
          <div className={styles.duration}>
            <AccessTimeIcon />
            <h5>
              {course.totalHour.toString()}h {course.totalMinute.toString()}m
            </h5>
          </div>
        </div>
        <div>
          <h3 className={styles.courseName}>{course.name}</h3>
          <p className={styles.courseDescription}>{course.description}</p>
        </div>
        <h5 className={styles.instructorName}>
          {course.instructor.firstName} {course.instructor.lastName}
        </h5>
        
      </div>
    </>
  );
};
