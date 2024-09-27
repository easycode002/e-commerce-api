import request from 'supertest'
import app from '../../app'
import MongoDBConnector from '../../database/connection';
import configs from '../../config';
import { HTTP_STATUS_CODE } from '../../utils/constants/status-code';
import { CategoryCreateRequest, CategoryUpdateRequest } from '../types/category-request.type';
import { CategoryResponse } from '../types/category-response.type';
let createdCategoryId: string;

beforeAll(async () => {
    const mongodb = await MongoDBConnector.getInstance(configs.env);
    await mongodb.connect({ url: configs.mongodbUrl });
});

afterAll(async () => {
    // Clean up the created category
    if (createdCategoryId) {
        await request(app).delete(`/v1/category/${createdCategoryId}`);
    }

    const mongodb = MongoDBConnector.getInstance(configs.env);
    await mongodb.disconnect();
});

describe("Category API Endpoints", () => {
    // Test for creating a new category
    describe("POST /v1/category", () => {
        it("should create a new category", async () => {
            const categoryData: CategoryCreateRequest = {
                name: 'Electronics',
                description: 'Devices and gadgets'
            };

            const response = await request(app)
                .post('/v1/category')
                .send(categoryData)
                .expect('Content-Type', /json/)
                .expect(HTTP_STATUS_CODE.CREATED); // Assuming 201

            expect(response.body).toHaveProperty('message', 'Product created!');
            expect(response.body).toHaveProperty('data');
            expect(response.body.data).toHaveProperty('name', categoryData.name);
            expect(response.body.data).toHaveProperty('description', categoryData.description);

            // Save the created category ID for later tests and cleanup
            createdCategoryId = response.body.data._id;
            expect(createdCategoryId).toBeDefined();
        }, 20000); // 20 seconds timeout
    });

    // Test for retrieving all categories
    // describe("GET /v1/category", () => {
    //     it("should retrieve all categories", async () => {
    //         const response = await request(app)
    //             .get('/v1/category')
    //             .expect('Content-Type', /json/)
    //             .expect(HTTP_STATUS_CODE.SUCCESS); // Assuming 200

    //         expect(Array.isArray(response.body)).toBe(true);
    //         expect(response.body.length).toBeGreaterThan(0);
    //         // Optionally, check if the created category exists in the response
    //         const category = response.body.find((cat: CategoryResponse) => cat._id === createdCategoryId);
    //         expect(category).toBeDefined();
    //         expect(category).toHaveProperty('name', 'Electronics');
    //         expect(category).toHaveProperty('description', 'Devices and gadgets');
    //     }, 20000);
    // });

    // Test for updating a category
    describe("PUT /v1/category/:id", () => {
        it("should update an existing category", async () => {
            const updateData: CategoryUpdateRequest = {
                name: 'Updated Electronics',
                description: 'Updated description'
            };

            const response = await request(app)
                .put(`/v1/category/${createdCategoryId}`)
                .send(updateData)
                .expect('Content-Type', /json/)
                .expect(HTTP_STATUS_CODE.SUCCESS); // Assuming 200

            expect(response.body).toHaveProperty('message', 'ff'); // Adjust based on actual message
            expect(response.body).toHaveProperty('data');
            expect(response.body.data).toHaveProperty('name', updateData.name);
            expect(response.body.data).toHaveProperty('description', updateData.description);
        }, 20000);

        it("should return 404 for updating a non-existent category", async () => {
            const nonExistentCategoryId = '66849e01b47f6b60c073b480';
            const updateData: CategoryUpdateRequest = {
                name: 'Non-existent Category',
                description: 'This category does not exist'
            };

            const response = await request(app)
                .put(`/v1/category/${nonExistentCategoryId}`)
                .send(updateData)
                .expect('Content-Type', /json/)
                .expect(HTTP_STATUS_CODE.NOT_FOUND); // Assuming 404

            expect(response.body).toHaveProperty('message', 'The requested resource was not found.'); // Adjust based on actual error message
        }, 20000);
    });

    // Test for deleting a category
    // describe("DELETE /v1/category/:id", () => {
    //     it("should delete an existing category", async () => {
    //         const response = await request(app)
    //             .delete(`/v1/category/${createdCategoryId}`)
    //             .expect('Content-Type', /json/)
    //             .expect(HTTP_STATUS_CODE.SUCCESS); // Assuming 200 or 204

    //         // Depending on your API, adjust the expectations
    //         // For example, if you return a message upon deletion:
    //         // expect(response.body).toHaveProperty('message', 'Category deleted successfully.');

    //         // Reset the createdCategoryId since it's deleted
    //         createdCategoryId = '';
    //     }, 20000);

    //     it("should return 404 for deleting a non-existent category", async () => {
    //         const nonExistentCategoryId = '66849e01b47f6b60c073b480';

    //         const response = await request(app)
    //             .delete(`/v1/category/${nonExistentCategoryId}`)
    //             .expect('Content-Type', /json/)
    //             .expect(HTTP_STATUS_CODE.NOT_FOUND); // Assuming 404

    //         expect(response.body).toHaveProperty('message', 'The requested resource was not found.'); // Adjust based on actual error message
    //     }, 20000);
    // });
});