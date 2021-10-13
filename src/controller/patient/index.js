'use strict';

const shortid = require('shortid');
const errorHandler = require('../../libs/errorHandler');


/**
 * Patient Controller Class
 */
class PatientController {

  constructor(logger, service) {
    this.logger = logger;
    this.service = service
  }

  /**
   * Create instant meeting for user with selected Nurse
   * @param {object} req Restify request object
   * @param {object} res Restify response object
   * @return {callback}
  */
  async getPatients(req, res) {
    const reqId = shortid.generate();
    this.logger.log(`started process of fetching all patients - reqId: ${reqId}`);
    
    return await this.service.getPatients(req.query)
      .then((jsonResponse) => {
        return res.status(201).json({
          message: 'fetched patients successfully',
          data: jsonResponse
        });
      })
      .catch((Err) => {
        return errorHandler(Err, res);
      })
  }

  /**
   * Talk to a nurse
   * @param {object} req Restify request object
   * @param {object} res Restify response object
   * @return {callback}
  */
  async talkToNurse(req, res) {
    const { id, nurse_id } = req.params;
    const reqId = shortid.generate();
    this.logger.log(`started process of user of id ${id} talking to nurse - reqId: ${reqId}`);

    return await this.service.talkToNurse(id, nurse_id, req.body)
      .then((jsonResponse) => {
        return res.status(201).json({
          message: 'successfully initiated talk-to-nurse process',
          data: jsonResponse
        });
      })
      .catch((Err) => {
        return errorHandler(Err, res);
      })
  }

  /**
   * Get Patient Medical History
   * @param {object} req Restify request object
   * @param {object} res Restify response object
   * @return {callback}
  */
  async getPatientMedicalHistory(req, res) {
    const reqId = shortid.generate();
    this.logger.log(`started process of fetching patient medical history - reqId: ${reqId}`);
    
    return await this.service.getPatientMedicalHistory(req.query)
      .then((jsonResponse) => {
        return res.status(201).json({
          message: 'fetched patients medical history successfully',
          data: jsonResponse
        });
      })
      .catch((Err) => {
        return errorHandler(Err, res);
      })
  }

  /**
   * Get Patient Medical Appointment
   * @param {object} req Restify request object
   * @param {object} res Restify response object
   * @return {callback}
  */
 async getPatientAppointment(req, res) {
  const reqId = shortid.generate();
  this.logger.log(`started process of fetching patient medical appointments - reqId: ${reqId}`);
  
  return await this.service.getPatientAppointment(req.query)
    .then((jsonResponse) => {
      return res.status(201).json({
        message: 'fetched patients medical appointments successfully',
        data: jsonResponse
      });
    })
    .catch((Err) => {
      return errorHandler(Err, res);
    })
}
}

module.exports = PatientController;