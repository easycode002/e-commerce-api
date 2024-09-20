// types/image.ts
export interface Image {
    _id?: string;
    filename: string;
    contentType: string;
    size: number;
    uploadDate: Date;
    remoteUrl: string;
  }
  
  // repositories/imageRepository.ts
  import { MongoClient, GridFSBucket, ObjectId } from 'mongodb';
  import config  from '../../config';
  import  Image  from '../../controllers/types/image.type';
  
  export class ImageRepository {
    private client: MongoClient;
    private bucket: GridFSBucket;
  
    constructor() {
      this.client = new MongoClient(config.mongodb.uri);
    }
  
    async connect(): Promise<void> {
      await this.client.connect();
      this.bucket = new GridFSBucket(this.client.db());
    }
  
    async disconnect(): Promise<void> {
      await this.client.close();
    }
  
    async uploadImage(filename: string, buffer: Buffer, remoteUrl: string): Promise<string> {
      const uploadStream = this.bucket.openUploadStream(filename, {
        metadata: { remoteUrl },
      });
  
      return new Promise((resolve, reject) => {
        uploadStream.end(buffer, (error) => {
          if (error) {
            reject(error);
          } else {
            resolve(uploadStream.id.toString());
          }
        });
      });
    }
  
    async getImage(id: string): Promise<Image | null> {
      const file = await this.bucket.find({ _id: new ObjectId(id) }).next();
      if (!file) return null;
  
      return {
        _id: file._id.toString(),
        filename: file.filename,
        contentType: file.contentType,
        size: file.length,
        uploadDate: file.uploadDate,
        remoteUrl: file.metadata?.remoteUrl || '',
      };
    }
  
    async deleteImage(id: string): Promise<boolean> {
      try {
        await this.bucket.delete(new ObjectId(id));
        return true;
      } catch (error) {
        console.error(`Error deleting image: ${error}`);
        return false;
      }
    }
  }
  