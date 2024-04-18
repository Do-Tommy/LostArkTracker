import yup from 'yup';

export const userSchema = yup.object({
  body: yup.object({
    username: yup.string("needs to be a string").length(8).required("Username is required"),
    password: yup.string().length(8).required("Password is required")
  })
});

export const validate = (schema) => async (req, res, next) => {
  try {
    await schema.validate({
      body: req.body,
      query: req.query,
      params: req.params,
    })
    return next();
  } catch (err) {
    return res.status(400).json({type : err.name, message: err.message})
  }
}