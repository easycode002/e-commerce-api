import { ProductCreateRequest } from "@/controllers/types/product-request.type"
import { IProduct } from "@/database/models/product.model"
import ProductRepository from "@/database/repositories/product.repository"
export class ProductService {
    // Create new product
    public async createProduct(productCreateRequest: ProductCreateRequest): Promise<IProduct> {
        try {
            const product = await ProductRepository.createProduct(productCreateRequest)
            if (!product) {
                throw new Error(`Product information is require.`)
            }
            return product
        } catch (error) {
            throw error
        }
    }

    // Get all product
    public async getAllProduct() {
        try {
            const product = await ProductRepository.getAllProduct()
            return product
        } catch (error) {
            throw error
        }
    }

    // Get product by Id
    public async getProductById(id: string): Promise<IProduct> {
        try {
            const productId = await ProductRepository.getProductById(id);
            if (!productId) {
                throw new Error(`Product not found for ID: ${id}`);
            }
            return productId
        } catch (error) {
            throw error
        }
    }

    // Update product via Id
    public async updateProduct(id: string, updateData: Partial<IProduct>): Promise<IProduct> {
        try {
            const updateProduct = await ProductRepository.updateProduct(id, updateData)
            if (!updateProduct) {
                throw new Error(`Product not found`)
            }
            return updateProduct
        } catch (error) {
            throw error
        }
    }

    // Delete product by Id(SoftDelete)
    public async deleteProduct(id: string): Promise<IProduct> {
        try {
            const product = await ProductRepository.deleteProduct(id)
            return product
        } catch (error) {
            throw error
        }
    }

    // Delete product by Id(HardDelete)
    public async hardDelete(id: string): Promise<void> {
        try {
            const product = await ProductRepository.hardDelete(id);
            return product
        } catch (error) {
            throw error
        }
    }
}
export default new ProductService