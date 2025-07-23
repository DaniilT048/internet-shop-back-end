import type {Category} from "./Category.ts";

export type Product = {
    id: number;
    name: string;
    image: string;
    price: number;
    description: string;
    category: Category;
};