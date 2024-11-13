import type { NextApiRequest, NextApiResponse } from 'next';
import { API_DEV_ENPOINT } from '~/constants/urls';
import { Product } from '../../../types/product';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const externalApiUrl = `${API_DEV_ENPOINT}/products?norandom`;

  if (req.method === 'GET') {
    try {
      const response = await fetch(externalApiUrl);
      if (!response.ok) {
        return res.status(response.status).json({ message: 'Failed to fetch products' });
      }
      const products: Product[] = await response.json();
      return res.status(200).json(products);
    } catch (error) {
      return res.status(500).json({ message: 'Server error', error });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
