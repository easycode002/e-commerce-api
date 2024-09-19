import { Schema } from "mongoose"

// Define product schema
const productSchema = new Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true },
    price: { type: Number, required: true, default: 0 },
    stock: { type: Number, required: true, default: 0 },
    product_image: { type: String },
    isAvailability: { type: Boolean, required: true },
    aggregatRating: { type: Number, required: true },
    isDelete: { type: Boolean, default: false },
    deleteAt: { type: Date, required: false, default: null },
    createAt: { type: Date, default: Date.now },
    updateAt: { type: Date, required: false, default: null }
})

// Export productSchema
export default productSchema;