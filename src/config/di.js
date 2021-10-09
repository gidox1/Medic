'use strict';

const serviceLocator = require('../libs/service-locator');
const turboLogger = require('turbo-logger').createStream({});

const AuthService = require('../service/auth');
const AuthController = require('../controller/auth');

serviceLocator.register('logger', () => {
    return turboLogger;
});

serviceLocator.register('authService', () => {
  const logger = serviceLocator.get('logger');
  return new AuthService(logger);
})

serviceLocator.register('authController', () => {
  const logger = serviceLocator.get('logger');
  const service = serviceLocator.get('authService');
  return new AuthController(logger, service);
})


module.exports = serviceLocator;