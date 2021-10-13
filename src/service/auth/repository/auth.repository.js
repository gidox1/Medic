'use strict';

const UserModel = require('../../../model/user.schema');
const PatientsModel = require('../../../model/patient.schema');
const NursesSchema = require('../../../model/nurse.schema');
const Errors = require('../../../libs/error');
const Constants = require('../../../config/constants');

class AuthRepository {
  constructor(logger) {
    this.logger = logger;
  }

  /**
   * Return User Collection
   * @param {String} email 
   */
  async getUserByEmail(email) {
    try {
      return await UserModel.findOne({ email: email, status: 1 });
    }
    catch(E) {
      this.logger.error('[AuthRepository] - getUserByEmail - An error occured while getting user by email');
      this.logger.error(JSON.stringify(E));
      throw E;
    }
  }

  /**
   * Create new user
   * @param {Object} data 
   */
  async createNewUser(data) {
    try {
      if(!data) throw new Errors.BadRequestError('data is required');
      return await UserModel.create(data).then((res) => {
        console.log("user creayted successfilly ", res)
        return res;
      })
    }
    catch(E) {
      this.logger.error('[AuthRepository] - createNewUser - An error occured while creating user');
      this.logger.error(JSON.stringify(E));
      throw E;
    }
  }


  /**
   * Create new user role data
   * @param {Object} data 
   */
  async createUserRoleData(data, role) {
    const Model = (role === Constants.roles.PATIENT) 
      ? PatientsModel
      : NursesSchema;

    try {
      if(!data) throw new Errors.BadRequestError('data is required');
      return await Model.create(data).then((res) => {
        console.log("user role data created successfilly ", res)
        return res;
      })
    }
    catch(E) {
      this.logger.error('[AuthRepository] - createUserRoleData - An error occured while creating user role data');
      this.logger.error(JSON.stringify(E));
      throw E;
    }
  }

  async getRoleRelation(email, role) {
    const Model = (role === Constants.roles.PATIENT) 
    ? PatientsModel
    : NursesSchema;
    return await Model.findOne({email}).populate("user")
  }

    /**
   * Return User Collection
   * @param {String} email 
   */
  async getUserById(id) {
    try {
      return await UserModel.findOne({ _id: id, status: 1 });
    }
    catch(E) {
      this.logger.error('[AuthRepository] - getUserById - An error occured while getting user by email');
      this.logger.error(JSON.stringify(E));
      throw E;
    }
  }
}

module.exports = AuthRepository;