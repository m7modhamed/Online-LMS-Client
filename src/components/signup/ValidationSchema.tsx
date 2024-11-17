import * as Yup from 'yup';

export const ValidationSchema = Yup.object().shape({
    firstName: Yup.string()
      .required("First Name is required")
      .min(3, "First Name must be at least 3 characters")
      .max(15, "First Name can't exceed 15 characters"),
  
    lastName: Yup.string()
      .required("Last Name is required")
      .min(3, "Last Name must be at least 3 characters")
      .max(15, "Last Name can't exceed 15 characters"),
  
    email: Yup.string()
      .required("Email is required")
      .email("Invalid email format"),
  
    password: Yup.string()
      .required("Password is required")
      .min(10, "Password must be at least 10 characters")
      .max(128, "Password can't exceed 128 characters")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_])[\S]+$/,
        "Password must contain at least one uppercase letter, one lowercase letter, one number, one special character, and no whitespace"
      ),
  
    phoneNumber: Yup.string()
      .required("Phone Number is required")
      .min(3, "Phone Number must be at least 3 characters")
      .max(15, "Phone Number can't exceed 15 characters")
      .matches(
        /^[\d]+$/,
        "Phone Number must only contain digits and no spaces"
      )
      .matches(
        /^[^\s]+$/,
        "Phone Number must not contain any whitespace"
      ),
  });