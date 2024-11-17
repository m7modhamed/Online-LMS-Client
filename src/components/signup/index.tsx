import { Alert, Button, CircularProgress, TextField } from "@mui/material";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./signup.module.css";
import { signupStudentAccount } from "../../api/UserServices";
import { ValidationSchema } from "./validationSchema";

export const SignUp = () => {
  interface IUserData {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    phoneNumber: string;
    confirmPassword: string;
  }

  interface IUserDataError {
    firstName?: string;
    lastName?: string;
    email?: string;
    password?: string;
    phoneNumber?: string;
    confirmPassword?: string;
  }

  const initialState: IUserData = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    phoneNumber: "",
    confirmPassword: "",
  };

  const [userData, setUserData] = useState<IUserData>(initialState);

  const [userDataError, setUserDataError] =
    useState<IUserDataError>(initialState);

  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

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
    //reset error message
    setErrorMessage("");

    const { name, value } = event.target;

    setUserData((prevUserData) => {
      const updatedUserData = { ...prevUserData, [name]: value };

      // Validate the field on change using Yup schema
      ValidationSchema.validateAt(name, updatedUserData)
        .then(() => {
          setUserDataError((prevUserDataError) => ({
            ...prevUserDataError,
            [name]: "",
          }));
        })
        .catch((err) => {
          setUserDataError((prevUserDataError) => ({
            ...prevUserDataError,
            [name]: err.message,
          }));
        });

      return updatedUserData;
    });
  };

  const handleSubmit = async () => {
    if (errorMessage) {
      return;
    }
    setErrorMessage("");
    setSuccessMessage("");
    setIsLoading(true);

    try {
      // Validate using Yup schema
      await ValidationSchema.validate(userData, { abortEarly: false });

      // Call API if validation passes
      const response = await signupStudentAccount(userData);

      setIsLoading(false);
      setSuccessMessage(response);
      resetform();
    } catch (error: any) {
      setIsLoading(false);

      // If it's a Yup validation error
      if (error.name === "ValidationError") {
        const errors: IUserDataError = {};
        error.inner.forEach((err: any) => {
          if (err.path) {
            errors[err.path as keyof IUserDataError] = err.message;
          }
        });
        setUserDataError(errors);
      } else {
        // Handle server-side errors
        try {
          const errorObj = JSON.parse(error.message);
          if (typeof errorObj === "object" && errorObj !== null) {
            setUserDataError(errorObj);
          }
        } catch (parseError) {
          setErrorMessage(error.message);
        }
      }
    }
  };

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
              type="password"
              onChange={(event) => {
                onChangeHandler(event);
              }}
              value={userData.confirmPassword}
              name="confirmPassword"
              label="Confirm Password"
              variant="outlined"
              error={!!userDataError.confirmPassword}
              helperText={userDataError.confirmPassword || ""}
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
