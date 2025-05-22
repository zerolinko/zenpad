import React from 'react';

export default function TokenCard({ token }) {
  return (
    <div className="border p-4 rounded-lg shadow hover:shadow-lg transition cursor-pointer bg-white">
      <h3 className="text-xl font-bold text-green-600">{token.name} ({token.symbol})</h3>
      <p className="text-sm text-gray-600">Address: {token.address}</p>
      <p className="mt-2">Price: {token.price} ZTC</p>
      <p>Volume: {token.volume} ZTC</p>
    </div>
  );
}
