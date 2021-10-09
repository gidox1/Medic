const Joi = require('joi');

const registrationValidator = (req, res, next) => {
  const passwordRegex = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
  // create schema object
  const schema = Joi.object({
      first_name: Joi.string().required(),
      last_name: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().min(8).regex(passwordRegex).required(),
      role: Joi.string().valid('patient', 'nurse').required(),
      staff_id: Joi.string().optional(),
      phone_number: Joi.string().min(8).required(),
      country: Joi.string().required(),
      dob: Joi.date().required(),
  });

  // schema options
  const options = {
      abortEarly: false,
      stripUnknown: true
  };

  // validate request body against schema
  const { error, value } = schema.validate(req.body, options);
  if (error) {
    return res.json({
      error: 'Validation Error',
      message: error.details
    })
  } else {
      req.body = value;
      next();
  }
}

const loginValidator = (req, res, next) => {
  // create schema object
  const schema = Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string().required()
  });

  // schema options
  const options = {
      abortEarly: false,
      stripUnknown: true
  };

  // validate request body against schema
  const { error, value } = schema.validate(req.body, options);
  if (error) {
    return res.json({
      error: 'Validation Error',
      message: error.details
    })
  } else {
      req.body = value;
      next();
  }
}

module.exports =  {
  registrationValidator,
  loginValidator
}