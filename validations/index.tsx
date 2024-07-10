import * as Yup from "yup";

// ---------------------- Signin ----------------------
export const schemaSignin = Yup.object().shape({
  phone_number: Yup.string()
    .min(19, "Invalid phone number")
    .required("Phone is required"),
  password: Yup.string()
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/,
      "Password must be at least 6 characters and contain at least one uppercase and one lowercase letter"
    )
    .required("Password is required"),
});

// ---------------------- Signup ----------------------
export const schemaSignup = Yup.object().shape({
  first_name: Yup.string().required("First name is required"),
  last_name: Yup.string().required("Last name is required"),
  phone_number: Yup.string()
    .min(19, "Invalid phone number")
    .required("Phone is required"),
  email: Yup.string().email("Email invalit ").required("Email is required"),
  password: Yup.string()
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/,
      "Password must be at least 6 characters and contain at least one uppercase and one lowercase letter"
    )
    .required("Password is required"),
});
