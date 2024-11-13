
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import HomeProductList from './HomeProductList';
import { useCart } from '../../../hooks/useCart';

jest.mock('../../../hooks/useCart');

global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    status: 200,
    statusText: 'OK',
    headers: new Headers(),
    text: () => Promise.resolve('{}'),
    json: () => Promise.resolve({}),
  }) as unknown as Promise<Response>
);

describe('HomeProductList', () => {
  const mockDispatch = jest.fn();

  beforeEach(() => {
    (useCart as jest.Mock).mockReturnValue({
      dispatch: mockDispatch,
    });
  });

  it('renders product categories and products', () => {
    const products = {
      Electronics: [
        { 
          id: 1, 
          name: 'Product 1', 
          price: 100, 
          description: 'A great product', 
          image: '', 
          category: { name: 'electronics', order: 400 } 
        },
        { 
          id: 2, 
          name: 'Product 2', 
          price: 150, 
          description: 'Another great product', 
          image: '', 
          category: {name: 'electronics', order: 400 } 
        },
      ],
      Clothing: [
        { 
          id: 3, 
          name: 'Product 3', 
          price: 50, 
          description: 'A comfy product', 
          image: '', 
          category: { name: 'clothing', order: 400 } 
        },
      ],
    };

    render(<HomeProductList products={products} />);

    expect(screen.getByText('Electronics')).toBeInTheDocument();
    expect(screen.getByText('Clothing')).toBeInTheDocument();

    expect(screen.getByText('Product 1')).toBeInTheDocument();
    expect(screen.getByText('Product 2')).toBeInTheDocument();
    expect(screen.getByText('Product 3')).toBeInTheDocument();
  });

  it('calls handleAddToCart when "Add to Cart" button is clicked', async () => {
    const products = {
      Electronics: [
        { 
          id: 1, 
          name: 'Product 1', 
          price: 100, 
          description: 'A great product', 
          image: '', 
          category: { name: 'electronics', order: 400 }
        },
      ],
    };
  
    render(<HomeProductList products={products} />);
  
    const addToCartButton = screen.getByText('Add to Cart');
  
    fireEvent.click(addToCartButton);
  
    await waitFor(() => {
      expect(mockDispatch).toHaveBeenCalledWith({
        type: 'ADD_ITEM',
        product: { 
          id: 1, 
          name: 'Product 1', 
          price: 100, 
          description: 'A great product', 
          image: '', 
          category: { name: 'electronics', order: 400 }
        },
      });
    });
  
    expect(fetch).toHaveBeenCalledWith('/api/orders?norandom', expect.objectContaining({
      method: 'POST',
      body: expect.any(String),
    }));
  });

  it('displays a message if no products are found', () => {
    render(<HomeProductList products={undefined} />);

    expect(screen.getByText('No Products by category found.')).toBeInTheDocument();
  });
});
