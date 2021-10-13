'use strict';

module.exports = {
  port: process.env.PORT || 3400,
  auth_key: process.env.AUTH_KEY || 'secretKeyRef',
  tokenExpiry: '2h',
  test_database: {
    mongo_user: 'root',
    mongo_password: 'rootpassword',
    uri: process.env.TEST_DATABASE || 'mongodb+srv://ever:Ever2000@cluster0.ztp8w.mongodb.net/test'
  }
};