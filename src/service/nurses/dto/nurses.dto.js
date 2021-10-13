const _ = require('lodash');

class DiagnosisDTO {
  constructor(data) {
    this.data = data;
  }

  toJSON() {
    return Object.assign({},this.data);
  }

  getPatientID() {
    return this.data.patient_id || null;
  }

  buildDiagnosisData() {
    return {
      patient: this.getPatientID(),
      subjective_component: this.data.subjective_component,
      objective_component: this.data.objective_component || null,
      assesment: this.data.assesment,
      plan: this.data.plan
    }
  }

  init(data) {
    const allowedKeys = [
      'subjective_component',
      'objective_component',
      'assesment',
      'plan',
      'patient_id'
    ];
    const authData = _.pick(data, allowedKeys);
    return new DiagnosisDTO(authData);
  }
}

module.exports = DiagnosisDTO;