import mongoose, { Schema } from "mongoose";

export interface IImage {
    filename: string;        // The generated filename
    originalname: string;    // The original name of the file
    mimetype: string;        // MIME type of the file
    url: string;             // The URL of the file on the remote server
}

const ImageSchema: Schema = new Schema({
    filename: { type: String, required: true },
    path: { type: String, required: true },  // Store the URL of the file
    mimetype: { type: String, required: true },
    originalname: { type: String },  // Optional field to store original filename
    url: { type: String }            // Optional field to store the URL
});

export default mongoose.model<IImage>("Image", ImageSchema);
