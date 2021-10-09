const auth = require('./auth');

//serve all available routes
module.exports = (app) => {
  auth(app);
}