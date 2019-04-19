import config from './utils/config';
import Mongoose from 'mongoose';
import server from './app';
import { connectToDatabase } from './utils/db';
import logger from './utils/logger';

// Get the port to listen on
const port = process.env.PORT || 2300;

const connectionUrl: string = config.env === 'test'
  ? config.db.test : config.db.dev;

Mongoose.connection
  .on('connecting', () => logger.info('Connecting to database'))
  .on('connected', () => {
    logger.info(`Database connected!! 😎`);
  })
  .on('disconnected', () => {
    logger.warn('Database disconnected, server will close shortly');
    server.close();
  })
  .on('error', (error: Error) => {
    logger.error(`Database error ${error.message}`);
  });

server
  .on('error', (error: Error) => {
    logger.error(`${error.message}: ${error.stack}`);
  });

process.on('SIGINT', () => {
  logger.warn('Shutting down server...');
  Mongoose.connection.close(); // properly close db connection
  logger.info(`Server successfully shutdown at ${Date.now()}`);
  process.exit(1);
});

connectToDatabase(connectionUrl);