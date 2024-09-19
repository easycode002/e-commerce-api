import { Schema } from "mongoose";

// Define schema for category
const categorySchema = new Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    isDelete: { type: Boolean, default: false },
    deleteAt: { type: Date, default: null },
    createAt: { type: Date, required: true, default: Date.now },
    updateAt: { type: Date, default: null }
})

export default categorySchema