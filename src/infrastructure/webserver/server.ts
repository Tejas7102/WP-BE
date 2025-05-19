import express from 'express';
import cors from 'cors';
import http from 'http';
import logger from '../logger.js';
import config from '../config/index.js';
import Database from '../config/dbConnection.js';
import Loaders from '../../interface/loders/index.js';
import { initSocket } from './socket.js';

const app = express();

const options: cors.CorsOptions = {
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
};

app.use(cors(options));

const startServer = () => {
  process.on('SIGTERM', () => {
    logger.warn('===== Server closed =====');
    process.exit(0);
  });

  process.on('unhandledRejection', (reason: string, p) => {
    logger.info('Unhandled Rejection at: Promise', p, 'reason:', reason);
  });

  const httpServer = http.createServer(app);

  initSocket(httpServer);

  httpServer.listen(config.port, async () => {
    logger.info(`
      ################################################
      🛡️  Server listening on port: ${config.port} 🛡️
      ################################################
      Database Host: ${config.database.host}
    `);

    await Database.init();
    await Loaders.run({ app });
  });

  return httpServer;
};

export { app, startServer };
