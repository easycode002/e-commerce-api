// import CategoryRepository from '../category.repository';
// import CategoryModel from '../../models/category.model';
// import { CategoryCreateRequest, CategoryUpdateRequest } from '../../../controllers/types/category-request.type';

// jest.mock('../../models/category.model'); // Mock the CategoryModel

// describe('CategoryRepository', () => {
//     const mockCategory = {
//         _id: '1',
//         name: 'Electronics',
//         description: 'Electronic items',
//         isDelete: false,
//         createAt: new Date(),
//         updateAt: new Date(),
//     };

//     beforeEach(() => {
//         jest.clearAllMocks(); // Clear mocks before each test
//     });

//     // Test creating a category
//     describe('createCategory', () => {
//         it('should create and return a category', async () => {
//             const categoryCreateRequest: CategoryCreateRequest = {
//                 name: 'Electronics',
//                 description: 'Electronic items',
//             };

//             (CategoryModel.create as jest.Mock).mockResolvedValue(mockCategory); // Mock the create method

//             const result = await CategoryRepository.createCategory(categoryCreateRequest);

//             expect(CategoryModel.create).toHaveBeenCalledWith(categoryCreateRequest); // Check if create is called with correct arguments
//             expect(result).toEqual(mockCategory); // Check the result
//         });
//         it('should throw an error if the category data is incomplete', async () => {
//             const categoryCreateRequest: CategoryCreateRequest = {
//                 name: 'Electronics',
//                 description: "kk"
//             };

//             await expect(CategoryRepository.createCategory(categoryCreateRequest)).rejects.toThrow('Validation Error: description is required');

//             expect(CategoryModel.create).not.toHaveBeenCalled(); // Ensure create was not called
//         });
//     });

//     // Test fetching all categories
//     describe('getAllCategory', () => {
//         it('should return all categories', async () => {
//             (CategoryModel.find as jest.Mock).mockResolvedValue([mockCategory]); // Mock the find method

//             const result = await CategoryRepository.getAllCategory();

//             expect(CategoryModel.find).toHaveBeenCalled(); // Check if find was called
//             expect(result).toEqual([mockCategory]); // Check the result
//         });
//     });

//     // Test updating a category
//     describe('updateCategory', () => {
//         it('should throw an error if updating the category fails', async () => {
//             const categoryUpdateRequest: CategoryUpdateRequest = {
//                 name: 'Updated Electronics',
//                 description: 'Updated description',
//             };

//             (CategoryModel.findByIdAndUpdate as jest.Mock).mockRejectedValue(new Error('Database Error'));

//             await expect(CategoryRepository.updateCategory('3', categoryUpdateRequest)).rejects.toThrow('Database Error');

//             expect(CategoryModel.findByIdAndUpdate).toHaveBeenCalledWith(
//                 '3',
//                 { ...categoryUpdateRequest, updateAt: expect.any(Date) },
//                 { new: true },
//             );
//         });
//     });

//     // Test deleting a category
//     describe('deleteCategory', () => {
//         it('should delete and return the deleted category', async () => {
//             (CategoryModel.findByIdAndDelete as jest.Mock).mockResolvedValue(mockCategory); // Mock the findByIdAndDelete method

//             const result = await CategoryRepository.deleteCategory('2');

//             expect(CategoryModel.findByIdAndDelete).toHaveBeenCalledWith('2'); // Check if findByIdAndDelete was called with correct id
//             expect(result).toEqual(mockCategory); // Check the result
//         });

//         it('should throw an error if the category is not found', async () => {
//             (CategoryModel.findByIdAndDelete as jest.Mock).mockResolvedValue(null); // Mock the case when the category is not found

//             await expect(CategoryRepository.deleteCategory('1')).rejects.toThrow(`Category with ID:1 not found`);

//             expect(CategoryModel.findByIdAndDelete).toHaveBeenCalledWith('1'); // Check if findByIdAndDelete was called with correct id
//         });
//     });
// });