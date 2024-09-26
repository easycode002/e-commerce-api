import express from 'express'
import swaggerUi from 'swagger-ui-express'
import { RegisterRoutes } from './routes/v1/routes'
import fs from 'fs'
import path from 'path'
import uploadImage from './middlewares/upload-image-s3.middleware'

// Dynamically load swagger.json from ./src/docs/swagger.json
const swaggerDocument = JSON.parse(fs.readFileSync(path.join(__dirname, './docs/swagger.json'), 'utf8'))

// ========================
// Initialize App Express
// ========================
const app = express();

// ========================
// Global Middleware
// ========================
app.use(express.json()) // Help to get the join from request body

// ========================
// Global API v1
// ========================
RegisterRoutes(app)

// ========================
// API Documentations
// ========================
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))

import { Router } from "express";
import ProductController  from './controllers/product.controller';
const router = Router();
router.post("/", uploadImage.single("image"), ProductController.createProduct);

export default app;