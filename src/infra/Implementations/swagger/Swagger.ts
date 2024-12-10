import swaggerUi from "swagger-ui-express";
import { Application } from "express";
import swaggerAutogen from "swagger-autogen";
// @ts-ignore
import swaggerDocument from "./swagger-output.json";

const outputFile = "./swagger-output.json"; // Arquivo gerado
const endpointsFiles = ["./src/server.ts"]; // Arquivo principal que importa as rotas

const doc = {
    info: {
        title: "API Documentation",
        description: "Documentação gerada automaticamente.",
        version: "1.0.0",
    },
    host: "localhost:3000",
    schemes: ["http"],
    components: {
        securitySchemes: {
            BearerAuth: {
                type: "http",
                scheme: "bearer",
                bearerFormat: "JWT", // Indica que o token é um JWT
            },
        },
    },
    security: [
        {
            BearerAuth: [] // Aplica o esquema de segurança globalmente
        }
    ],
    requestBodies: {
        AnyRequestBody: {
            required: true,
            content: {
                'application/json': {
                    schema: {
                        type: 'object',
                        additionalProperties: true, // Permite qualquer propriedade adicional
                    },
                },
            },
        },
    }
};

swaggerAutogen()(outputFile, endpointsFiles, doc);


export const setupSwagger = (app: Application): void => {
    app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
    console.log("Swagger docs available at http://localhost:3000/api-docs");
};