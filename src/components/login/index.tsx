import { Button, TextField } from '@mui/material';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './Login.module.css';

export const Login = () => {
  const [userData, setUserData] = useState({
    email: '',
    password: '',
  });

  const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setUserData((prevData) => ({ ...prevData, [name]: value }));
  };

  const inputStyles = {
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: 'white',
      },
      '&:hover fieldset': {
        borderColor: 'white',
      },
      '&.Mui-focused fieldset': {
        borderColor: 'white',
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
          <Button variant="contained" className={styles.button}>Login</Button>
        </form>
      </div>
    </div>
  );
};
