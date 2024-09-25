import CategoryRepository from "./category.repository";
import CategoryModel from "../models/category.model";
import { CategoryCreateRequest, CategoryUpdateRequest } from "../../controllers/types/category-request.type";

jest.mock("../models/category.model");

describe("CategoryRepository", () => {
    const mockCategory = {
        _id: '1',
        name: 'Apple',
        description: 'Electronic items',
        isDelete: false,
        createAt: new Date(),
        updateAt: new Date()
    };

    beforeEach(() => {
        jest.clearAllMocks();
    });

    // Create Category
    describe('createCategory', () => {
        it('should create and return a category', async () => {
            const categoryCreateRequest: CategoryCreateRequest = {
                name: 'Electronics',
                description: 'Electronic items',
            };

            (CategoryModel.create as jest.Mock).mockResolvedValue(mockCategory);

            const result = await CategoryRepository.createCategory(categoryCreateRequest);

            expect(CategoryModel.create).toHaveBeenCalledWith(categoryCreateRequest);
            expect(result).toEqual(mockCategory);
        });
    });

    // Get all categories
    describe("getAllCategory", () => {
        it("should return all categories", async () => {
            (CategoryModel.find as jest.Mock).mockResolvedValue([mockCategory]);
            const result = await CategoryRepository.getAllCategory();
            expect(CategoryModel.find).toHaveBeenCalled();
            expect(result).toEqual([mockCategory]);
        });
    });

    // Update Category
    describe("updateCategory", () => {
        it("should update and return the updated category", async () => {
            const categoryUpdateRequest: CategoryUpdateRequest = {
                name: "iMac 21 inch",
                description: "Product of Cambodia"
            };

            (CategoryModel.findByIdAndUpdate as jest.Mock).mockResolvedValue({
                ...mockCategory,
                ...categoryUpdateRequest,
                updateAt: new Date()
            });

            const result = await CategoryRepository.updateCategory("1", categoryUpdateRequest);

            expect(CategoryModel.findByIdAndUpdate).toHaveBeenCalledWith(
                '1',
                { ...categoryUpdateRequest, updateAt: expect.any(Date) },
                { new: true }
            );

            expect(result).toEqual({
                ...mockCategory,
                ...categoryUpdateRequest,
                updateAt: expect.any(Date)
            });
        });
    });

    // Delete Category
    describe("deleteCategory", () => {
        it("should delete and return the deleted category", async () => {
            (CategoryModel.findByIdAndDelete as jest.Mock).mockResolvedValue(mockCategory);
            const result = await CategoryRepository.deleteCategory('1');
            expect(CategoryModel.findByIdAndDelete).toHaveBeenCalledWith('1');
            expect(result).toEqual(mockCategory);
        });
    });
});
