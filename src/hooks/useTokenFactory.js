import { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import factoryAbi from '../contracts/TokenFactory.json';
import { FACTORY_ADDRESS } from '../contracts/factory-address';

export default function useTokenFactory() {
  const [tokens, setTokens] = useState([]);

  useEffect(() => {
    if (!window.ethereum) return;
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const contract = new ethers.Contract(FACTORY_ADDRESS, factoryAbi, provider);

    async function fetchTokens() {
      try {
        const result = await contract.getTokens();
        setTokens(result);
      } catch (err) {
        console.error("Failed to load tokens:", err);
      }
    }

    fetchTokens();
  }, []);

  return tokens;
}
