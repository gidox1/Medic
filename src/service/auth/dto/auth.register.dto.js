const _ = require('lodash');

class RegisterDTO {
  constructor(data) {
    this.data = data;
  }

  getEmail() {
    return this.data.email;
  }

  getPassword() {
    return this.data.password;
  }

  toJSON() {
    return Object.assign({},this.data);
  }

  setPassword(password) {
    this.data.password = password;
  }

  getUserRole() {
    return this.data.role;
  }

  buildUserData(hashed) {
    return {
      first_name: this.data.first_name,
      last_name: this.data.last_name,
      email: this.data.email,
      password: hashed,
      role: this.data.role,
      status: true
    }
  }

  buildPatientData() {
    return {
      phone_number: this.data.phone_number,
      country: this.data.country || null,
      dob: this.data.dob
    }
  }

  getUserRoleData() {
    if(this.data.role === 'patient') {
      return this.buildPatientData();
    }
    if(this.data.role === 'nurse') {
      return this.buildNurseData();
    }
    return null
  }

  buildNurseData() {
    return {
      phone_number: this.data.phone_number,
      country: this.data.country || null,
      dob: this.data.dob,
      staff_id: this.data.staff_id
    }
  }

  async buildClientResponse(token, data) {
    delete data.password;
    token = await token;
    return {
      ...data,
      token: token
    }
  }

  init(data) {
    const allowedKeys = [
      'first_name',
      'last_name',
      'email',
      'password',
      'staff_id',
      'phone_number',
      'country',
      'dob',
      'role'
    ];
    const authData = _.pick(data, allowedKeys);
    return new RegisterDTO(authData);
  }
}

module.exports = RegisterDTO;