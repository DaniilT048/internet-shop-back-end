import type {Category} from "./Category.ts";

export type Product = {
    _id: string;
    name: string;
    image: string;
    price: number;
    description: string;
    category: Category;
};