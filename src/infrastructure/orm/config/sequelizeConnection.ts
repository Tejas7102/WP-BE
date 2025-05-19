import { Sequelize } from 'sequelize';
import logger from '../../logger.js';
import config from '../../config/index.js';
const retry = {
  max: Infinity,
  report: (msg: string | object) => {
    logger.silly('Unable to connect to database; retrying.');
    if (msg.toString().includes('Trying unknown #1')) {
      logger.silly(msg);
    } else {
      logger.debug(msg);
    }
  },
  match: [
    /ConnectionError/,
    /SequelizeConnectionError/,
    /SequelizeConnectionRefusedError/,
    /SequelizeHostNotFoundError/,
    /SequelizeHostNotReachableError/,
    /SequelizeInvalidConnectionError/,
    /SequelizeConnectionTimedOutError/,
    /SequelizeConnectionAcquireTimeoutError/,
    /Connection terminated unexpectedly/,
  ],
};

const dialectOptions = {
  charset: 'utf8mb4',
  enableKeepAlive: true,
} as Record<string, string | boolean>;

export const sequelize = new Sequelize(
  config.database.name,
  config.database.user,
  config.database.pwd,
  {
    host: config.database.host,
    port: config.database.port,
    dialect: config.database.dialect,
    retry,
    logging: (msg) => {
      if (msg.includes('ERROR')) {
        return logger.error(msg);
      }
      return logger.info(msg);
    },
    dialectOptions,
  }
);
