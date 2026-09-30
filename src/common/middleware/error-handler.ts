import type { ErrorRequestHandler } from 'express';

import { env } from '../../config/env.js';
import { AppError } from '../errors/app-error.js';

export const errorHandler: ErrorRequestHandler = (error, _request, response, _next) => {
  const appError = error instanceof AppError ? error : undefined;
  const statusCode = appError?.statusCode ?? 500;
  const code = appError?.code ?? 'INTERNAL_SERVER_ERROR';
  const message = appError?.message ?? 'An unexpected error occurred';

  if (statusCode >= 500) {
    console.error(error);
  }

  response.status(statusCode).json({
    success: false,
    error: {
      code,
      message,
      ...(appError?.details !== undefined ? { details: appError.details } : {}),
      ...(env.NODE_ENV !== 'production' && !appError ? { stack: error instanceof Error ? error.stack : undefined } : {}),
    },
  });
};
