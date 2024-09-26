import productSchema from "../../schemas/product.schema";
import mongoose from 'mongoose';

// Interface describe about product
export interface IProduct {
    name: string;
    description: string;
    category: string;
    price: number;
    stock: number;
    product_image: string;
    isAvailability: boolean;
    aggregatRating: number;
    createAt?: Date;
    updateAt?: Date;
    isDelete?: boolean;
    deleteAt?: Date;
}

// Create productModel
const ProductModel = mongoose.model<IProduct>("product", productSchema);
export default ProductModel