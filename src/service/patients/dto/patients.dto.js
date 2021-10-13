const _ = require('lodash');
const moment = require('moment')

class PatientDTO {
  constructor(data) {
    this.data = data;
  }

  toJSON() {
    return Object.assign({},this.data);
  }

  buildAppointmentData(meetingUrl) {
    return {
      patient: this.data.id,
      nurse: this.data.nurse_id,
      status: 'scheduled',
      meeting_url: meetingUrl,
      type: this.data.type,
      scheduled_date: this.data.scheduled_date || moment().format('YYYY-MM-DD HH:mm:ss'),
      scheduled_time: this.data.scheduled_time || moment().format('YYYY-MM-DD HH:mm:ss')
    }
  }

  init(data) {
    const allowedKeys = [
      'id',
      'nurse_id',
      'type',
      'scheduled_date',
      'scheduled_time'
    ];
    const authData = _.pick(data, allowedKeys);
    return new PatientDTO(authData);
  }
}

module.exports = PatientDTO;