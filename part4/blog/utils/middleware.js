const logger = require('./logger');
const morgan = require('morgan');

morgan.token('body', (request) => JSON.stringify(request.body));

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' });
};

const errorHandler = (error, request, response, next) => {
  logger.error(error.message);

  if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message });
  }
  next(error);
};

module.exports = {
  errorHandler,
  unknownEndpoint,
  logger: morgan(
    ':method :url :status :res[content-length] - :response-time :body'
  ),
};
