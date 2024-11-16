import { Button, TextField } from "@mui/material";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./style.module.css";

export const SignupBusinessAccount = () => {
  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    phoneNumber: "",
    specialization: "",
    aboutMe: "",
    linkedinUrl: "",
    githubUrl: "",
    facebookUrl: "",
    twitterUrl: "",
  });

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
    const { value, name } = event.target;
    setUserData({ ...userData, [name]: value });
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
              value={userData.specialization}
              name="specialization"
              variant="outlined"
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
              variant="outlined"
            />

            <div className={styles.formFooter}>
              <Link to="/login">Already have an account ?</Link>

              <Button variant="contained">Sign up</Button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};
