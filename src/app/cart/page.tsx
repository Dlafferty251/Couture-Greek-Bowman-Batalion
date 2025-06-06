'use client';

import React from 'react';
export default function CartPage() {
  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Shopping Cart</h1>
      <div className="bg-white rounded-lg shadow p-6">
        <p className="text-gray-500">Your cart is empty</p>
      </div>
    </main>
  );
}
