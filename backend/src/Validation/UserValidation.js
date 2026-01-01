

import * as yup from "yup";

export const registerSchema = yup.object({
  name: yup
    .string()
    .trim()
    .min(3, "Name must be at least 3 characters")
    .required("Name is required"),

  email: yup
    .string()
    .email("Invalid email format")
    .required("Email is required"),

  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});


export const loginSchema = yup.object({
  email: yup
    .string()
    .email("Invalid email")
    .required("Email is required"),

  password: yup
    .string()
    .required("Password is required"),
});


export const profileSchema = yup.object({
  firstName: yup
    .string()
    .trim()
    .min(2, "First name too short")
    .notRequired(),

  lastName: yup
    .string()
    .trim()
    .min(2, "Last name too short")
    .notRequired(),

  bio: yup
    .string()
    .max(200, "Bio max 200 characters")
    .notRequired(),

  dob: yup
    .string()
    .notRequired(),

  gender: yup
    .string()
    .oneOf(["Male", "Female", "Other"], "Invalid gender")
    .notRequired(),
});



export const validateUser = (schema) => async (req, res, next) => {
  try {
    await schema.validate(req.body, {
      abortEarly: false, 
    });
    next();
  } catch (err) {
    return res.status(400).json({
      success: false,
      errors: err.errors,
    });
  }
};
