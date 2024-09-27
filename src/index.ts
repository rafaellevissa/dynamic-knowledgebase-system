import "reflect-metadata";

import express from "express";
import { application } from "./common/config/constants";
import router from "./router";
import database from "./common/config/database";
import { exceptionsHandler } from "./common/middlewares";
import swaggerJsDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

async function main() {
  try {
    await database.initialize();

    const app = express();

    const swaggerOptions = {
      swaggerDefinition: {
        openapi: '3.0.0',
        info: {
          title: 'User API',
          version: '1.0.0',
          description: 'User API Documentation',
        },
        servers: [
          {
            url: application.baseUrl,
          },
        ],
        components: {
          securitySchemes: {
            BearerAuth: {
              type: 'http',
              scheme: 'bearer',
              bearerFormat: 'JWT',
            },
          },
        },
        security: [
          {
            BearerAuth: [],
          },
        ],
      },
      apis: ['./src/**/*.ts'],
    };

    app.use(express.json());
    app.use(router);
    app.use(exceptionsHandler);
    const swaggerDocs = swaggerJsDoc(swaggerOptions);
    app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

    app.listen(application.port, () =>
      console.log(`The server is running on port ${application.port}`)
    );
  } catch (e) {
    console.error((e as Error).message);
  }
}

main();

