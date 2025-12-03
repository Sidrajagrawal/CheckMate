const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
require('dotenv').config();

const PORT = process.env.PORT;

const options = {
  definition: {
    openapi: '3.1.0',
    info: {
      title: 'Auth API Documentation',
      version: '1.0.0',
      description: 'API docs for backend service',
    },
    servers: [
      {
        url: `http://localhost:${PORT}`,
        description: 'Local server',
      },
    //   {
    //     url: 'https://api.yourdomain.com',
    //     description: 'Production server',
    //   },
    ],
  },
  apis: ['./routes/*.js'], 
};

const swaggerSpec = swaggerJsdoc(options);

function swaggerDocs(app) {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  console.log(`Swagger Docs available at http://localhost:${PORT}/api-docs`);
}

module.exports = swaggerDocs;