const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  first_name: {
    type: String,
    required: 'first name is required',
    maxLength: 20,
    match: [/^[a-zA-Z0-9-_.]+$/, 'Please enter a valid first name']
  },
  last_name: {
    type: String,
    required: 'last name is required',
    maxLength: 20,
    match: [/^[a-zA-Z0-9-_.]+$/, 'Please enter a valid last name']
  },
  email: {
    type: String,
    required: 'email is required',
    unique: true,
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
  },
  password: {
    required: 'password is required',
    type: String
  },
  role: {
    type: String,
    enum : ['patient','nurse'],
    default: 'patient',
    required: true
  },
}, {
  timestamps: true
});

//Unset fields
UserSchema.methods.toJSON = function() {
  var obj = this.toObject();
  delete obj.password;
  delete obj.__v;
  return obj;
 }


module.exports = mongoose.model("User", UserSchema);