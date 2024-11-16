import { Alert, Button, CircularProgress, TextField } from "@mui/material";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./signup.module.css";
import { signupStudentAccount } from "../../api/UserServices";
import * as Yup from 'yup';

export const SignUp = () => {
 
  interface IUserData {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    phoneNumber: string;
  }

  interface IUserDataError {
    firstName?: string;
    lastName?: string;
    email?: string;
    password?: string;
    phoneNumber?: string;
  }

  const initialState: IUserData = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    phoneNumber: "",
  };

  const [userData, setUserData] = useState<IUserData>(initialState);

  const [userDataError, setUserDataError] =
    useState<IUserDataError>(initialState);

  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const validateForm = (userData: Record<string, any>): IUserDataError => {
    const errors: IUserDataError = {};

    if (!userData.firstName) {
      errors.firstName = "First Name is required";
    }
    if (!userData.lastName) {
      errors.lastName = "Last Name is required";
    }
    if (!userData.email || !/^\S+@\S+\.\S+$/.test(userData.email)) {
      errors.email = "A valid Email is required";
    }
    if (!userData.password || userData.password.length < 10) {
      errors.password = "A valid password is required";
    }
    if (!userData.phoneNumber || userData.phoneNumber.length < 10) {
      errors.phoneNumber = "A valid Phone Number is required";
    }

    return errors;
  };

  const resetform = () => {
    setUserData(initialState);
    setErrorMessage("");
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

  const onChangeHandler = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name , value } = event.target;
    
    setUserData((prevUserData) => {
      const updatedUserData = { ...prevUserData, [name]: value };
  
      // Validate the updated data
      const errors = validateForm(updatedUserData);
  

      // Update userDataError state if there's an error
      setUserDataError((prevUserDataError) => ({
        ...prevUserDataError , [name]: errors[name] || "",
      }));

      return updatedUserData;
    });
  };
  

  const handleSubmit = async () => {
    setErrorMessage("");
    setSuccessMessage("");
    try {
      const errors = validateForm(userData);

      if (Object.keys(errors).length > 0) {
        setUserDataError(errors);
        return;
      }
      setIsLoading(true);
      //call endpoint
      const response = await signupStudentAccount(userData);
      setIsLoading(false);
      setSuccessMessage(response);
      resetform();
    } catch (error: any) {
      setIsLoading(false);
      setUserDataError(initialState);

      try {
        const errorObj = JSON.parse(error.message);

        if (typeof errorObj === "object" && errorObj !== null) {

          setUserDataError(errorObj);
        }
      } catch (parsError: any) {
        setErrorMessage(error.message);
      }
    }
  };


  // const schema = Yup.object().shape({
  //   firstName: Yup.string().required().min(3).max(15),
  //   lastName:  Yup.string().required().min(3).max(15),
  //   email: Yup.string().required().email(),
  //   password: Yup.string().required().min(10).max(128),
  //   phoneNumber: Yup.string().required().min(1).max(15),
  // });
  
  return (
    <>
      <div className={styles.container}>
        <div className={styles.info}>
          <h1>Grow Your Skills, Empower Your Future</h1>
          <Link to={"/businessAccount"}>
            <Button variant="contained">Create Business Account</Button>
          </Link>
        </div>
        <div className={styles.formContainer}>
          <h1>Welcome</h1>
          <h4>Please Log in or Create Account</h4>
          <form>
            {errorMessage && (
              <Alert
                className={styles.alertBox}
                variant="filled"
                severity="error"
              >
                {errorMessage}
              </Alert>
            )}
            {successMessage && (
              <Alert
                className={styles.alertBox}
                variant="filled"
                severity="success"
              >
                {successMessage}
              </Alert>
            )}
            <TextField
              sx={inputStyles}
              className={styles.textField}
              InputLabelProps={{
                className: styles.textFieldLabel,
              }}
              InputProps={{ classes: { input: styles.textFieldInput } }}
              label="First Name"
              onChange={(event) => {
                onChangeHandler(event);
              }}
              value={userData.firstName}
              name="firstName"
              variant="outlined"
              error={!!userDataError.firstName}
              helperText={userDataError.firstName || ""}
            />

            <TextField
              sx={inputStyles}
              InputLabelProps={{
                className: styles.textFieldLabel,
              }}
              InputProps={{ classes: { input: styles.textFieldInput } }}
              label="Last Name"
              onChange={(event) => {
                onChangeHandler(event);
              }}
              value={userData.lastName}
              name="lastName"
              variant="outlined"
              error={!!userDataError.lastName}
              helperText={userDataError.lastName || ""}
            />

            <TextField
              sx={inputStyles}
              InputLabelProps={{
                className: styles.textFieldLabel,
              }}
              InputProps={{ classes: { input: styles.textFieldInput } }}
              label="Email"
              onChange={(event) => {
                onChangeHandler(event);
              }}
              value={userData.email}
              name="email"
              variant="outlined"
              error={!!userDataError.email}
              helperText={userDataError.email || ""}
            />

            <TextField
              sx={inputStyles}
              InputLabelProps={{
                className: styles.textFieldLabel,
              }}
              InputProps={{ classes: { input: styles.textFieldInput } }}
              type="password"
              onChange={(event) => {
                onChangeHandler(event);
              }}
              value={userData.password}
              name="password"
              label="Password"
              variant="outlined"
              error={!!userDataError.password}
              helperText={userDataError.password || ""}
            />

            <TextField
              sx={inputStyles}
              InputLabelProps={{
                className: styles.textFieldLabel,
              }}
              InputProps={{ classes: { input: styles.textFieldInput } }}
              label="Phone Number"
              onChange={(event) => {
                onChangeHandler(event);
              }}
              value={userData.phoneNumber}
              name="phoneNumber"
              variant="outlined"
              error={!!userDataError.phoneNumber}
              helperText={userDataError.phoneNumber || ""}
            />

            <Link to="/login">Already have an account ?</Link>

            {!isLoading && (
              <Button onClick={() => handleSubmit()} variant="contained">
                Sign up
              </Button>
            )}
            {isLoading && <CircularProgress />}
          </form>
        </div>
      </div>
    </>
  );
};
