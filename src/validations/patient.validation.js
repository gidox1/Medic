const Joi = require('joi');

const talkToNurseValidation = (req, res, next) => {
  // create schema object
  const schema = Joi.object({
      id: Joi.string().required(),
      nurse_id: Joi.string().required()
  });

  // schema options
  const options = {
      abortEarly: false,
      stripUnknown: true
  };

  // validate request body against schema
  const { error, value } = schema.validate(req.params, options);
  if (error) {
    return res.json({
      error: 'Validation Error',
      message: error.details
    })
  } else {
      next();
  }
}

module.exports =  {
  talkToNurseValidation
}