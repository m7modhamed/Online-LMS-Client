import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getInstructorCourse } from "../../api/courseServices";
import { useAuth } from "../../Authentication/AuthContext";
import { Box, Tooltip, Typography } from "@mui/material";
import styles from "./style.module.css";
import { Course } from "../../interfaces/interfaces";
import { CourseSections } from "../courseSections/CourseSections";
import { CourseInfo } from "../courseInfo/CourseInfo";

const InstructorCourse = () => {
  const param = useParams();
  const { user } = useAuth();

  const [course, setCourse] = useState<Course>();

  useEffect(() => {
    const fetchCourseData = async () => {
      try {
        if (!user?.id || !param.courseId) return;

        const course = await getInstructorCourse(
          user.id,
          Number(param.courseId)
        );
        console.log("course", course);

        // Ensure sections and lessons are properly initialized
        setCourse(course);
        // setSections(course.sections || []);
      } catch (error) {
        console.error("Failed to fetch course data:", error);
      }
    };

    fetchCourseData();
  }, [param.courseId, user?.id]);

  return (
    <Box className={styles.container}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          borderBottom: "2px solid var(--primary-color)",
        }}
      >
        <Typography className={styles.heading} variant="h3" gutterBottom>
          {course?.name}
        </Typography>
        <Tooltip title="the status of the course">
          <Typography sx={{ textAlign: "center" }}>
            IN{" "}
            <Typography
              sx={{
                fontWeight: "bolder",
                display: "inline",
                color: "var(--primary-color)",
              }}
            >
              {course?.status}{" "}
            </Typography>{" "}
            STATUS
          </Typography>
        </Tooltip>
      </Box>

      <Box className={styles.courseContainer}>
        
           
          
            {course ? (
              <CourseSections course={course} />
            ) : (
              <Typography sx={{ color: "black", margin: "auto" }}>
                Loading Sections...
              </Typography>
            )}
             {course ? (
              <CourseInfo course={course} />
            ) : (
              <Typography sx={{ color: "black", margin: "auto" }}>
                Loading Course Info...
              </Typography>
            )}

      </Box>
    </Box>
  );
};

export default InstructorCourse;
