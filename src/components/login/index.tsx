import { Alert, Button, CircularProgress, TextField } from "@mui/material";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./Login.module.css";
import { ValidationSchema } from "../signup/validationSchema";
import { login } from "../../api/UserServices";

export const Login = () => {
  const initialState = {
    email: "",
    password: "",
  };

  const [userData, setUserData] = useState(initialState);

  const [errorMessage, setErrorMessage] = useState("");
  const [emailError, setEmailError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const onChangeHandler = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    //reset error message
    setErrorMessage("");

    const { name, value } = event.target;

    setUserData((prevUserData) => {
      const updatedUserData = { ...prevUserData, [name]: value };

      if (name === "email") {
        // Validate the field on change using Yup schema
        ValidationSchema.validateAt("email", updatedUserData)
          .then(() => {
            setEmailError("");
          })
          .catch((err) => {
            setEmailError(err.message);
          });
      }
      return updatedUserData;
    });
  };

  const resetform = () => {
    setUserData(initialState);
    setErrorMessage("");
  };

  const handleSubmit = async () => {
    if (errorMessage) {
      return;
    }
    setErrorMessage("");
    setIsLoading(true);

    try {
      // Call API if validation passes
      const response = await login(userData);
      console.log(response);
      setIsLoading(false);
      // setSuccessMessage(response);
      resetform();
    } catch (error: any) {
      setIsLoading(false);
      setErrorMessage(error.message);
      console.log(error)
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
    <div className={styles.container}>
      <div className={styles.info}>
        <h1>Grow Your Skills, Empower Your Future</h1>
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
          <TextField
            sx={inputStyles}
            InputLabelProps={{
              className: styles.textFieldLabel,
            }}
            InputProps={{
              classes: { input: styles.textFieldInput },
            }}
            label="Email"
            onChange={onChangeHandler}
            value={userData.email}
            name="email"
            variant="outlined"
            error={!!emailError}
            helperText={emailError || ""}
          />
          <TextField
            sx={inputStyles}
            InputLabelProps={{
              className: styles.textFieldLabel,
            }}
            InputProps={{
              classes: { input: styles.textFieldInput },
            }}
            type="password"
            onChange={onChangeHandler}
            value={userData.password}
            name="password"
            label="Password"
            variant="outlined"
          />
          <Link to="/signup" className={styles.link}>
            Create a new account?
          </Link>
          
          {!isLoading && <Button
            onClick={() => handleSubmit()}
            variant="contained"
            className={styles.button}
          >
            Login
          </Button>}

          {isLoading && <CircularProgress />}

        </form>
      </div>
    </div>
  );
};
