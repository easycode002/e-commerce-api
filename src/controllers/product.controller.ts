// src/controllers/product.controller.ts
import ProductService from "../services/product.service";
import { Route, Post, Tags, Body, Response } from "tsoa";
import { ProductCreateRequest } from "../controllers/types/product-request.type";
// import uploadImage from "../middlewares/upload-image-s3.middleware"; // Your multer upload middleware
import { Request } from "express";
import { IProduct } from "../database/models/product.model";

export interface MulterFile extends Express.Multer.File {
    location?: string; // Add the location property here
}

@Tags("Product")
@Route("/v1/product")
export class ProductController {
    @Post()
    @Response(200, "Product created!")
    public async createProduct(req: Request, @Body() productRequestBody: ProductCreateRequest): Promise<{ message: string; data: IProduct }> {
        const imageUrl = (req.file as MulterFile)?.location;

        if (!imageUrl) {
            throw new Error("Image upload failed.");
        }

        const product = await ProductService.createProductWithImage(productRequestBody, imageUrl);
        return {
            message: "Product created!",
            data: product,
        };
    }
}
export default new ProductController()

// import ProductService from '@/services/product.service'
// import { Controller, Route, Post, Tags, Body, Get, Path, Example, Put, Delete } from 'tsoa'
// import { ProdductUpdateRequest, ProductCreateRequest } from '../controllers/types/product-request.type'
// import { ProductResponse } from './types/product-response.type'
// @Tags("Product")
// @Route('/v1/product')
// export class ProductController extends Controller {
//     // Create new product
//     @Post()
//     @Example({
//         "name": "Iphone 16 Pro",
//         "description": "Product apple",
//         "category": "Smart Phone",
//         "price": 3,
//         "stock": 1,
//         "product_image": "idnk",
//         "isAvailability": true,
//         "aggregatRating": 4
//     })
//     public async createProduct(@Body() productRequestBody: ProductCreateRequest): Promise<ProductResponse> {
//         try {
//             const product = await ProductService.createProduct(productRequestBody)  // return array object
//             return {
//                 message: "Product created!",
//                 data: {
//                     name: product.name,
//                     description: product.description,
//                     category: product.category,
//                     price: product.price,
//                     stock: product.stock,
//                     product_image: product.product_image,
//                     isAvailability: product.isAvailability,
//                     aggregatRating: product.aggregatRating
//                 }
//             }
//         } catch (error) {
//             throw error
//         }
//     }

//     // Get all product
//     @Get()
//     public async getAllProduct() {
//         try {
//             const products = await ProductService.getAllProduct();
//             return {
//                 message: "All product",
//                 data: products
//             }
//         } catch (error) {
//             throw error;
//         }
//     }

//     // Get product by Id
//     @Get("{id}")
//     public async getProductById(@Path() id: string): Promise<ProductResponse> {
//         try {
//             const productId = await ProductService.getProductById(id); // return object
//             console.log(`Product with ID:${id}`, productId)
//             return {
//                 message: `Product ID: ${id}`,
//                 data: productId
//             };
//         } catch (error) {
//             this.setStatus(200)
//             throw error;
//         }
//     }

//     // Update product via Id
//     @Put("{id}")
//     public async updateProduct(@Path() id: string, @Body() productRequestUpdate: ProdductUpdateRequest): Promise<ProductResponse> {
//         try {
//             const product = await ProductService.updateProduct(id, productRequestUpdate)
//             return {
//                 message: "Product updated!",
//                 data: product
//             }
//         } catch (error) {
//             throw error
//         }
//     }

//     // Delete product by Id(SoftDelete)
//     @Delete("{id}")
//     @Tags("SoftDelete")
//     public async deleteProduct(@Path() id: string): Promise<ProductResponse> {
//         try {
//             const product = await ProductService.deleteProduct(id)
//             return {
//                 message: "Product deleted!",
//                 data: product
//             }
//         } catch (error) {
//             throw error
//         }
//     }

//     // Delete product by Id(HardDelete)
//     @Delete("hard/{id}")
//     @Tags("HardDelete")
//     public async hardDelete(id: string): Promise<void> {
//         try {
//             await ProductService.hardDelete(id)
//         } catch (error) {
//             throw error
//         }
//     }
// }