'use strict';

const Repository = require('./repository/patients.repository');
const PatientDTO = require('./dto/patients.dto')
const Errors = require('../../libs/error');

class PatientService {
  constructor(logger, service) {
    this.logger = logger;
    this.service = service
    this.repository = new Repository(this.logger);
  }

  /**
   * Get Patients
   * @param {object} req Restify request object
   * @param {object} res Restify response object
   * @return {callback}
  */
  async getPatients(query) {
    try {
      return await this.repository.get(query);
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
  async talkToNurse(id, nurse_id, data) {
    try {
      const meetingUrl =  await this.repository.getMeetingUrl(nurse_id);
      const DTO = new PatientDTO().init({id, nurse_id, ...data});
      return await this.repository.createAppointment(
        DTO.buildAppointmentData(meetingUrl)
      );
    }
    catch(E) {
      console.log(E)
    }
  }


  /**
   * Get Medical History
   * @param {object} req Restify request object
   * @param {object} res Restify response object
   * @return {callback}
  */
  async getPatientMedicalHistory(query) {
    try {
      return await this.repository.getMedicalHistory(query);
    }
    catch(E) {
      throw E;
    }
  }


  async getPatientAppointment(query) {
    try {
      return await this.repository.getPatientAppointment(query);
    }
    catch(E) {
      throw E;
    }
  }
}

module.exports = PatientService