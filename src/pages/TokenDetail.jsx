import React from 'react';
import ChartPlaceholder from '../components/ChartPlaceholder';
import TradeHistory from '../components/TradeHistory';
import { useParams } from 'react-router-dom';

export default function TokenDetail() {
  const { address } = useParams();

  const token = {
    name: "SampleToken",
    symbol: "SMP",
    price: 0.023,
    volume: 12345,
    address: address,
  };

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold text-green-600 mb-2">{token.name} ({token.symbol})</h1>
      <p className="text-sm text-gray-500 mb-4">Address: {token.address}</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="p-4 border rounded shadow">
          <p>Current Price: {token.price} ZTC</p>
          <p>Volume: {token.volume} ZTC</p>
        </div>
        <ChartPlaceholder />
      </div>
      <TradeHistory />
    </div>
  );
}
