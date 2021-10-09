const express = require('express');
const cors = require('cors');
const routes = require('./routes');
const Constants = require('./config/constants');
const app = express();

//set up middlewares
app.use(cors());
const options = {
  origin: Constants.ALLOWED_ORIGINS
};
app.use(cors(options));
app.use(express.json());

// set up routes
routes(app);

//return generic message to catch unregistered routes
app.get('*', (req, res) => {
  res.send({
    message: 'Medic Up and Running', 
    status: 'success'
  });
});

module.exports = app;