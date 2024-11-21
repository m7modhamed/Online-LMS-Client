import { Alert, Button, CircularProgress, TextField } from "@mui/material";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./Login.module.css";
import { loginValidationSchema } from "../signup/validationSchema";
import { login } from "../../api/UserServices";
import ForgotPassword from "../ForgotPassword";
import { getUserFromToken } from "../../Authentication/jwtDecode";
import { useAuth } from "../../Authentication/AuthContext";

export const Login = () => {

  const initialState = {
    email: "",
    password: "",
  };

  interface IUserData {
    email: string;
    password: string;
  }

  interface IUserDataError {
    email?: "";
    password?: "";
  }

  const navigate = useNavigate();

  const { login: authLogin } = useAuth(); // Get login function from AuthContext


  const [userData, setUserData] = useState<IUserData>(initialState);
  // const [token , useToken] = useState<string>(''); 
  const [errorMessage, setErrorMessage] = useState("");
  const [userDataError, setUserDataError] = useState<IUserDataError>();
  const [isLoading, setIsLoading] = useState(false);

  const onChangeHandler = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    //reset error message
    setErrorMessage("");

    const { name, value } = event.target;

    setUserData((prevUserData) => {
      const updatedUserData = { ...prevUserData, [name]: value.trim() };

      // Validate the field on change using Yup schema
      loginValidationSchema
        .validateAt(name, updatedUserData)
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

  const resetform = () => {
    setUserData(initialState);
    setErrorMessage("");
  };

  const handleSubmit = async () => {
    try {
      if (errorMessage) {
        return;
      }
      // Validate the field on change using Yup schema
      await loginValidationSchema.validate(userData, { abortEarly: false });

      setErrorMessage("");
      setIsLoading(true);

      // Call API if validation passes
      const response = await login(userData);

      const token = response.token;
     
       // Call login method from AuthContext to save token and set user
       authLogin(token);

   
      setIsLoading(false);
      resetform();
      navigate("/");
    } catch (error: any) {
      if (error.name === "ValidationError") {
        const errors: IUserDataError = {};
        error.inner.forEach((err: any) => {
          if (err.path) {
            errors[err.path as keyof IUserDataError] = err.message;
          }
        });
        setUserDataError(errors);
      } else {

        setErrorMessage(error.message);
      }
      setIsLoading(false);
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
            error={!!userDataError?.email}
            helperText={userDataError?.email || ""}
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
            error={!!userDataError?.password}
            helperText={userDataError?.password || ""}
          />
          <Link to="/signup" className={styles.link}>
            Create a new account?
          </Link>

          <ForgotPassword />

          {!isLoading && (
            <Button
              onClick={() => handleSubmit()}
              variant="contained"
              className={styles.button}
            >
              Login
            </Button>
          )}

          {isLoading && <CircularProgress />}
        </form>
      </div>
    </div>
  );
};
