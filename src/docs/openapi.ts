export const openApiDocument = {
  openapi: '3.0.3',
  info: {
    title: 'Girlhaf API',
    version: '0.1.0',
    description: 'Shared API for customer and admin applications.',
  },
  servers: [{ url: '/api/v1' }],
  paths: {
    '/health': {
      get: {
        summary: 'Service health check',
        responses: {
          200: {
            description: 'Service is healthy',
          },
        },
      },
    },
  },
};
