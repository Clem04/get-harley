import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import ProductCard from './ProductCard';

describe('ProductCard component', () => {
  const mockProduct = {
    id: 1,
    name: 'Sample Product',
    price: 10,
    image: '/sample-product.jpg',
    description: 'Sample description',
    category: { name: 'Lotion', order: 400 },
  };
  const buttonLabel = 'Add to Cart';
  const handleClick = jest.fn();

  it('renders product details correctly', () => {
    render(
      <ProductCard 
        product={mockProduct} 
        buttonLabel={buttonLabel} 
        handleClick={handleClick} 
      />
    );

    expect(screen.getByText(mockProduct.name)).toBeInTheDocument();
    expect(screen.getByText(mockProduct.price)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: buttonLabel })).toBeInTheDocument();
  });

  it('calls handleClick when button is clicked', () => {
    render(
      <ProductCard 
        product={mockProduct} 
        buttonLabel={buttonLabel} 
        handleClick={handleClick} 
      />
    );

    const button = screen.getByRole('button', { name: buttonLabel });
    button.click();

    expect(handleClick).toHaveBeenCalledWith(mockProduct);
  });
});
