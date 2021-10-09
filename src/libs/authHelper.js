const config = require('../config');
const BCRYPT_SALT_ROUNDS = config.salt_rounds || 12;
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const Errors = require('../libs/error');

exports.getToken = async (data) => {
  return jwt.sign(
    data,
    config.auth_key,
    {
      expiresIn: config.tokenExpiry,
    }
  );
}

exports.hashPassword = async (password) => {
  return await bcrypt.hash(password, BCRYPT_SALT_ROUNDS)
}

exports.comparePassword = async (password, hash) => {
  try {
    const check = await bcrypt.compare(password, hash);
    if(!check) {
      throw new Errors.UnauthorizedError('invalid email or password');
    }
  }
  catch(E) {
    throw E;
  }

}

exports.VerifyToken = async (access_token) => {
  if (!access_token) return false;
  try {
    const decoded = jwt.verify(access_token, config.auth_key);
    return decoded;
  } catch (err) {
    return false;
  }
}
