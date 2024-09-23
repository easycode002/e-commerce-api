import ImageModel, { IImage } from "../../schemas/image.schema";

export class ImageRepository {
  async saveImage(imageData: Partial<IImage>): Promise<IImage> {
      const image = new ImageModel(imageData);
      return await image.save();
  }
}