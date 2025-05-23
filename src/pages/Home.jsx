import React from 'react';
import useTokenFactory from '../hooks/useTokenFactory';
import { Link } from 'react-router-dom';

export default function Home() {
  const tokens = useTokenFactory();

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold text-green-600 mb-4">Created Tokens</h1>
      {tokens.length === 0 ? (
        <p className="text-gray-500">No tokens found.</p>
      ) : (
        <ul className="grid gap-4 md:grid-cols-2">
          {tokens.map((address, idx) => (
            <li key={idx} className="border p-4 rounded shadow">
              <p className="mb-2 font-medium">Token #{idx + 1}</p>
              <p className="text-sm break-all">{address}</p>
              <Link
                to={`/token/${address}`}
                className="text-blue-500 underline text-sm mt-2 inline-block"
              >
                View Token
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
