'use strict';

const shortid = require('shortid');
const errorHandler = require('./auth.errorHandler');


/**
 * Authentication Controller Class
 */
class AuthController {

  constructor(logger, service) {
    this.logger = logger;
    this.service = service
  }

  /**
   * Register a user
   * @param {object} req Restify request object
   * @param {object} res Restify response object
   * @return {callback}
  */
  async register(req, res) {
    const reqId = shortid.generate();
    this.logger.log(`started process of registrating new user - reqId: ${reqId}`);

    return await this.service.register(req.body)
      .then((jsonResponse) => {
        return res.status(201).json({
          message: 'user created successfully',
          data: jsonResponse
        });
      })
      .catch((Err) => {
        return errorHandler(Err, res);
      })
  }

  /**
   * Authenticate a user
   * @param {object} req Restify request object
   * @param {object} res Restify response object
   * @return {callback}
  */
  async login(req, res) {
    const reqId = shortid.generate();
    const { email, password } = req.body;
    this.logger.log(`started process of logging in for user with email ${email} - reqId: ${reqId}`);

    return await this.service.login(email, password)
      .then((jsonResponse) => {
        return res.status(201).json({
          message: 'user created successfully',
          data: jsonResponse
        });
      })
      .catch((Err) => {
        return errorHandler(Err, res);
      })
  }
}

module.exports = AuthController;