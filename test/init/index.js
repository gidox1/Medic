const mongoose = require("mongoose");
const config = require('../../src/config');

module.exports = {
  ensureConnection() {
    return new Promise((resolve) => {
      if (mongoose.connection.db) {
        return resolve(mongoose.connection.db)
      }
      mongoose.connection.on('connected', () =>
        resolve(mongoose.connection.db)
      )
    })
  },

  cleanDatabase() {
    return mongoose.connection.db.dropDatabase()
  },

  connect: async () => {
    mongoose.connect(config.test_database.uri,{
      useNewUrlParser: true
    })
    .catch(err => {
      console.log(err)
    })
  },

  closeConnection: async () => {
    await mongoose.disconnect();
  }
}