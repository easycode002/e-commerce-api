import { S3Client } from "@aws-sdk/client-s3";
import configs from "../config";
import multerS3 from "multer-s3";
import path from "path";

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
    metadata: (req, file, cb) => {
        cb(null, { fieldname: file.fieldname })
    },
    key: (req, file, cb) => {
        const fileName = Date.now() + '-' + file.fieldname + "-" + file.originalname;
        cb(null, fileName)
    }
})

function sanitizeFile(file,cb){
    const fileExts = ['.png', '.jpg', '.jpeg', '.gif'];
    const isAllowedExt = fileExts.includes(path.extname(file.originalname.toLowerCase()))
    const isAllowedMimeType = file.mimetype.startsWith('image/');

    if(isAllowedExt && isAllowedMimeType)
}

// https://chatgpt.com/share/66f4fe44-2df4-8004-9cc3-27c506704f28