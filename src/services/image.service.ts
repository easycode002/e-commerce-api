// services/imageService.ts
import { ImageRepository } from '../repositories/imageRepository';
import { Image } from '../types/image';
import { Client } from 'ssh2';
import path from 'path';
import { config } from '../config';

export class ImageService {
  private imageRepository: ImageRepository;

  constructor() {
    this.imageRepository = new ImageRepository();
  }

  async uploadImage(filename: string, buffer: Buffer): Promise<string> {
    await this.imageRepository.connect();
    
    // Generate a unique filename to avoid conflicts
    const uniqueFilename = `${Date.now()}-${filename}`;
    
    // Upload URL to remote server
    const remoteUrl = await this.uploadUrlToRemoteServer(uniqueFilename);
    
    // Store image in MongoDB
    const imageId = await this.imageRepository.uploadImage(uniqueFilename, buffer, remoteUrl);
    
    await this.imageRepository.disconnect();
    return imageId;
  }

  async getImage(id: string): Promise<Image | null> {
    await this.imageRepository.connect();
    const image = await this.imageRepository.getImage(id);
    await this.imageRepository.disconnect();
    return image;
  }

  async deleteImage(id: string): Promise<boolean> {
    await this.imageRepository.connect();
    const result = await this.imageRepository.deleteImage(id);
    await this.imageRepository.disconnect();
    return result;
  }

  private async uploadUrlToRemoteServer(filename: string): Promise<string> {
    return new Promise((resolve, reject) => {
      const conn = new Client();
      conn.on('ready', () => {
        conn.sftp((err, sftp) => {
          if (err) {
            conn.end();
            return reject(err);
          }

          const remoteFilePath = path.join(config.remoteServer.path, `${filename}.txt`);
          const writeStream = sftp.createWriteStream(remoteFilePath);
          
          writeStream.on('close', () => {
            console.log(`URL for ${filename} stored successfully at ${remoteFilePath}`);
            conn.end();
            resolve(remoteFilePath);
          });

          writeStream.on('error', (error) => {
            console.error(`Error writing URL file: ${error}`);
            conn.end();
            reject(error);
          });

          // Write the filename as the content of the text file
          writeStream.end(filename);
        });
      }).connect({
        host: config.remoteServer.host,
        username: config.remoteServer.username,
        password: config.remoteServer.password,
      });
    });
  }
}