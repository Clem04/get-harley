import type { NextApiRequest, NextApiResponse } from 'next';
import { API_DEV_ENPOINT } from '~/constants/urls';
import { Order } from '~/types/order';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  const cartApiUrl = `${API_DEV_ENPOINT}/orders/${id}`;

  if (req.method === 'GET') {
    try {
      const response = await fetch(cartApiUrl);
      if (!response.ok) {
        return res.status(response.status).json({ message: 'Failed to fetch order' });
      }
      const order: Order = await response.json();
      return res.status(200).json(order);
    } catch (error) {
      return res.status(500).json({ message: 'Server error', error });
    }
  } else {
    return res.status(405).json({ message: 'Method not allowed' });
  }
}
