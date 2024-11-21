import React, { useEffect, useState } from "react";
import styles from "./style.module.css";
import { Alert, Button, CircularProgress } from "@mui/material";
import { verifyAccount } from "../../api/UserServices";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";

export const VerifyEmail = () => {
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
      const response = await verifyAccount(token);

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

  return (
    <>
      <div className={styles.container}>
        <div className={styles.ContentContainer}>
          <div className={styles.header}>
            <h1>AcademyX</h1>
            <img src="src/images/rb_3180.png"></img>
          </div>
          <div className={styles.footer}>
            <h2>Confirm Email Activation</h2>
            <p>
              Click the button below to activate your email address. If you
              didn't request this, please ignore this message.
            </p>

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
                Activate Email
              </Button>
            )}

            {isLoading && <CircularProgress />}
          </div>
        </div>
      </div>
    </>
  );
};
