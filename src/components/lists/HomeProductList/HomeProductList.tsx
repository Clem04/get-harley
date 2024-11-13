'use Client'
import { ProductsListProps, Product } from "../../../types/product";
import ProductCard from "../../cards/ProductCard/ProductCard";
import { useCart } from "../../../hooks/useCart";

export default function HomeProductList({ products }: ProductsListProps) {
  const { dispatch } = useCart();

  const handleAddToCart = async (product: Product) => {
    try {
      const response = await fetch('/api/orders?norandom', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          products: [
            { id: product.id, quantity: 1 },
          ],
        }),
      });
  
      if (!response.ok) {
        throw new Error('Failed to add item to cart');
      }
  
      dispatch({ type: 'ADD_ITEM', product });
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
  };

  return (
    <div>
      {products ? (
        Object.entries(products).map(([categoryName, categoryProducts]) => (
          <div key={categoryName}>
            <h2 className="text-2xl font-bold tracking-tight text-gray-900">{categoryName}</h2>
            <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
              {categoryProducts.map((product: Product) => (
                <ProductCard 
                  key={product.id} 
                  product={product}
                  handleClick={handleAddToCart}
                  buttonLabel='Add to Cart'
                />
              ))}
            </div>
          </div>
        ))
      ) : (
        <p>No Products by category found.</p>
      )}
    </div>
  )
}