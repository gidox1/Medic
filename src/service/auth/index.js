'use strict';

const RegisterDTO = require('./dto/auth.register.dto');
const Repository = require('./repository/auth.repository');
const { 
  hashPassword,
  getToken,
  comparePassword
 } = require('../../libs/authHelper');
const Errors = require('../../libs/error');

class AuthService {

  constructor(logger, service) {
    this.logger = logger;
    this.service = service
    this.repository = new Repository(this.logger);
  }

  /**
   * Register a user
   * @param {object} req Restify request object
   * @param {object} res Restify response object
   * @return {callback}
  */
  async register(data) {
    this.logger.log(`started process of registering new user with data: ${JSON.stringify(data)}`);
    const DTO = new RegisterDTO().init(data);

    try {
      const userExists = await this.repository.getUserByEmail(DTO.getEmail());
      if(!userExists) {
        const hashed = await hashPassword(DTO.getPassword());
        const userData = DTO.buildUserData(hashed);
        const roleData = DTO.getUserRoleData();
        const createdUser = await this.repository.createNewUser(userData); //create user
        //create user role data
        await this.repository.createUserRoleData({...roleData, user: createdUser._id}, DTO.getUserRole());
        return await DTO.buildClientResponse(getToken(createdUser.toJSON()), createdUser.toJSON())
      }
      throw new Errors.DataAlreadyExists('user already exists')
    }
    catch(E) {
      throw E;
    }
  }

  
  /**
   * Authenticate a user
   * @param {object} req Restify request object
   * @param {object} res Restify response object
   * @return {callback}
  */
  async login(email, password) {
    try {
      const userExists = await this.repository.getUserByEmail(email);
      if(!userExists) {
        throw new Errors.NotFoundError('user does not exist');
      }
      await comparePassword(password, userExists.password);
      const responseData = await this.repository.getRoleRelation(email, userExists.role)
      return {
        ...responseData.toJSON(),
        token: await getToken(userExists.toJSON())
      }
    }
    catch(E) {
      throw E;
    }
  }
}

module.exports = AuthService