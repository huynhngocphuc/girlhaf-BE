import cors from 'cors';
import express, { type Application } from 'express';
import helmet from 'helmet';
import pinoHttp from 'pino-http';
import swaggerUi from 'swagger-ui-express';

import { errorHandler } from './common/middleware/error-handler.js';
import { notFoundHandler } from './common/middleware/not-found.js';
import { env } from './config/env.js';
import { openApiDocument } from './docs/openapi.js';
import { healthRouter } from './modules/health/health.routes.js';
import { modulesRouter } from './modules/index.js';

export function createApp(): Application {
  const app = express();

  app.disable('x-powered-by');
  app.use(helmet());
  app.use(cors({ origin: env.CORS_ORIGIN === '*' ? true : env.CORS_ORIGIN.split(',') }));
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(pinoHttp());

  app.use('/api/v1/health', healthRouter);
  app.use('/api/v1', modulesRouter);
  app.use('/api/v1/docs', swaggerUi.serve, swaggerUi.setup(openApiDocument));

  app.use(notFoundHandler);
  app.use(errorHandler);

  return app;
}
