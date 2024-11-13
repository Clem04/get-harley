export interface Category {
  name: string;
  order: number;
}
export interface Product {
  id: number;
  name: string;
  description: string;
  image: string;
  price: number;
  category: Category;
}

export interface ProductCardProps {
  product: Product;
  handleClick: (product: Product) => void;
  buttonLabel: string;
}

export interface ProductsListProps {
  products: Record<string, Product[]> | undefined
}