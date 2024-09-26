// import { ICategory } from "../../database/models/category.model";
import { ICategory } from "../../database/models/category.model";

// Interface describe the Category response
export interface CategoryResponse{
    message:string,
    data:ICategory
}