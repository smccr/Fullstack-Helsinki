const errorHandler = (error, request, response, next) => {

  if (error.name === 'SequelizeValidationError') {
    return response.status(400).send({ error: error.errors[0].message })
  } 
  next(error)
};

module.exports = { errorHandler };