'use strict';

module.exports = {
  port: process.env.PORT || 3400,
  auth_key: process.env.AUTH_KEY || 'secretKeyRef',
  tokenExpiry: '2h'
};