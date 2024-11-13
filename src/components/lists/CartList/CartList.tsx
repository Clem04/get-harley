'use Client'
import { Product } from "../../../types/product";
import ProductCard from "../../cards/ProductCard/ProductCard";

interface CartProductListProps {
  products: { product: Product; quantity: number }[];
  onIncreaseQuantity: (product: Product) => void;
}
export default function CartList({ products, onIncreaseQuantity }: CartProductListProps) {
  return (
    <div>
      <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
        {
          products.map((item, index) => (
            <ProductCard 
              key={index} 
              product={item.product}
              handleClick={onIncreaseQuantity}
              buttonLabel={`${item.quantity} +`}
            />
          ))
        }
      </div>
    </div>
  )
}