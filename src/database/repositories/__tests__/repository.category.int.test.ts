import mongoose from 'mongoose';
import CategoryRepository from '../category.repository';
import CategoryModel from '../../models/category.model';
import { CategoryCreateRequest } from '../../../controllers/types/category-request.type';
import config from '../../../config';

jest.setTimeout(30000); // Increase timeout to 30 seconds

beforeAll(async () => {
  await mongoose.connect(config.mongodbUrl);
});


afterAll(async () => {
  await mongoose.connection.close();
});

beforeEach(async () => {
  await CategoryModel.deleteMany({});
});

describe('CategoryRepository createCategory Tests', () => {
  
  // Test Case 1: Complete Information
  it('should create a new category when complete information is provided', async () => {
    const categoryCreateRequest: CategoryCreateRequest = {
      name: 'Electronics',
      description: 'Category for electronics',
    };

    const category = await CategoryRepository.createCategory(categoryCreateRequest);

    expect(category).toHaveProperty('_id');
    expect(category.name).toBe('Electronics');
    expect(category.description).toBe('Category for electronics');
  });

  // Test Case 2: Incomplete Information (missing description)
  it('should throw an error when name is missing', async () => {
    const incompleteRequest = { description: 'Category for electronics' }; // Missing name

    await expect(CategoryRepository.createCategory(incompleteRequest as any)).rejects.toThrow();
  });

  // Test Case 3: No Information Provided
  it('should throw an error when no information is provided', async () => {
    const emptyRequest = {}; // No information

    await expect(CategoryRepository.createCategory(emptyRequest as any)).rejects.toThrow();
  });
});
