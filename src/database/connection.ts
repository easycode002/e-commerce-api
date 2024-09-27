// src/database/connector.ts
import { MongoClient, Db } from 'mongodb';
import configs from '../config';

class MongoDBConnector {
  private static instance: MongoDBConnector;
  private client: MongoClient;
  private db: Db;

  private constructor(private env: string) {
    this.client = new MongoClient(configs.mongodbUrl);
    this.db = this.client.db(configs.dbName);
  }

  public static getInstance(env: string): MongoDBConnector {
    if (!MongoDBConnector.instance) {
      MongoDBConnector.instance = new MongoDBConnector(env);
    }
    return MongoDBConnector.instance;
  }

  public async connect(options: { url: string }): Promise<void> {
    await this.client.connect();
    console.log('Connected to MongoDB');
  }

  public async disconnect(): Promise<void> {
    await this.client.close();
    console.log('Disconnected from MongoDB');
  }

  public getDB(): Db {
    return this.db;
  }
}

export default MongoDBConnector;


// import configs from "./../config";
// import mongoose from "mongoose";

// async function connectToMongoDB() {
//     try {
//         await mongoose.connect(configs.mongodbUrl);
//         console.log(`MongoDB is connected!`)
//     } catch (error) {
//         console.error(`connectToMongoDB() method error:`, error)
//         throw error
//     }
// }
// export default connectToMongoDB

