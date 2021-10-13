'use strict';

const shortid = require('shortid');
const errorHandler = require('../../libs/errorHandler');

/**
 * Nurse Controller Class
 */
class NurseController {

  constructor(logger, service) {
    this.logger = logger;
    this.service = service
  }

  /**
   * Get Nurses
   * @param {object} req Restify request object
   * @param {object} res Restify response object
   * @return {callback}
  */
  async getNurses(req, res) {
    const reqId = shortid.generate();
    this.logger.log(`started process of getting nurses - reqId: ${reqId}`);

    return await this.service.getNurses(req.query)
      .then((jsonResponse) => {
        return res.status(201).json({
          message: 'fetched nurses successfully',
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
  async createDiagnosis(req, res) {
    const reqId = shortid.generate();
    const { patient_id } = req.params;
    const {
      subjective_component,
      objective_component,
      assesment,
      plan
    } = req.body;
    this.logger.log(`started process of creating diagnosis for user with id ${patient_id} - reqId: ${reqId}`);

    return await this.service.createDiagnosis({
        subjective_component,
        objective_component,
        assesment,
        plan,
        patient_id
      })
      .then((jsonResponse) => {
        return res.status(201).json({
          message: 'successfully created patient diagnosis',
          data: jsonResponse
        });
      })
      .catch((Err) => {
        return errorHandler(Err, res);
      })
  }
}

module.exports = NurseController;