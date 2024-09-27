import { Body, Controller, Delete, Get, Middlewares, Path, Post, Put, Route, Tags } from "tsoa";
// import { CategoryResponse } from "./types/category-response.type";
import { CategoryResponse } from "./types/category-response.type";
import { CategoryCreateRequest, CategoryUpdateRequest } from "./types/category-request.type";
import CategoryService from "../services/category.service";
import validateRequest from "../middlewares/validate-input";
import categoryValidationSchema from "../schemas/category";
import { HTTP_STATUS_CODE } from "@/utils/constants/status-code";

@Tags("Category")
@Route("/v1/category")
export class CategoryController extends Controller {
    // Create new category
    @Post()
    @Middlewares(validateRequest(categoryValidationSchema))
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
                this.setStatus(HTTP_STATUS_CODE.NOT_FOUND);
                return {
                    message: "Category not found.",
                    data: null!
                };
            }
            return {
                message: "Category updated successfully!",
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