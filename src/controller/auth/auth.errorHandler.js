const httpStatus = require('http-status');
const errors = require('../../libs/error');

const Handler = (error, res) => {
  console.log("Error handler log: ", error)
  if (error instanceof errors.BadRequestError) {
    return res.status(httpStatus.BAD_REQUEST).send({ code: error.name, message: error.message });
  } 
  else if(error instanceof errors.UnauthorizedError) {
    return res.status(httpStatus.UNAUTHORIZED).send({ code: error.name, message: error.message });
  }
  else if(error instanceof errors.NotFoundError) {
    return res.status(httpStatus.BAD_REQUEST).send({ code: error.name, message: error.message });
  }
  else if(error instanceof errors.DataAlreadyExists) {
    return res.status(httpStatus.BAD_REQUEST).send({ code: error.name, message: error.message });
  }else {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).send({ code: error.name, message: 'Internal Server Error' });
  }
}

module.exports = Handler;