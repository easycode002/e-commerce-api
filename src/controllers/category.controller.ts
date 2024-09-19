import { Body, Controller, Delete, Get, Path, Post, Put, Route, Tags } from "tsoa";
import { CategoryResponse } from "./types/category-response.type";
import { CategoryCreateRequest, CategoryUpdateRequest } from "./types/category-request.type";
import CategoryService from "@/services/category.service";

@Tags("Category")
@Route("/v1/category")
export class CategoryController extends Controller {
    // Create new category
    @Post()
    async createCategory(@Body() categoryCreateRequest: CategoryCreateRequest): Promise<CategoryResponse> {
        try {
            const category = await CategoryService.createCategory(categoryCreateRequest);
            return {
                message: "Product created!",
                data: {
                    name: category.name,
                    description: category.description
                }
            }
        } catch (error) {
            throw error
        }
    }

    // Get all category
    @Get()
    async getAllCategory() {
        try {
            const category = await CategoryService.getAllCategory()
            return category
        } catch (error) {
            throw error
        }
    }

    // Update category
    @Put("{id}")
    async updateCategory(@Path() id: string, @Body() categoryUpdateRequest: CategoryUpdateRequest): Promise<CategoryResponse> {
        try {
            const category = await CategoryService.updateCategory(id, categoryUpdateRequest)
            if (!category) {
                throw new Error(`f`)
            }
            return {
                message: "ff",
                data: category
            }
        } catch (error) {
            throw error
        }
    }

    // Delete category
    @Delete("{id}")
    async deleteCategory(@Path() id: string) {
        try {
            const category = await CategoryService.deleteCategory(id)
            return category
        } catch (error) {
            throw error
        }
    }
}