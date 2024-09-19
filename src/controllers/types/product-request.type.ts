// Define interface for product request create
export interface ProductCreateRequest {
    name: string;
    description: string;
    category: string;
    price: number;
    stock: number;
    product_image?: string;
    isAvailability: boolean;
    aggregatRating: number;
}

export interface ProdductUpdateRequest {
    name: string;
    description: string;
    category: string;
    price: number;
    stock: number;
    product_image?: string;
    isAvailability: boolean;
    aggregatRating: number;
}