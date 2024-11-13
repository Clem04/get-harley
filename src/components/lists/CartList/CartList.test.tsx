import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import CartProductsList from './CartList';
import { Product } from '../../../types/product';

describe('CartProductsList', () => {
  const mockOnIncreaseQuantity = jest.fn();
  const mockProduct = {
    id: 1,
    name: 'Sample Product',
    price: 10,
    image: '/sample-product.jpg',
    description: 'Sample description',
    category: { name: 'Lotion', order: 400 },
  };

  const sampleProducts: { product: Product; quantity: number }[] = [
    { product: mockProduct, quantity: 2 },
  ];

  it('renders product list correctly', () => {
    render(<CartProductsList products={sampleProducts} onIncreaseQuantity={mockOnIncreaseQuantity} />);

    expect(screen.getByText('Sample Product')).toBeInTheDocument();

    expect(screen.getByText('2 +')).toBeInTheDocument();
  });

  it('calls onIncreaseQuantity when button is clicked', () => {
    render(<CartProductsList products={sampleProducts} onIncreaseQuantity={mockOnIncreaseQuantity} />);

    const button = screen.getByText('2 +');
    fireEvent.click(button);

    expect(mockOnIncreaseQuantity).toHaveBeenCalledWith(sampleProducts[0].product);
  });
});
