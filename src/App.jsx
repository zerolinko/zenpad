import React from 'react';
import ConnectWallet from './components/ConnectWallet';

export default function App() {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold text-green-500">ZenPad</h1>
      <ConnectWallet />
    </div>
  );
}
