const di = require('../config/di');
const AuthController = di.get('authController');
const { 
  registrationValidator,
  loginValidator
} = require('../validations/auth.validation');

module.exports = (app) => {
  app.post('/auth/register', registrationValidator, (req, res, next) =>  AuthController.register(req, res));
  app.post('/auth/login', loginValidator, (req, res, next) =>  AuthController.login(req, res));
}