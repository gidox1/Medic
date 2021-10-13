//load env and connect to database
require("dotenv").config();
require("./src/config/connection").connect();

//set up server config
const app = require('./src');
const PORT = process.env.PORT || 3400;
const http = require('http');
const logger = require('turbo-logger').createStream({});

//start sever
const server = http.createServer(app);
server.listen(PORT, () => {
  logger.log('server started on port ', PORT)
})