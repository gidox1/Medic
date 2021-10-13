'use strict';

const Repository = require('./repository/nurses.repository');
const Errors = require('../../libs/error');
const DiagnosisDTO = require('./dto/nurses.dto');

class NurseService {
  constructor(logger, service) {
    this.logger = logger;
    this.service = service
    this.repository = new Repository(this.logger);
  }

  /**
   * Get Nurses
   * @param {object} req Restify request object
   * @param {object} res Restify response object
   * @return {callback}
  */
 async getNurses(query) {
    try {
      return await this.repository.get(query);
    }
    catch(E) {
      this.logger.error(E, "An error occured while fetching nurse data")
      throw E; 
    }
  }
  
  /**
   * Authenticate a user
   * @param {object} req Restify request object
   * @param {object} res Restify response object
   * @return {callback}
  */
  async createDiagnosis(data) {
    const DTO = new DiagnosisDTO().init(data);
    const payload = DTO.buildDiagnosisData();
    try {
      return await this.repository.createDiagnosisEntry(payload);
    }
    catch(E) {
      this.logger.error(E, "An error occured while creating patient's diagnosis")
      throw E; 
    }
  }
}

module.exports = NurseService;
