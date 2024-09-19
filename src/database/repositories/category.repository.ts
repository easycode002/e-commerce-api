import { CategoryCreateRequest, CategoryUpdateRequest } from "@/controllers/types/category-request.type";
import CategoryModel, { ICategory } from "@/database/models/category.model";

export class CategoryRepository {
    // Create category
    async createCategory(categoryCreateRequest: CategoryCreateRequest): Promise<ICategory> {
        try {
            const category = await CategoryModel.create(categoryCreateRequest)
            return category
        } catch (error) {
            throw error
        }
    }

    // Get all category
    async getAllCategory() {
        try {
            const category = await CategoryModel.find()
            return category
        } catch (error) {
            throw error
        }
    }

    // Update category
    async updateCategory(id: string, categoryUpdateRequest: CategoryUpdateRequest): Promise<ICategory> {
        try {
            const category = await CategoryModel.findByIdAndUpdate(id, { ...categoryUpdateRequest, updateAt: new Date() }, { new: true });
            if (!category) {
                throw new Error(`Category ID:${id} not found`)
            }
            return category
        } catch (error) {
            throw error
        }
    }

    // Delete category(HardDelete)
    async deleteCategory(id: string): Promise<ICategory> {
        try {
            const category = await CategoryModel.findByIdAndDelete(id)
            if (!category) {
                throw new Error(`Category with ID:${id} not found`)
            }
            return category
        } catch (error) {
            throw error
        }
    }
}

export default new CategoryRepository()