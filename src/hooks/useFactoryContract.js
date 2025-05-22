import { useMemo } from 'react';
import { ethers } from 'ethers';
import factoryAbi from '../contracts/TokenFactory.json';

const FACTORY_ADDRESS = "0x0000000000000000000000000000000000000000"; // TODO: Replace with real address

export default function useFactoryContract() {
  return useMemo(() => {
    if (!window.ethereum) return null;
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    return new ethers.Contract(FACTORY_ADDRESS, factoryAbi, signer);
  }, []);
}
