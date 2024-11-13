import { Product } from "./product";
import { Category } from "./product";

export interface HomePageProps {
  products: Product[];
  categories: Category[];
  error?: string;
}