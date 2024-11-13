import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Cart from './Cart';
import { useCart } from '../../hooks/useCart';

jest.mock('../../hooks/useCart', () => ({
  useCart: jest.fn(),
}));

describe('Cart component', () => {
  const mockOnBuyClick = jest.fn();

  beforeEach(() => {
    (useCart as jest.Mock).mockReturnValue({
      state: {
        items: [
          { product: { id: 1, name: 'Sample Product', price: 10 }, quantity: 2 },
        ],
        orderId: 123,
      },
      dispatch: jest.fn(),
    });
  });

  it('renders cart items when there are products in the cart', () => {
    render(<Cart onBuyClick={mockOnBuyClick} confirmationError={null} />);

    expect(screen.getByText('Your Cart')).toBeInTheDocument();
    expect(screen.getByText('Sample Product')).toBeInTheDocument();
    expect(screen.getByText('10')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Buy/i })).toBeInTheDocument();
  });

  it('renders a message when there are no items in the cart', () => {
    (useCart as jest.Mock).mockReturnValue({
      state: { items: [], orderId: null },
      dispatch: jest.fn(),
    });

    render(<Cart onBuyClick={mockOnBuyClick} confirmationError={null} />);

    expect(screen.getByText('No items in your cart')).toBeInTheDocument();
  });

  it('calls onBuyClick with the correct orderId when Buy button is clicked', () => {
    render(<Cart onBuyClick={mockOnBuyClick} confirmationError={null} />);

    const buyButton = screen.getByRole('button', { name: /Buy/i });
    fireEvent.click(buyButton);

    expect(mockOnBuyClick).toHaveBeenCalledWith(123);
  });

  it('shows confirmation error message when confirmationError is passed', () => {
    render(<Cart onBuyClick={mockOnBuyClick} confirmationError="Error processing order" />);

    expect(screen.getByText('Error processing order')).toBeInTheDocument();
  });
});