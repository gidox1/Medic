const Joi = require('joi');

const diagnosisValidator = (req, res, next) => {
  // create schema object
  const schema = Joi.object({
    patient_id: Joi.string().required(),
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
      const bodySchema = Joi.object({
        subjective_component: Joi.string().required(),
        objective_component: Joi.string().required(),
        assesment: Joi.string().required(),
        plan: Joi.string().required(),
      });
      const response = bodySchema.validate(req.body, options);
      if (response.error) {
        return res.json({
          error: 'Validation Error',
          message: response.error.details
        })
      }

      req.body = response.value;
      next();
  }
}

module.exports =  {
  diagnosisValidator
}