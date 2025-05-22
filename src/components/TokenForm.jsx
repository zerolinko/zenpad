a// Обновлённая версия с вызовом контракта
import React, { useState } from 'react';
import ManifestUpload from './ManifestUpload';
import useManifestValidation from '../hooks/useManifestValidation';
import useFactoryContract from '../hooks/useFactoryContract';
import useZTC from '../hooks/useZTC';
import { ethers } from 'ethers';

export default function TokenForm() {
  const [form, setForm] = useState({
    name: '',
    symbol: '',
    description: '',
    imageURI: '',
    supply: '',
    initialBuy: '',
    twitter: '',
    website: ''
  });

  const [manifest, setManifest] = useState(null);
  const { isValid, error } = useManifestValidation(manifest);
  const factory = useFactoryContract();
  const { approve } = useZTC();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isValid || !factory) {
      alert("Invalid manifest or wallet not connected");
      return;
    }

    const total = parseInt(form.supply);
    const initial = parseFloat(form.initialBuy);
    if (isNaN(total) || isNaN(initial) || total > 10000000 || initial < 1 || initial > 100) {
      alert("Supply or initial buy is out of valid range.");
      return;
    }

    const fee = ethers.utils.parseEther("100");

    try {
      await approve(factory.address, fee);
      const tx = await factory.createToken(
        form.name,
        form.symbol,
        form.description,
        form.imageURI,
        total,
        initial
      );
      await tx.wait();
      alert("Token created!");
    } catch (err) {
      console.error(err);
      alert("Failed to create token");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <ManifestUpload setManifest={setManifest} />
      {error && <p className="text-red-500">{error}</p>}
      <input name="name" value={form.name} onChange={handleChange} placeholder="Token Name" className="w-full border p-2" required />
      <input name="symbol" value={form.symbol} onChange={handleChange} placeholder="Symbol" className="w-full border p-2" required />
      <textarea name="description" value={form.description} onChange={handleChange} placeholder="Description" className="w-full border p-2" required />
      <input name="imageURI" value={form.imageURI} onChange={handleChange} placeholder="Image URL" className="w-full border p-2" required />
      <input name="supply" type="number" value={form.supply} onChange={handleChange} placeholder="Total Supply (max 10,000,000)" className="w-full border p-2" required />
      <input name="initialBuy" type="number" value={form.initialBuy} onChange={handleChange} placeholder="Initial Buy (%) (min 1%)" className="w-full border p-2" required />
      <input name="twitter" value={form.twitter} onChange={handleChange} placeholder="Twitter (optional)" className="w-full border p-2" />
      <input name="website" value={form.website} onChange={handleChange} placeholder="Website (optional)" className="w-full border p-2" />
      <p className="text-sm text-gray-500">Creation Fee: 100 ZTC</p>
      <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">Create Token</button>
    </form>
  );
}
