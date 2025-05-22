import { useCallback } from 'react';
import { ethers } from 'ethers';
import erc20Abi from '../contracts/IERC20.json';

const ZTC_ADDRESS = "0x0000000000000000000000000000000000000000"; // TODO: Replace with real token address

export default function useZTC() {
  const approve = useCallback(async (spender, amount) => {
    if (!window.ethereum) return;
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const ztc = new ethers.Contract(ZTC_ADDRESS, erc20Abi, signer);
    const tx = await ztc.approve(spender, amount);
    return await tx.wait();
  }, []);

  return { approve };
}
