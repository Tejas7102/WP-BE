import BodyParser from 'body-parser';
import * as Express from 'express';
import compression from 'compression';
import logger, { assignUuid, setMorgan } from '../../infrastructure/logger.js';

const expressLoader = ({ app }: { app: Express.Application }): void => {
  logger.info('Loading express...');

  app.use(compression());

  app.use(BodyParser.json({ limit: '2MB' }));

  app.use(assignUuid);
  app.use(setMorgan);

  app.get('/status', (_req, res) => {
    res.status(200).end();
  });

  app.head('/status', (_req, res) => {
    res.status(200).end();
  });

  app.use(
    (err: Error, _req: Express.Request, res: Express.Response, _next: Express.NextFunction) => {
      if (err.stack !== undefined) {
        logger.debug(err.stack);
      }
      logger.debug(err);
      res.status(500);
      res.json(err.message);
    }
  );
};

export default expressLoader;
