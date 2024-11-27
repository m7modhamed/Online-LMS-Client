import React, { useState, ChangeEvent, useEffect } from "react";
import {
  TextField,
  Button,
  Typography,
  Box,
  Fab,
  Autocomplete,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import styles from "./style.module.css"; // Import the CSS module
import { createCourse, getCategories } from "../../api/courseServices";
import { createCourseValidationSchema } from "./ValidationSchema";

interface ICourseData {
  category: {}; // Now an array of objects
  prerequisites: string[];
  language: string;
  description: string;
  name: string;
}

interface ICourseDataError {
  category?: string; // Now an array of objects
  prerequisites?: string;
  language?: string;
  description?: string;
  name?: string;
}
// let categories: { description: string, id: number, name: string }[] = [
// ];

export const CreateCourse: React.FC = () => {
  const [categories, setCategories] = useState<
    { description: string; id: number; name: string }[]
  >([]);


  const [errorMessage , setErrorMessage] = useState('');

  useEffect(() => {
    getCategories()
      .then((retrievedCategories) => {
        console.log("Categories:", retrievedCategories);
        setCategories(retrievedCategories);
      })
      .catch((error) => {
        console.error("Error fetching categories:", error.message);
      });
  }, []);

  const [courseData, setCourseData] = useState<ICourseData>({
    category: { id: 0 },
    prerequisites: [""],
    language: "",
    description: "",
    name: "",
  });

  const [courseDataError, setCourseDataError] = useState<ICourseDataError>({
    category: "",
    prerequisites: "",
    language: "",
    description: "",
    name: "",
  });

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    setCourseData((prevCourseData) => {
      const updatedCourseData = { ...prevCourseData, [name]: value.trim() };
      
      // Validate the field on change using Yup schema
      createCourseValidationSchema
        .validateAt(name, updatedCourseData)
        .then(() => {
          setCourseDataError((prevCourseData) => ({
            ...prevCourseData,
            [name]: "",
          }));
        })
        .catch((err) => {
          setCourseDataError((prevCourseData) => ({
            ...prevCourseData,
            [name]: err.message,
          }));
        });

      return updatedCourseData;
    });
  };

  const handlePrerequisiteChange = (index: number, value: string) => {
    // Update the prerequisites array in courseData state
    const updatedPrerequisites = [...courseData.prerequisites];
    updatedPrerequisites[index] = value;
  
    setCourseData((prevState) => ({
      ...prevState,
      prerequisites: updatedPrerequisites,
    }));
  
    // Perform validation using Yup schema
    createCourseValidationSchema
      .validateAt('prerequisites', { prerequisites: updatedPrerequisites })  // Ensure we validate only the prerequisites array
      .then(() => {
        // No errors, reset error state
        setCourseDataError((prevState) => ({
          ...prevState,
          prerequisites: "",  // Ensure the key matches 'prerequisites'
        }));
      })
      .catch((err) => {
        // There was a validation error
        setCourseDataError((prevState) => ({
          ...prevState,
          prerequisites: err.message,  // Ensure the key matches 'prerequisites'
        }));
      });
  };
  

  const handleCategoryChange = (
    event: React.SyntheticEvent<Element, Event>,
    value: { id: number; name: string } | null
  ) => {
  
    // Update the courseData state with the selected category
    setCourseData((prevState) => {
      const updatedCourseData = {
        ...prevState,
        category: { id: value?.id || 0 , name: value?.name || "" }, // Update the category data
      };
  
      // Immediately validate the updated state
      createCourseValidationSchema
        .validateAt('category', updatedCourseData)  // Validate the updated courseData
        .then(() => {
          // No errors, reset error state
          setCourseDataError((prevState) => ({
            ...prevState,
            category: "",  
          }));
        })
        .catch((err) => {
          // There was a validation error
          setCourseDataError((prevState) => ({
            ...prevState,
            category: err.message,  
          }));
        });
  
      // Return the updated courseData object
      console.log('updatedCourseData' , updatedCourseData)

      return updatedCourseData;
    });
  };
  


  const addPrerequisite = () => {
    setCourseData((prevState) => ({
      ...prevState,
      prerequisites: [...prevState.prerequisites, ""],
    }));

    createCourseValidationSchema
    .validateAt('prerequisites', courseData)  // Ensure we validate only the prerequisites array
    .then(() => {
      // No errors, reset error state
      setCourseDataError((prevState) => ({
        ...prevState,
        prerequisites: "",  // Ensure the key matches 'prerequisites'
      }));
    })
    .catch((err) => {
      // There was a validation error
      setCourseDataError((prevState) => ({
        ...prevState,
        prerequisites: err.message,  // Ensure the key matches 'prerequisites'
      }));
    });
  };

  
  

  const handleSubmit =async () => {
    console.log("Form Submitted", courseData);

    try {
      await createCourseValidationSchema.validate(courseData, { abortEarly: false });

      const response =await createCourse(courseData);

      console.log(response);
    } catch (error: any) {
      if (error.name === "ValidationError") {
      const errors: ICourseDataError = {};
      error.inner.forEach((err: any) => {
        if (err.path) {
          errors[err.path as keyof ICourseDataError] = err.message;
        }
      });
      setCourseDataError(errors);
      
    }else{
      setErrorMessage(error.message);
    }
  }
  };

  const inputStyles = {
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "white",
      },
      "&:hover fieldset": {
        borderColor: "white",
      },
      "&.Mui-focused fieldset": {
        borderColor: "white",
      },
    },
  };

  return (
    <Box className={styles.container}>
      <Typography className={styles.heading} variant="h4" gutterBottom>
        Create New Course
      </Typography>

      <Box className={styles.gridContainer}>
        {/* Left Section: Form Fields */}
        <Box className={styles.gridItem}>
          <Typography className={styles.subheading} variant="h6" gutterBottom>
            Course Information
          </Typography>
          <form>
            <TextField
              className={styles.formField}
              InputLabelProps={{
                className: styles.textFieldLabel,
              }}
              InputProps={{
                classes: { input: styles.textFieldInput },
              }}
              sx={inputStyles}
              fullWidth
              label="Course Name"
              name="name"
              value={courseData.name}
              onChange={handleInputChange}
              margin="normal"
              error={!!courseDataError?.name}
              helperText={courseDataError?.name || ""}
            />

            {/* Updated Category Field */}
            <Autocomplete
              disablePortal
              options={categories}
              getOptionLabel={(option) => option.name}
              sx={inputStyles}
              renderInput={(params) => (
                <TextField
                name="category"
                  {...params}
                  className={styles.formField}
                  InputLabelProps={{
                    className: styles.textFieldLabel,
                  }}
                  InputProps={{
                    ...params.InputProps,
                    classes: { input: styles.textFieldInput },
                  }}
                  label="Category"
                  margin="normal"
                  error={!!courseDataError?.category}
                  helperText={courseDataError?.category || ""}
                />
              )}
              onChange={handleCategoryChange}
            />

            <TextField
              className={styles.formField}
              InputLabelProps={{
                className: styles.textFieldLabel,
              }}
              InputProps={{
                classes: { input: styles.textFieldInput },
              }}
              sx={inputStyles}
              fullWidth
              label="Language"
              name="language"
              value={courseData.language}
              onChange={handleInputChange}
              margin="normal"
              error={!!courseDataError?.language}
              helperText={courseDataError?.language || ""}
            />

            <TextField
              className={styles.formField}
              InputLabelProps={{
                className: styles.textFieldLabel,
              }}
              InputProps={{
                classes: { input: styles.textFieldInput },
              }}
              sx={inputStyles}
              fullWidth
              label="Description"
              name="description"
              value={courseData.description}
              onChange={handleInputChange}
              multiline
              rows={4.5}
              margin="normal"
              error={!!courseDataError?.description}
              helperText={courseDataError?.description || ""}
            />
          </form>
        </Box>

        {/* Right Section: Prerequisites Fields */}
        <Box className={styles.gridItem}>
          <Typography className={styles.subheading} variant="h6" gutterBottom>
            Prerequisites
          </Typography>

          {/* Render Prerequisite fields dynamically */}
          {courseData.prerequisites.map((prerequisite, index) => (
            <Box key={index} display="flex" alignItems="center">
              <TextField
                className={styles.formField}
                InputLabelProps={{
                  className: styles.textFieldLabel,
                }}
                InputProps={{
                  classes: { input: styles.textFieldInput },
                }}
                sx={inputStyles}
                name="prerequisite"
                fullWidth
                label={`Prerequisite ${index + 1}`}
                value={prerequisite}
                onChange={(e) =>
                  handlePrerequisiteChange(index, e.target.value)
                }
                margin="normal"
                error={!!courseDataError?.prerequisites}
                helperText={courseDataError?.prerequisites || ""}
              />
            </Box>
          ))}

          {/* Button to Add New Prerequisite */}
          <Fab
            className={styles.fabButton}
            onClick={addPrerequisite}
            color="primary"
            aria-label="add"
          >
            <AddIcon />
          </Fab>
        </Box>

        {/* Submit Button Section */}
        <Box className={`${styles.submitButton} ${styles.sm}`}>
          <Button
            onClick={() => {
              handleSubmit();
            }}
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
          >
            Create
          </Button>
        </Box>
      </Box>
    </Box>
  );
};
