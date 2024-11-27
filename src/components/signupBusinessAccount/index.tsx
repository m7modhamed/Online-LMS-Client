import { Alert, Button, CircularProgress, TextField } from "@mui/material";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./style.module.css";
import { BusinessSignupValidationSchema } from "../signup/validationSchema";
import { signupInstructorAccount } from "../../api/UserServices";
import { Margin } from "@mui/icons-material";

export const SignupBusinessAccount = () => {
  interface IUserData {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    confirmPassword: string;
    phoneNumber: string;
    specialization: string;
    aboutMe: string;
    linkedinUrl: string;
    githubUrl: string;
    facebookUrl: string;
    twitterUrl: string;
  }

  interface IUserDataError {
    firstName?: string;
    lastName?: string;
    email?: string;
    password?: string;
    phoneNumber?: string;
    specialization?: string;
    aboutMe?: string;
    linkedinUrl?: string;
    githubUrl?: string;
    facebookUrl?: string;
    twitterUrl?: string;
    confirmPassword?: string;
  }

  const initialState: IUserData = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    phoneNumber: "",
    specialization: "",
    aboutMe: "",
    linkedinUrl: "",
    githubUrl: "",
    facebookUrl: "",
    twitterUrl: "",
  };

  const [userDataError, setUserDataError] =
    useState<IUserDataError>(initialState);

  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const resetform = () => {
    setUserData(initialState);
    setErrorMessage("");
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
      await BusinessSignupValidationSchema.validate(userData, {
        abortEarly: false,
      });

      // Call API if validation passes
      const response = await signupInstructorAccount(userData);

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

  const [userData, setUserData] = useState(initialState);

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
      BusinessSignupValidationSchema.validateAt(name, updatedUserData)
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

  return (
    <>
      <div className={styles.container}>
        <div className={styles.info}>
          <h1>Unlock New Opportunities with a Business Account</h1>
          <h3>Empower Your Business and Grow Your Network</h3>
        </div>
        <div className={styles.formContainer}>
          <h1>Welcome</h1>
          <h4>Please Log in or Create Account</h4>
          <form>
            <div className={styles.formMessage}>
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
            </div>
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
              label="linkedinUrl"
              onChange={(event) => {
                onChangeHandler(event);
              }}
              value={userData.linkedinUrl}
              name="linkedinUrl"
              variant="outlined"
              error={!!userDataError.linkedinUrl}
              helperText={userDataError.linkedinUrl || ""}
            />

            <TextField
              sx={inputStyles}
              InputLabelProps={{
                className: styles.textFieldLabel,
              }}
              InputProps={{ classes: { input: styles.textFieldInput } }}
              label="githubUrl"
              onChange={(event) => {
                onChangeHandler(event);
              }}
              value={userData.githubUrl}
              name="githubUrl"
              variant="outlined"
              error={!!userDataError.githubUrl}
              helperText={userDataError.githubUrl || ""}
            />

            <TextField
              sx={inputStyles}
              InputLabelProps={{
                className: styles.textFieldLabel,
              }}
              InputProps={{ classes: { input: styles.textFieldInput } }}
              label="facebookUrl"
              onChange={(event) => {
                onChangeHandler(event);
              }}
              value={userData.facebookUrl}
              name="facebookUrl"
              variant="outlined"
              error={!!userDataError.facebookUrl}
              helperText={userDataError.facebookUrl || ""}
            />

            <TextField
              sx={inputStyles}
              InputLabelProps={{
                className: styles.textFieldLabel,
              }}
              InputProps={{ classes: { input: styles.textFieldInput } }}
              label="twitterUrl"
              onChange={(event) => {
                onChangeHandler(event);
              }}
              value={userData.twitterUrl}
              name="twitterUrl"
              variant="outlined"
              error={!!userDataError.twitterUrl}
              helperText={userDataError.twitterUrl || ""}
            />

            <TextField
              sx={inputStyles}
              InputLabelProps={{
                className: styles.textFieldLabel,
              }}
              InputProps={{ classes: { input: styles.textFieldInput } }}
              label="specialization"
              onChange={(event) => {
                onChangeHandler(event);
              }}
              className={styles.specializationInput}
              value={userData.specialization}
              name="specialization"
              variant="outlined"
              error={!!userDataError.specialization}
              helperText={userDataError.specialization || ""}
            />

            <TextField
              id="standard-multiline-static"
              label="aboutMe"
              sx={inputStyles}
              InputLabelProps={{
                className: styles.textFieldLabel,
              }}
              InputProps={{ classes: { input: styles.textFieldInput } }}
              onChange={(event) => {
                onChangeHandler(event);
              }}
              value={userData.aboutMe}
              name="aboutMe"
              multiline
              rows={4}
              className={styles.multilineInput}
              variant="outlined"
              error={!!userDataError.aboutMe}
              helperText={userDataError.aboutMe || ""}
            />
          </form>
          <div className={styles.formFooter}>
            <Link to="/login">Already have an account ?</Link>

            {!isLoading && (
              <Button onClick={() => handleSubmit()} variant="contained">
                Sign up
              </Button>
            )}

            {isLoading && <CircularProgress />}
          </div>
        </div>
      </div>
    </>
  );
};
