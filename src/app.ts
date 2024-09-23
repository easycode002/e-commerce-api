import express from 'express'
import swaggerUi from 'swagger-ui-express'
import { RegisterRoutes } from './routes/v1/routes'
import fs from 'fs'
import path from 'path'
import multer from 'multer'
import { ImageController } from './controllers/image.controller'
// import { ImageController } from './controllers/image.controller'

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
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded request bodies
// console.log(`I LOVE U`)


// ========================
// Global API v1
// ========================
RegisterRoutes(app)


// Serve the uploads folder as static files
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));



// ========================
// API Documentations
// ========================
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))


// ================================================================================


// Set the upload path
const uploadPath = path.join(__dirname, '../uploads');
fs.mkdirSync(uploadPath, { recursive: true });

const storage = multer.diskStorage({
    destination: (_req, _file, cb) => {
        const uploadPath = path.join(__dirname, '../uploads');
        cb(null, uploadPath);  // Save to the uploads directory
    },
    filename: (_req, file, cb) => {
        const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1E9)}`;
        const extension = path.extname(file.originalname);  // Get the file extension
        const filename = `${file.fieldname}-${uniqueSuffix}${extension}`;
        console.log('Generated filename:', filename);  // Log the generated filename
        cb(null, filename);  // Set the filename in the callback
    }
});

const upload = multer({ storage });


// Example route for handling file uploads
app.post('/v1/images/upload', upload.single('file'), async (req, res) => {
    try {
        const file = req.file;
        if (!file) {
            return res.status(400).send('No file uploaded');
        }

        // Pass the file to your controller to handle
        const controller = new ImageController();
        const image = await controller.uploadImage(file);

        // Construct the URL for the file
        const fileUrl = `${req.protocol}://${req.get('host')}/uploads/${file.filename}`;
        res.status(201).json({
            message: 'File uploaded successfully',
            fileUrl: fileUrl,
            image: image
        });
    } catch (error) {
        console.error('Error in route handler:', error);
        res.status(500).send({ error: 'Error uploading image' });
    }
});



// Serve the uploads folder as static files
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

export default app;