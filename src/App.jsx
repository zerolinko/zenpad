import React from 'react';
import CreateToken from './pages/CreateToken';

export default function App() {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold text-green-500 mb-4">ZenPad</h1>
      <CreateToken />
    </div>
  );
}
