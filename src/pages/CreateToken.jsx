import React from 'react';
import TokenForm from '../components/TokenForm';

export default function CreateToken() {
  return (
    <div className="p-4 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-green-500">Create Your Token</h2>
      <TokenForm />
    </div>
  );
}
