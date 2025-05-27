import { useEffect, useState } from 'react';

export default function StripePage() {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/stripe-payments')
      .then(res => res.json())
      .then(data => {
        setPayments(data);
        setLoading(false);
      });
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Stripe Payments</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <table className="min-w-full border">
          <thead>
            <tr>
              <th className="border px-2 py-1">Date</th>
              <th className="border px-2 py-1">Amount (€)</th>
              <th className="border px-2 py-1">Description</th>
              <th className="border px-2 py-1">Customer</th>
            </tr>
          </thead>
          <tbody>
            {payments.map((p, idx) => (
              <tr key={idx}>
                <td className="border px-2 py-1">{p.date}</td>
                <td className="border px-2 py-1">{p.amount}</td>
                <td className="border px-2 py-1">{p.description}</td>
                <td className="border px-2 py-1">{p.customer}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
