import { IProduct } from "../models/product.model"
import { ProductCreateRequest } from "@/controllers/types/product-request.type"
import ProductModel from "@/database/models/product.model"

export class ProductRepository {
    // Create new product
    public async createProduct(productCreateRequest: ProductCreateRequest): Promise<IProduct> {
        try {
            const product = await ProductModel.create(productCreateRequest);
            return product
        } catch (error) {
            throw error
        }
    }

    // Get all product
    public async getAllProduct() {
        try {
            const product = await ProductModel.find()
            return product
        } catch (error) {
            throw error
        }
    }

    // Get product by Id
    public async getProductById(id: string): Promise<IProduct> {
        try {
            const productId = await ProductModel.findById(id);
            if (!productId) {
                throw new Error(`Product not found`)
            }
            return productId
        } catch (error) {
            throw error
        }
    }

    // Update product by Id
    public async updateProduct(id: string, updateData: Partial<IProduct>): Promise<IProduct> {
        try {
            const updateProduct = await ProductModel.findByIdAndUpdate(id, { ...updateData, updateAt: new Date() }, { new: true }) // mongoose will be return `null` if no found document
            return updateProduct as IProduct // Expected: result alway IProduct
        } catch (error) {
            throw error
        }
    }

    // Delete product by Id(SoftDelete)
    public async deleteProduct(id: string): Promise<IProduct> {
        try {
            const product = await ProductModel.findByIdAndUpdate(id, {deleteAt: new Date(), isDelete: true, ProductDeleteRequest: false }, { new: true })
            console.log(product, "Repo")
            return product as IProduct   // Expected: result alway IProduct
        } catch (error) {
            throw error
        }
    }

    // HardDelete
    public async hardDelete(id:string):Promise<void>{
        try{
            const product = await ProductModel.findByIdAndDelete(id)
            if(!product){
                throw new Error(`Product with ID:${id} not found!`)
            }
        }catch(error){
            throw error
        }
    }
}
export default new ProductRepository()