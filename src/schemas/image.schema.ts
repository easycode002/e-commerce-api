import mongoose, { Schema } from "mongoose";

export interface IImage {
    filename: string;
    path: string; 
    mimetype: string;
}

const ImageSchema: Schema = new Schema({
    filename: { type: String, required: true },  // Original filename
    path: { type: String, required: true },  // Relative path or URL
    mimetype: { type: String, required: true },  // Mimetype
});
export default mongoose.model<IImage>("Image", ImageSchema);
