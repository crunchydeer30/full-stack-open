require('express-async-errors');
const blogsRouter = require('./contollers/blogs');
const config = require('./utils/config');
const cors = require('cors');
const express = require('express');
const logger = require('./utils/logger');
const middleware = require('./utils/middleware');
const mongoose = require('mongoose');

const app = express();

logger.info('connecting to MongoDB');

mongoose
  .connect(config.MONGODB_URI)
  .then(() => {
    logger.info('connected to MongoDB');
  })
  .catch((error) => {
    logger.error('error connecting to MongoDB', error.message);
  });

app.use(cors());
app.use(express.json());
app.use(middleware.logger);

app.use('/api/blogs', blogsRouter);

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;