import React, { useState } from 'react';
import TokenCard from '../components/TokenCard';

const mockTokens = [
  {
    name: "FrogCoin",
    symbol: "FROG",
    address: "0x123...frog",
    price: 0.005,
    volume: 12000
  },
  {
    name: "PepeToken",
    symbol: "PEPE",
    address: "0x456...pepe",
    price: 0.0012,
    volume: 8500
  },
  {
    name: "ZenDoge",
    symbol: "ZDOGE",
    address: "0x789...doge",
    price: 0.034,
    volume: 15000
  }
];

export default function Home() {
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState('volume');

  const filtered = mockTokens
    .filter(t => t.name.toLowerCase().includes(search.toLowerCase()) || t.symbol.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => {
      if (sortBy === 'name') return a.name.localeCompare(b.name);
      if (sortBy === 'price') return b.price - a.price;
      return b.volume - a.volume;
    });

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4">
        <input
          type="text"
          placeholder="Search by name or symbol"
          className="border p-2 w-full sm:w-1/2 mb-2 sm:mb-0"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select
          className="border p-2"
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
        >
          <option value="volume">Sort by Volume</option>
          <option value="price">Sort by Price</option>
          <option value="name">Sort by Name</option>
        </select>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        {filtered.map((token, index) => (
          <TokenCard key={index} token={token} />
        ))}
      </div>
    </div>
  );
}
