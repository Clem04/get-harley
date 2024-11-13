import type { NextApiRequest, NextApiResponse } from 'next';
import { API_DEV_ENPOINT } from '~/constants/urls';
import { Order } from '../../../types/order';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const cartApiUrl = `${API_DEV_ENPOINT}/orders`;

  if (req.method === 'POST') {
    try {
      const newOrder = req.body;

      const response = await fetch(cartApiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newOrder),
      });

      if (!response.ok) {
        return res.status(response.status).json({ message: 'Failed to create order' });
      }
      const createdOrder: Order = await response.json();
      return res.status(201).json(createdOrder);
    } catch (error) {
      return res.status(500).json({ message: 'Server error', error });
    }
  } else {
    return res.status(405).json({ message: 'Method not allowed' });
  }
}