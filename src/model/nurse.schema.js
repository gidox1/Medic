const mongoose = require("mongoose");

const NurseSchema = new mongoose.Schema({
  user : [{
    type: mongoose.Schema.Types.ObjectId,
    ref:'User'
  }],
  phone_number: {
    type: String,
    required: 'phone number is required',
    unique: true,
    maxLength: 20,
  },
  country: {
    type: String,
    required: 'country is required',
    maxLength: 20,
    required: true
  },
  staff_id: {
    type: String,
    required: false,
    maxLength: 20,
  },
  is_available: {
    type: Boolean,
    default: false  
  },
  dob: Date
}, {
  timestamps: true
});

module.exports = mongoose.model("Nurse", NurseSchema);