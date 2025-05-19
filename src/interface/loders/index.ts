import * as Express from 'express';

import expressLoader from './express.js';
import logger from '../../infrastructure/logger.js';

const Loaders = {
  run: ({ app }: { app: Express.Application }) => {
    logger.info('Running loaders...');
    expressLoader({ app });
  },
};

export default Loaders;
