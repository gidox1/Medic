const di = require('../config/di');
const NurseController = di.get('nurseController');
const tokenValidator = require('../libs/middlewares/verifyToken');
const { diagnosisValidator } = require('../validations/nurse.validation');

module.exports = (app) => {
  app.get(
    '/nurses', 
    tokenValidator, 
    (req, res, next) =>  NurseController.getNurses(req, res)
  ); 
  
  app.post(
    '/nurses/diagnosis/:patient_id', 
    tokenValidator, 
    diagnosisValidator, 
    (req, res, next) =>  NurseController.createDiagnosis(req, res)
  );
}