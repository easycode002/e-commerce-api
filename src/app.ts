import express from 'express'
import swaggerUi from 'swagger-ui-express'
import { RegisterRoutes } from './routes/v1/routes'
import fs from 'fs'
import path from 'path'
import multer from 'multer'

// @ts-ignore
import Client from 'scp2';
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
        const uploadPath = path.join(__dirname, '../temp-uploads');  // Temporary local storage
        if (!fs.existsSync(uploadPath)) {
            fs.mkdirSync(uploadPath, { recursive: true });
        }
        cb(null, uploadPath);  // Save the file in 'temp-uploads' directory temporarily
    },
    filename: (_req, file, cb) => {
        const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1E9)}`;
        const extension = path.extname(file.originalname);  // Get the file extension
        const filename = `${file.fieldname}-${uniqueSuffix}${extension}`;
        cb(null, filename);  // Save the file with a unique name
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

        // Define your remote server details
        const remoteServerConfig = {
            host: 'your-server-ip',  // Remote server IP
            username: 'your-username',  // Remote server username
            password: 'your-password',  // Remote server password
            path: '/path/to/remote/uploads/'  // Directory on the remote server
        };

        // Full path to the file on your local machine (temp-uploads)
        const localFilePath = path.join(__dirname, '../temp-uploads', file.filename);

        // Transfer the file to the remote server
        Client.scp(localFilePath, remoteServerConfig, async (err:any) => {
            if (err) {
                console.error('Error transferring file:', err);
                return res.status(500).send({ error: 'Error uploading image to remote server' });
            }

            // Construct the URL for the file stored on the remote server
            const fileUrl = `http://your-server-ip/uploads/${file.filename}`;

            // Now save the URL and metadata in MongoDB
            const controller = new ImageController();
            const image = await controller.uploadImage({
                filename: file.filename,         // Generated filename from Multer
                originalname: file.originalname, // Original name of the file
                mimetype: file.mimetype,         // MIME type of the file
                url: fileUrl                     // URL of the file on the remote server
            });

            // Respond with success and the URL
            res.status(201).json({
                message: 'File uploaded and transferred to remote server successfully',
                fileUrl: fileUrl,
                image: image
            });

            // Optionally, delete the file from local storage after transfer
            fs.unlinkSync(localFilePath);
        });
    } catch (error) {
        console.error('Error in route handler:', error);
        res.status(500).send({ error: 'Error uploading image' });
    }
});


// Serve the uploads folder as static files
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

export default app;