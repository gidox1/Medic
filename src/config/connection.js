const mongoose = require("mongoose");
const logger = require('turbo-logger').createStream({});
const { MONGO_URI } = process.env;

exports.connect = async () => {
  await mongoose
    .connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      logger.log("Successfully connected to database");
    })
    .catch((error) => {
      logger.warn("database connection failed.");
      logger.error(JSON.stringify(error))
      process.exit(1);
    });
};
