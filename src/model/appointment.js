const mongoose = require("mongoose");

const AppointmentSchema = new mongoose.Schema({
  patient : [{
    type: mongoose.Schema.Types.ObjectId,
    ref:'Patient'
  }],
  nurse : [{
    type: mongoose.Schema.Types.ObjectId,
    ref:'Nurse'
  }],
  status: {
    type: String,
    enum : ['completed','scheduled','cancelled'],
    default: 'scheduled',
    required: true
  },
  meeting_url: {
    type: String,
    required: 'meeting url is required',
    unique: true,
  },
  type: {
    type: String,
    enum : ['instant','scheduled'],
    default: 'instant',
    required: true
  },
  scheduled_date: Date,
  scheduled_time: Date
}, {
  timestamps: true
});

module.exports = mongoose.model("AppointmentSchema", AppointmentSchema);