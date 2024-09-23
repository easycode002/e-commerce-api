import { Controller, Post, Route, Tags, UploadedFile } from "tsoa";
import { IImage } from "../schemas/image.schema";
import { ImageService } from "../services/image.service";

// Set up storage for uploaded files@Tags("Image")
@Tags("Image")
@Route("v1/images")
export class ImageController extends Controller {
    private imageService: ImageService;

    constructor() {
        super();
        this.imageService = new ImageService();
    }

    @Post('upload')
    public async uploadImage(@UploadedFile() file: Express.Multer.File): Promise<IImage> {
        try {
            console.log('Controller: Received file:', file);
            if (!file) {
                throw new Error('No file received in controller');
            }
            const result = await this.imageService.uploadImage(file);
            console.log('Controller: Upload result:', result);
            return result;
        } catch (error) {
            console.error('Error in controller uploadImage:', error);
            throw error;
        }
    }
}
export default new ImageController();
