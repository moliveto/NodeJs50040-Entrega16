import express from 'express';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import displayRoutes from "express-routemap";
import swaggerJsDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

import usersRouter from './routes/users.router.js';
import productsRouter from './routes/products.router.js';

const app = express();
const PORT = process.env.PORT || 3000;
const connection = mongoose.connect(`mongodb://localhost:27017/entrega16`, { useNewUrlParser: true, useUnifiedTopology: true });

app.use(express.json());
app.use(cookieParser());

const options = {
    definition: {
        openapi: "3.1.0",
        info: {
            title: "Express API with Swagger",
            version: "0.1.0",
            description:
                "This is a simple CRUD API application made with Express and documented with Swagger",
            license: {
                name: "MIT",
                url: "https://spdx.org/licenses/MIT.html",
            },
            contact: {
                name: "Marcelo",
                url: "https://marcelo.com",
                email: "info@email.com",
            },
        },
        servers: [
            {
                url: "http://localhost:3000",
            },
        ],
    },
    apis: ["./src/routes/*.js"],
};

const specs = swaggerJsDoc(options);
app.use(
    "/docs",
    swaggerUi.serve,
    swaggerUi.setup(specs, { explorer: true })
);

app.use('/api/users', usersRouter);
app.use('/api/products', productsRouter);

app.listen(PORT, () => {
    displayRoutes(app);
    console.log(`Listening on ${PORT}`);
});
