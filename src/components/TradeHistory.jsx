import React from 'react';

const mockTrades = [
  { time: '2025-05-22 10:10', price: 0.021, amount: 100 },
  { time: '2025-05-22 09:48', price: 0.022, amount: 200 },
  { time: '2025-05-22 09:12', price: 0.023, amount: 150 },
];

export default function TradeHistory() {
  return (
    <div className="p-4 border rounded shadow">
      <h3 className="font-semibold mb-2">Trade History</h3>
      <ul className="text-sm text-gray-700">
        {mockTrades.map((t, i) => (
          <li key={i} className="border-b py-1">
            <span>{t.time}</span> — <span>{t.amount} tokens</span> at <span>{t.price} ZTC</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
