import { CategoryCreateRequest, CategoryUpdateRequest } from "../controllers/types/category-request.type";
import { ICategory } from "../database/models/category.model";
import CategoryRepository from "../database/repositories/category.repository";

export class CategoryService {
    // Create new category
    async createCategory(categoryCreateRequest: CategoryCreateRequest): Promise<ICategory> {
        try {
            const category = await CategoryRepository.createCategory(categoryCreateRequest);
            return category
        } catch (error) {
            throw error
        }
    }

    // Get all category
    async getAllCategory() {
        try {
            const category = await CategoryRepository.getAllCategory();
            return category
        } catch (error) {
            throw error
        }
    }

    // Update category
    async updateCategory(id: string, categoryUpdateRequest: CategoryUpdateRequest): Promise<ICategory> {
        try {
            const category = await CategoryRepository.updateCategory(id, categoryUpdateRequest)
            return category
        } catch (error) {
            throw error
        }
    }

    // Delete category
    async deleteCategory(id: string): Promise<ICategory> {
        try {
            const category = await CategoryRepository.deleteCategory(id)
            return category
        } catch (error) {
            throw error
        }
    }
}

export default new CategoryService()