import '~/styles/globals.css'
import type { AppProps } from 'next/app'
import { CartProvider } from '~/contexts/cartContext'
// if (process.env.NEXT_PUBLIC_API_MOCKING === 'enabled') {
// 	require('../mocks')
// }

export default function App({ Component, pageProps }: AppProps) {
	return (
		<CartProvider>
			<Component {...pageProps} />
		</CartProvider>
	)
}