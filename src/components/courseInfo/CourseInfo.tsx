import React from "react";
import { Course } from "../../interfaces/interfaces";
import { Avatar, Box, IconButton, Typography } from "@mui/material";
import styles from "./style.module.css";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import FacebookIcon from "@mui/icons-material/Facebook";
import GitHubIcon from "@mui/icons-material/GitHub";
import TwitterIcon from "@mui/icons-material/Twitter";
import { Link } from "react-router-dom";

export const CourseInfo = ({ course }: { course: Course }) => {
  return (
    <Box className={styles.container}>
      <Box className={styles.courseInfoContainer}>
        {/* About Course */}
        <Box>
          <Typography color="textPrimary" variant="h6">
            About Course
          </Typography>
          <Typography>{course.description}</Typography>
        </Box>

        {/* Category */}
        <Box>
          <Typography color="textPrimary" variant="h6">
            Category
          </Typography>
          <Typography>{course.category.name}</Typography>
        </Box>

        {/* Prerequisites */}
        <Box>
          <Typography color="textPrimary" variant="h6">
            Prerequisites
          </Typography>
          <Box>
            {course.prerequisites.map((pre, index) => (
              <Typography key={index}>- {pre}</Typography>
            ))}
          </Box>
        </Box>

        {/* Created At */}
        <Box>
          <Typography color="textPrimary" variant="h6">
            Created At
          </Typography>
          <Typography>{course.createdAt}</Typography>
        </Box>

        {/* Last Update */}
        <Box>
          <Typography color="textPrimary" variant="h6">
            Last Update
          </Typography>
          <Typography>{course.lastUpdate}</Typography>
        </Box>

        {/* Language */}
        <Box>
          <Typography color="textPrimary" variant="h6">
            Language
          </Typography>
          <Typography>{course.language}</Typography>
        </Box>

        {/* Total Hours */}
        <Box>
          <Typography color="textPrimary" variant="h6">
            Total Hours
          </Typography>
          <Typography>{Number(course?.totalHour)}</Typography>
        </Box>

        {/* Total Minutes */}
        <Box>
          <Typography color="textPrimary" variant="h6">
            Total Minutes
          </Typography>
          <Typography>{Number(course?.totalMinute)}</Typography>
        </Box>
      </Box>

      <Box className={styles.instructorInfoContainer}>
        {/* Profile Image */}
        {
          <Box>
            {course.instructor.profileImage ? (
              <Link to={"/profile"}>
                <img
                  src={course.instructor.profileImage.imageUrl}
                  alt={''}
                  style={{
                    width: "150px",
                    height: "150px",
                    borderRadius: "50%",
                    margin: "auto",
                  }}
                />
              </Link>
            ) : <Avatar style={{
              width: "150px",
              height: "150px",
              borderRadius: "50%",
              margin: "auto",
            }}/>}
          </Box>
        }

        {/* Instructor Name */}
        <Box>
          <Typography color="textPrimary" variant="h6">
            Instructor
          </Typography>
          <Typography variant="body1">
            {course.instructor.firstName} {course.instructor.lastName}
          </Typography>
        </Box>

        {/* Specialization */}
        {course.instructor.specialization && (
          <Box>
            <Typography color="textPrimary" variant="h6">
              Specialization
            </Typography>
            <Typography variant="body1">
              {course.instructor.specialization}
            </Typography>
          </Box>
        )}

        {/* About Me */}
        {course.instructor.aboutMe && (
          <Box>
            <Typography color="textPrimary" variant="h6">
              About Me
            </Typography>
            <Typography variant="body1">{course.instructor.aboutMe}</Typography>
          </Box>
        )}

        {/* Contact Information */}
        <Box>
          <Typography color="textPrimary" variant="h6">
            Contact Information
          </Typography>
          <Typography variant="body1">
            Email: {course.instructor.email}
          </Typography>
          {course.instructor.phoneNumber && (
            <Typography variant="body1">
              Phone: {course.instructor.phoneNumber}
            </Typography>
          )}
        </Box>

        <Box>
          {((course.instructor.twitterUrl ||
            course.instructor.facebookUrl ||
            course.instructor.githubUrl ||
            course.instructor.linkedinUrl) && (
              <Typography color="textPrimary" variant="h6">
                Social Links
              </Typography>
            ))}
          <Box
            style={{
              display: "flex",
              justifyContent: "space-around",
              flexWrap : 'wrap',
              gap: "8px",
            }}
          >
            {course.instructor.linkedinUrl && (
              <IconButton target="_blank" href={course.instructor.linkedinUrl}>
                <LinkedInIcon fontSize="large" />
              </IconButton>
            )}
            {course.instructor.facebookUrl && (
              <IconButton target="_blank" href={course.instructor.facebookUrl}>
                <FacebookIcon fontSize="large" />
              </IconButton>
            )}
            {course.instructor.githubUrl && (
              <IconButton target="_blank" href={course.instructor.githubUrl}>
                <GitHubIcon fontSize="large" />
              </IconButton>
            )}
            {course.instructor.twitterUrl && (
              <IconButton target="_blank" href={course.instructor.twitterUrl}>
                <TwitterIcon fontSize="large" />
              </IconButton>
            )}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
