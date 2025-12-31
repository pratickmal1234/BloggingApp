import yup from "yup";

export const TaskValidateSchema = yup.object({
    title: yup
        .string()
        .trim()
        .min(3, "title must be atleast 3 characters")
        .required(),
    contain: yup
        .string()
        .trim()
        .min(10, "description must be atleast 10 characters ")
        .max(50, "description atleast 50 characters")
        .required(),


});

export const validateTask = (schema) => async (req, res, next) => {
    try {
        await schema.validate(req.body);
        next();
    } catch (err) {
        return res.status(400).json({ errors: err.errors });
    }
};