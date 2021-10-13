'use strict';

const NursesSchema = require('../../../model/nurse.schema');
const DiagnosisModel = require('../../../model/medical_diagnosis');
const Errors = require('../../../libs/error');

class NurseRepository {
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
      queryObj.created_at = [{
        startDate:{
          $lte: new Date(query.startDate)
        }
      },{
        endDate:{
          $gte: new Date(query.endDate)
        }
      }]
    }

    if(query.id) {
      queryObj._id = query.id;
    }

    if(query.staff_id) {
      queryObj._id = query.staff_id;
    }

    if(query.is_available) {
      queryObj.is_available = query.is_available;
    }

    try {
      return await NursesSchema.find(queryObj)
        .limit(limit * 1)
        .skip((page - 1) * limit)
        .populate("user");   
    }
    catch(E) {
      this.logger.error('[NurseRepository] - get - An error occured while getting nurses');
      this.logger.error(JSON.stringify(E));
      throw E;
    }
  }

  async createDiagnosisEntry(data) {
    if(!data) throw new Errors.BadRequestError('data is required');
    try {
      return await DiagnosisModel.create(data).then((res) => {
        console.log("patient's diagnostics created successfilly ", res)
        return res;
      })
    }
    catch(E) {
      this.logger.error('[AuthRepository] - createUserRoleData - An error occured while creating user role data');
      this.logger.error(JSON.stringify(E));
      throw E;
    }
  }
}

module.exports = NurseRepository;