import { S3Client } from "@aws-sdk/client-s3";
import configs from "../config";
import multerS3 from "multer-s3";
import path from "path";
import multer, { FileFilterCallback } from "multer";

const s3 = new S3Client({
    region: configs.region,
    credentials: {
        accessKeyId: configs.accessKeyId,
        secretAccessKey: configs.secretAccessKey
    }
})

const s3Storage = multerS3({
    s3,
    bucket: configs.bucket,
    acl: 'public-read', // Set ACL for the uploaded files
    metadata: (_req, file, cb) => {
        cb(null, { fieldname: file.fieldname })
    },
    key: (_req, file, cb) => {
        const fileName = Date.now() + '-' + file.fieldname + "-" + file.originalname;
        cb(null, fileName)
    }
})

function sanitizeFile(file: Express.Multer.File, cb: FileFilterCallback) {
    const fileExts = ['.png', '.jpg', '.jpeg', '.gif'];
    const isAllowedExt = fileExts.includes(path.extname(file.originalname.toLowerCase()))
    const isAllowedMimeType = file.mimetype.startsWith('image/');

    if (isAllowedExt && isAllowedMimeType) {
        return cb(null, true)// No error
    }
    cb(new Error(`Error: file type not allowed!`))
}

const uploadImage = multer({
    storage: s3Storage,
    fileFilter: (_req, file, callback) => {
        sanitizeFile(file, callback);
    },
    limits: {
        fileSize: 1024 * 1024 * 2, // Limit to 2MB
    }
})
export default uploadImage;
// https://chatgpt.com/share/66f4fe44-2df4-8004-9cc3-27c506704f28