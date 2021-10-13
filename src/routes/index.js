const auth = require('./auth');
const patient = require('./patient');
const nurse = require('./nurse');

//serve all available routes
module.exports = (app) => {
  auth(app);
  patient(app);
  nurse(app);
}