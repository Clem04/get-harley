import { Inter } from 'next/font/google'
import { GetServerSideProps } from 'next';
import { useState } from 'react';
import { HomePageProps } from '~/types/pages';
import { Product } from '~/types/product'
import Navbar from '~/components/navigation/TopNavBar/TopNavBar'
import HomeProductList from '~/components/lists/HomeProductList/HomeProductList';
import Cart from '~/components/cart/Cart';
import { API_DEV_ENPOINT } from '~/constants/urls';

const inter = Inter({ subsets: ['latin'] })

export const getServerSideProps: GetServerSideProps<HomePageProps> = async () => {
  try {
    const resProducts = await fetch(`${API_DEV_ENPOINT}/products?norandom`);
    const products = await resProducts.json();
    
    const resCategories = await fetch(`${API_DEV_ENPOINT}/categories?norandom`);
    const categories = await resCategories.json();

    return { 
      props: { products, categories }
    };
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    return { 
      props: { products: [], categories: [], error: errorMessage }
    };
  }
};

export default function Home({ products, categories, error }: HomePageProps) {
	const [view, setView] = useState<'products' | 'cart' | 'confirm'>('products')
	const [orderId, setOrderId] = useState<number | null>(null);
	const [confirmationError, setConfirmationError] = useState<string | null>(null);

	const isLoading = !products || !categories;
  const hasError = !!error;
  const errorMessage = hasError ? `Error: ${error}` : '';

	const groupedProducts = categories?.reduce((acc, category) => {
    const categoryProducts = products?.filter((product) => product.category.name === category.name) || [];
    return { ...acc, [category.name]: categoryProducts };
  }, {} as { [key: string]: Product[] });

	const handleCartClick = () => {
    setView('cart')
  }

  const handleBackToProducts = () => {
    setView('products')
  }
	
	const handleConfirmClick = (id: number) => {
		setOrderId(id);
		setView('confirm');
		setConfirmationError(null);
		console.log('Order confirmed');
	};
	
	return (
		<main className={`min-h-screen flex flex-col items-center p-6 ${inter.className}`}>
			<Navbar onCartClick={handleCartClick} onHomeClick={handleBackToProducts}/>
			{view === 'products' && (
					isLoading ? (
						<div className="flex flex-1 items-center justify-center w-full h-full py-20">
							<p>Loading products and categories...</p>
						</div>
					): hasError ? (
						<div className="flex flex-1 items-center justify-center w-full h-full py-20">
							<p>{errorMessage}</p>
						</div>
					) : (
						<div className="bg-white w-full flex-grow">
							<div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
							{ view === 'products' &&
								<HomeProductList products={groupedProducts} />
							}
							</div>
						</div>
					)
				)
			}
			{	view === 'cart' && (
				<div className="flex flex-1 items-center justify-center w-full h-full py-20 bg-gray-100">
					<Cart 
						onBuyClick={handleConfirmClick}
						confirmationError={confirmationError}
					/>
				</div>
			)}
			{view === 'confirm' && orderId && (
        <div className="flex flex-1 items-center justify-center w-full h-full py-20 bg-gray-100 flex-col">
					<h2 className="text-black">Your order has been confirmed!</h2>
					<p className="text-black">Order ID: {orderId}</p>
					<p className="text-black">Thank you for your purchase!</p>
				</div>
      )}
		</main>
	)
}