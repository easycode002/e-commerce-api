import { Controller, Post, Get, Delete, Route, Path, UploadedFile } from 'tsoa';
import { ImageService } from '../services/imageService';
import { Image } from '../types/image';

@Route('images')
export class ImageController extends Controller {
  private imageService: ImageService;

  constructor() {
    super();
    this.imageService = new ImageService();
  }

  @Post('upload')
  public async uploadImage(
    @UploadedFile() file: Express.Multer.File
  ): Promise<{ id: string }> {
    const imageId = await this.imageService.uploadImage(file.originalname, file.buffer);
    return { id: imageId };
  }

  @Get('{id}')
  public async getImage(@Path() id: string): Promise<Image | null> {
    return this.imageService.getImage(id);
  }

  @Delete('{id}')
  public async deleteImage(@Path() id: string): Promise<{ success: boolean }> {
    const result = await this.imageService.deleteImage(id);
    return { success: result };
  }
}