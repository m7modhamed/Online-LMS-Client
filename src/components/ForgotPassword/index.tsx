import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { SignupValidationSchema } from "../signup/validationSchema";
import { forgotPasswordRequest } from "../../api/UserServices";
import { Alert, CircularProgress } from "@mui/material";
import styles from "./style.module.css";


export default function ForgotPassword() {
  const [open, setOpen] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [email, setEmail] = React.useState("");
  const [emailError, setEmailError] = React.useState("");
  const [successMessage, setSuccessMessage] = React.useState("");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async () => {
    try {
      if (emailError) {
        return;
      }

      SignupValidationSchema.validateAt("email", { email: email })
        .then(() => {
          setEmailError("");
        })
        .catch((err) => {
          setEmailError(err.message);
        });

        setIsLoading(true);
      const response = await forgotPasswordRequest(email);

      setSuccessMessage(response);
      setIsLoading(false);
      console.log(response);
    } catch (error: any) {
        setIsLoading(false);
      console.log(error);
      setEmailError(error.message);
    }
    // setOpen(false);
  };

  const onChangeHandler = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;

    console.log(name, value);
    setEmail(value);

    SignupValidationSchema.validateAt("email", { email: value })
      .then(() => {
        setEmailError("");
      })
      .catch((err) => {
        setEmailError(err.message);
      });
  };

  return (
    <React.Fragment>
      <Button variant="outlined" onClick={handleClickOpen}>
        Forgot password?
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: "form",
          onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
            event.preventDefault();
            // handleClose();
          },
        }}
      >
        <DialogTitle>Forgot Your Password</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please enter your email address below to receive a link to reset
            your password. A password reset email will be sent to your inbox.
          </DialogContentText>
          {successMessage && (
            <Alert
              className={styles.alertBox}
              variant="filled"
              severity="success"
            >
              {successMessage}
              <p>Check your inbox</p>

            </Alert>
          )}
          <TextField
            autoFocus
            margin="dense"
            id="name"
            name="email"
            label="Email Address"
            fullWidth
            variant="standard"
            error={!!emailError}
            helperText={emailError || ""}
            onChange={(event) => {
              onChangeHandler(event);
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          {!isLoading  && <Button disabled={!!successMessage} onClick={() => handleSubmit()} type="submit">
            Send Email
          </Button>}

          {isLoading && <CircularProgress />}

        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
