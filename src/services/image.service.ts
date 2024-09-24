import { IImage } from "../schemas/image.schema";
import { ImageRepository } from "../database/repositories/image.repository";


export class ImageService {
    private imageRepository: ImageRepository;

    constructor() {
        this.imageRepository = new ImageRepository();
    }

    async uploadImage(fileData: IImage): Promise<IImage> {
        // Validate that the required fields are present
        if (!fileData.filename || !fileData.url || !fileData.mimetype) {
            throw new Error("Missing required fields for image upload");
        }

        // Store the metadata in MongoDB
        const imageData: Partial<IImage> = {
            filename: fileData.filename,      // Generated filename
            path: fileData.url,               // Store the URL pointing to the remote server
            mimetype: fileData.mimetype,      // Store the MIME type
            originalname: fileData.originalname  // Original name of the file
        };

        // Save the image metadata to the database
        return this.imageRepository.saveImage(imageData);
    }
}


export default new ImageService();
