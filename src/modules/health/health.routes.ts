import { Router, type Router as ExpressRouter } from 'express';

import { successResponse } from '../../common/responses/api-response.js';

export const healthRouter: ExpressRouter = Router();

healthRouter.get('/', (_request, response) => {
  response.json(
    successResponse({
      status: 'ok',
      service: 'girlhaf-be',
      timestamp: new Date().toISOString(),
    }),
  );
});
