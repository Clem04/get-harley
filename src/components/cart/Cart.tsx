'use Client'
import { useCart } from "../../hooks/useCart";
import { Product } from "../../types/product";
import CartProductsList from "../lists/CartList/CartList";

interface CartProps {
  onBuyClick: (id: number) => void;
  confirmationError: string | null;
}

export default function Cart({ onBuyClick, confirmationError }: CartProps) {
  const { state, dispatch } = useCart();

  const handleIncreaseQuantity = (product: Product) => {
    const productInCart = state.items.find(item => item.product.id === product.id);
    if (productInCart) {
      dispatch({ 
        type: 'UPDATE_QUANTITY', 
        productId: product.id, 
        quantity: productInCart.quantity + 1 
      });
    }
  };

  const productsInCart = state.items.map(item => ({
    product: item.product,
    quantity: item.quantity,
  }));

  const handleBuyClick = () => {
    const orderId = state.orderId;
  
    if (orderId === null) {
      console.error("No order ID available");
      return;
    }
    onBuyClick(Number(orderId));
  };
  console.log(state)
  return (
    <div>
      <h2 className="text-black">Your Cart</h2>
      {confirmationError && (
        <div className="mt-4 p-4 bg-red-100 text-red-800 border border-red-300 rounded-md">
          <p>{confirmationError}</p>
        </div>
      )}
      {state.items.length === 0 ? (
        <p className="text-black">No items in your cart</p>
      ) : (
        <>
          <button 
            onClick={handleBuyClick}
            className="w-full py-2 px-4 bg-blue-600 text-white font-semibold text-center rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 relative z-10"
          >
            Buy
          </button>
          <CartProductsList 
            products={productsInCart}
            onIncreaseQuantity={handleIncreaseQuantity}
          />
        </>
      )}
    </div>
  );
}
