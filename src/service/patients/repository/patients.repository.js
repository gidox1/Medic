'use strict';

const PatientsModel = require('../../../model/patient.schema');
const DiagnosisModel = require('../../../model/medical_diagnosis');
const AppointmentModel = require('../../../model/appointment');
const NurseRepo = require('../../../service/nurses/repository/nurses.repository');
const Client = require('../../../libs/zoom-client');
const Errors = require('../../../libs/error');

class PatientRepository {
  constructor(logger) {
    this.logger = logger;
    this.page = 1;
    this.limit = 10;
  }

  async get(query) {
    let limit = query.limit ? parseInt(query.limit) : this.limit;
    let page = query.page ? parseInt(query.page) : this.page;

    const queryObj = {};
    if(query.startDate && query.endDate) {
      queryObj.$and = [{
        startDate:{
          $lte:new Date(query.startDate)
        }
      },{
        endDate:{
          $gte:new Date(query.endDate)
        }
      }]
    }

    if(query.id) {
      queryObj._id = query.id
    }

    try {
      return await PatientsModel.find(queryObj)
        .limit(limit * 1)
        .skip((page - 1) * limit)
        .populate("user");   
    }
    catch(E) {
      this.logger.error('[PatientRepository] - get - An error occured while getting patients');
      this.logger.error(JSON.stringify(E));
      throw E;
    }
  }


  async getMedicalHistory(query){
    let limit = query.limit ? parseInt(query.limit) : this.limit;
    let page = query.page ? parseInt(query.page) : this.page;

    const queryObj = {};
    if(query.startDate && query.endDate) {
      queryObj.created_at = [{
        startDate:{
          $lte:new Date(query.startDate)
        }
      },{
        endDate:{
          $gte:new Date(query.endDate)
        }
      }]
    }

    if(query.patient) {
      queryObj.patient = query.patient_id
    }

    try {
      return await DiagnosisModel.find(queryObj)
        .limit(limit * 1)
        .skip((page - 1) * limit)
        .populate("patient");
    }
    catch(E) {
      this.logger.error('[PatientRepository] - get - An error occured while getting patients medical history');
      this.logger.error(JSON.stringify(E));
      throw E;
    }
  }


  async getMeetingUrl(data) {
    const nurseModelData = await new NurseRepo(this.logger).get({id: data.nurse_id});
    if(nurseModelData) {
      const email = nurseModelData[0].user;
      const urlData = await Client.generateNurseMeetingUrl(email);
      if(!urlData) {
        this.logger.error(E);
        throw new Error('An error occured while generating meeting link, please try again');
      }
      return urlData.personal_meeting_url
    }
  }


  async createAppointment(data) {
    try {
      if(!data) throw new Errors.BadRequestError('data is required');
      return await AppointmentModel.create(data).then((res) => {
        console.log("user appointment created successfilly ", res)
        return res;
      })
    }
    catch(E) {
      this.logger.error('[PatientRepository] - createAppointment - An error occured while creating appointment for user');
      this.logger.error(JSON.stringify(E));
      throw E;
    }
  }

  async getPatientAppointment(query) {
      let limit = query.limit ? parseInt(query.limit) : this.limit;
      let page = query.page ? parseInt(query.page) : this.page;
  
      const queryObj = {};
      if(query.startDate && query.endDate) {
        queryObj.scheduled_date = [{
          startDate:{
            $lte:new Date(query.startDate)
          }
        },{
          endDate:{
            $gte:new Date(query.endDate)
          }
        }]
      }
  
      if(query.nurse_id) {
        queryObj.nurse = query.nurse_id
      }

      try {
        return await AppointmentModel.find(queryObj)
          .limit(limit * 1)
          .skip((page - 1) * limit)
          .populate("patient")
          .populate("nurse");   

      }
      catch(E) {
        this.logger.error('[PatientRepository] - get - An error occured while getting patients');
        this.logger.error(JSON.stringify(E));
        throw E;
      }
  }
}

module.exports = PatientRepository;