
'use client';
import React, { useState } from 'react';

type PayButtonProps = {
  lineItems?: { price_data: { currency: string; product_data: { name: string }; unit_amount: number }; quantity: number }[];
};

export default function PayButton({
  lineItems = [
    {
      price_data: {
        currency: 'usd',
        product_data: { name: 'Custom T-Shirt' },
        unit_amount: 3500, // cents
      },
      quantity: 1,
    },
  ],
}: PayButtonProps) {
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items: lineItems }),
      });
      const { url, error } = await res.json();

      if (error) {
        alert(`❌ ${error}`);
        setLoading(false);
        return;
      }
      // Redirect to Stripe Checkout
      window.location.href = url;
    } catch (err) {
      console.error(err);
      alert('Unexpected error, check console.');
      setLoading(false);
    }
  };

  return (
    <button onClick={handleClick} disabled={loading} style={{ padding: '0.5em 1em', fontSize: '1rem' }}>
      {loading ? 'Redirecting…' : 'Pay Now'}
    </button>
  );
}
