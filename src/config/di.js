'use strict';

const serviceLocator = require('../libs/service-locator');
const turboLogger = require('turbo-logger').createStream({});

const AuthService = require('../service/auth');
const AuthController = require('../controller/auth');

const PatientController = require('../controller/patient');
const PatientService = require('../service/patients');

const NurseController = require('../controller/nurses');
const NurseService = require('../service/nurses');

serviceLocator.register('logger', () => {
    return turboLogger;
});

serviceLocator.register('authService', () => {
  const logger = serviceLocator.get('logger');
  return new AuthService(logger);
});

serviceLocator.register('authController', () => {
  const logger = serviceLocator.get('logger');
  const service = serviceLocator.get('authService');
  return new AuthController(logger, service);
});

serviceLocator.register('nurseService', () => {
  const logger = serviceLocator.get('logger');
  return new NurseService(logger);
});

serviceLocator.register('nurseController', () => {
  const logger = serviceLocator.get('logger');
  const service = serviceLocator.get('nurseService');
  return new NurseController(logger, service);
});

serviceLocator.register('patientService', () => {
  const logger = serviceLocator.get('logger');
  return new PatientService(logger);
});

serviceLocator.register('patientController', () => {
  const logger = serviceLocator.get('logger');
  const service = serviceLocator.get('patientService');
  return new PatientController(logger, service);
});

module.exports = serviceLocator;