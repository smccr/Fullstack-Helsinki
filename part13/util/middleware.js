const { SECRET } = require('../util/config');
const jwt = require('jsonwebtoken');

const errorHandler = (error, request, response, next) => {

  if (error.name === 'SequelizeValidationError') {
    return response.status(400).send({ error: error.errors[0].message })
  } 
  next(error)
};

const tokenExtractor = (req, res, next) => {
  const authorization = req.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    try {
      req.decodedToken = jwt.verify(authorization.substring(7), SECRET)
    } catch (error) {
      return res.status(401).json({ error: 'token invalid' })
    }
  } else {
    return res.status(401).json({ error: 'token missing' })
  }

  next()
};

module.exports = { errorHandler, tokenExtractor };