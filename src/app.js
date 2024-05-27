import express from 'express';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import displayRoutes from "express-routemap";
import swaggerJsDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

import usersRouter from './routes/users.router.js';
import productsRouter from './routes/products.router.js';
import { PORT, PERSISTENCE, MONGO_URI } from "./config/config.js";
import { swaggerOpts } from "./config/swagger.config.js";

const connection = mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const specs = swaggerJsDoc(swaggerOpts);
app.use(
    "/docs",
    swaggerUi.serve,
    swaggerUi.setup(specs, { explorer: true })
);

app.use('/api/users', usersRouter);
app.use('/api/products', productsRouter);

const httpServer = app.listen(PORT, () => {
    displayRoutes(app);
    console.log(`Listening on ${PORT}, enviroment: ${process.env.NODE_ENV} persistence: ${PERSISTENCE}`);
});
