import React, { useEffect, useState } from "react";
import styles from "./style.module.css";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";

import { getInstructorCourses } from "../../api/courseServices";
import { Link } from "react-router-dom";
import { CourseCard } from "../courseCard/CourseCard";
import { Course } from "../../interfaces/interfaces";
import { useAuth } from "../../Authentication/AuthContext";

export const InstructorCourses = () => {

  const [courses, setCourses] = useState<Course[]>([]);

  const {user} = useAuth();

  useEffect(() => {
    
    const response = getInstructorCourses(user?.id);
    response
      .then((courses) => {
        setCourses(courses);
        console.log("courses:", courses);
      })
      .catch((error) => {
        console.error("Error fetching categories:", error.message);
      });
  }, [user]);

  return (
    <Box className={styles.container}>
      <Typography className={styles.heading} variant="h3" gutterBottom>
        My Courses
      </Typography>
      <br />
      <Box className={styles.gridContainer}>
        {courses.map((course , index) => (
          <Link key={index} to={`/instructor-dashboard/courses/${course.id}`}>
            <CourseCard course = {course} />
          </Link>
        ))}
      </Box>
    </Box>
  );
};
