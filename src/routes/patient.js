const di = require('../config/di');
const PatientController = di.get('patientController');
const tokenValidator = require('../libs/middlewares/verifyToken');
const { talkToNurseValidation } = require('../validations/patient.validation')

module.exports = (app) => {
  app.get('/patients', tokenValidator, (req, res, next) =>  PatientController.getPatients(req, res));
  app.get(
    '/patients/history', 
    tokenValidator,
    (req, res, next) =>  PatientController.getPatientMedicalHistory(req, res)
  );

  app.post(
    '/patients/:id/nurse/:nurse_id', 
    tokenValidator,
    talkToNurseValidation,
    (req, res, next) =>  PatientController.talkToNurse(req, res)
  );

  app.get(
    '/patients/appointments', 
    tokenValidator,
    (req, res, next) =>  PatientController.getPatientAppointment(req, res)
  );
}