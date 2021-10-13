const mongoose = require("mongoose");

const DiagnosisSchema = new mongoose.Schema({
  patient : [{
    type: mongoose.Schema.Types.ObjectId,
    ref:'Patient'
  }],
  subjective_component: {
    type: String,
    required: 'subjective_component is required',
  },
  objective_component: {
    type: String,
    required: 'objective_component is required',
  },
  assesment: {
    type: String,
    required: 'assesment is required',
  },
  plan: {
    type: String,
    required: 'plan is required',
  },
}, {
  timestamps: true
});

module.exports = mongoose.model("DiagnosisSchema", DiagnosisSchema);