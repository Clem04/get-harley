import type { NextApiRequest, NextApiResponse } from 'next';
import { API_DEV_ENPOINT } from '~/constants/urls';
import { Order } from '../../../../types/order';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { orderId } = req.query;
    try {
      const response = await fetch(`${API_DEV_ENPOINT}/${orderId}/buy`, {
        method: 'POST',
      });

      if (!response.ok) {
        return res.status(response.status).json({ message: 'Failed to confirm order' });
      }

      const confirmedOrder: Order = await response.json();
      return res.status(200).json(confirmedOrder);
    } catch (error) {
      return res.status(500).json({ message: 'Server error', error });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
