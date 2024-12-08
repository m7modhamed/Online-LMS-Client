import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { addNewSection, getCourseSections, getInstructorCourse } from "../../api/courseServices";
import { useAuth } from "../../Authentication/AuthContext";
import { Box, Button, Tooltip, Typography } from "@mui/material";
import styles from "./style.module.css";
import { Course, Section } from "../../interfaces/interfaces";
import Collapsible from "react-collapsible";
import ExpandCircleDownIcon from "@mui/icons-material/ExpandCircleDown";
import AddIcon from "@mui/icons-material/Add";
import AddSectionDialog from "../AddSectionDialog/AddSectionDialog";

const InstructorCourse = () => {
  const param = useParams();
  const { user } = useAuth();

  const [course, setCourse] = useState<Course>();
  const [sections, setSections] = useState<Section[]>([]);

  useEffect(() => {
    const response = getInstructorCourse(user?.id, Number(param.courseId));
    response.then((course) => {
      console.log("course", course);
      setCourse(course);

      const sections = getCourseSections(course.id);
      sections.then((sections)=>{
        setSections(sections);
      })
      
    });

    
  }, [param.courseId, user?.id]);

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleAddSection = () => {
    setOpen(true);
  };

  const addSection = async (newSection: Section) => {
    try {
      if (sections.length > 0) {
        newSection.position =
          Number(sections[sections.length - 1].position) + 1;
      } else {
        // Set the position to 1 if this is the first section
        newSection.position = 1;
      }

      const response = await addNewSection(param.courseId, newSection);
      console.log("Section added successfully:", response);

      setSections((prevSections) => [...prevSections, newSection]);
    } catch (error) {
      console.error("Error adding section:", error);
    }
  };

  return (
    <Box className={styles.container}>
      <Typography className={styles.heading} variant="h3" gutterBottom>
        {course?.name}
      </Typography>

      <Box className={styles.sectionContainer}>
        <Typography className={styles.sectionHeading} variant="h6" gutterBottom>
          Sections
        </Typography>

        {sections.map((section, index) => (
          <Collapsible
            key={index}
            trigger={
              <Tooltip title={section.description}>
                <Button
                  variant="contained"
                  color="primary"
                  sx={{
                    backgroundColor : 'var(--primary-color)',
                    width: "100%",
                    marginBottom: 2,
                  }}
                  startIcon={<ExpandCircleDownIcon />}
                >
                  {section.title}
                </Button>
              </Tooltip>
            }
          >
            <Box
              className={styles.sectionContent}
              sx={{ padding: "4px", margin: "5px 0" }}
            >
              <Button
              variant="outlined"
              color="primary"
              sx={{
                margin: 'auto',textAlign : 'center' , fontSize : '12px'
              }}
              startIcon={<AddIcon />}
              >add lesson</Button>
            </Box>
          </Collapsible>
        ))}

        <div
          style={{
            margin: "10px 0",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Button
            variant="contained"
            color="info"
            onClick={handleAddSection}
            startIcon={<AddIcon />}
            sx={{}}
          >
            Add New Section
          </Button>
        </div>
      </Box>
      {open && (
        <AddSectionDialog
          open={open}
          handleClickOpen={handleClickOpen}
          handleClose={handleClose}
          addSection={addSection}
        />
      )}
    </Box>
  );
};

export default InstructorCourse;
