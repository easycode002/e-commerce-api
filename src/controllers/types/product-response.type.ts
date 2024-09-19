import { IProduct } from "../../database/models/product.model";

// Interface descript about product response
export interface ProductResponse {
    message: string;
    data: IProduct
}