import React, { useEffect, useState } from "react";
import styles from "./style.module.css";
import { Alert, Button, CircularProgress, TextField } from "@mui/material";
import { resetPassword, verifyAccount } from "../../api/UserServices";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { Password } from "@mui/icons-material";
import { SignupValidationSchema } from "../signup/validationSchema";

export const ResetPassword = () => {
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

  const initialState = {
    password: "",
    confirmPassword: "",
  };

  const [userData, setUserData] = useState(initialState);
  const [userDataError, setUserDataError] = useState(initialState);

  const [isLoading, setIsLoading] = useState(false);

  const [token, setToken] = useState<string>("");

  const [errorMessage, setErrorMessage] = useState("");

  const [successMessage, setSuccessMessage] = useState("");

  const [buttonVisable, setButtonVisable] = useState(true);
  const [searchParams] = useSearchParams();

  const navigate = useNavigate();

  useEffect(() => {
    const tokenFromUrl = searchParams.get("token") as string;

    setToken(tokenFromUrl);
  }, [searchParams]);

  const handleSubmit = async () => {
    try {
      setIsLoading(true);
      const response = await resetPassword(token , userData.password);

      setSuccessMessage(response);
      console.log(response);
      setIsLoading(false);

      setTimeout(() => {
        navigate("/login"); // Navigate to the login page
      }, 5000);
    } catch (error: any) {
      setIsLoading(false);
      setErrorMessage(error.message);
    } finally {
      setButtonVisable(false);
    }
  };

  const onChangeHandler = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    //reset error message
    setErrorMessage("");

    const { name, value } = event.target;

    const validation = (updatedUserData: Record<string, any>) => {
      // Fields to validate
      const fieldsToValidate = ['password', 'confirmPassword'];
    
      fieldsToValidate.forEach((field) => {
        SignupValidationSchema.validateAt(field, updatedUserData)
          .then(() => {
            setUserDataError((prevUserDataError) => ({
              ...prevUserDataError,
              [field]: "", // Clear error for this field
            }));
          })
          .catch((err) => {
            setUserDataError((prevUserDataError) => ({
              ...prevUserDataError,
              [field]: err.message, // Set error message for this field
            }));
          });
      });
    };
    

    setUserData((prevUserData) => {
      const updatedUserData = { ...prevUserData, [name]: value };

      // Validate the field on change using Yup schema
     validation(updatedUserData);


      return updatedUserData;
    });
  };

  return (
    <>
      <div className={styles.container}>
        <div className={styles.ContentContainer}>
          <div className={styles.header}>
            <h1>AcademyX</h1>
            <img src="src/images/resetPassword.png"></img>
          </div>
          <div className={styles.footer}>
            <h2>Reset Your Password</h2>
            <p>
              Click the button below to reset your password. If you didn't
              request this, please ignore this message.
            </p>

            <div className={styles.formContainer}>
              <form>
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
              </form>
            </div>
            {errorMessage && (
              <Alert
                className={styles.alertBox}
                variant="filled"
                severity="error"
              >
                {errorMessage}
                <p>Please try again</p>
              </Alert>
            )}
            {successMessage && (
              <Alert
                className={styles.alertBox}
                variant="filled"
                severity="success"
              >
                {successMessage}
                <p>You can login now</p>
              </Alert>
            )}

            {!isLoading && buttonVisable && (
              <Button onClick={() => handleSubmit()} variant="outlined">
                reset password
              </Button>
            )}

            {isLoading && <CircularProgress />}
          </div>
        </div>
      </div>
    </>
  );
};
