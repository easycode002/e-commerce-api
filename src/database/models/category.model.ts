import categorySchema from "../../schemas/category.schema";
import mongoose from "mongoose";

export interface ICategory {
    name: string;
    description: string;
    isDelete?: boolean;
    deleteAt?: Date,
    createAt?: Date,
    updateAt?: Date
}

// Create category model
const CategoryModel = mongoose.model<ICategory>("Category", categorySchema);
export default CategoryModel