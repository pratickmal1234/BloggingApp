import * as yup from "yup";


export const blogValidateSchema = yup.object({
  title: yup
    .string()
    .trim()
    .min(3, "Title must be at least 3 characters")
    .required("Title is required"),

  contain: yup
    .string()
    .trim()
    .min(10, "Content must be at least 10 characters")
    .max(5000, "Content cannot exceed 5000 characters")
    .required("Content is required"),


});



export const commentValidateSchema = yup.object({
  text: yup
    .string()
    .trim()
    .min(1, "Comment cannot be empty")
    .max(500, "Comment cannot exceed 500 characters")
    .required("Comment is required"),
});



export const validateBlog = (schema) => async (req, res, next) => {
  try {
    await schema.validate(req.body, { abortEarly: false });
    next();
  } catch (err) {
    return res.status(400).json({
      success: false,
      errors: err.errors,
    });
  }
};
