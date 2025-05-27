import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  try {
    const payments = await stripe.charges.list({ limit: 25 });
    const result = payments.data.map(charge => ({
      amount: (charge.amount / 100).toFixed(2),
      date: new Date(charge.created * 1000).toLocaleDateString(),
      description: charge.description || '',
      customer: charge.billing_details?.name || 'Unknown'
    }));
    res.status(200).json(result);
  } catch (error) {
    console.error('Stripe fetch error:', error.message);
    res.status(500).json({ error: 'Failed to fetch Stripe data' });
  }
}
