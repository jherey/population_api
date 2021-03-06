import config from './utils/config';
import logger from './utils/logger';
import express from 'express';
import bodyParser from 'body-parser';
import requestLogger from 'morgan';
import cors from 'cors';
import expressValidator from 'express-validator';
import routes from './routers';
import { connectToDatabase } from './utils/db';

// Set up the express app
const app: express.Application = express();
app.use(cors());

// Log requests to the console.
app.use(requestLogger('dev'));

// Parse incoming requests data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Validator to check requests
app.use(expressValidator());

// Routes
app.use('/api', routes);

// Setup a default catch-all route
app.use('*', (req, res, next) => {
  res.status(404).json({
    message: 'Well, will you help build this route? 🤷🏼‍♂️',
  });
  next();
});

const connectionUrl: string = config.env === 'test'
  ? config.db.test : config.db.dev;

// connect to database
connectToDatabase(connectionUrl);

const server = app.listen(config.port, () => {
  logger.info(`Server listening on port ${config.port} 🔥`);
});

export default server;
